import React, { useState } from 'react';
import { AIResumeAnalysis } from '../types';
import { Sparkles, CheckCircle2, AlertTriangle, FileText, ArrowRight, RefreshCw, Copy, Check } from 'lucide-react';
import { SAMPLE_SEEKER_RESUME } from '../data/mockData';

interface AiResumeAnalyzerProps {
  initialResumeText?: string;
  initialJobTitle?: string;
  initialJobDesc?: string;
}

export const AiResumeAnalyzer: React.FC<AiResumeAnalyzerProps> = ({
  initialResumeText,
  initialJobTitle,
  initialJobDesc
}) => {
  const [resumeText, setResumeText] = useState(
    initialResumeText || `Hamza Chaudhry
Senior Full-Stack Engineer (React, Node.js, TypeScript)
Lahore, Pakistan | hamza.dev@gmail.com | +92 300 1234567

SUMMARY:
Results-driven Full-Stack Engineer with 5+ years building high-traffic web applications in React and Node.js. Experienced in microfrontends, PostgreSQL, Docker, and REST APIs.

SKILLS:
React.js, Node.js, Express, TypeScript, Tailwind CSS, PostgreSQL, Docker, REST APIs, Git

EXPERIENCE:
Senior Software Engineer - Techlogix Pakistan (2023 - Present)
- Led team of 4 engineers building React & Node.js microservices for regional fintech handling 50k daily active users in PKR.
- Optimized PostgreSQL database query response time by 35%.`
  );

  const [targetJobTitle, setTargetJobTitle] = useState(initialJobTitle || 'Senior React / Node.js Engineer');
  const [targetDescription, setTargetDescription] = useState(initialJobDesc || 'Looking for Senior Full Stack Engineer with strong React, Node.js, TypeScript, PostgreSQL, and AWS experience in Lahore.');
  
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AIResumeAnalysis | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/ai/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          targetJobTitle,
          targetDescription
        })
      });
      const data = await res.json();
      if (data.success && data.analysis) {
        setAnalysis(data.analysis);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyBullet = (bullet: string, idx: number) => {
    navigator.clipboard.writeText(bullet);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* TITLE BANNER */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>POWERED BY GEMINI 3.6 FLASH</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">AI Resume Analyzer & ATS Optimizer</h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Check how well your CV matches target Pakistani jobs. Get an instant ATS compatibility score, missing skill keywords, and bullet point improvements.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: INPUT FORM */}
        <div className="lg:col-span-6 space-y-6">
          <form onSubmit={handleAnalyze} className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" /> Resume & Target Position Inputs
            </h2>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Target Job Title</label>
              <input
                type="text"
                value={targetJobTitle}
                onChange={(e) => setTargetJobTitle(e.target.value)}
                placeholder="e.g. Senior React Developer, Lead DevOps"
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Target Job Description (Optional)</label>
              <textarea
                rows={3}
                value={targetDescription}
                onChange={(e) => setTargetDescription(e.target.value)}
                placeholder="Paste key responsibilities & skills from the job post..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Candidate Resume / CV Text *</label>
              <textarea
                rows={10}
                required
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste full text of your CV here..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 text-indigo-200 animate-spin" />
                  <span>Gemini 3.6 Flash Analyzing Resume...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-indigo-200" />
                  <span>Run AI ATS Evaluation</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: ANALYSIS OUTPUT */}
        <div className="lg:col-span-6 space-y-6">
          {analysis ? (
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs space-y-6">
              
              {/* ATS SCORE GAUGE CARD */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">ATS Compatibility Score</span>
                  <div className="text-3xl font-extrabold text-slate-900 mt-1">
                    {analysis.atsScore}<span className="text-indigo-600 text-lg">/100</span>
                  </div>
                  <span className="inline-block mt-2 px-3 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold">
                    Rating: {analysis.overallRating}
                  </span>
                </div>

                <div className="w-20 h-20 rounded-full border-4 border-indigo-600 flex items-center justify-center bg-indigo-50 text-indigo-700 font-extrabold text-xl shadow-xs">
                  {analysis.atsScore}%
                </div>
              </div>

              {/* FEEDBACK SUMMARY */}
              <div>
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Executive Summary</h3>
                <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed">
                  {analysis.summaryFeedback}
                </p>
              </div>

              {/* MISSING KEYWORDS */}
              <div>
                <h3 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Essential Missing Skills / Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingKeywords.map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-mono font-medium">
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* STRENGTHS */}
              <div>
                <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Profile Strengths
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {analysis.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-emerald-600 mt-0.5">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SUGGESTED BULLETS TO COPY */}
              <div>
                <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> AI-Recommended Impact Bullet Points
                </h3>
                <div className="space-y-2">
                  {analysis.suggestedBullets.map((bullet, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start justify-between gap-3">
                      <p className="italic">"{bullet}"</p>
                      <button
                        onClick={() => handleCopyBullet(bullet, idx)}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-indigo-600 text-[11px] font-semibold flex items-center gap-1 flex-shrink-0"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white border border-slate-200/90 rounded-3xl p-12 text-center text-slate-500 text-xs shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 mx-auto flex items-center justify-center text-indigo-600">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Ready for AI Analysis</h3>
              <p className="max-w-xs mx-auto text-slate-500">
                Paste your resume text on the left and click "Run AI ATS Evaluation" to get your match score.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
