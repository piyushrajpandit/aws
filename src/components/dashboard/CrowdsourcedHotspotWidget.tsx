import React, { useState, useMemo } from 'react';
import {
  MapPin,
  AlertTriangle,
  Flame,
  TrendingUp,
  Store,
  ShieldAlert,
  Send,
  CheckCircle2,
  ChevronRight,
  ArrowUpRight,
  Users,
  Compass,
  Radio,
  PlusCircle,
  Zap,
  Check,
} from 'lucide-react';
import { useComplianceStore } from '../../store/complianceStore';
import { Complaint } from '../../types/compliance';
import { Button } from '../ui/Button';

interface InfractionCluster {
  id: string;
  brand: string;
  productName: string;
  retailPrice: string;
  illicitMargin: string;
  reportCount: number;
  city: string;
  locality: string;
  violationType: string;
  estimatedIllicitScale: string;
  riskTier: 'CRITICAL' | 'HIGH' | 'MODERATE';
  inspectorAction: string;
  recentComplaints: Complaint[];
  isLiveUserAdded?: boolean;
}

export const CrowdsourcedHotspotWidget: React.FC = () => {
  const { complaints, updateOfficerDecision, addFullComplaint } = useComplianceStore();
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>(null);
  const [dispatchedId, setDispatchedId] = useState<string | null>(null);
  const [simulationNotice, setSimulationNotice] = useState<string | null>(null);

  // Group live complaints by brand dynamically
  const dynamicClusters = useMemo(() => {
    const brandMap: Record<string, Complaint[]> = {};

    complaints.forEach((c) => {
      const brandKey = (c.brand || c.productName || 'Unbranded Commodity').trim();
      if (!brandMap[brandKey]) brandMap[brandKey] = [];
      brandMap[brandKey].push(c);
    });

    const clusters: InfractionCluster[] = Object.entries(brandMap).map(([brand, items], idx) => {
      const topItem = items[0];
      const count = items.length;

      // Extract city & locality from shopLocation or fallback
      let city = 'Mumbai';
      let locality = 'Andheri West & Malad Kirana Corridor';

      const itemWithLoc = items.find((i) => i.shopLocation?.address || i.shopLocation?.name);
      if (itemWithLoc?.shopLocation) {
        const parts = itemWithLoc.shopLocation.address.split(',');
        city = parts.length > 2 ? parts[parts.length - 2].trim() : 'Bengaluru';
        locality = itemWithLoc.shopLocation.name || itemWithLoc.shopLocation.address;
      } else if (brand.toLowerCase().includes('nandi') || brand.toLowerCase().includes('dairy')) {
        city = 'Bengaluru';
        locality = 'Koramangala & HSR Layout Retail Outlets';
      } else if (brand.toLowerCase().includes('spice') || brand.toLowerCase().includes('desi')) {
        city = 'New Delhi';
        locality = 'Lajpat Nagar Wholesale Market';
      }

      const riskTier: 'CRITICAL' | 'HIGH' | 'MODERATE' =
        count >= 15 ? 'CRITICAL' : count >= 5 ? 'HIGH' : 'MODERATE';

      const overchargeAmt = items.find((i) => i.extractedEvidenceSummary?.priceOverchargeAmount)
        ?.extractedEvidenceSummary?.priceOverchargeAmount || 5;

      const hasLiveUserReport = items.some(
        (i) => i.submittedAt === 'Just now' || i.id.startsWith('CMP-SIM-') || i.id.startsWith('CMP-')
      );

      return {
        id: `CLUST-${String(idx + 1).padStart(3, '0')}`,
        brand,
        productName: topItem.productName || 'Packaged Commodity',
        retailPrice: topItem.extractedEvidenceSummary?.declaredMrp
          ? `₹${topItem.extractedEvidenceSummary.declaredMrp} Printed`
          : '₹10 - ₹20 MRP',
        illicitMargin: `+₹${overchargeAmt} Paper Sticker Markup`,
        reportCount: count,
        city,
        locality: locality.length > 55 ? locality.slice(0, 52) + '...' : locality,
        violationType: topItem.category || 'Systemic Dual-MRP Paper Stickering over Print',
        estimatedIllicitScale: `₹${(count * 11500).toLocaleString('en-IN')} illicit profit across volume`,
        riskTier,
        inspectorAction:
          count >= 10
            ? 'Recommended for tomorrow morning on-site raid'
            : 'Assigned to Zonal Legal Metrology Inspector',
        recentComplaints: items,
        isLiveUserAdded: hasLiveUserReport,
      };
    });

    return clusters.sort((a, b) => b.reportCount - a.reportCount);
  }, [complaints]);

  // Default to top cluster if none selected
  const activeCluster = dynamicClusters.find((c) => c.id === selectedClusterId) || dynamicClusters[0];

  const handleDispatch = (cluster: InfractionCluster) => {
    setDispatchedId(cluster.id);

    // Update each underlying complaint in this cluster
    cluster.recentComplaints.forEach((c) => {
      updateOfficerDecision(
        c.id,
        'ASSIGN_INSPECTION',
        `Automated priority raid directive scheduled based on ${cluster.reportCount} correlated citizen reports.`,
        'Directorate Supervisor',
        'Inspector Arjun Nair (BBMP Zone 1)'
      );
    });

    setTimeout(() => setDispatchedId(null), 3000);
  };

  // 1-Click Simulation Trigger: Injects a live consumer ₹10 fraud report
  const handleSimulateReport = () => {
    const randomTicket = `NCH-GRV-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newComplaint: Complaint = {
      id: `CMP-SIM-${Date.now()}`,
      ticketId: randomTicket,
      consumerName: 'Ananya Verma (Citizen Report)',
      consumerEmail: 'consumer@demo.gov.in',
      consumerPhone: '+91 98451 90211',
      productName: 'Crunchy Choco Rolls (Mini ₹10 Pack)',
      brand: 'Apex Sweet & Snacks',
      platform: 'Direct',
      orderNumber: `STORE-POS-${Math.floor(1000 + Math.random() * 9000)}`,
      category: 'Price Gouging / MRP Violation',
      description: 'Paper sticker of ₹15 placed over printed ₹10 MRP at local retail counter. Vendor refused to bill at printed ₹10.',
      evidenceUrls: [],
      status: 'New',
      priority: 'Urgent',
      submittedAt: 'Just now',
      sentimentScore: 0.94,
      aiMatchedRule: 'Legal Metrology (Packaged Commodities) Rule 18(2) & CPA Sec 2(47)',
      shopLocation: {
        name: 'D-Mart, Shastri Nagar, Andheri West',
        address: 'Shastri Nagar, Andheri West, Mumbai, Maharashtra 400053',
        coordinates: { lat: 19.1336, lng: 72.8267 },
        googleMapsUrl: 'https://maps.google.com/?q=19.1336,72.8267',
      },
      extractedEvidenceSummary: {
        declaredMrp: '10',
        receiptPrice: '15',
        priceOverchargeAmount: 5,
        extractionConfidence: 96,
      },
    };

    addFullComplaint(newComplaint);
    setSimulationNotice('⚡ Live Citizen Complaint Filed! Radar updated in real time.');
    setTimeout(() => setSimulationNotice(null), 3500);
  };

  const totalComplaintsCount = complaints.length;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      {/* Widget Header with live status */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-xs">
              <Flame className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Crowdsourced Infraction Radar — The ₹10 Micro-Fraud Detector
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  LIVE SYNC
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Automatically connects every citizen complaint into geographic clusters to schedule tomorrow's raids.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleSimulateReport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-all active:scale-95"
              title="Test end-to-end: Inject a new consumer grievance into the radar"
            >
              <Zap className="h-3.5 w-3.5 fill-current" />
              <span>Simulate Citizen Report (+1)</span>
            </button>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg font-mono">
              {totalComplaintsCount} Total Correlated
            </span>
          </div>
        </div>

        {simulationNotice && (
          <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-150">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{simulationNotice}</span>
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
        {/* Left Column: Dynamic Hotspot Clusters */}
        <div className="lg:col-span-7 p-4 space-y-3">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
            <span>Live Brand Clusters ({dynamicClusters.length})</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400">Sorted by frequency</span>
          </div>

          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {dynamicClusters.map((cluster) => {
              const isSelected = activeCluster?.id === cluster.id;
              return (
                <div
                  key={cluster.id}
                  onClick={() => setSelectedClusterId(cluster.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-xs ring-1 ring-amber-400/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {cluster.brand}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                          {cluster.retailPrice}
                        </span>
                        {cluster.isLiveUserAdded && (
                          <span className="text-[9px] font-bold font-mono px-1.5 py-0.2 rounded bg-emerald-500 text-white animate-pulse">
                            LIVE REPORT
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5 truncate">
                        {cluster.productName}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-xs font-black font-mono px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {cluster.reportCount} reports
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 text-[11px] text-amber-700 dark:text-amber-400 font-medium line-clamp-1">
                    ⚠️ {cluster.violationType}
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 truncate max-w-[260px]">
                      <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                      <span className="truncate">{cluster.city} • {cluster.locality}</span>
                    </span>
                    <span className="font-bold text-red-600 dark:text-red-400 text-[10px] font-mono shrink-0">
                      {cluster.riskTier} PRIORITY
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Supervisor Action Directive Dossier */}
        <div className="lg:col-span-5 p-4 sm:p-5 bg-slate-50/60 dark:bg-slate-950/40 flex flex-col justify-between">
          {activeCluster ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Enforcement Dossier
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-white font-mono">
                  {activeCluster.id}
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {activeCluster.productName}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Target Manufacturer / Marketer: <strong>{activeCluster.brand}</strong>
                </p>
              </div>

              {/* Fraud Economics Breakdown */}
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-2xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Calculated Micro-Scam Magnitude
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  <strong>Illicit Margin:</strong> {activeCluster.illicitMargin}
                </div>
                <div className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                  <strong>Estimated Cumulative Extraction:</strong> {activeCluster.estimatedIllicitScale}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic leading-snug">
                  "Individual consumers ignore small ₹5 overcharges; aggregated across {activeCluster.reportCount} reports, this amounts to a systemic pattern for Legal Metrology enforcement."
                </p>
              </div>

              {/* Target Location */}
              <div className="text-xs space-y-1">
                <div className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Compass className="h-3.5 w-3.5 text-blue-500" />
                  <span>Target Raid Coordinates:</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 pl-5">
                  {activeCluster.locality}, {activeCluster.city}
                </p>
              </div>

              {/* Directive recommendation */}
              <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-900 dark:text-red-200 font-medium">
                <strong>Enforcement Strategy: </strong>
                {activeCluster.inspectorAction}
              </div>

              {/* Action dispatch button */}
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleDispatch(activeCluster)}
                className="w-full justify-center gap-2 font-bold bg-amber-600 hover:bg-amber-700 text-white min-h-[40px] shadow-sm"
              >
                {dispatchedId === activeCluster.id ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Directive Dispatched to Inspector Field Device!</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Assign Field Raid to Zonal Inspector ({activeCluster.reportCount} Cases)</span>
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-slate-400">
              Select an infraction cluster to review
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
