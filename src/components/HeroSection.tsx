import React from 'react';
import { Search, MapPin, Briefcase, Sparkles, TrendingUp, Building2, ShieldCheck, ArrowRight } from 'lucide-react';
import { PAKISTAN_CITIES, JOB_CATEGORIES } from '../data/mockData';
import { FilterState } from '../types';

interface HeroSectionProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onOpenAiScreener: () => void;
  onPostJob: () => void;
  totalJobs: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  filters,
  onFilterChange,
  onOpenAiScreener,
  onPostJob,
  totalJobs
}) => {
  return (
    <div className="relative bg-slate-50 pt-8 pb-14 overflow-hidden border-b border-slate-200">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-100/60 via-blue-50/40 to-transparent pointer-events-none rounded-full blur-3xl opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TOP BADGE */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
            <span>AI-POWERED CAREER PLATFORM FOR PAKISTAN</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-normal">Mustakbil & Rozee Reimagined</span>
          </div>
        </div>

        {/* MAIN HEADLINE */}
        <div className="mt-6 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Discover Top Career Opportunities in <span className="text-indigo-600">Pakistan</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
            Connect directly with verified employers in Lahore, Karachi, Islamabad, and remote teams. Analyze your CV with AI and land high-paying roles in PKR.
          </p>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="mt-8 max-w-5xl mx-auto bg-white p-3.5 sm:p-4 rounded-3xl border border-slate-200 shadow-lg shadow-slate-200/60 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Keyword Search Input */}
            <div className="md:col-span-5 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5 text-indigo-600" />
              </div>
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                placeholder="Job title, tech stack (e.g. React, Node.js, DevOps)..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-2xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            {/* City Dropdown */}
            <div className="md:col-span-3 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <MapPin className="w-4 h-4 text-indigo-600" />
              </div>
              <select
                value={filters.city}
                onChange={(e) => onFilterChange({ city: e.target.value })}
                className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
              >
                {PAKISTAN_CITIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-2 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Briefcase className="w-4 h-4 text-indigo-600" />
              </div>
              <select
                value={filters.category}
                onChange={(e) => onFilterChange({ category: e.target.value })}
                className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
              >
                {JOB_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Search Submit Button */}
            <div className="md:col-span-2">
              <button
                onClick={() => {}}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-2xl transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* QUICK POPULAR TAG PILLS */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-600" /> Popular Searches:
            </span>
            {['React Developer', 'DevOps', 'Lahore', 'Islamabad Remote', 'Fintech', 'Flutter'].map(tag => (
              <button
                key={tag}
                onClick={() => onFilterChange({ searchQuery: tag })}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 border border-slate-200 transition-all text-[11px]"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* BOTTOM QUICK CALLOUT CARDS */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">AI ATS Resume Analyzer</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Instant match score & bullet feedback with Gemini API</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Top Pakistani Employers</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Systems Ltd, Jazz, Bank Alfalah, Arbisoft & Bazaar</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 text-amber-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">100% Verified Listings</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Transparent PKR salary ranges & direct recruiter notes</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
