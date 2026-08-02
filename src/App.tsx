import React, { useState, useEffect } from 'react';
import { User, Job, JobApplication, Company, UserRole, FilterState, NotificationItem, InterviewSchedule } from './types';
import { INITIAL_USERS, INITIAL_JOBS, INITIAL_COMPANIES, INITIAL_APPLICATIONS, INITIAL_NOTIFICATIONS, BLOG_POSTS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { JobList } from './components/JobList';
import { JobDetailModal } from './components/JobDetailModal';
import { SeekerDashboard } from './components/SeekerDashboard';
import { EmployerDashboard } from './components/EmployerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ResumeBuilder } from './components/ResumeBuilder';
import { AiResumeAnalyzer } from './components/AiResumeAnalyzer';
import { AiCareerAssistantModal } from './components/AiCareerAssistantModal';
import { PricingModal } from './components/PricingModal';
import { DocsAndSchemaModal } from './components/DocsAndSchemaModal';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]);
  const [activeTab, setActiveTab] = useState<string>('jobs');
  
  // Data State
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [applications, setApplications] = useState<JobApplication[]>(INITIAL_APPLICATIONS);
  const [companies, setCompanies] = useState<Company[]>(INITIAL_COMPANIES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [interviews, setInterviews] = useState<InterviewSchedule[]>([
    {
      id: 'int-1',
      applicationId: 'app-1',
      jobTitle: 'Senior React / Node.js Engineer',
      candidateName: 'Hamza Chaudhry',
      candidateEmail: 'hamza.dev@gmail.com',
      employerName: 'Systems Limited',
      dateTime: '2026-08-05 11:00 AM PKT',
      mode: 'Video Call (Google Meet)',
      locationOrLink: 'https://meet.google.com/rozgar-tech-interview',
      status: 'Upcoming',
      notes: 'Technical discussion on React performance, Node.js microservices, and database tuning.'
    }
  ]);

  // Bookmarks
  const [bookmarkedJobIds, setBookmarkedJobIds] = useState<string[]>(['job-1', 'job-6']);

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    city: 'All Cities',
    category: 'All Categories',
    jobType: '',
    locationType: '',
    experienceLevel: '',
    salaryMin: 0
  });

  // Modal States
  const [selectedJobForModal, setSelectedJobForModal] = useState<Job | null>(null);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);

  // Preset params for AI Analyzer
  const [aiAnalyzerParams, setAiAnalyzerParams] = useState<{
    resumeText?: string;
    jobTitle?: string;
    jobDesc?: string;
  }>({});

  // Fetch initial data from REST API (server.ts)
  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.jobs) {
          setJobs(data.jobs);
        }
      })
      .catch(console.error);

    fetch('/api/applications', {
      headers: {
        'Authorization': `Bearer ${Buffer.from(JSON.stringify({ id: currentUser.id, email: currentUser.email, role: currentUser.role })).toString('base64')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.applications) {
          setApplications(data.applications);
        }
      })
      .catch(console.error);
  }, [currentUser]);

  // Filter Jobs Handler
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      city: 'All Cities',
      category: 'All Categories',
      jobType: '',
      locationType: '',
      experienceLevel: '',
      salaryMin: 0
    });
  };

  // Bookmark Toggle
  const handleToggleBookmark = (jobId: string) => {
    setBookmarkedJobIds(prev =>
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  // Role Switcher
  const handleRoleChange = (newRole: UserRole) => {
    const targetUser = INITIAL_USERS.find(u => u.role === newRole) || {
      ...currentUser,
      role: newRole
    };
    setCurrentUser(targetUser);

    if (newRole === 'seeker') setActiveTab('seeker-dashboard');
    else if (newRole === 'employer') setActiveTab('employer-dashboard');
    else if (newRole === 'admin') setActiveTab('admin-dashboard');
  };

  // Submit Job Application via API
  const handleSubmitApplication = async (appData: {
    jobId: string;
    seekerName: string;
    seekerEmail: string;
    seekerPhone: string;
    seekerCity: string;
    coverNote: string;
    resumeText: string;
  }) => {
    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appData)
    });
    const data = await res.json();
    if (data.success && data.application) {
      setApplications(prev => [data.application, ...prev]);
    }
  };

  // Update Application Status (Employer)
  const handleUpdateAppStatus = async (
    appId: string,
    status: JobApplication['status'],
    interviewDate?: string,
    interviewNotes?: string
  ) => {
    const res = await fetch(`/api/applications/${appId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, interviewDate, interviewNotes })
    });
    const data = await res.json();
    if (data.success && data.application) {
      setApplications(prev => prev.map(a => a.id === appId ? data.application : a));
      if (status === 'Interview Scheduled' && interviewDate) {
        setInterviews(prev => [
          {
            id: `int-${Date.now()}`,
            applicationId: appId,
            jobTitle: data.application.jobTitle,
            candidateName: data.application.seekerName,
            candidateEmail: data.application.seekerEmail,
            employerName: data.application.companyName,
            dateTime: interviewDate,
            mode: 'Video Call (Google Meet)',
            locationOrLink: 'https://meet.google.com/rozgar-interview-session',
            status: 'Upcoming',
            notes: interviewNotes || 'Interview scheduled via Rozgar ATS.'
          },
          ...prev
        ]);
      }
    }
  };

  // Post New Job (Employer)
  const handlePostNewJob = async (jobData: any) => {
    const token = Buffer.from(JSON.stringify({ id: currentUser.id, email: currentUser.email, role: 'employer' })).toString('base64');
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(jobData)
    });
    const data = await res.json();
    if (data.success && data.job) {
      setJobs(prev => [data.job, ...prev]);
    }
  };

  // AI JD Generator
  const handleGenerateAiJobDescription = async (params: any) => {
    const res = await fetch('/api/ai/generate-jd', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    const data = await res.json();
    return data.generatedJD || null;
  };

  // Payment Transaction (Employer Subscription)
  const handleSelectPlan = async (plan: any, paymentMethod: string, accountRef: string) => {
    await fetch('/api/subscriptions/pay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        planName: plan.name,
        amountPKR: plan.pricePKR,
        paymentMethod,
        accountNumberOrRef: accountRef,
        employerName: currentUser.name
      })
    });
  };

  // Open AI Analyzer with context
  const handleOpenAiAnalyzerWithContext = (resumeText?: string, jobTitle?: string, jobDesc?: string) => {
    setAiAnalyzerParams({
      resumeText,
      jobTitle,
      jobDesc
    });
    setSelectedJobForModal(null);
    setActiveTab('ai-screener');
  };

  // Filter Jobs Client Side
  const filteredJobs = jobs.filter(j => {
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const match =
        j.title.toLowerCase().includes(q) ||
        j.companyName.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q) ||
        j.skills.some(s => s.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (filters.city !== 'All Cities' && j.city.toLowerCase() !== filters.city.toLowerCase()) return false;
    if (filters.category !== 'All Categories' && j.category.toLowerCase() !== filters.category.toLowerCase()) return false;
    if (filters.locationType && j.locationType !== filters.locationType) return false;
    if (filters.experienceLevel && j.experienceLevel !== filters.experienceLevel) return false;
    if (filters.salaryMin > 0 && j.salaryMax < filters.salaryMin) return false;
    return true;
  });

  const savedJobsList = jobs.filter(j => bookmarkedJobIds.includes(j.id));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* NAVBAR */}
      <Navbar
        currentUser={currentUser}
        onRoleChange={handleRoleChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        notifications={notifications}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
      />

      {/* MAIN VIEW CONTENT */}
      <main>
        {activeTab === 'jobs' && (
          <>
            <HeroSection
              filters={filters}
              onFilterChange={handleFilterChange}
              onOpenAiScreener={() => setActiveTab('ai-screener')}
              onPostJob={() => {
                handleRoleChange('employer');
                setActiveTab('employer-dashboard');
              }}
              totalJobs={filteredJobs.length}
            />

            <JobList
              jobs={filteredJobs}
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              onSelectJob={(job) => setSelectedJobForModal(job)}
              onQuickApply={(job) => setSelectedJobForModal(job)}
              bookmarkedJobIds={bookmarkedJobIds}
              onToggleBookmark={handleToggleBookmark}
              onOpenAiScreener={() => setActiveTab('ai-screener')}
            />
          </>
        )}

        {activeTab === 'ai-screener' && (
          <AiResumeAnalyzer
            initialResumeText={aiAnalyzerParams.resumeText}
            initialJobTitle={aiAnalyzerParams.jobTitle}
            initialJobDesc={aiAnalyzerParams.jobDesc}
          />
        )}

        {activeTab === 'resume-builder' && (
          <ResumeBuilder
            onAnalyzeResume={(text) => handleOpenAiAnalyzerWithContext(text, 'Full Stack Software Engineer')}
          />
        )}

        {activeTab === 'seeker-dashboard' && (
          <SeekerDashboard
            currentUser={currentUser}
            applications={applications}
            interviews={interviews}
            savedJobs={savedJobsList}
            onSelectJob={(job) => setSelectedJobForModal(job)}
            onOpenAiScreener={() => setActiveTab('ai-screener')}
            onOpenResumeBuilder={() => setActiveTab('resume-builder')}
          />
        )}

        {activeTab === 'employer-dashboard' && (
          <EmployerDashboard
            company={companies[0]}
            jobs={jobs}
            applications={applications}
            onPostNewJob={handlePostNewJob}
            onUpdateAppStatus={handleUpdateAppStatus}
            onGenerateAiJobDescription={handleGenerateAiJobDescription}
          />
        )}

        {activeTab === 'admin-dashboard' && (
          <AdminDashboard
            jobs={jobs}
            onOpenDocs={() => setIsDocsOpen(true)}
          />
        )}

        {activeTab === 'blogs' && (
          <BlogSection blogs={BLOG_POSTS} />
        )}
      </main>

      {/* FOOTER */}
      <Footer
        onOpenDocs={() => setIsDocsOpen(true)}
        onOpenPricing={() => setIsPricingOpen(true)}
      />

      {/* MODALS */}
      <JobDetailModal
        job={selectedJobForModal}
        onClose={() => setSelectedJobForModal(null)}
        onSubmitApplication={handleSubmitApplication}
        onAnalyzeResumeWithAi={(resumeText, jobTitle, jobDesc) => handleOpenAiAnalyzerWithContext(resumeText, jobTitle, jobDesc)}
      />

      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        onSelectPlan={handleSelectPlan}
      />

      <DocsAndSchemaModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

      <AiCareerAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
      />

    </div>
  );
}
