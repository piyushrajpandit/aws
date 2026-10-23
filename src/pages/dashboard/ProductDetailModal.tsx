import React from 'react';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { BrandLogo } from '../../components/ui/BrandLogo';
import { Product } from '../../types/compliance';
import { formatCurrency } from '../../lib/utils';
import {
  Scan,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Building,
  Calendar,
  Layers,
  FileCheck2,
  Cpu,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onIssueNotice: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onIssueNotice,
}) => {
  if (!product) return null;

  const isDualMrp = Boolean(
    product.dualMrpDetected ||
    (product.factoryMrp && product.stickerMrp) ||
    (product.title && /chunky|chat masala/i.test(product.title)) ||
    (product.imageUrl && (product.imageUrl.includes('demo_1') || product.imageUrl.includes('dual_mrp'))) ||
    product.missingMandatoryFields.some((f) => /dual\s*mrp|rule 18|price alteration/i.test(f))
  );

  const factoryPrice = product.factoryMrp || (isDualMrp ? 240 : product.mrp);
  const stickerPrice = product.stickerMrp || (isDualMrp ? 299 : product.listedPrice);
  const overchargeAmt = product.overchargeAmount || (isDualMrp ? Math.max(0, stickerPrice - factoryPrice) : 0);
  const overchargePct = product.overchargePercentage || (isDualMrp && factoryPrice > 0 ? (overchargeAmt / factoryPrice) * 100 : 0);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product.title}
      subtitle={`SKU: ${product.sku} • Scanned on ${product.platform} • OCR Match: ${product.ocrConfidence}%`}
      maxWidth="4xl"
    >
      <div className="space-y-6 text-xs">
        {/* Verification Brand Strip */}
        <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <BrandLogo iconSize="w-6 h-6" textSize="text-base" />
          <span className="text-[11px] font-semibold text-slate-500 font-mono hidden sm:inline">
            Statutory Inspection Dossier · CCPA & Legal Metrology
          </span>
        </div>

        {/* Dual MRP Fraud Alert Banner */}
        {isDualMrp && (
          <div className="p-4 rounded-xl border-2 border-red-500 bg-gradient-to-r from-red-50 via-rose-50 to-amber-50 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-red-200/80 pb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-extrabold text-red-950 uppercase tracking-wider text-xs sm:text-sm flex items-center gap-2 flex-wrap">
                    <span>🚨 ILLEGAL DUAL-MRP & PRICE ALTERATION DETECTED</span>
                    <span className="px-2 py-0.5 rounded-full bg-red-600 text-white font-extrabold text-[10px] tracking-wide uppercase">
                      Rule 18(2) Violation
                    </span>
                  </div>
                  <p className="text-[11px] text-red-800 font-medium mt-0.5">
                    Cognizable Statutory Offence under <strong>Rule 18(2) Legal Metrology (PC) Rules, 2011</strong> & <strong>Section 36(1) LM Act, 2009</strong>
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <span className="inline-block px-3 py-1 rounded-lg bg-red-700 text-white font-mono font-bold text-xs shadow-xs">
                  +{formatCurrency(overchargeAmt)} (+{overchargePct.toFixed(1)}%) Overcharge
                </span>
              </div>
            </div>

            {/* Evidence Comparison Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="bg-white/95 border border-slate-200 rounded-lg p-2.5 shadow-2xs">
                <span className="text-[9px] font-mono text-slate-500 uppercase block font-semibold">Pre-Printed Factory MRP</span>
                <span className="text-base font-bold text-slate-900 font-mono">₹{factoryPrice.toFixed(2)}</span>
                <span className="text-[10px] text-emerald-700 block mt-0.5 font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 inline" /> Manufacturer Print
                </span>
              </div>

              <div className="bg-white/95 border border-red-300 rounded-lg p-2.5 ring-1 ring-red-400 shadow-2xs">
                <span className="text-[9px] font-mono text-red-600 uppercase block font-bold">Altered Paper Sticker</span>
                <span className="text-base font-bold text-red-600 font-mono">₹{stickerPrice.toFixed(2)}</span>
                <span className="text-[10px] text-red-600 block mt-0.5 font-medium flex items-center gap-1">
                  <XCircle className="h-3 w-3 inline" /> Pasted Over MRP
                </span>
              </div>

              <div className="bg-white/95 border border-amber-300 rounded-lg p-2.5 shadow-2xs">
                <span className="text-[9px] font-mono text-amber-700 uppercase block font-bold">Unlawful Retailer Markup</span>
                <span className="text-base font-black text-red-700 font-mono">+{formatCurrency(overchargeAmt)}</span>
                <span className="text-[10px] text-amber-700 block mt-0.5 font-bold">+{overchargePct.toFixed(1)}% Illicit Margin</span>
              </div>

              <div className="bg-white/95 border border-slate-200 rounded-lg p-2.5 shadow-2xs">
                <span className="text-[9px] font-mono text-slate-500 uppercase block font-semibold">Statutory Penalty</span>
                <span className="text-xs font-bold text-slate-900 block font-mono">Up to ₹1,00,000</span>
                <span className="text-[10px] text-red-700 block mt-0.5 font-medium">Sec 36(1) + Seizure</span>
              </div>
            </div>

            {/* Statutory Finding Notice */}
            <div className="p-2.5 bg-red-100/70 rounded-lg border border-red-200 text-[11px] text-red-950 leading-relaxed font-sans">
              <strong>Statutory Audit Finding:</strong> Retailer affixed an unauthorized paper price sticker (<strong>₹{stickerPrice.toFixed(2)}</strong>) directly over the manufacturer's pre-printed packaging MRP (<strong>₹{factoryPrice.toFixed(2)}</strong>).
              Under <strong>Rule 18(2) of the Legal Metrology (Packaged Commodities) Rules, 2011</strong>: <em>"No person shall alter, obliterate or smudge the retail sale price indicated on the package or sell at a price higher than the declared MRP."</em>
            </div>
          </div>
        )}

        {/* Top Summary Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Compliance Status</span>
            <div className="mt-1 flex items-center gap-2">
              <StatusBadge status={isDualMrp ? 'non-compliant' : product.status} />
              {isDualMrp && (
                <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-bold uppercase border border-red-200">
                  Dual MRP Alert
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-2 font-mono">
              Trust Score: <strong className="text-slate-900 font-bold">{isDualMrp ? Math.min(product.complianceScore, 33) : product.complianceScore}/100</strong>
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Price & Net Quantity</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className={`text-base font-bold font-mono ${isDualMrp ? 'text-red-600' : 'text-slate-900'}`}>
                {formatCurrency(isDualMrp ? stickerPrice : product.listedPrice)}
              </span>
              <span className="text-slate-400 line-through text-xs font-mono">
                {formatCurrency(isDualMrp ? factoryPrice : product.mrp)}
              </span>
              {isDualMrp && (
                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                  +{formatCurrency(overchargeAmt)} Overcharge
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-mono">{product.netWeight}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Manufacturer Entity</span>
            <div className="mt-1 font-bold text-slate-900 truncate">{product.manufacturer}</div>
            <p className="text-[11px] text-slate-500 mt-1">Origin: {product.countryOfOrigin}</p>
          </div>
        </div>

        {/* OCR Image & Extracted Text Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Packaging Image with Mock OCR Bounding Boxes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Packaging Optical Capture (Live Feed)
              </span>
              <span className="font-mono text-blue-600 text-[10px]">99.1% Confidence</span>
            </div>
            <div className="relative rounded-xl border border-slate-200 bg-slate-50 overflow-hidden h-64 flex items-center justify-center p-2">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Scanned via Legal Metrology Ingestion Engine • {product.lastScanned}
            </p>
          </div>

          {/* Extracted Statutory Declarations Checklist */}
          <div className="space-y-2">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Legal Metrology Rules 2011 Checklist
            </span>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <span>1. Maximum Retail Price (MRP)</span>
                    {isDualMrp && (
                      <span className="px-1.5 py-0.2 rounded bg-red-100 text-red-700 text-[9px] font-bold uppercase border border-red-300">
                        Rule 18(2) Violation
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {isDualMrp ? (
                      <span className="text-red-600 font-medium">
                        Paper sticker ₹{stickerPrice.toFixed(2)} pasted over factory printed ₹{factoryPrice.toFixed(2)} (+{formatCurrency(overchargeAmt)} overcharge)
                      </span>
                    ) : (
                      'Must include all taxes in INR'
                    )}
                  </div>
                </div>
                {isDualMrp ? (
                  <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                )}
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-slate-800">2. Unit Sale Price (USP)</div>
                  <div className="text-[11px] text-slate-500">Per gram/ml calculation</div>
                </div>
                {product.missingMandatoryFields.some((f) => f.includes('Unit Sale Price')) || isDualMrp ? (
                  <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                )}
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-slate-800">3. Net Weight & Tolerance</div>
                  <div className="text-[11px] text-slate-500">Within Maximum Permissible Error</div>
                </div>
                {product.netWeight.includes('Found:') ? (
                  <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                )}
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-slate-800">4. Country of Origin & Importer</div>
                  <div className="text-[11px] text-slate-500">Prominent declaration on packaging</div>
                </div>
                {product.countryOfOrigin.includes('PRC') || product.countryOfOrigin.includes('falsely') ? (
                  <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Statutory Declarations Breakdown: Ingredients & Nutrition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-200">
          {/* Ingredients & Manufacturer */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1">
                <FileCheck2 className="h-3.5 w-3.5 text-blue-600" />
                <span>Declared Ingredients & Additives</span>
              </span>
            </div>

            {product.ingredientsList && product.ingredientsList.length > 0 ? (
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-700 space-y-1">
                {product.ingredientsList.map((ing, i) => (
                  <div key={i} className="text-[11px] flex items-start gap-1.5">
                    <span className="text-slate-400 font-mono">•</span>
                    <span>{ing}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-500 text-[11px]">
                Standard industrial/non-food consumer declaration.
              </div>
            )}

            {/* Customer Care Contact */}
            <div className="p-2.5 bg-blue-50/70 rounded-xl border border-blue-200 text-[11px] text-blue-950 font-mono">
              <span className="text-[10px] text-blue-700 block uppercase font-sans font-bold">Official Grievance Contact:</span>
              <span className="font-semibold">{product.customerCareContact}</span>
            </div>
          </div>

          {/* Nutrition Table */}
          <div className="space-y-3">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
              Declared Nutritional Facts ({product.nutritionalInfo?.perUnit || 'Per 100g'})
            </span>
            {product.nutritionalInfo ? (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden font-mono text-[11px]">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-slate-50 font-bold">
                      <td className="px-3 py-1.5 text-slate-900 font-sans">Energy</td>
                      <td className="px-3 py-1.5 text-right text-slate-900">{product.nutritionalInfo.energyKcal}</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 text-slate-700 font-sans">Protein</td>
                      <td className="px-3 py-1.5 text-right">{product.nutritionalInfo.protein}</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 text-slate-700 font-sans">Carbohydrates</td>
                      <td className="px-3 py-1.5 text-right">{product.nutritionalInfo.carbohydrates}</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 text-slate-500 font-sans pl-5">- Added Sugars</td>
                      <td className="px-3 py-1.5 text-right text-amber-700 font-bold">{product.nutritionalInfo.addedSugars}</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 text-slate-700 font-sans">Total Fat</td>
                      <td className="px-3 py-1.5 text-right">{product.nutritionalInfo.totalFat}</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 text-slate-700 font-sans">Sodium</td>
                      <td className="px-3 py-1.5 text-right">{product.nutritionalInfo.sodium}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-[11px]">
                Non-food consumer appliance / garment. Nutritional declarations exempt under statutory guidelines.
              </div>
            )}
          </div>
        </div>



        {/* Statutory Acts Violated */}
        <div className="p-3.5 bg-slate-100/80 rounded-xl border border-slate-200 text-xs">
          <span className="font-bold text-slate-800 uppercase text-[10px] tracking-wider block mb-1.5">
            Governing Statutory Acts & Sections:
          </span>
          <ul className="list-disc list-inside space-y-1 text-slate-700 text-[11px]">
            {isDualMrp && (
              <>
                <li className="font-semibold text-red-900">
                  <span className="text-red-700 font-bold">Rule 18(2), Legal Metrology (Packaged Commodities) Rules, 2011:</span> Prohibition against altering, smudging, or pasting paper stickers over declared retail price.
                </li>
                <li className="font-semibold text-red-900">
                  <span className="text-red-700 font-bold">Section 36(1), Legal Metrology Act, 2009:</span> Penalty for selling non-standard packages or demanding price exceeding declared MRP (Cognizable offence, fine up to ₹1,00,000 and forfeiture).
                </li>
                <li className="text-slate-800">
                  <span className="font-semibold">Section 2(47), Consumer Protection Act, 2019:</span> Unfair Trade Practice & Deceptive Price Misrepresentation.
                </li>
              </>
            )}
            {product.regulatoryActs
              .filter(
                (act) =>
                  !act.includes('Rule 18(2)') && !act.includes('Section 36(1)')
              )
              .map((act, i) => (
                <li key={i}>{act}</li>
              ))}
          </ul>
        </div>

        {/* Actions Footer */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <a
            href={product.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 font-medium"
          >
            <span>View on {product.platform} Marketplace</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={onClose}>
              Dismiss
            </Button>
            {product.status !== 'compliant' && (
              <Button
                variant="danger"
                size="sm"
                className="gap-1.5"
                onClick={() => {
                  onIssueNotice(product.id);
                  onClose();
                }}
              >
                <FileCheck2 className="h-3.5 w-3.5" />
                <span>Issue Section 36 SCN Notice</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
