import React, { useCallback, useState } from 'react';
import { Upload, ImagePlus, AlertCircle, Camera, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { useScanStore } from '../../store/scanStore';
import { cn } from '../../lib/utils';

const DEMO_SAMPLES = [
  {
    name: 'Dual-MRP Paper Sticker (Printed Rs 240 vs Sticker Rs 299)',
    path: '/demo/demo_1_dual_mrp_overcharge.jpg',
    tag: 'Legal Metrology / Dual MRP',
    badge: '₹10 Scam Radar',
    badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
    icon: '🏷️',
    description: 'Paper sticker pasted over pre-printed Rs 240 price. Missing Unit Sale Price.',
  },
  {
    name: 'Gym Bro Protein-Washing (Pro-Fit 25g* vs 4.2g Back)',
    path: '/demo/demo_2_gym_protein_trap.jpg',
    tag: 'Fitness / CCPA Deceptive Ad',
    badge: 'Gym Bro Trap',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    icon: '🏋️',
    description: 'Front claims 25g Protein* & 100% Honey, but back reveals 4.2g protein, Palm Oil & Maida.',
  },
  {
    name: 'Diabetic Sugar Stealth (0% Sugar vs Maltodextrin GI 110)',
    path: '/demo/demo_3_diabetic_sugar_trap.jpg',
    tag: 'Clinical / Diabetic & Allergens',
    badge: 'Diabetic Guard',
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    icon: '🩺',
    description: 'Promoted as 0% Sugar, but packed with Maltodextrin (GI 110) & unlisted Milk/Gluten.',
  },
];

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/heic', 'image/heif'];
const ACCEPTED_EXTENSIONS = '.png,.jpg,.jpeg,.webp,.heic,.heif,image/*';

export const ImageUploader: React.FC = () => {
  const { addImages, isProcessing } = useScanStore();
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndAdd = useCallback(
    (files: FileList | File[]) => {
      setError(null);
      const fileArray = Array.from(files);

      // Block files with unsupported types
      const invalid = fileArray.filter(
        (f) => f.type && !ACCEPTED_TYPES.includes(f.type) && !f.type.startsWith('image/')
      );
      if (invalid.length > 0) {
        setError(`Unsupported format: ${invalid.map((f) => f.name).join(', ')}. Use PNG, JPG, JPEG, or WebP.`);
        return;
      }

      // Hard-block files > 50 MB — these will crash ANY browser tab
      const tooBig = fileArray.filter((f) => f.size > 50 * 1024 * 1024);
      if (tooBig.length > 0) {
        setError(
          `File too large: ${tooBig.map((f) => `${f.name} (${(f.size / 1048576).toFixed(0)} MB)`).join(', ')}. ` +
          `Maximum supported size is 50 MB. Use your camera app to reduce resolution before uploading.`
        );
        return;
      }

      // Soft-warn for files between 15–50 MB (will be auto-compressed but may be slow)
      const largeFiles = fileArray.filter((f) => f.size > 15 * 1024 * 1024);
      if (largeFiles.length > 0) {
        setError(
          `⚠️ Large file(s) detected (${largeFiles.map((f) => `${(f.size / 1048576).toFixed(0)} MB`).join(', ')}). ` +
          `Auto-compressing to 1600 px — this may take a few seconds on older devices.`
        );
        // Don't return — still process, just warn
      }

      addImages(fileArray);
    },
    [addImages]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      if (isProcessing) return;

      if (e.dataTransfer.files?.length) {
        validateAndAdd(e.dataTransfer.files);
      }
    },
    [isProcessing, validateAndAdd]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isProcessing) setIsDragActive(true);
    },
    [isProcessing]
  );

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      validateAndAdd(e.target.files);
      e.target.value = '';
    }
  };

  const handleLoadDemoImage = async (samplePath: string, sampleName: string) => {
    if (isProcessing) return;
    setError(null);
    try {
      const res = await fetch(samplePath);
      const blob = await res.blob();
      const file = new File([blob], sampleName.replace(/[^a-zA-Z0-9_-]/g, '_') + '.jpg', {
        type: 'image/jpeg',
      });
      addImages([file]);
    } catch (err) {
      console.error('Failed to load demo image:', err);
      setError('Could not load sample picture. Please browse files manually.');
    }
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <CardContent className="p-4 sm:p-5 space-y-4">
        {/* Hidden inputs with unique IDs linked to native HTML labels */}
        <input
          id="scanner-camera-capture"
          type="file"
          accept="image/*"
          capture="environment"
          disabled={isProcessing}
          className="hidden"
          onChange={handleInputChange}
        />

        <input
          id="scanner-file-browse"
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          multiple
          disabled={isProcessing}
          className="hidden"
          onChange={handleInputChange}
        />

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            'relative flex flex-col items-center justify-center gap-3.5 rounded-xl border-2 border-dashed p-6 sm:p-8 transition-all duration-200',
            isDragActive
              ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/20'
              : 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50/20 dark:hover:bg-blue-950/10',
            isProcessing && 'opacity-50 pointer-events-none cursor-not-allowed'
          )}
        >
          <div
            className={cn(
              'flex items-center justify-center h-12 w-12 rounded-2xl border shadow-xs transition-transform',
              isDragActive
                ? 'bg-blue-100 dark:bg-blue-900/60 border-blue-300 dark:border-blue-800 text-blue-600 dark:text-blue-400'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
            )}
          >
            {isDragActive ? (
              <ImagePlus className="h-6 w-6" />
            ) : (
              <Upload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            )}
          </div>

          <div className="text-center max-w-md px-2">
            <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">
              {isDragActive ? 'Drop packaging images here' : 'Capture or Upload Packaging'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Snap product declarations using your <span className="font-semibold text-blue-600 dark:text-blue-400">Back Camera</span> or select files from your device
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
              JPG, PNG, WebP • Multi-angle images are consolidated into a single statutory audit
            </p>
          </div>

          {/* Dedicated Action Buttons (Native Labels to guarantee direct OS camera invocation) */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto pt-2">
            <label
              htmlFor="scanner-camera-capture"
              className={cn(
                'w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md cursor-pointer transition-all active:scale-95 select-none min-h-[42px]',
                'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
              )}
            >
              <Camera className="h-4 w-4 shrink-0" />
              <span>Take Photo (Back Camera)</span>
            </label>

            <label
              htmlFor="scanner-file-browse"
              className={cn(
                'w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 shadow-xs cursor-pointer transition-all active:scale-95 select-none min-h-[42px]'
              )}
            >
              <Upload className="h-4 w-4 shrink-0 text-slate-500" />
              <span>Browse Files</span>
            </label>
          </div>
        </div>

        {/* 1-Click Test Demo Packaging Pictures */}
        <div className="pt-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span>Try 1-Click Demo Packaging Photos (All 3 Use Cases):</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {DEMO_SAMPLES.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleLoadDemoImage(sample.path, sample.name)}
                disabled={isProcessing}
                className="group text-left p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850/60 hover:bg-white dark:hover:bg-slate-800 hover:border-blue-400 dark:hover:border-blue-500/60 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-lg leading-none">{sample.icon}</span>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${sample.badgeColor}`}>
                      {sample.badge}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {sample.name}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {sample.description}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                  <span>Load into Queue</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 font-medium">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
