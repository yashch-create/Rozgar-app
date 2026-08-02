import React, { useState } from 'react';
import {
  Briefcase,
  UserCheck,
  Building2,
  FileText,
  Sparkles,
  ShieldAlert,
  Bell,
  CheckCircle2,
  Code2,
  Menu,
  X,
  CreditCard,
  BookOpen,
  LogOut,
  SlidersHorizontal,
  Search
} from 'lucide-react';
import { User, UserRole, NotificationItem } from '../types';

interface NavbarProps {
  currentUser: User;
  onRoleChange: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notifications: NotificationItem[];
  onOpenPricing: () => void;
  onOpenDocs: () => void;
  onOpenAiAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onRoleChange,
  activeTab,
  setActiveTab,
  notifications,
  onOpenPricing,
  onOpenDocs,
  onOpenAiAssistant
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);
  const unreadNotifs = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('jobs')}>
            <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white p-2.5 shadow-xs shadow-indigo-200 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-display">
                  ROZGAR<span className="text-indigo-600">.PK</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-full uppercase">
                  Pakistan
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Pakistan's Premier Career Network</p>
            </div>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'jobs'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              Find Jobs
            </button>

            <button
              onClick={() => setActiveTab('ai-screener')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'ai-screener'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-xs'
                  : 'text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              AI Resume Analyzer
            </button>

            <button
              onClick={() => setActiveTab('resume-builder')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'resume-builder'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              CV Builder
            </button>

            {currentUser.role === 'seeker' && (
              <button
                onClick={() => setActiveTab('seeker-dashboard')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                  activeTab === 'seeker-dashboard'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                My Applications
              </button>
            )}

            {(currentUser.role === 'employer' || currentUser.role === 'admin') && (
              <button
                onClick={() => setActiveTab('employer-dashboard')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                  activeTab === 'employer-dashboard'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                Employer Portal
              </button>
            )}

            {currentUser.role === 'admin' && (
              <button
                onClick={() => setActiveTab('admin-dashboard')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                  activeTab === 'admin-dashboard'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-amber-700 hover:bg-amber-50'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                Admin Panel
              </button>
            )}

            <button
              onClick={() => setActiveTab('blogs')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'blogs'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Blogs
            </button>
          </nav>

          {/* RIGHT ACTION CONTROLS */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* AI Assistant Floating Button */}
            <button
              onClick={onOpenAiAssistant}
              className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200/80 hover:bg-indigo-100 transition-all flex items-center gap-2 text-xs font-semibold"
              title="Ask Rozgar AI Assistant"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Ask AI</span>
            </button>

            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setNotifDrawerOpen(!notifDrawerOpen)}
                className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200 transition-all relative"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    {unreadNotifs}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {notifDrawerOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 text-slate-800">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <Bell className="w-3.5 h-3.5 text-indigo-600" /> Notifications
                    </span>
                    <span className="text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100 font-medium">
                      {notifications.length} Recent
                    </span>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto mt-3 pr-1">
                    {notifications.map(n => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                        <div className="font-semibold text-slate-900">{n.title}</div>
                        <p className="text-slate-600 text-[11px] mt-0.5 line-clamp-2">{n.message}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pricing / Employer Upgrade Button */}
            <button
              onClick={onOpenPricing}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-all text-xs font-semibold flex items-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              <span>Plans (PKR)</span>
            </button>

            {/* Docs & Schema Button */}
            <button
              onClick={onOpenDocs}
              className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-all text-xs font-semibold flex items-center gap-1.5"
            >
              <Code2 className="w-3.5 h-3.5 text-slate-600" />
              <span>API & DB Docs</span>
            </button>

            {/* ROLE SELECTOR SWITCHER */}
            <div className="pl-2 border-l border-slate-200 flex items-center gap-2">
              <select
                value={currentUser.role}
                onChange={(e) => onRoleChange(e.target.value as UserRole)}
                className="bg-white border border-slate-300 text-slate-800 text-xs font-medium rounded-xl px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="seeker">👤 Job Seeker Mode</option>
                <option value="employer">🏢 Employer Mode</option>
                <option value="admin">🛡️ Platform Admin</option>
              </select>
            </div>

          </div>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 py-5 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-400">Select Mode:</span>
            <select
              value={currentUser.role}
              onChange={(e) => {
                onRoleChange(e.target.value as UserRole);
                setMobileMenuOpen(false);
              }}
              className="bg-slate-900 border border-emerald-800 text-emerald-300 text-xs font-medium rounded-lg px-2.5 py-1.5"
            >
              <option value="seeker">Job Seeker</option>
              <option value="employer">Employer</option>
              <option value="admin">Platform Admin</option>
            </select>
          </div>

          <button
            onClick={() => { setActiveTab('jobs'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900 flex items-center gap-2"
          >
            <Search className="w-4 h-4 text-emerald-400" /> Find Jobs
          </button>
          <button
            onClick={() => { setActiveTab('ai-screener'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-emerald-300 hover:bg-slate-900 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" /> AI Resume Analyzer
          </button>
          <button
            onClick={() => { setActiveTab('resume-builder'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900 flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-emerald-400" /> CV Builder
          </button>
          <button
            onClick={() => { setActiveTab('seeker-dashboard'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900 flex items-center gap-2"
          >
            <UserCheck className="w-4 h-4 text-emerald-400" /> Seeker Dashboard
          </button>
          <button
            onClick={() => { setActiveTab('employer-dashboard'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900 flex items-center gap-2"
          >
            <Building2 className="w-4 h-4 text-emerald-400" /> Employer Dashboard
          </button>
          <button
            onClick={() => { onOpenPricing(); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900 flex items-center gap-2"
          >
            <CreditCard className="w-4 h-4 text-emerald-400" /> Pricing Plans (JazzCash)
          </button>
          <button
            onClick={() => { onOpenDocs(); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900 flex items-center gap-2"
          >
            <Code2 className="w-4 h-4 text-emerald-400" /> API & DB Schema
          </button>
        </div>
      )}
    </header>
  );
};
