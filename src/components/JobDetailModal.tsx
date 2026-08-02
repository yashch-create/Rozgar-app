import React, { useState } from 'react';
import { X, MapPin, Building2, Calendar, ShieldCheck, DollarSign, CheckCircle2, Send, Sparkles, AlertCircle, FileText } from 'lucide-react';
import { Job } from '../types';

interface JobDetailModalProps {
  job: Job | null;
  onClose: () => void;
  onSubmitApplication: (applicationData: {
    jobId: string;
    seekerName: string;
    seekerEmail: string;
    seekerPhone: string;
    seekerCity: string;
    coverNote: string;
    resumeText: string;
  }) => Promise<void>;
  onAnalyzeResumeWithAi: (resumeText: string, jobTitle: string, jobDesc: string) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  onClose,
  onSubmitApplication,
  onAnalyzeResumeWithAi
}) => {
  if (!job) return null;

  const [isApplying, setIsApplying] = useState(false);
  const [seekerName, setSeekerName] = useState('Hamza Chaudhry');
  const [seekerEmail, setSeekerEmail] = useState('hamza.dev@gmail.com');
  const [seekerPhone, setSeekerPhone] = useState('+92 300 1234567');
  const [seekerCity, setSeekerCity] = useState(job.city || 'Lahore');
  const [coverNote, setCoverNote] = useState(`I am highly interested in the ${job.title} position at ${job.companyName}. With my experience in relevant technology stacks, I am confident I can contribute effectively.`);
  const [resumeText, setResumeText] = useState('Experienced Full Stack Developer proficient in React, Node.js, TypeScript, PostgreSQL, REST APIs, and Docker.');
  const [submitting, setSubmitting] = useState(false);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmitApplication({
        jobId: job.id,
        seekerName,
        seekerEmail,
        seekerPhone,
        seekerCity,
        coverNote,
        resumeText
      });
      setSubmitting(false);
      setAppliedSuccess(true);
      setTimeout(() => {
        setAppliedSuccess(false);
        setIsApplying(false);
        onClose();
      }, 1800);
    } catch (err) {
      setSubmitting(false);
    }
  };

  const formattedMinSalary = (job.salaryMin / 1000).toFixed(0);
  const formattedMaxSalary = (job.salaryMax / 1000).toFixed(0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden my-8 text-slate-800 relative max-h-[90vh] flex flex-col">
        
        {/* MODAL HEADER */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="w-14 h-14 rounded-2xl object-cover bg-white border border-slate-200 p-1"
            />
            <div>
              <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold">
                <span>{job.companyName}</span>
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{job.category}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">{job.title}</h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600" /> {job.city} ({job.locationType})
                </span>
                <span>•</span>
                <span>{job.jobType}</span>
                <span>•</span>
                <span className="text-indigo-600 font-bold">
                  PKR {formattedMinSalary}k - {formattedMaxSalary}k / month
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          
          {appliedSuccess ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Application Submitted!</h3>
              <p className="text-slate-600 max-w-sm mx-auto">
                Your application and CV profile have been transmitted to <span className="text-indigo-600 font-semibold">{job.companyName}</span>.
              </p>
            </div>
          ) : isApplying ? (
            /* APPLICATION FORM VIEW */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-indigo-50 border border-indigo-200 p-3.5 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span className="text-indigo-900">Applying as <strong className="text-indigo-950">{seekerName}</strong></span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsApplying(false)}
                  className="text-slate-500 hover:text-slate-900 underline text-[11px]"
                >
                  Back to Job Specs
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={seekerName}
                    onChange={(e) => setSeekerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={seekerEmail}
                    onChange={(e) => setSeekerEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Mobile / WhatsApp (+92)</label>
                  <input
                    type="text"
                    required
                    value={seekerPhone}
                    onChange={(e) => setSeekerPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Current City</label>
                  <input
                    type="text"
                    required
                    value={seekerCity}
                    onChange={(e) => setSeekerCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Cover Letter / Note</label>
                <textarea
                  rows={3}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-indigo-600" /> Resume / Skill Summary
                  </label>
                  <button
                    type="button"
                    onClick={() => onAnalyzeResumeWithAi(resumeText, job.title, job.description)}
                    className="text-[11px] text-indigo-600 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Sparkles className="w-3 h-3 text-indigo-600" /> Test with Gemini AI ATS
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your CV text or summary highlights here..."
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none font-mono"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsApplying(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-2 shadow-xs disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Submitting Application...' : 'Submit Application'}</span>
                </button>
              </div>
            </form>
          ) : (
            /* DEFAULT JOB SPECS VIEW */
            <>
              {/* DESCRIPTION */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">Job Overview</h3>
                <p className="text-slate-600 leading-relaxed">{job.description}</p>
              </div>

              {/* RESPONSIBILITIES */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">Key Responsibilities</h3>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside pl-1">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="leading-relaxed">{resp}</li>
                  ))}
                </ul>
              </div>

              {/* REQUIREMENTS */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">Requirements & Qualifications</h3>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside pl-1">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="leading-relaxed">{req}</li>
                  ))}
                </ul>
              </div>

              {/* REQUIRED SKILLS */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200/80 text-xs font-mono font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* BENEFITS */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">Benefits & Perks</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {job.benefits.map((b, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-slate-700 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>

        {/* MODAL FOOTER */}
        {!isApplying && !appliedSuccess && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={() => onAnalyzeResumeWithAi(resumeText, job.title, job.description)}
              className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200/80 hover:bg-indigo-100 text-xs font-semibold flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>AI Match Analysis</span>
            </button>

            <button
              onClick={() => setIsApplying(true)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center gap-2"
            >
              <span>One-Click Apply</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
