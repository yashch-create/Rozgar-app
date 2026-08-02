import React, { useState } from 'react';
import { Job, JobApplication, Company } from '../types';
import {
  Building2,
  PlusCircle,
  Users,
  Sparkles,
  Calendar,
  CheckCircle2,
  XCircle,
  Send,
  FileText,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';
import { PAKISTAN_CITIES, JOB_CATEGORIES } from '../data/mockData';

interface EmployerDashboardProps {
  company: Company;
  jobs: Job[];
  applications: JobApplication[];
  onPostNewJob: (jobData: any) => Promise<void>;
  onUpdateAppStatus: (appId: string, status: JobApplication['status'], interviewDate?: string, interviewNotes?: string) => Promise<void>;
  onGenerateAiJobDescription: (params: { jobTitle: string; category: string; city: string; experienceLevel: string; keyPoints: string }) => Promise<any>;
}

export const EmployerDashboard: React.FC<EmployerDashboardProps> = ({
  company,
  jobs,
  applications,
  onPostNewJob,
  onUpdateAppStatus,
  onGenerateAiJobDescription
}) => {
  const [activeTab, setActiveTab] = useState<'applicants' | 'post-job' | 'active-jobs'>('applicants');

  // Filter Applicants
  const [selectedJobIdFilter, setSelectedJobIdFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Schedule Interview State
  const [schedulingApp, setSchedulingApp] = useState<JobApplication | null>(null);
  const [interviewDate, setInterviewDate] = useState('2026-08-05 11:00 AM PKT');
  const [interviewNotes, setInterviewNotes] = useState('Technical interview via Google Meet with Senior Engineering Manager.');

  // Post Job State & AI Generator
  const [jobTitle, setJobTitle] = useState('');
  const [city, setCity] = useState('Lahore');
  const [category, setCategory] = useState('Information Technology');
  const [locationType, setLocationType] = useState<'On-site' | 'Hybrid' | 'Remote'>('Hybrid');
  const [jobType, setJobType] = useState<'Full-time' | 'Part-time' | 'Contract' | 'Internship'>('Full-time');
  const [experienceLevel, setExperienceLevel] = useState<'Entry Level' | 'Mid Level' | 'Senior Level' | 'Executive'>('Mid Level');
  const [salaryMin, setSalaryMin] = useState(200000);
  const [salaryMax, setSalaryMax] = useState(350000);
  const [description, setDescription] = useState('');
  const [responsibilitiesText, setResponsibilitiesText] = useState('');
  const [requirementsText, setRequirementsText] = useState('');
  const [skillsText, setSkillsText] = useState('React, TypeScript, Node.js, Express');
  const [keyAiPoints, setKeyAiPoints] = useState('');
  const [generatingAiJd, setGeneratingAiJd] = useState(false);
  const [postingJob, setPostingJob] = useState(false);

  // Filtered Applications
  const filteredApplications = applications.filter(app => {
    if (selectedJobIdFilter !== 'all' && app.jobId !== selectedJobIdFilter) return false;
    if (statusFilter !== 'all' && app.status !== statusFilter) return false;
    return true;
  });

  // Handle AI JD Generator Call
  const handleAiJdGenerate = async () => {
    if (!jobTitle) {
      alert('Please enter a Job Title first');
      return;
    }
    setGeneratingAiJd(true);
    try {
      const generated = await onGenerateAiJobDescription({
        jobTitle,
        category,
        city,
        experienceLevel,
        keyPoints: keyAiPoints
      });
      if (generated) {
        if (generated.description) setDescription(generated.description);
        if (generated.responsibilities) setResponsibilitiesText(generated.responsibilities.join('\n'));
        if (generated.requirements) setRequirementsText(generated.requirements.join('\n'));
        if (generated.skills) setSkillsText(generated.skills.join(', '));
        if (generated.suggestedSalaryMin) setSalaryMin(generated.suggestedSalaryMin);
        if (generated.suggestedSalaryMax) setSalaryMax(generated.suggestedSalaryMax);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingAiJd(false);
    }
  };

  // Submit Job Post
  const handlePostJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPostingJob(true);
    try {
      await onPostNewJob({
        title: jobTitle,
        companyName: company.name,
        companyLogo: company.logo,
        city,
        locationType,
        jobType,
        category,
        salaryMin,
        salaryMax,
        experienceLevel,
        description,
        responsibilities: responsibilitiesText.split('\n').filter(Boolean),
        requirements: requirementsText.split('\n').filter(Boolean),
        skills: skillsText.split(',').map(s => s.trim()).filter(Boolean),
        benefits: ['Medical Insurance', 'Provident Fund', 'Annual Bonus']
      });
      alert('Job successfully posted!');
      setJobTitle('');
      setDescription('');
      setActiveTab('active-jobs');
    } catch (err) {
      alert('Failed to post job.');
    } finally {
      setPostingJob(false);
    }
  };

  const handleConfirmInterview = async () => {
    if (!schedulingApp) return;
    await onUpdateAppStatus(schedulingApp.id, 'Interview Scheduled', interviewDate, interviewNotes);
    setSchedulingApp(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* COMPANY HERO BANNER */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={company.logo}
            alt={company.name}
            className="w-16 h-16 rounded-2xl object-cover bg-slate-50 border border-slate-200 p-1"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">{company.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-indigo-600" /> Verified Employer
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{company.industry} • {company.city}, Pakistan</p>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
              <span>{jobs.length} Active Jobs</span>
              <span>•</span>
              <span>{applications.length} Total Applicants</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('post-job')}
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Job Position</span>
        </button>
      </div>

      {/* DASHBOARD NAVIGATION TABS */}
      <div className="flex border-b border-slate-200 text-sm font-semibold gap-6">
        <button
          onClick={() => setActiveTab('applicants')}
          className={`pb-3 transition-all flex items-center gap-2 ${
            activeTab === 'applicants'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" /> Applicant Tracking Pipeline ({applications.length})
        </button>

        <button
          onClick={() => setActiveTab('post-job')}
          className={`pb-3 transition-all flex items-center gap-2 ${
            activeTab === 'post-job'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <PlusCircle className="w-4 h-4" /> Post a Job (AI JD Generator)
        </button>

        <button
          onClick={() => setActiveTab('active-jobs')}
          className={`pb-3 transition-all flex items-center gap-2 ${
            activeTab === 'active-jobs'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" /> Posted Jobs ({jobs.length})
        </button>
      </div>

      {/* TAB 1: APPLICANT TRACKING PIPELINE */}
      {activeTab === 'applicants' && (
        <div className="space-y-6">
          
          {/* FILTER BAR */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-indigo-600" />
              <select
                value={selectedJobIdFilter}
                onChange={(e) => setSelectedJobIdFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl p-2 focus:border-indigo-500 focus:bg-white focus:outline-none"
              >
                <option value="all">All Posted Positions ({jobs.length})</option>
                {jobs.map(j => (
                  <option key={j.id} value={j.id}>{j.title}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-500">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl p-2 focus:border-indigo-500 focus:bg-white focus:outline-none"
              >
                <option value="all">All Stages</option>
                <option value="Submitted">Submitted</option>
                <option value="Screening">Screening</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Offer Extended">Offer Extended</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* CANDIDATE CARDS */}
          {filteredApplications.length > 0 ? (
            <div className="space-y-4">
              {filteredApplications.map(app => (
                <div
                  key={app.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900">{app.seekerName}</h3>
                        <span className="text-xs text-slate-500">({app.seekerCity})</span>
                        {app.atsScore && (
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold">
                            ATS Score: {app.atsScore}%
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-indigo-600 font-semibold mt-0.5">Applied for: {app.jobTitle}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        Email: {app.seekerEmail} • Phone: {app.seekerPhone}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                        Stage: {app.status}
                      </span>
                    </div>
                  </div>

                  {app.coverNote && (
                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 italic">
                      "{app.coverNote}"
                    </p>
                  )}

                  {/* STAGE ACTION CONTROLS */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-400">Applied on {app.appliedDate}</span>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => onUpdateAppStatus(app.id, 'Screening')}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium"
                      >
                        Shortlist
                      </button>

                      <button
                        onClick={() => setSchedulingApp(app)}
                        className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1 shadow-xs"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Schedule Interview</span>
                      </button>

                      <button
                        onClick={() => onUpdateAppStatus(app.id, 'Offer Extended')}
                        className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-medium border border-purple-200"
                      >
                        Extend Offer
                      </button>

                      <button
                        onClick={() => onUpdateAppStatus(app.id, 'Rejected')}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium border border-slate-200"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-500 text-xs shadow-2xs">
              No applicant profiles match the selected filter.
            </div>
          )}

        </div>
      )}

      {/* TAB 2: POST JOB WIZARD WITH AI GENERATOR */}
      {activeTab === 'post-job' && (
        <form onSubmit={handlePostJobSubmit} className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-indigo-600" /> Create New Job Posting
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Use Gemini AI to instantly draft professional job responsibilities & requirements</p>
            </div>

            <button
              type="button"
              onClick={handleAiJdGenerate}
              disabled={generatingAiJd}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 disabled:opacity-50 transition-all"
            >
              <Sparkles className="w-4 h-4 text-indigo-200 animate-pulse" />
              <span>{generatingAiJd ? 'Gemini AI Writing JD...' : 'Generate JD with AI'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Job Title *</label>
              <input
                type="text"
                required
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Full Stack Engineer, Finance Manager"
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">City in Pakistan</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
              >
                {PAKISTAN_CITIES.filter(c => c !== 'All Cities').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
              >
                {JOB_CATEGORIES.filter(c => c !== 'All Categories').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Work Setup</label>
              <select
                value={locationType}
                onChange={(e) => setLocationType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
              >
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Job Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
              >
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
                <option value="Executive">Executive</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Min Monthly Salary (PKR)</label>
              <input
                type="number"
                value={salaryMin}
                onChange={(e) => setSalaryMin(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Max Monthly Salary (PKR)</label>
              <input
                type="number"
                value={salaryMax}
                onChange={(e) => setSalaryMax(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Job Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the role overview..."
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Responsibilities (One per line)</label>
              <textarea
                rows={5}
                value={responsibilitiesText}
                onChange={(e) => setResponsibilitiesText(e.target.value)}
                placeholder="Architect REST APIs&#10;Mentor junior devs"
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Requirements (One per line)</label>
              <textarea
                rows={5}
                value={requirementsText}
                onChange={(e) => setRequirementsText(e.target.value)}
                placeholder="BSCS degree from FAST/NUST/LUMS&#10;3+ years in React"
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={postingJob}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all"
            >
              {postingJob ? 'Posting Position...' : 'Publish Job Listing'}
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: POSTED JOBS LIST */}
      {activeTab === 'active-jobs' && (
        <div className="space-y-4">
          {jobs.map(j => (
            <div key={j.id} className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">{j.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{j.city} • {j.jobType} • PKR {(j.salaryMin/1000).toFixed(0)}k - {(j.salaryMax/1000).toFixed(0)}k/mo</p>
                <span className="text-[11px] text-indigo-600 font-medium mt-1 block">
                  {j.applicantsCount} Applicants Received
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold">
                Active
              </span>
            </div>
          ))}
        </div>
      )}

      {/* SCHEDULE INTERVIEW MODAL */}
      {schedulingApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-slate-800">
            <h3 className="text-base font-bold text-slate-900">Schedule Interview for {schedulingApp.seekerName}</h3>
            
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Date & Time (PKT)</label>
              <input
                type="text"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Interview Instructions / Notes</label>
              <textarea
                rows={3}
                value={interviewNotes}
                onChange={(e) => setInterviewNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSchedulingApp(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmInterview}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
              >
                Confirm & Notify Candidate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
