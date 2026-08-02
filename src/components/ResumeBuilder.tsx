import React, { useState } from 'react';
import { SAMPLE_SEEKER_RESUME } from '../data/mockData';
import { ResumeData } from '../types';
import { FileText, Sparkles, Download, Plus, Trash2, CheckCircle2, User, Mail, Phone, MapPin, Briefcase, GraduationCap } from 'lucide-react';

interface ResumeBuilderProps {
  onAnalyzeResume: (resumeText: string) => void;
}

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ onAnalyzeResume }) => {
  const [resume, setResume] = useState<ResumeData>(SAMPLE_SEEKER_RESUME);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !resume.skills.includes(newSkill.trim())) {
      setResume({ ...resume, skills: [...resume.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setResume({ ...resume, skills: resume.skills.filter(s => s !== skillToRemove) });
  };

  const generateFullResumeText = () => {
    return `
${resume.fullName}
${resume.email} | ${resume.phone} | ${resume.city}
${resume.headline}

SUMMARY:
${resume.summary}

SKILLS:
${resume.skills.join(', ')}

EXPERIENCE:
${resume.experience.map(e => `${e.title} at ${e.company} (${e.period})\n- ${e.description}`).join('\n\n')}

EDUCATION:
${resume.education.map(ed => `${ed.degree} - ${ed.institution} (${ed.year})`).join('\n')}

PROJECTS:
${resume.projects.map(p => `${p.title}: ${p.description}`).join('\n')}
`.trim();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* PAGE TITLE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-4 h-4" /> Professional CV Generator
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Interactive Resume Builder</h1>
          <p className="text-xs text-slate-500 mt-0.5">Craft an ATS-optimized CV formatted for top Pakistani & international employers</p>
        </div>

        <button
          onClick={() => onAnalyzeResume(generateFullResumeText())}
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all"
        >
          <Sparkles className="w-4 h-4 text-indigo-200" />
          <span>Analyze CV with Gemini AI</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: EDIT FORM */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* PERSONAL INFO */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-600" /> Personal Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={resume.fullName}
                  onChange={(e) => setResume({ ...resume, fullName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Email</label>
                <input
                  type="email"
                  value={resume.email}
                  onChange={(e) => setResume({ ...resume, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Phone (+92)</label>
                <input
                  type="text"
                  value={resume.phone}
                  onChange={(e) => setResume({ ...resume, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">City, Pakistan</label>
                <input
                  type="text"
                  value={resume.city}
                  onChange={(e) => setResume({ ...resume, city: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Headline</label>
              <input
                type="text"
                value={resume.headline}
                onChange={(e) => setResume({ ...resume, headline: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Professional Summary</label>
              <textarea
                rows={3}
                value={resume.summary}
                onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* SKILLS */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900">Skills & Competencies</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add skill (e.g. React, Docker, Python)..."
                className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {resume.skills.map(s => (
                <span key={s} className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-xs flex items-center gap-1.5 font-mono">
                  <span>{s}</span>
                  <button onClick={() => handleRemoveSkill(s)} className="text-slate-400 hover:text-red-600">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: LIVE RESUME PREVIEW (A4 DOCUMENT STYLE) */}
        <div className="lg:col-span-6">
          <div className="sticky top-28 bg-white text-slate-900 rounded-3xl p-8 shadow-md space-y-6 font-sans text-xs border border-slate-200">
            
            {/* HEADER */}
            <div className="border-b-2 border-indigo-600 pb-4">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{resume.fullName || 'Your Name'}</h1>
              <p className="text-indigo-700 font-semibold text-sm mt-0.5">{resume.headline || 'Software Engineer'}</p>
              <div className="flex flex-wrap items-center gap-3 text-slate-600 text-[11px] mt-2 font-medium">
                <span>✉️ {resume.email}</span>
                <span>•</span>
                <span>📞 {resume.phone}</span>
                <span>•</span>
                <span>📍 {resume.city}</span>
              </div>
            </div>

            {/* SUMMARY */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-800 mb-1">
                Professional Profile
              </h2>
              <p className="text-slate-700 leading-relaxed text-[11px]">{resume.summary}</p>
            </div>

            {/* SKILLS */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-800 mb-1.5">
                Technical Expertise
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {resume.skills.map(s => (
                  <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded border border-slate-300 text-[10px] font-mono font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* EXPERIENCE */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-800 mb-2">
                Work Experience
              </h2>
              <div className="space-y-3">
                {resume.experience.map((exp, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex items-center justify-between font-bold text-slate-900 text-xs">
                      <span>{exp.title} — <span className="text-indigo-700">{exp.company}</span></span>
                      <span className="text-slate-500 text-[10px]">{exp.period}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* EDUCATION */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-800 mb-2">
                Education
              </h2>
              {resume.education.map((ed, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px] font-medium text-slate-800">
                  <span>{ed.degree} — <span className="text-slate-600">{ed.institution}</span></span>
                  <span className="text-slate-500 text-[10px]">{ed.year}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
