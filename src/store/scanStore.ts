import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { asyncIndexedDbStorage } from '../lib/indexedDbStorage';
import type {
  ScanRecord,
  UploadedImage,
  ExtractedProductData,
  ScanAngle,
  BatchVerificationResult,
  MRPVerificationResult,
} from '../types/scan';
import type { ComplianceValidationResult } from '../types/ruleEngine';
import type { ReadabilityAnalysisResult } from '../types/readability';
import { ocrService } from '../lib/ocrService';
import { executeLocalOcrScan } from '../lib/localOcrService';
import { validateProduct } from '../lib/ruleEngineService';
import { readabilityService } from '../lib/readabilityService';
import {
  processScanDiscrepanciesAndCorrelate,
  ScanCorrelationResult,
} from '../lib/scanComplaintCorrelator';
import { consolidateMultiAngleExtractions } from '../lib/multiAngleConsolidator';
import { runConcurrent } from '../lib/concurrencyRunner';
import { useComplianceStore } from './complianceStore';
import { verifyBatch, verifyMRP } from '../lib/batchVerificationService';
import {
  MOCK_SCANS,
  MOCK_VALIDATION_RESULTS,
  MOCK_READABILITY_RESULTS,
} from '../data/mockScans';

interface ScanState {
  // State
  scans: ScanRecord[];
  currentScan: ScanRecord | null;
  uploadedImages: UploadedImage[];
  isProcessing: boolean;
  currentProgress: number;
  currentStatusMessage: string;
  activeAngleIndex: number; // 0 = Master Consolidated View, 1..N = Angle View
  hasUnviewedCompletion: boolean;
  lastCompletedScanId: string | null;

  /** Validation results keyed by scan ID */
  validationResults: Record<string, ComplianceValidationResult>;
  /** Correlation results (RAG mappings, verified user complaints, auto-added complaints) */
  correlationResults: Record<string, ScanCorrelationResult>;
  /** Readability analysis results keyed by scan ID */
  readabilityResults: Record<string, ReadabilityAnalysisResult>;
  /** Batch number verification results keyed by scan ID */
  batchVerificationResults: Record<string, BatchVerificationResult>;
  /** MRP vs Product Directory verification results keyed by scan ID */
  mrpVerificationResults: Record<string, MRPVerificationResult>;

  // Actions
  addImages: (files: File[]) => void;
  loadSampleImage: (imageUrl: string, fileName: string) => Promise<void>;
  removeImage: (id: string) => void;
  clearImages: () => void;
  updateImageAngleLabel: (id: string, label: string) => void;
  setActiveAngleIndex: (index: number) => void;
  clearUnviewedCompletion: () => void;
  startScan: () => Promise<void>;
  startLocalScan: () => Promise<void>;
  updateScanProgress: (id: string, progress: number, status: string) => void;
  completeScan: (
    id: string,
    rawText: string,
    confidence: number,
    extractedData: ExtractedProductData
  ) => void;
  failScan: (id: string, error: string) => void;
  deleteScan: (id: string) => void;
  clearHistory: () => void;
  viewScan: (scan: ScanRecord | null) => void;
  setCurrentScan: (scan: ScanRecord | null) => void;
  startNewScan: () => void;
  setValidationResult: (scanId: string, result: ComplianceValidationResult) => void;
  setReadabilityResult: (scanId: string, result: ReadabilityAnalysisResult) => void;
}

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

const DEFAULT_ANGLE_LABELS = [
  'Photo 1',
  'Photo 2',
  'Photo 3',
  'Photo 4',
  'Photo 5',
  'Photo 6',
];

function generateId(): string {
  return `scan-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function formatTimestamp(): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date());
}

export const useScanStore = create<ScanState>()(
  persist(
    (set, get) => ({
  scans: MOCK_SCANS,
  currentScan: null,
  uploadedImages: [],
  isProcessing: false,
  currentProgress: 0,
  currentStatusMessage: '',
  activeAngleIndex: 0,
  hasUnviewedCompletion: false,
  lastCompletedScanId: null,
  validationResults: MOCK_VALIDATION_RESULTS,
  correlationResults: {},
  readabilityResults: MOCK_READABILITY_RESULTS,
  batchVerificationResults: {},
  mrpVerificationResults: {},

  loadSampleImage: async (imageUrl: string, fileName: string) => {
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const file = new File([blob], fileName, { type: blob.type || 'image/jpeg' });
      await get().addImages([file]);
    } catch (err) {
      console.error('Failed to load sample image', err);
    }
  },

  addImages: async (files) => {
    const validFiles = files.filter((f) => ALLOWED_TYPES.includes(f.type));
    if (validFiles.length === 0) return;

    const currentImages = get().uploadedImages;
    const newImages: UploadedImage[] = [];

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      const dataUrl = await fileToDataUrl(file);
      const angleIndex = currentImages.length + i;
      const angleLabel = DEFAULT_ANGLE_LABELS[angleIndex] || `Photo ${angleIndex + 1}`;

      newImages.push({
        id: generateId(),
        file,
        name: file.name,
        size: file.size,
        dataUrl,
        addedAt: Date.now(),
        angleLabel,
      });
    }

    set((state) => ({
      uploadedImages: [...state.uploadedImages, ...newImages],
    }));
  },

  removeImage: (id) => {
    set((state) => {
      const remaining = state.uploadedImages.filter((img) => img.id !== id);
      // Re-index angle labels
      const reindexed = remaining.map((img, idx) => ({
        ...img,
        angleLabel: DEFAULT_ANGLE_LABELS[idx] || `Photo ${idx + 1}`,
      }));
      return { uploadedImages: reindexed };
    });
  },

  updateImageAngleLabel: (id, label) => {
    set((state) => ({
      uploadedImages: state.uploadedImages.map((img) =>
        img.id === id ? { ...img, angleLabel: label } : img
      ),
    }));
  },

  clearImages: () => {
    set({ uploadedImages: [] });
  },

  setActiveAngleIndex: (index) => {
    set({ activeAngleIndex: index });
  },

  clearUnviewedCompletion: () => {
    set({ hasUnviewedCompletion: false });
  },

  startScan: async () => {
    const { uploadedImages } = get();
    if (uploadedImages.length === 0 || get().isProcessing) return;

    const isMultiAngle = uploadedImages.length > 1;
    const totalImages = uploadedImages.length;
    const scanId = generateId();
    const primaryImage = uploadedImages[0];

    const titleDescriptor = isMultiAngle
      ? `${primaryImage.name.replace(/\.[^/.]+$/, '')} (${totalImages} Angles Consolidated)`
      : primaryImage.name;

    const initialScanRecord: ScanRecord = {
      id: scanId,
      imageName: titleDescriptor,
      imageDataUrl: primaryImage.dataUrl,
      timestamp: formatTimestamp(),
      status: 'processing',
      progress: 0,
      confidence: 0,
      extractedData: null,
      isMultiAngle,
      angles: [],
      activeAngleIndex: 0,
    };

    set({
      isProcessing: true,
      currentProgress: 2,
      currentStatusMessage: isMultiAngle
        ? `Initializing Multi-Angle Vision Engine (${totalImages} photos of same product)...`
        : 'Initializing OCR engine...',
      currentScan: initialScanRecord,
      activeAngleIndex: 0,
      hasUnviewedCompletion: false,
    });

    try {
      // Track individual angle progress and active statuses for real-time composite progress
      const angleProgresses: number[] = new Array(totalImages).fill(5);
      const angleStatuses: string[] = new Array(totalImages).fill('Queued');
      const accumulatedAngles: (ScanAngle | null)[] = new Array(totalImages).fill(null);

      const updateCompositeProgress = () => {
        const sum = angleProgresses.reduce((acc, p) => acc + p, 0);
        const composite = Math.round((sum / totalImages) * 0.85);
        const activeStatuses = angleStatuses.filter((s) => s && s !== 'Queued' && !s.includes('Completed'));
        const statusSnippet = activeStatuses.length > 0 ? activeStatuses[activeStatuses.length - 1] : 'Processing...';

        set({
          currentProgress: Math.min(88, Math.max(5, composite)),
          currentStatusMessage: isMultiAngle
            ? `[Parallel Multi-Angle Engine] ${statusSnippet} (${accumulatedAngles.filter(Boolean).length}/${totalImages} angles completed)`
            : statusSnippet,
          currentScan: get().currentScan
            ? {
                ...get().currentScan!,
                angles: accumulatedAngles.filter(Boolean) as ScanAngle[],
              }
            : null,
        });
      };

      // Process all images concurrently using adaptive platform concurrency (mobile: 2, desktop: up to 4)
      const angles: ScanAngle[] = await runConcurrent(
        uploadedImages,
        async (image, i) => {
          const angleLabel = image.angleLabel || DEFAULT_ANGLE_LABELS[i] || `Photo ${i + 1}`;
          angleStatuses[i] = `Analyzing ${angleLabel}`;
          updateCompositeProgress();

          // Run OCR on this angle
          const ocrResult = await ocrService.recognize(
            image.dataUrl,
            (angleProgress, angleStatus) => {
              angleProgresses[i] = angleProgress;
              angleStatuses[i] = `[${angleLabel}] ${angleStatus}`;
              updateCompositeProgress();
            }
          );

          // Readability analysis for this angle
          let angleReadability: ReadabilityAnalysisResult | undefined = undefined;
          try {
            angleReadability = await readabilityService.analyze(
              `${scanId}-angle-${i + 1}`,
              image.dataUrl,
              ocrResult.extractedData,
              ocrResult.extractedData.imageDimensions || { width: 1000, height: 800 }
            );
          } catch {
            // ignore readability errors for sub-angles
          }

          const angleRecord: ScanAngle = {
            id: `${scanId}-angle-${i + 1}`,
            angleIndex: i + 1,
            label: angleLabel,
            imageName: image.name,
            imageDataUrl: image.dataUrl,
            extractedData: ocrResult.extractedData,
            confidence: ocrResult.confidence,
            rawText: ocrResult.rawText,
            readabilityResult: angleReadability,
          };

          angleProgresses[i] = 100;
          angleStatuses[i] = `[${angleLabel}] Completed`;
          accumulatedAngles[i] = angleRecord;
          updateCompositeProgress();

          return angleRecord;
        }
      );

      // Step 2: Consolidate all angles into a single master product declaration
      set({
        currentProgress: 88,
        currentStatusMessage: isMultiAngle
          ? `Consolidating declarations across ${totalImages} angles & running statutory compliance audit...`
          : 'Validating statutory declarations & compliance rules...',
      });

      const { masterExtractedData, masterConfidence, consolidatedRawText } =
        consolidateMultiAngleExtractions(angles, primaryImage.name.replace(/\.[^/.]+$/, ''));

      // Step 3: Run Rule Engine Validation on the master product
      const validationResult = validateProduct(masterExtractedData);
      validationResult.scanId = scanId;

      await new Promise((r) => setTimeout(r, 300));
      set({
        currentProgress: 94,
        currentStatusMessage: 'Correlating with Legal Metrology Statutory RAG Database...',
      });

      // Step 4: Run RAG Statutory Mapping & Complaint Correlation
      const correlationResult = processScanDiscrepanciesAndCorrelate(
        scanId,
        masterExtractedData,
        validationResult,
        consolidatedRawText
      );

      await new Promise((r) => setTimeout(r, 250));
      set({
        currentProgress: 98,
        currentStatusMessage: 'Finalizing readability analysis & compliance audit report...',
      });

      // Step 5: Master Readability Analysis
      const masterReadability = await readabilityService.analyze(
        scanId,
        primaryImage.dataUrl,
        masterExtractedData,
        masterExtractedData.imageDimensions || { width: 1200, height: 900 }
      );

      const completedScan: ScanRecord = {
        ...initialScanRecord,
        status: 'completed',
        progress: 100,
        confidence: masterConfidence,
        extractedData: masterExtractedData,
        readabilityResult: masterReadability,
        isMultiAngle,
        angles,
        activeAngleIndex: 0,
      };

      // Step 6: Ingest Scanned Product into Central Compliance Store
      useComplianceStore.getState().addScannedProduct(
        masterExtractedData,
        primaryImage.dataUrl,
        masterConfidence,
        validationResult
      );

      // Step 7: Historical Batch Verification & Dual MRP Detection
      // We need the current list of scans + the just-completed scan to compare against.
      const existingScans = get().scans; // prior scans (does NOT include completedScan yet)
      const allScansForVerification = [completedScan, ...existingScans];

      const batchResult = verifyBatch(
        completedScan.id,
        masterExtractedData.batchNumber || '',
        masterExtractedData.expiryDate || '',
        allScansForVerification
      );

      const directoryProducts = useComplianceStore.getState().products;
      const mrpResult = verifyMRP(
        masterExtractedData.mrp || '',
        masterExtractedData.productName || '',
        directoryProducts
      );

      set((state) => ({
        scans: [completedScan, ...state.scans],
        currentScan: completedScan,
        currentProgress: 100,
        currentStatusMessage: isMultiAngle
          ? `Multi-Angle Analysis Complete (${totalImages} angles compiled) — Compliance: ${validationResult.complianceScore}/100 (Readability: ${masterReadability.summary.overallScore}%). ${correlationResult.summary.totalDiscrepancies} discrepancy(s) mapped.`
          : `Extraction & Validation complete — Compliance: ${validationResult.complianceScore}/100 (Readability: ${masterReadability.summary.overallScore}%). ${correlationResult.summary.totalDiscrepancies} discrepancy(s) mapped.`,
        validationResults: {
          ...state.validationResults,
          [completedScan.id]: validationResult,
        },
        correlationResults: {
          ...state.correlationResults,
          [completedScan.id]: correlationResult,
        },
        readabilityResults: {
          ...state.readabilityResults,
          [completedScan.id]: masterReadability,
        },
        batchVerificationResults: {
          ...state.batchVerificationResults,
          [completedScan.id]: batchResult,
        },
        mrpVerificationResults: {
          ...state.mrpVerificationResults,
          [completedScan.id]: mrpResult,
        },
        isProcessing: false,
        uploadedImages: [],
        hasUnviewedCompletion: true,
        lastCompletedScanId: completedScan.id,
      }));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Multi-angle scanning failed';
      const failedScan: ScanRecord = {
        ...initialScanRecord,
        status: 'error',
        progress: 0,
        errorMessage,
      };

      set((state) => ({
        scans: [failedScan, ...state.scans],
        currentScan: failedScan,
        currentStatusMessage: `Error: ${errorMessage}`,
        isProcessing: false,
      }));
    }
  },

  startLocalScan: async () => {
    const { uploadedImages } = get();
    if (uploadedImages.length === 0 || get().isProcessing) return;

    const primaryImage = uploadedImages[0];
    const scanId = generateId();

    const initialScanRecord: ScanRecord = {
      id: scanId,
      imageName: primaryImage.name,
      imageDataUrl: primaryImage.dataUrl,
      timestamp: formatTimestamp(),
      status: 'processing',
      progress: 0,
      confidence: 0,
      extractedData: null,
      isMultiAngle: false,
      angles: [],
      activeAngleIndex: 0,
    };

    set({
      isProcessing: true,
      currentProgress: 2,
      currentStatusMessage: '⚡ Running Cloud OCR engine (Tesseract + OpenCV)...',
      currentScan: initialScanRecord,
      activeAngleIndex: 0,
      hasUnviewedCompletion: false,
    });

    try {
      const img = new Image();
      await new Promise<void>((res, rej) => {
        img.onload = () => res();
        img.onerror = rej;
        img.src = primaryImage.dataUrl;
      });
      const imageDimensions = { width: img.naturalWidth || 1200, height: img.naturalHeight || 900 };

      const ocrResult = await executeLocalOcrScan(
        primaryImage.dataUrl,
        imageDimensions,
        (progress, status) => {
          set({ currentProgress: Math.min(88, progress), currentStatusMessage: status });
        }
      );

      set({ currentProgress: 88, currentStatusMessage: '⚡ Validating statutory declarations...' });

      const { masterExtractedData, masterConfidence, consolidatedRawText } =
        consolidateMultiAngleExtractions(
          [{
            id: `${scanId}-angle-1`,
            angleIndex: 1,
            label: 'Angle 1 (Front Panel)',
            imageName: primaryImage.name,
            imageDataUrl: primaryImage.dataUrl,
            extractedData: ocrResult.extractedData,
            confidence: ocrResult.confidence,
            rawText: ocrResult.rawText,
          }],
          primaryImage.name.replace(/\.[^/.]+$/, '')
        );

      const validationResult = validateProduct(masterExtractedData);
      validationResult.scanId = scanId;

      await new Promise((r) => setTimeout(r, 300));
      set({ currentProgress: 94, currentStatusMessage: '⚡ Correlating with Legal Metrology RAG database...' });

      const correlationResult = processScanDiscrepanciesAndCorrelate(
        scanId,
        masterExtractedData,
        validationResult,
        consolidatedRawText
      );

      await new Promise((r) => setTimeout(r, 200));

      const masterReadability = await readabilityService.analyze(
        scanId,
        primaryImage.dataUrl,
        masterExtractedData,
        masterExtractedData.imageDimensions || { width: 1200, height: 900 }
      );

      const completedScan: ScanRecord = {
        ...initialScanRecord,
        status: 'completed',
        progress: 100,
        confidence: masterConfidence,
        extractedData: masterExtractedData,
        readabilityResult: masterReadability,
        isMultiAngle: false,
        angles: [],
        activeAngleIndex: 0,
      };

      useComplianceStore.getState().addScannedProduct(
        masterExtractedData,
        primaryImage.dataUrl,
        masterConfidence,
        validationResult
      );

      const existingScans = get().scans;
      const allScansForVerification = [completedScan, ...existingScans];

      const batchResult = verifyBatch(
        completedScan.id,
        masterExtractedData.batchNumber || '',
        masterExtractedData.expiryDate || '',
        allScansForVerification
      );

      const directoryProducts = useComplianceStore.getState().products;
      const mrpResult = verifyMRP(
        masterExtractedData.mrp || '',
        masterExtractedData.productName || '',
        directoryProducts
      );

      set((state) => ({
        scans: [completedScan, ...state.scans],
        currentScan: completedScan,
        currentProgress: 100,
        currentStatusMessage: `⚡ Local OCR complete — Compliance: ${validationResult.complianceScore}/100 · ${correlationResult.summary.totalDiscrepancies} discrepancy(s) mapped.`,
        validationResults: { ...state.validationResults, [completedScan.id]: validationResult },
        correlationResults: { ...state.correlationResults, [completedScan.id]: correlationResult },
        readabilityResults: { ...state.readabilityResults, [completedScan.id]: masterReadability },
        batchVerificationResults: { ...state.batchVerificationResults, [completedScan.id]: batchResult },
        mrpVerificationResults: { ...state.mrpVerificationResults, [completedScan.id]: mrpResult },
        isProcessing: false,
        uploadedImages: [],
        hasUnviewedCompletion: true,
        lastCompletedScanId: completedScan.id,
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Local OCR scan failed';
      const failedScan: ScanRecord = {
        ...initialScanRecord,
        status: 'error',
        progress: 0,
        errorMessage,
      };
      set((state) => ({
        scans: [failedScan, ...state.scans],
        currentScan: failedScan,
        currentStatusMessage: `⚡ Local OCR Error: ${errorMessage}`,
        isProcessing: false,
      }));
    }
  },

  updateScanProgress: (id, progress, status) => {
    set((state) => ({
      currentScan:
        state.currentScan?.id === id
          ? { ...state.currentScan, progress }
          : state.currentScan,
      currentProgress: progress,
      currentStatusMessage: status,
    }));
  },

  completeScan: (id, rawText, confidence, extractedData) => {
    set((state) => ({
      scans: state.scans.map((s) =>
        s.id === id
          ? {
              ...s,
              status: 'completed' as const,
              progress: 100,
              confidence,
              extractedData,
            }
          : s
      ),
    }));
  },

  failScan: (id, error) => {
    set((state) => ({
      scans: state.scans.map((s) =>
        s.id === id ? { ...s, status: 'error' as const, errorMessage: error } : s
      ),
      isProcessing: false,
    }));
  },

  deleteScan: (id) => {
    set((state) => {
      const { [id]: _remVal, ...remainingValidation } = state.validationResults;
      const { [id]: _remCorr, ...remainingCorrelation } = state.correlationResults;
      const { [id]: _remRead, ...remainingReadability } = state.readabilityResults;
      const { [id]: _remBatch, ...remainingBatch } = state.batchVerificationResults;
      const { [id]: _remMrp, ...remainingMrp } = state.mrpVerificationResults;
      return {
        scans: state.scans.filter((s) => s.id !== id),
        currentScan: state.currentScan?.id === id ? null : state.currentScan,
        validationResults: remainingValidation,
        correlationResults: remainingCorrelation,
        readabilityResults: remainingReadability,
        batchVerificationResults: remainingBatch,
        mrpVerificationResults: remainingMrp,
      };
    });
  },

  clearHistory: () => {
    set({
      scans: [],
      currentScan: null,
      validationResults: {},
      correlationResults: {},
      readabilityResults: {},
      batchVerificationResults: {},
      mrpVerificationResults: {},
    });
  },

  setCurrentScan: (scan) => {
    set({ currentScan: scan, activeAngleIndex: 0 });
  },

  startNewScan: () => {
    set({
      currentScan: null,
      uploadedImages: [],
      currentProgress: 0,
      currentStatusMessage: '',
      activeAngleIndex: 0,
    });
  },

  viewScan: (scan) => {
    set({ currentScan: scan, activeAngleIndex: 0 });
  },

  setValidationResult: (scanId, result) => {
    set((state) => ({
      validationResults: {
        ...state.validationResults,
        [scanId]: result,
      },
    }));
  },

  setReadabilityResult: (scanId, result) => {
    set((state) => ({
      readabilityResults: {
        ...state.readabilityResults,
        [scanId]: result,
      },
    }));
  },
    }),
    {
      name: 'satyadrishti_scan_store_v2',
      storage: createJSONStorage(() => asyncIndexedDbStorage),
      partialize: (state) => ({
        scans: state.scans,
        currentScan: state.currentScan,
        validationResults: state.validationResults,
        correlationResults: state.correlationResults,
        readabilityResults: state.readabilityResults,
        batchVerificationResults: state.batchVerificationResults,
        mrpVerificationResults: state.mrpVerificationResults,
        lastCompletedScanId: state.lastCompletedScanId,
      }),
    }
  )
);
