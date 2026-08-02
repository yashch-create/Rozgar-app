import React, { useState } from 'react';
import { X, Code2, Copy, Check, Terminal, Database, Server } from 'lucide-react';
import { MYSQL_SCHEMA_DDL, DOCKER_COMPOSE_YML } from '../data/mockData';

interface DocsAndSchemaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocsAndSchemaModal: React.FC<DocsAndSchemaModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'api' | 'mysql' | 'docker'>('api');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200/90 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden text-slate-800 my-8 flex flex-col max-h-[85vh]">
        
        {/* HEADER */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Full-Stack Architecture & API Docs</h2>
              <p className="text-xs text-slate-500">REST API specification, production MySQL DDL schema, and Docker Compose</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TAB BUTTONS */}
        <div className="bg-slate-50 px-6 py-2 border-b border-slate-200 flex gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('api')}
            className={`pb-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'api' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Server className="w-3.5 h-3.5" /> REST API Endpoints
          </button>

          <button
            onClick={() => setActiveTab('mysql')}
            className={`pb-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'mysql' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" /> MySQL DDL Schema
          </button>

          <button
            onClick={() => setActiveTab('docker')}
            className={`pb-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'docker' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" /> Docker Compose
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="p-6 overflow-y-auto flex-1 text-xs space-y-4">
          
          {activeTab === 'api' && (
            <div className="space-y-3 font-mono">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold mr-2">POST</span>
                <span className="text-slate-900 font-bold">/api/ai/analyze-resume</span>
                <p className="text-slate-600 font-sans mt-1">Evaluates candidate resume against target role with Gemini 3.6 Flash and returns ATS score 0-100%.</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold mr-2">POST</span>
                <span className="text-slate-900 font-bold">/api/ai/generate-jd</span>
                <p className="text-slate-600 font-sans mt-1">Generates professional job responsibilities & salary benchmarks in PKR for Pakistani employers.</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold mr-2">GET</span>
                <span className="text-slate-900 font-bold">/api/jobs</span>
                <p className="text-slate-600 font-sans mt-1">Fetches active job listings filtered by city, category, job type, and salary range in PKR.</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold mr-2">POST</span>
                <span className="text-slate-900 font-bold">/api/applications</span>
                <p className="text-slate-600 font-sans mt-1">Submits candidate application and adds profile to employer ATS pipeline.</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold mr-2">POST</span>
                <span className="text-slate-900 font-bold">/api/subscriptions/pay</span>
                <p className="text-slate-600 font-sans mt-1">Processes JazzCash / Easypaisa employer plan upgrades.</p>
              </div>
            </div>
          )}

          {activeTab === 'mysql' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-500 font-semibold text-[11px]">Production InnoDB MySQL Table Definitions</span>
                <button
                  onClick={() => handleCopy(MYSQL_SCHEMA_DDL, 'mysql')}
                  className="px-3 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-indigo-600 text-[11px] font-semibold flex items-center gap-1 shadow-2xs"
                >
                  {copiedCode === 'mysql' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'mysql' ? 'Copied SQL!' : 'Copy SQL'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-800 font-mono text-[11px] overflow-x-auto leading-relaxed">
                {MYSQL_SCHEMA_DDL}
              </pre>
            </div>
          )}

          {activeTab === 'docker' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-500 font-semibold text-[11px]">Docker Compose Configuration (App + MySQL)</span>
                <button
                  onClick={() => handleCopy(DOCKER_COMPOSE_YML, 'docker')}
                  className="px-3 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-indigo-600 text-[11px] font-semibold flex items-center gap-1 shadow-2xs"
                >
                  {copiedCode === 'docker' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'docker' ? 'Copied YML!' : 'Copy YML'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-800 font-mono text-[11px] overflow-x-auto leading-relaxed">
                {DOCKER_COMPOSE_YML}
              </pre>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
