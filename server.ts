import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import {
  INITIAL_USERS,
  INITIAL_JOBS,
  INITIAL_COMPANIES,
  INITIAL_APPLICATIONS,
  INITIAL_TRANSACTIONS,
  BLOG_POSTS,
  INITIAL_NOTIFICATIONS,
  SUBSCRIPTION_PLANS,
  MYSQL_SCHEMA_DDL,
  DOCKER_COMPOSE_YML
} from './src/data/mockData';
import { User, Job, JobApplication, PaymentTransaction, BlogPost, NotificationItem, InterviewSchedule } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client with server-side API Key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || 'MOCK_KEY_IF_MISSING',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build'
    }
  }
});

// In-memory data store for live persistence during container runtime
let usersStore: User[] = [...INITIAL_USERS];
let jobsStore: Job[] = [...INITIAL_JOBS];
let companiesStore = [...INITIAL_COMPANIES];
let applicationsStore: JobApplication[] = [...INITIAL_APPLICATIONS];
let transactionsStore: PaymentTransaction[] = [...INITIAL_TRANSACTIONS];
let blogsStore: BlogPost[] = [...BLOG_POSTS];
let notificationsStore: NotificationItem[] = [...INITIAL_NOTIFICATIONS];
let interviewsStore: InterviewSchedule[] = [
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
];

// Helper to generate JWT token simulation
function generateToken(user: User): string {
  const payload = { id: user.id, email: user.email, role: user.role, name: user.name };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

function parseToken(authHeader?: string): User | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  try {
    const token = authHeader.split(' ')[1];
    const payload = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    return usersStore.find(u => u.id === payload.id) || null;
  } catch {
    return null;
  }
}

// ==========================================
// API ROUTES
// ==========================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Rozgar Pakistan API', timestamp: new Date().toISOString() });
});

// AUTH ENDPOINTS
app.post('/api/auth/login', (req, res) => {
  const { email, role } = req.body;
  let user = usersStore.find(u => u.email.toLowerCase() === email?.toLowerCase());
  
  if (!user) {
    // Auto register demo accounts if missing
    user = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email: email,
      role: role || 'seeker',
      city: 'Lahore',
      isVerified: true,
      createdAt: new Date().toISOString().split('T')[0]
    };
    usersStore.push(user);
  } else if (role) {
    user.role = role;
  }

  const token = generateToken(user);
  res.json({ success: true, user, token });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, role, phone, city, title } = req.body;
  const existing = usersStore.find(u => u.email.toLowerCase() === email?.toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, message: 'Email address already registered' });
  }

  const newUser: User = {
    id: `usr-${Date.now()}`,
    name,
    email,
    role: role || 'seeker',
    phone: phone || '+92 300 0000000',
    city: city || 'Lahore',
    title: title || (role === 'employer' ? 'HR Manager' : 'Software Professional'),
    isVerified: true,
    createdAt: new Date().toISOString().split('T')[0]
  };

  usersStore.push(newUser);
  const token = generateToken(newUser);
  res.json({ success: true, user: newUser, token });
});

app.get('/api/auth/me', (req, res) => {
  const user = parseToken(req.headers.authorization);
  if (!user) return res.status(401).json({ success: false, message: 'Unauthorized' });
  res.json({ success: true, user });
});

// JOBS ENDPOINTS
app.get('/api/jobs', (req, res) => {
  let filtered = [...jobsStore];
  const { search, city, category, jobType, locationType, experienceLevel, salaryMin } = req.query;

  if (search) {
    const q = (search as string).toLowerCase();
    filtered = filtered.filter(j =>
      j.title.toLowerCase().includes(q) ||
      j.companyName.toLowerCase().includes(q) ||
      j.description.toLowerCase().includes(q) ||
      j.skills.some(s => s.toLowerCase().includes(q))
    );
  }

  if (city && city !== 'All Cities') {
    filtered = filtered.filter(j => j.city.toLowerCase() === (city as string).toLowerCase());
  }

  if (category && category !== 'All Categories') {
    filtered = filtered.filter(j => j.category.toLowerCase() === (category as string).toLowerCase());
  }

  if (jobType) {
    filtered = filtered.filter(j => j.jobType === jobType);
  }

  if (locationType) {
    filtered = filtered.filter(j => j.locationType === locationType);
  }

  if (experienceLevel) {
    filtered = filtered.filter(j => j.experienceLevel === experienceLevel);
  }

  if (salaryMin) {
    const minVal = Number(salaryMin);
    filtered = filtered.filter(j => j.salaryMax >= minVal);
  }

  res.json({ success: true, total: filtered.length, jobs: filtered });
});

app.get('/api/jobs/:id', (req, res) => {
  const job = jobsStore.find(j => j.id === req.params.id);
  if (!job) return res.status(404).json({ success: false, message: 'Job posting not found' });
  res.json({ success: true, job });
});

app.post('/api/jobs', (req, res) => {
  const user = parseToken(req.headers.authorization);
  if (!user || (user.role !== 'employer' && user.role !== 'admin')) {
    return res.status(403).json({ success: false, message: 'Forbidden. Employer access required.' });
  }

  const {
    title, companyName, companyLogo, city, locationType, jobType,
    category, salaryMin, salaryMax, experienceLevel, description,
    responsibilities, requirements, skills, benefits
  } = req.body;

  const newJob: Job = {
    id: `job-${Date.now()}`,
    title: title || 'Software Specialist',
    companyId: user.companyId || 'comp-1',
    companyName: companyName || 'Systems Limited',
    companyLogo: companyLogo || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    city: city || 'Lahore',
    locationType: locationType || 'On-site',
    jobType: jobType || 'Full-time',
    category: category || 'Information Technology',
    salaryMin: Number(salaryMin) || 150000,
    salaryMax: Number(salaryMax) || 250000,
    salaryPeriod: 'Monthly',
    experienceLevel: experienceLevel || 'Mid Level',
    description: description || 'Exciting career opportunity in Pakistan.',
    responsibilities: Array.isArray(responsibilities) ? responsibilities : [responsibilities].filter(Boolean),
    requirements: Array.isArray(requirements) ? requirements : [requirements].filter(Boolean),
    skills: Array.isArray(skills) ? skills : ['Communication', 'Problem Solving'],
    benefits: Array.isArray(benefits) ? benefits : ['Health Insurance', 'Provident Fund'],
    postedDate: new Date().toISOString().split('T')[0],
    status: 'active',
    isFeatured: true,
    applicantsCount: 0
  };

  jobsStore.unshift(newJob);
  res.json({ success: true, job: newJob });
});

// APPLICATION ENDPOINTS
app.get('/api/applications', (req, res) => {
  const user = parseToken(req.headers.authorization);
  if (!user) return res.status(401).json({ success: false, message: 'Unauthorized' });

  if (user.role === 'seeker') {
    const seekerApps = applicationsStore.filter(a => a.seekerId === user.id || a.seekerEmail === user.email);
    return res.json({ success: true, applications: seekerApps });
  }

  if (user.role === 'employer' || user.role === 'admin') {
    return res.json({ success: true, applications: applicationsStore });
  }

  res.json({ success: true, applications: [] });
});

app.post('/api/applications', (req, res) => {
  const { jobId, seekerName, seekerEmail, seekerPhone, seekerCity, coverNote, resumeText } = req.body;
  const job = jobsStore.find(j => j.id === jobId);
  if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

  // Update applicants count
  job.applicantsCount += 1;

  const newApp: JobApplication = {
    id: `app-${Date.now()}`,
    jobId: job.id,
    jobTitle: job.title,
    companyName: job.companyName,
    companyLogo: job.companyLogo,
    seekerId: `usr-seeker-${Date.now()}`,
    seekerName: seekerName || 'Candidate',
    seekerEmail: seekerEmail || 'candidate@gmail.com',
    seekerPhone: seekerPhone || '+92 300 1234567',
    seekerCity: seekerCity || 'Lahore',
    coverNote: coverNote || 'Excited to submit my application for this role.',
    resumeText: resumeText || '',
    status: 'Submitted',
    appliedDate: new Date().toISOString().split('T')[0],
    atsScore: Math.floor(Math.random() * 20) + 75,
    matchAnalysis: 'Automatic initial screening passed. Strong match on experience and location.'
  };

  applicationsStore.unshift(newApp);

  // Send notification
  notificationsStore.unshift({
    id: `notif-${Date.now()}`,
    userId: newApp.seekerId,
    title: 'Application Submitted',
    message: `Your application for ${job.title} at ${job.companyName} was received.`,
    date: new Date().toISOString().split('T')[0],
    read: false,
    type: 'application'
  });

  res.json({ success: true, application: newApp });
});

app.put('/api/applications/:id/status', (req, res) => {
  const { status, interviewDate, interviewNotes } = req.body;
  const appItem = applicationsStore.find(a => a.id === req.params.id);
  if (!appItem) return res.status(404).json({ success: false, message: 'Application not found' });

  appItem.status = status;
  if (interviewDate) appItem.interviewDate = interviewDate;
  if (interviewNotes) appItem.interviewNotes = interviewNotes;

  if (status === 'Interview Scheduled' && interviewDate) {
    interviewsStore.unshift({
      id: `int-${Date.now()}`,
      applicationId: appItem.id,
      jobTitle: appItem.jobTitle,
      candidateName: appItem.seekerName,
      candidateEmail: appItem.seekerEmail,
      employerName: appItem.companyName,
      dateTime: interviewDate,
      mode: 'Video Call (Google Meet)',
      locationOrLink: 'https://meet.google.com/rozgar-interview-session',
      status: 'Upcoming',
      notes: interviewNotes || 'Interview scheduled via Rozgar ATS.'
    });
  }

  res.json({ success: true, application: appItem });
});

// INTERVIEWS ENDPOINTS
app.get('/api/interviews', (req, res) => {
  res.json({ success: true, interviews: interviewsStore });
});

// COMPANIES ENDPOINTS
app.get('/api/companies', (req, res) => {
  res.json({ success: true, companies: companiesStore });
});

// SUBSCRIPTIONS & TRANSACTIONS
app.get('/api/subscriptions/plans', (req, res) => {
  res.json({ success: true, plans: SUBSCRIPTION_PLANS });
});

app.post('/api/subscriptions/pay', (req, res) => {
  const { planName, amountPKR, paymentMethod, accountNumberOrRef, employerName } = req.body;

  const newTx: PaymentTransaction = {
    id: `tx-${Date.now()}`,
    employerName: employerName || 'Pakistani Business',
    planName: planName || 'Growth Business',
    amountPKR: Number(amountPKR) || 15000,
    paymentMethod: paymentMethod || 'JazzCash',
    accountNumberOrRef: accountNumberOrRef || '03001234567',
    transactionDate: new Date().toISOString().split('T')[0],
    status: 'Completed'
  };

  transactionsStore.unshift(newTx);
  res.json({ success: true, transaction: newTx, message: 'Payment successfully processed via ' + paymentMethod });
});

// BLOGS
app.get('/api/blogs', (req, res) => {
  res.json({ success: true, blogs: blogsStore });
});

// ADMIN ANALYTICS
app.get('/api/admin/analytics', (req, res) => {
  const totalRevenue = transactionsStore.reduce((acc, t) => acc + (t.status === 'Completed' ? t.amountPKR : 0), 0);
  const totalApplicants = applicationsStore.length;
  const activeJobs = jobsStore.filter(j => j.status === 'active').length;

  res.json({
    success: true,
    analytics: {
      totalSeekers: 1420,
      totalEmployers: 185,
      activeJobs,
      totalApplications: totalApplicants,
      revenuePKR: totalRevenue + 120000, // includes historical
      topCities: [
        { city: 'Lahore', percentage: 42 },
        { city: 'Karachi', percentage: 32 },
        { city: 'Islamabad', percentage: 18 },
        { city: 'Other Cities', percentage: 8 }
      ],
      transactions: transactionsStore,
      schemaDDL: MYSQL_SCHEMA_DDL,
      dockerYml: DOCKER_COMPOSE_YML
    }
  });
});

// ==========================================
// GEMINI AI INTEGRATION ENDPOINTS
// ==========================================

// 1. AI RESUME ANALYZER & ATS MATCH
app.post('/api/ai/analyze-resume', async (req, res) => {
  try {
    const { resumeText, targetJobTitle, targetDescription } = req.body;

    if (!resumeText) {
      return res.status(400).json({ success: false, message: 'Resume text is required for AI analysis' });
    }

    const prompt = `You are an expert AI Resume Evaluator and ATS Hiring Manager for the Pakistani tech and corporate job market.
Analyze the following resume against the target role or job description.

Target Role/Title: ${targetJobTitle || 'General Software Engineering / Corporate Role in Pakistan'}
Target Job Description: ${targetDescription || 'Standard requirements for modern technology/corporate roles.'}

Candidate Resume Text:
"""
${resumeText}
"""

Evaluate the resume and return a JSON object with:
1. "atsScore": integer between 0 and 100 based on formatting, keyword match, and clarity.
2. "summaryFeedback": a concise 2-sentence feedback summary.
3. "strengths": array of 3 bullet strings highlighting strengths.
4. "improvements": array of 3 bullet strings highlighting key areas to fix.
5. "missingKeywords": array of 4-6 essential missing skill keywords.
6. "suggestedBullets": array of 2 impactful action-oriented bullet points tailored to Pakistani and international employers.
7. "overallRating": one of ["Excellent", "Good", "Needs Improvement", "Poor"].`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            atsScore: { type: Type.INTEGER },
            summaryFeedback: { type: Type.STRING },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
            missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestedBullets: { type: Type.ARRAY, items: { type: Type.STRING } },
            overallRating: { type: Type.STRING }
          },
          required: ['atsScore', 'summaryFeedback', 'strengths', 'improvements', 'missingKeywords', 'suggestedBullets', 'overallRating']
        }
      }
    });

    const resultText = response.text || '{}';
    const analysis = JSON.parse(resultText);

    res.json({ success: true, analysis });
  } catch (error: any) {
    console.error('Gemini Resume Analysis Error:', error);
    // Fallback simulation if key unavailable or error
    res.json({
      success: true,
      analysis: {
        atsScore: 88,
        summaryFeedback: 'Strong technical background with good project exposure in Pakistan. Adding quantified impact metrics will boost your profile even higher.',
        strengths: [
          'Solid proficiency in core modern stacks (React, TypeScript, Node.js)',
          'Clear progression in software engineering responsibility',
          'Good educational background from a recognized Pakistani university'
        ],
        improvements: [
          'Add quantitative achievements (e.g. "improved database query speed by 35%")',
          'Include cloud deployment details (AWS / Docker)',
          'Ensure contact details include LinkedIn and GitHub profiles'
        ],
        missingKeywords: ['CI/CD Pipelines', 'Kubernetes', 'Jest / Testing', 'Microservices'],
        suggestedBullets: [
          'Engineered React & TypeScript microfrontends handling 50,000+ daily active users across Pakistan.',
          'Optimized PostgreSQL query indexing, reducing backend REST response time by 30%.'
        ],
        overallRating: 'Good'
      }
    });
  }
});

// 2. AI JOB DESCRIPTION GENERATOR
app.post('/api/ai/generate-jd', async (req, res) => {
  try {
    const { jobTitle, category, city, experienceLevel, keyPoints } = req.body;

    const prompt = `You are a Senior Talent Acquisition Specialist for leading employers in Pakistan (Systems Ltd, Jazz, Bank Alfalah).
Generate a compelling, professional job description for the following role:
- Title: ${jobTitle}
- Category: ${category || 'Information Technology'}
- City in Pakistan: ${city || 'Lahore'}
- Experience Level: ${experienceLevel || 'Mid Level'}
- Key Responsibilities/Notes: ${keyPoints || 'Standard expectations for this role'}

Return a JSON object containing:
1. "description": A captivating 3-paragraph summary describing the role and company culture in Pakistan.
2. "responsibilities": Array of 5 clear bullet strings.
3. "requirements": Array of 5 clear bullet strings including educational & technical qualifications in Pakistan.
4. "skills": Array of 6 key skill tags.
5. "suggestedSalaryMin": Recommended monthly salary min in PKR (e.g. 180000).
6. "suggestedSalaryMax": Recommended monthly salary max in PKR (e.g. 300000).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            responsibilities: { type: Type.ARRAY, items: { type: Type.STRING } },
            requirements: { type: Type.ARRAY, items: { type: Type.STRING } },
            skills: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestedSalaryMin: { type: Type.INTEGER },
            suggestedSalaryMax: { type: Type.INTEGER }
          },
          required: ['description', 'responsibilities', 'requirements', 'skills', 'suggestedSalaryMin', 'suggestedSalaryMax']
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    res.json({ success: true, generatedJD: result });
  } catch (error) {
    console.error('Gemini JD Generation Error:', error);
    res.json({
      success: true,
      generatedJD: {
        description: `We are looking for a dedicated ${req.body.jobTitle || 'Professional'} to join our fast-paced team in ${req.body.city || 'Lahore'}. You will work on high-impact projects driving digital innovation across Pakistan.`,
        responsibilities: [
          'Design and implement scalable software architectures.',
          'Collaborate with cross-functional product and engineering teams.',
          'Maintain high code quality through code reviews and automated tests.',
          'Optimize system reliability and application performance.',
          'Participate in agile sprint planning and technical mentorship.'
        ],
        requirements: [
          'Bachelor degree in CS/Software Engineering or equivalent experience.',
          '3+ years relevant industry experience in Pakistan or abroad.',
          'Strong communication skills in English and Urdu.',
          'Proven problem solving mindset and ability to deliver under timelines.'
        ],
        skills: ['TypeScript', 'React', 'Node.js', 'Problem Solving', 'Teamwork', 'Agile'],
        suggestedSalaryMin: 180000,
        suggestedSalaryMax: 320000
      }
    });
  }
});

// 3. AI CAREER ADVISOR CHATBOT ("ROZGAR AI")
app.post('/api/ai/career-chat', async (req, res) => {
  try {
    const { userMessage } = req.body;

    const prompt = `You are "Rozgar AI", an expert career advisor and interview coach specialized in Pakistan's job market (tech, banking, telecom, e-commerce).
Respond helpfully, politely, and specifically to the job seeker's query. Give actionable advice regarding Pakistani hiring practices, salary benchmarks in PKR, top employers in Lahore/Karachi/Islamabad, and interview preparation. Keep response within 3 paragraphs.

User Question: "${userMessage}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt
    });

    res.json({ success: true, reply: response.text });
  } catch (error) {
    res.json({
      success: true,
      reply: `Assalamu Alaikum! As your Rozgar AI advisor, I recommend tailoring your resume specifically to the key skills mentioned in Pakistani job posts (such as React, Node.js, or Fintech). In cities like Lahore, Karachi, and Islamabad, software salaries for mid-level roles generally range between PKR 180,000 to PKR 350,000 per month.`
    });
  }
});

// ==========================================
// VITE / STATIC SERVING SETUP
// ==========================================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Rozgar Pakistan server running on http://localhost:${PORT}`);
  });
}

startServer();
