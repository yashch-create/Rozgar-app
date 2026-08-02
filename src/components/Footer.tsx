import React from 'react';
import { Briefcase, Heart, ShieldCheck, Code2 } from 'lucide-react';

interface FooterProps {
  onOpenDocs: () => void;
  onOpenPricing: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDocs, onOpenPricing }) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* COL 1: LOGO & ABOUT */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                ROZGAR<span className="text-indigo-400">.PK</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Pakistan's next-generation full-stack career platform. Empowering job seekers in Lahore, Karachi, Islamabad, and nationwide with Gemini AI resume optimization.
            </p>
          </div>

          {/* COL 2: TOP CITIES */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Top Cities in Pakistan</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#lahore" className="hover:text-indigo-400 transition-colors">Jobs in Lahore</a></li>
              <li><a href="#karachi" className="hover:text-indigo-400 transition-colors">Jobs in Karachi</a></li>
              <li><a href="#islamabad" className="hover:text-indigo-400 transition-colors">Jobs in Islamabad</a></li>
              <li><a href="#rawalpindi" className="hover:text-indigo-400 transition-colors">Jobs in Rawalpindi</a></li>
              <li><a href="#faisalabad" className="hover:text-indigo-400 transition-colors">Jobs in Faisalabad</a></li>
            </ul>
          </div>

          {/* COL 3: EMPLOYERS */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Employer Solutions</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={onOpenPricing} className="hover:text-indigo-400 transition-colors">JazzCash Subscription Plans</button></li>
              <li><a href="#ats" className="hover:text-indigo-400 transition-colors">Applicant Tracking System (ATS)</a></li>
              <li><a href="#jd-generator" className="hover:text-indigo-400 transition-colors">AI Job Description Generator</a></li>
              <li><button onClick={onOpenDocs} className="hover:text-indigo-400 transition-colors">API & MySQL Schema Docs</button></li>
            </ul>
          </div>

          {/* COL 4: PAYMENT BADGES */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Supported Payments in PK</h4>
            <p className="text-slate-400 mb-2">Express local checkout for employers:</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-indigo-400 font-bold text-[10px]">
                JazzCash
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-indigo-300 font-bold text-[10px]">
                Easypaisa
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 font-bold text-[10px]">
                Visa / Mastercard
              </span>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Rozgar Pakistan. All rights reserved. Inspired by Mustakbil, designed for Pakistan.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with React, Express, Gemini API & Tailwind CSS for Pakistan</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
