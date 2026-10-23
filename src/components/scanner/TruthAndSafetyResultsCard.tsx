import React from 'react';
import { useHealthStore } from '../../store/healthStore';
import { useComplianceStore } from '../../store/complianceStore';
import {
  ShieldAlert,
  AlertTriangle,
  FileCheck2,
  TrendingDown,
  Scale,
  Sparkles,
  Download,
  AlertOctagon,
  ArrowRight,
  Info,
  MapPin,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

export const TruthAndSafetyResultsCard: React.FC = () => {
  const navigate = useNavigate();
  const { currentAuditResult, activePreset } = useHealthStore();

  if (!currentAuditResult) return null;

  const { overallSafetyScore, alerts, discrepancies, quickBadges } = currentAuditResult;

  // Compute color based on score
  const getScoreTheme = (score: number) => {
    if (score >= 80) return { text: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-500/30', label: 'Generally Compliant & Honest' };
    if (score >= 50) return { text: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-200 dark:border-amber-500/30', label: 'Moderate Health & Claim Risks' };
    return { text: 'text-rose-700 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-500/10', border: 'border-rose-200 dark:border-rose-500/30', label: 'Severe Deception & Statutory Violations' };
  };

  const theme = getScoreTheme(overallSafetyScore);

  const handleReportToSupervisor = async () => {
    const summaryAlerts = alerts.map((a) => a.title).join('; ');
    const summaryDisc = discrepancies.map((d) => `"${d.frontClaim}" vs "${d.backReality}"`).join('; ');
    const fullDesc = `Consumer Packaging Audit Violation: Detected misleading marketing claims and health risks on ${activePreset?.name || 'scanned package'}. Alerts: ${summaryAlerts || 'None'}. Discrepancies: ${summaryDisc || 'None'}.`;

    const newComplaint = {
      consumerName: 'Citizen Consumer (Verified In-Store Scan)',
      consumerEmail: 'citizen.alert@doca.gov.in',
      consumerPhone: '+91 98860 12345',
      productName: activePreset?.name || 'Scanned Packaged Commodity',
      brand: activePreset?.brand || 'Packaged Commodity Brand',
      platform: 'Direct' as const,
      orderNumber: `LOC-BLR-${Math.floor(100 + Math.random() * 900)}`,
      category: 'Price Gouging / MRP Violation',
      description: fullDesc,
      evidenceUrls: [],
      priority: 'Urgent' as const,
      sentimentScore: 0.95,
      aiMatchedRule: 'Rule 18(2) & CCPA 2022 Misleading Claims Directive',
      shopLocation: {
        name: 'Supermarket Shelf (Live In-Store Capture)',
        address: 'Indiranagar 100ft Road / Koramangala 5th Block, Bengaluru, Karnataka - 560034',
        coordinates: { lat: 12.9352, lng: 77.6245 },
        googleMapsUrl: 'https://maps.google.com/?q=12.9352,77.6245',
      },
    };

    await useComplianceStore.getState().addComplaint(newComplaint);

    navigate('/dashboard', {
      state: {
        newReportSuccess: true,
        reportedProduct: activePreset?.name || 'Scanned Packaged Commodity',
      },
    });
  };

  // 1-Click PDF Generation for National Consumer Helpline / CCPA Evidence
  const exportDossierPDF = () => {
    const doc = new jsPDF();
    const title = activePreset?.name || 'Packaged Commodity Truth & Compliance Audit';
    const brand = activePreset?.brand || 'Unspecified Manufacturer';

    doc.setFontSize(18);
    doc.setTextColor(20, 24, 33);
    doc.text('SatyaDrishti (सत्यदृष्टि) - Statutory Evidence Dossier', 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated on: ${new Date().toLocaleString()} | Authority: DoCA / CCPA / Legal Metrology`, 14, 28);
    doc.line(14, 32, 196, 32);

    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text(`Product Name: ${title}`, 14, 42);
    doc.text(`Brand / Manufacturer: ${brand}`, 14, 48);
    doc.text(`Honesty & Safety Index: ${overallSafetyScore} / 100`, 14, 54);

    let y = 64;

    // Discrepancies
    if (discrepancies.length > 0) {
      doc.setFontSize(13);
      doc.setTextColor(190, 18, 60);
      doc.text('Section 1: Misleading Advertisements (CCPA 2022 Violations)', 14, y);
      y += 8;

      discrepancies.forEach((d, idx) => {
        doc.setFontSize(10);
        doc.setTextColor(30, 41, 59);
        doc.text(`${idx + 1}. Front Claim: "${d.frontClaim}"`, 16, y);
        y += 6;
        doc.setTextColor(159, 18, 57);
        doc.text(`   Reality: ${d.backReality}`, 16, y);
        y += 6;
        doc.setTextColor(100, 116, 139);
        doc.text(`   Citation: ${d.legalContext}`, 16, y);
        y += 8;
      });
    }

    // Health Risks
    if (alerts.length > 0) {
      y += 4;
      doc.setFontSize(13);
      doc.setTextColor(180, 83, 9);
      doc.text('Section 2: Health & Allergen Non-Disclosures', 14, y);
      y += 8;

      alerts.forEach((a, idx) => {
        doc.setFontSize(10);
        doc.setTextColor(30, 41, 59);
        doc.text(`${idx + 1}. ${a.title}`, 16, y);
        y += 6;
        doc.setTextColor(71, 85, 105);
        doc.text(`   Detail: ${a.explanation}`, 16, y);
        y += 8;
      });
    }

    // Shrinkflation / Statutory
    if (activePreset?.shrinkflation?.detected) {
      y += 4;
      doc.setFontSize(13);
      doc.setTextColor(79, 70, 229);
      doc.text('Section 3: Shrinkflation & Legal Metrology Violations', 14, y);
      y += 8;
      doc.setFontSize(10);
      doc.setTextColor(30, 41, 59);
      doc.text(`• Stealth Price Hike: +${activePreset.shrinkflation.stealthPriceHikePercent}%`, 16, y);
      y += 6;
      doc.text(`• Quantity Reduced: ${activePreset.shrinkflation.previousWeight} -> ${activePreset.shrinkflation.currentWeight}`, 16, y);
      y += 8;
    }

    doc.save(`SatyaDrishti_Evidence_${Date.now()}.pdf`);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-subtle mb-8 transition-colors">
      {/* Header with Honesty Score */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50">
              SatyaDrishti AI Truth Engine
            </span>
            {activePreset && (
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {activePreset.brand}
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            {activePreset?.name || 'Scanned Product Audit & Safety Verdict'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Multimodal cross-check: Front pack claims vs back ingredient realities & Legal Metrology rules
          </p>
        </div>

        {/* Score Badge */}
        <div className={`flex items-center gap-4 px-4 py-3 rounded-xl border ${theme.bg} ${theme.border}`}>
          <div className="text-center">
            <div className={`text-3xl font-black font-mono tracking-tight ${theme.text}`}>
              {overallSafetyScore}
              <span className="text-sm font-normal text-slate-400 dark:text-slate-500">/100</span>
            </div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
              Truth Index
            </div>
          </div>
          <div className="border-l border-slate-200 dark:border-slate-700/60 pl-3">
            <div className={`text-xs font-bold ${theme.text}`}>
              {theme.label}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {alerts.length} health alerts • {discrepancies.length} claim lies
            </div>
          </div>
        </div>
      </div>

      {/* Quick Badges */}
      {quickBadges.length > 0 && (
        <div className="flex flex-wrap gap-2 my-4">
          {quickBadges.map((badge, idx) => (
            <span
              key={idx}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                badge.type === 'danger'
                  ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30'
                  : 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{badge.label}</span>
              <span className="text-[10px] opacity-75">({badge.detail})</span>
            </span>
          ))}
        </div>
      )}

      {/* Section 1: The Marketing Lie (Front vs Back Discrepancies) */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            Front Marketing Claims vs. Back Reality
          </h3>
          <span className="text-xs text-rose-600 dark:text-rose-400 font-mono font-semibold">
            {discrepancies.length} Discrepancies Flagged
          </span>
        </div>

        {discrepancies.length === 0 ? (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs">
            No direct contradictions found between front slogans and back ingredient lists.
          </div>
        ) : (
          <div className="space-y-3">
            {discrepancies.map((disc) => (
              <div
                key={disc.id}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-500/30 shadow-2xs"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Front Claim */}
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                      🟢 Front Slogan Promoted to Shoppers
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      "{disc.frontClaim}"
                    </span>
                  </div>

                  {/* Back Reality */}
                  <div className="p-3 rounded-lg bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 block mb-1">
                      🔴 Actual Ingredient Reality on Back
                    </span>
                    <span className="text-sm font-medium text-rose-900 dark:text-rose-200">
                      {disc.backReality}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-1.5">
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                    <Info className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
                    <span className="font-mono text-[11px] text-amber-800 dark:text-amber-300/90 font-semibold">{disc.evidenceSnippet}</span>
                  </div>
                  <span className="text-[11px] text-rose-700 dark:text-rose-300/80 italic font-sans">
                    {disc.legalContext}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 2: Personal Health & Allergen Traps */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Personal Health & Lifestyle Guardrails
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Filtered by your active profiles
          </span>
        </div>

        {alerts.length === 0 ? (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 font-medium">
            <FileCheck2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Passed all active health & allergen filters without triggers.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border flex flex-col justify-between ${
                  alert.severity === 'critical'
                    ? 'bg-rose-50/70 dark:bg-rose-950/20 border-rose-200 dark:border-rose-500/40 text-rose-900 dark:text-rose-200'
                    : 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-200 dark:border-amber-500/40 text-amber-900 dark:text-amber-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <AlertOctagon className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      {alert.title}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                        alert.severity === 'critical'
                          ? 'bg-rose-100 dark:bg-rose-500/30 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-500/40'
                          : 'bg-amber-100 dark:bg-amber-500/30 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-500/40'
                      }`}
                    >
                      {alert.severity}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                    {alert.explanation}
                  </p>

                  {alert.scientificContext && (
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900/60 p-2 rounded-lg border border-slate-200 dark:border-slate-800 mb-2">
                      <span className="font-semibold text-slate-800 dark:text-slate-300">Clinical Impact: </span>
                      {alert.scientificContext}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 text-[11px] text-amber-800 dark:text-amber-300 font-semibold">
                  👉 Advice: {alert.actionableAdvice}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 3: Shrinkflation & Legal Metrology Violations */}
      {activePreset?.shrinkflation?.detected && (
        <div className="mt-8 p-4 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-500/40">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">
              Shrinkflation Detected (+{activePreset.shrinkflation.stealthPriceHikePercent}% Stealth Price Hike)
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 text-xs">
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900/80 border border-purple-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Original Weight</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 font-mono">{activePreset.shrinkflation.previousWeight}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900/80 border border-purple-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Current Downsized Weight</span>
              <span className="text-sm font-bold text-rose-600 dark:text-rose-400 font-mono">{activePreset.shrinkflation.currentWeight}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900/80 border border-purple-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Effective Consumer Loss</span>
              <span className="text-sm font-bold text-amber-700 dark:text-amber-400 font-mono">+{activePreset.shrinkflation.stealthPriceHikePercent}% per gram</span>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
            {activePreset.shrinkflation.notes}
          </p>
        </div>
      )}

      {/* Action Footer: 1-Click Evidence Dossier & Report to Supervisor */}
      <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <Scale className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Statutory compliance cited under Legal Metrology Act, 2009 & CCPA 2022</span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleReportToSupervisor}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-sm transition-all active:scale-[0.98]"
          >
            <MapPin className="w-4 h-4 text-white" />
            <span>Report Violation to Supervisor (With Location)</span>
          </button>

          <button
            type="button"
            onClick={exportDossierPDF}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-semibold text-xs shadow-sm transition-all active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            <span>Download CCPA / DoCA Evidence Dossier (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
};


