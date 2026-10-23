import React from 'react';
import { FileText, Globe } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';

export const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Col 1: Platform identity with BrandLogo */}
          <div className="space-y-4 max-w-md">
            <BrandLogo to="/" />
            <p className="text-xs text-slate-600 leading-relaxed">
              AI-Powered National Consumer Protection, Legal Metrology Enforcement, &amp; E-Commerce Compliance Intelligence Platform. Built to uphold market integrity, detect deceptive packaging, and protect consumer rights at scale.
            </p>
          </div>

          {/* Col 2: Regulatory Acts */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Regulatory Coverage
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="text-slate-600 hover:text-slate-900 transition-colors">Legal Metrology Act, 2009</li>
              <li className="text-slate-600 hover:text-slate-900 transition-colors">Packaged Commodities Rules 2011</li>
              <li className="text-slate-600 hover:text-slate-900 transition-colors">Legal Metrology Amendment Rules 2022 (USP)</li>
              <li className="text-slate-600 hover:text-slate-900 transition-colors">E-Commerce PCR Rules, 2017</li>
              <li className="text-slate-600 hover:text-slate-900 transition-colors">Bureau of Indian Standards (BIS) Act 2016</li>
              <li className="text-slate-600 hover:text-slate-900 transition-colors">Consumer Protection (E-Commerce) Rules 2020</li>
            </ul>
          </div>
        </div>

        {/* Bottom disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-end gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-600">
              <Globe className="h-3.5 w-3.5 text-slate-500" /> India Data Residency
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <FileText className="h-3.5 w-3.5 text-slate-500" /> ISO 27001 / CERT-In Aligned
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
