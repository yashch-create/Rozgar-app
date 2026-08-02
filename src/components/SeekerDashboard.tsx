import React, { useState } from 'react';
import { JobApplication, User, Job, InterviewSchedule } from '../types';
import { UserCheck, Clock, Calendar, CheckCircle2, XCircle, FileText, Sparkles, MapPin, Building2, ExternalLink, Bookmark } from 'lucide-react';

interface SeekerDashboardProps {
  currentUser: User;
  applications: JobApplication[];
  interviews: InterviewSchedule[];
  savedJobs: Job[];
  onSelectJob: (job: Job) => void;
  onOpenAiScreener: () => void;
  onOpenResumeBuilder: () => void;
}

export const SeekerDashboard: React.FC<SeekerDashboardProps> = ({
  currentUser,
  applications,
  interviews,
  savedJobs,
  onSelectJob,
  onOpenAiScreener,
  onOpenResumeBuilder
}) => {
  const [activeTab, setActiveTab] = useState<'applications' | 'interviews' | 'saved'>('applications');

  const getStatusBadge = (status: JobApplication['status']) => {
    switch (status) {
      case 'Submitted':
        return <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium">Submitted</span>;
      case 'Screening':
        return <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium">Under Review</span>;
      case 'Interview Scheduled':
        return <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold animate-pulse">Interview Scheduled</span>;
      case 'Offer Extended':
        return <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold">Offer Extended</span>;
      case 'Hired':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs">Hired 🎉</span>;
      case 'Rejected':
        return <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-medium">Not Selected</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* SEEKER PROFILE HERO CARD */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
            alt={currentUser.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500/60 p-0.5 bg-slate-50 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">{currentUser.name}</h1>
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-semibold">
                Verified Seeker
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 font-medium">{currentUser.title || 'Full Stack Engineer'}</p>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" /> {currentUser.city || 'Lahore, Pakistan'}
              </span>
              <span>•</span>
              <span>{applications.length} Applications</span>
            </div>
          </div>
        </div>

        {/* QUICK ACTION BUTTONS */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            onClick={onOpenResumeBuilder}
            className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-semibold text-xs flex items-center gap-2 transition-all"
          >
            <FileText className="w-4 h-4 text-indigo-600" />
            <span>Update CV</span>
          </button>
          <button
            onClick={onOpenAiScreener}
            className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>AI Resume Optimizer</span>
          </button>
        </div>
      </div>

      {/* DASHBOARD TABS */}
      <div className="flex border-b border-slate-200 text-sm font-semibold gap-6">
        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 transition-all flex items-center gap-2 ${
            activeTab === 'applications'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <UserCheck className="w-4 h-4" /> My Applications ({applications.length})
        </button>

        <button
          onClick={() => setActiveTab('interviews')}
          className={`pb-3 transition-all flex items-center gap-2 ${
            activeTab === 'interviews'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" /> Interview Schedule ({interviews.length})
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 transition-all flex items-center gap-2 ${
            activeTab === 'saved'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Bookmark className="w-4 h-4" /> Saved Jobs ({savedJobs.length})
        </button>
      </div>

      {/* TAB 1: APPLICATIONS LIST */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          {applications.length > 0 ? (
            applications.map(app => (
              <div
                key={app.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={app.companyLogo}
                    alt={app.companyName}
                    className="w-12 h-12 rounded-xl object-cover bg-slate-50 border border-slate-200 p-1"
                  />
                  <div>
                    <div className="text-xs text-slate-500 font-medium">{app.companyName}</div>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">{app.jobTitle}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      <span>Applied: {app.appliedDate}</span>
                      {app.atsScore && (
                        <span className="text-indigo-700 font-semibold bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                          ATS Score: {app.atsScore}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                  <div>{getStatusBadge(app.status)}</div>
                  {app.interviewDate && (
                    <div className="text-xs text-indigo-700 font-medium bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-xl">
                      📅 {app.interviewDate}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500 text-xs shadow-2xs">
              No job applications submitted yet. Browse jobs and use One-Click Apply to start!
            </div>
          )}
        </div>
      )}

      {/* TAB 2: INTERVIEW SCHEDULE */}
      {activeTab === 'interviews' && (
        <div className="space-y-4">
          {interviews.length > 0 ? (
            interviews.map(int => (
              <div
                key={int.id}
                className="bg-white border border-indigo-200 rounded-2xl p-5 shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs text-indigo-600 font-bold uppercase tracking-wider">
                      Upcoming Interview
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">{int.jobTitle}</h3>
                    <p className="text-xs text-slate-600">{int.employerName}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold">
                    {int.dateTime}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="font-semibold text-slate-500">Mode:</span> {int.mode}
                  </div>
                  {int.notes && (
                    <p className="text-slate-500 italic">"{int.notes}"</p>
                  )}
                </div>

                {int.locationOrLink && (
                  <a
                    href={int.locationOrLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                  >
                    <span>Join Meeting Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500 text-xs shadow-2xs">
              No scheduled interviews at this moment. Employers will notify you directly here.
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SAVED JOBS */}
      {activeTab === 'saved' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedJobs.length > 0 ? (
            savedJobs.map(job => (
              <div key={job.id} className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{job.title}</h3>
                  <p className="text-xs text-slate-500">{job.companyName} • {job.city}</p>
                  <p className="text-xs text-indigo-600 font-bold mt-1">
                    PKR {(job.salaryMin/1000).toFixed(0)}k - {(job.salaryMax/1000).toFixed(0)}k/mo
                  </p>
                </div>
                <button
                  onClick={() => onSelectJob(job)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
                >
                  View
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-2 bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500 text-xs shadow-2xs">
              No saved jobs yet. Click the bookmark icon on any job card to save it for later.
            </div>
          )}
        </div>
      )}

    </div>
  );
};
