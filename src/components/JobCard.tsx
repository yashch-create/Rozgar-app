import React from 'react';
import { MapPin, Building2, Calendar, Bookmark, BookmarkCheck, ArrowUpRight, ShieldCheck, DollarSign, Sparkles } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onSelectJob: (job: Job) => void;
  onQuickApply: (job: Job) => void;
  isBookmarked: boolean;
  onToggleBookmark: (jobId: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onSelectJob,
  onQuickApply,
  isBookmarked,
  onToggleBookmark
}) => {
  const formattedMinSalary = (job.salaryMin / 1000).toFixed(0);
  const formattedMaxSalary = (job.salaryMax / 1000).toFixed(0);

  return (
    <div className="bg-white border border-slate-200/90 hover:border-indigo-300 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        
        {/* HEADER: LOGO, COMPANY, FEATURED BADGE & BOOKMARK */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="w-12 h-12 rounded-xl object-cover bg-slate-50 border border-slate-200 p-1 flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <span>{job.companyName}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" title="Verified Employer" />
              </div>
              <h3
                onClick={() => onSelectJob(job)}
                className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer mt-0.5 line-clamp-1"
              >
                {job.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => onToggleBookmark(job.id)}
            className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-amber-500 hover:border-amber-300 transition-all"
            title={isBookmarked ? 'Saved' : 'Bookmark job'}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* METRICS & SALARY IN PKR */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          {/* Salary Pill */}
          <div className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 font-semibold flex items-center gap-1">
            <span>PKR</span>
            <span>{formattedMinSalary}k - {formattedMaxSalary}k</span>
            <span className="text-[10px] text-indigo-500 font-normal">/ mo</span>
          </div>

          {/* Location Pill */}
          <div className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-indigo-600" />
            <span>{job.city} ({job.locationType})</span>
          </div>

          {/* Job Type Pill */}
          <div className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {job.jobType}
          </div>

          {/* Experience Pill */}
          <div className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {job.experienceLevel}
          </div>
        </div>

        {/* SHORT DESCRIPTION */}
        <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* SKILL TAGS */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {job.skills.slice(0, 4).map(skill => (
            <span
              key={skill}
              className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80 text-[11px] font-mono"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 border border-slate-200 text-[10px]">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>

      </div>

      {/* FOOTER ACTIONS */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-400 flex items-center gap-1 text-[11px]">
          <Calendar className="w-3 h-3" />
          Posted {job.postedDate}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectJob(job)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-all"
          >
            Details
          </button>
          <button
            onClick={() => onQuickApply(job)}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-xs flex items-center gap-1 transition-all"
          >
            <span>Apply Now</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
