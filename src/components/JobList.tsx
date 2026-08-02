import React from 'react';
import { JobCard } from './JobCard';
import { FilterState, Job } from '../types';
import { SlidersHorizontal, MapPin, Briefcase, DollarSign, RotateCcw, Search, Sparkles } from 'lucide-react';
import { PAKISTAN_CITIES, JOB_CATEGORIES } from '../data/mockData';

interface JobListProps {
  jobs: Job[];
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  onSelectJob: (job: Job) => void;
  onQuickApply: (job: Job) => void;
  bookmarkedJobIds: string[];
  onToggleBookmark: (jobId: string) => void;
  onOpenAiScreener: () => void;
}

export const JobList: React.FC<JobListProps> = ({
  jobs,
  filters,
  onFilterChange,
  onResetFilters,
  onSelectJob,
  onQuickApply,
  bookmarkedJobIds,
  onToggleBookmark,
  onOpenAiScreener
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT SIDEBAR: ADVANCED FILTERS */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" /> Filter Listings
              </h2>
              <button
                onClick={onResetFilters}
                className="text-[11px] text-indigo-600 hover:underline flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* City Filter */}
            <div className="mt-4 space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">City in Pakistan</label>
              <select
                value={filters.city}
                onChange={(e) => onFilterChange({ city: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl p-2.5 focus:border-indigo-500 focus:bg-white focus:outline-none"
              >
                {PAKISTAN_CITIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Industry / Category */}
            <div className="mt-4 space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">Industry Category</label>
              <select
                value={filters.category}
                onChange={(e) => onFilterChange({ category: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl p-2.5 focus:border-indigo-500 focus:bg-white focus:outline-none"
              >
                {JOB_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Location Type */}
            <div className="mt-4 space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">Work Setup</label>
              <div className="space-y-1.5">
                {['', 'On-site', 'Hybrid', 'Remote'].map(loc => (
                  <label key={loc} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="radio"
                      name="locationType"
                      checked={filters.locationType === loc}
                      onChange={() => onFilterChange({ locationType: loc })}
                      className="text-indigo-600 focus:ring-indigo-500 bg-slate-100 border-slate-300"
                    />
                    <span>{loc === '' ? 'All Work Setups' : loc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div className="mt-4 space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">Experience Level</label>
              <select
                value={filters.experienceLevel}
                onChange={(e) => onFilterChange({ experienceLevel: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl p-2.5 focus:border-indigo-500 focus:bg-white focus:outline-none"
              >
                <option value="">All Levels</option>
                <option value="Entry Level">Entry Level (0-2 yrs)</option>
                <option value="Mid Level">Mid Level (2-5 yrs)</option>
                <option value="Senior Level">Senior Level (5+ yrs)</option>
                <option value="Executive">Executive Leadership</option>
              </select>
            </div>

            {/* Minimum Salary Slider in PKR */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">Min Salary (PKR)</span>
                <span className="text-indigo-600 font-bold font-mono">
                  PKR {(filters.salaryMin / 1000).toFixed(0)}k/mo
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="500000"
                step="25000"
                value={filters.salaryMin}
                onChange={(e) => onFilterChange({ salaryMin: Number(e.target.value) })}
                className="w-full accent-indigo-600 bg-slate-200 cursor-pointer"
              />
            </div>

          </div>

          {/* AI PROMOTIONAL WIDGET */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 via-slate-50 to-white border border-indigo-200/80 shadow-2xs text-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Unsure if you qualify?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Use Rozgar AI to check your resume compatibility against top jobs in Lahore & Karachi before applying.
            </p>
            <button
              onClick={onOpenAiScreener}
              className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-all"
            >
              Analyze Resume Now
            </button>
          </div>

        </div>

        {/* RIGHT CONTENT: JOB CARDS GRID */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* HEADER BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Available Opportunities in <span className="text-indigo-600">Pakistan</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Showing <span className="text-slate-900 font-semibold">{jobs.length}</span> active position{jobs.length !== 1 ? 's' : ''} matching your criteria
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Sort by:</span>
              <select className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500">
                <option>Most Recent</option>
                <option>Highest Salary (PKR)</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>

          {/* JOBS GRID */}
          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {jobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  onSelectJob={onSelectJob}
                  onQuickApply={onQuickApply}
                  isBookmarked={bookmarkedJobIds.includes(job.id)}
                  onToggleBookmark={onToggleBookmark}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-lg mx-auto my-8 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 mx-auto flex items-center justify-center text-slate-400 mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No Jobs Match Your Filter</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Try clearing your search filters or switching cities to discover more opportunities across Pakistan.
              </p>
              <button
                onClick={onResetFilters}
                className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-all shadow-xs"
              >
                Clear All Filters
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
