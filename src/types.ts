export type UserRole = 'seeker' | 'employer' | 'admin' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  city?: string;
  avatar?: string;
  title?: string;
  companyId?: string;
  isVerified?: boolean;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  city: string; // e.g. Lahore, Karachi, Islamabad
  locationType: 'On-site' | 'Remote' | 'Hybrid';
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  category: string; // e.g. Information Technology, Banking & Finance, Healthcare, Engineering, Marketing, Customer Support
  salaryMin: number; // in PKR
  salaryMax: number; // in PKR
  salaryPeriod: 'Monthly' | 'Annual';
  experienceLevel: 'Entry Level' | 'Mid Level' | 'Senior Level' | 'Executive';
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
  postedDate: string;
  status: 'active' | 'closed' | 'pending';
  isFeatured?: boolean;
  applicantsCount: number;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  coverImage?: string;
  industry: string;
  city: string;
  website: string;
  description: string;
  size: string; // e.g., '50-200 employees'
  established: string;
  verified: boolean;
  rating: number;
  openJobsCount: number;
}

export type ApplicationStatus = 'Submitted' | 'Screening' | 'Interview Scheduled' | 'Offer Extended' | 'Hired' | 'Rejected';

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  seekerId: string;
  seekerName: string;
  seekerEmail: string;
  seekerPhone: string;
  seekerCity: string;
  resumeUrl?: string;
  resumeText?: string;
  coverNote?: string;
  status: ApplicationStatus;
  appliedDate: string;
  atsScore?: number;
  matchAnalysis?: string;
  interviewDate?: string;
  interviewNotes?: string;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  headline: string;
  summary: string;
  skills: string[];
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  experience: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
    link?: string;
  }>;
}

export interface AIResumeAnalysis {
  atsScore: number; // 0 - 100
  summaryFeedback: string;
  strengths: string[];
  improvements: string[];
  missingKeywords: string[];
  suggestedBullets: string[];
  overallRating: 'Excellent' | 'Good' | 'Needs Improvement' | 'Poor';
}

export interface InterviewSchedule {
  id: string;
  applicationId: string;
  jobTitle: string;
  candidateName: string;
  candidateEmail: string;
  employerName: string;
  dateTime: string;
  mode: 'Video Call (Google Meet)' | 'Phone Call' | 'In-Person Office';
  locationOrLink: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  notes?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  pricePKR: number; // in PKR
  durationDays: number;
  jobPostsLimit: number;
  featuredPostsLimit: number;
  candidateContactLimit: number;
  aiAssist: boolean;
  badge: string;
  features: string[];
}

export interface PaymentTransaction {
  id: string;
  employerName: string;
  planName: string;
  amountPKR: number;
  paymentMethod: 'JazzCash' | 'Easypaisa' | 'Bank Transfer' | 'Credit/Debit Card';
  accountNumberOrRef: string;
  transactionDate: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'application' | 'interview' | 'alert' | 'system';
}

export interface FilterState {
  searchQuery: string;
  city: string;
  category: string;
  jobType: string;
  locationType: string;
  experienceLevel: string;
  salaryMin: number;
}
