// Database-ready TypeScript types and models for PlacePrep

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'faculty';
  avatar?: string;
  college: string;
  branch: string;
  gradYear: number;
  currentSkillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  joinedDate: string;
  // Extended College-Aware Attributes
  cgpa?: number;
  activeBacklogs?: number;
  preferredJobRoles: string[]; // e.g. ["Software Development Engineer", "Data Analyst", "Cloud Engineer"]
  targetCompanyIds: string[];  // e.g. ["amazon", "tcs", "infosys"]
  dailyPrepMinutes: number;    // e.g. 120 (2 hours)
  placementTargetDate: string; // e.g. "2026-12-01"
}

export interface StudentStats {
  readinessScore: number;
  aptitudeScore: number;
  codingScore: number;
  technicalScore: number;
  interviewScore: number;
  currentStreak: number;
  problemsSolved: number;
  testsCompleted: number;
  mockInterviews: number;
  weeklyHours: number[];
}

export interface RecommendedModule {
  id: string;
  title: string;
  category: 'Aptitude' | 'Coding' | 'Technical' | 'Interview';
  progress: number;
  totalItems: number;
  completedItems: number;
  href: string;
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  type: 'practice' | 'quiz' | 'interview' | 'revision';
  badge: string;
  actionText: string;
  href: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  category: 'Aptitude' | 'Coding' | 'Technical' | 'Interview';
  timestamp: string;
  score?: string;
  status: 'passed' | 'review' | 'completed' | 'excellent';
}

export interface AptitudeQuestion {
  id: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface AptitudeCategory {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  avgTimeMins: number;
  topics: string[];
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  acceptance: string;
  solved: boolean;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  starterCode: {
    cpp: string;
    python: string;
    java: string;
    javascript: string;
  };
  testCases: {
    input: string;
    expected: string;
  }[];
}

export interface TechnicalTopic {
  id: string;
  title: string;
  shortDesc: string;
  questionsCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  bestScore: number | null;
  subtopics: string[];
  iconName: string;
}

export interface TechnicalQuestion {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface InterviewType {
  id: string;
  title: string;
  description: string;
  rounds: number;
  avgDuration: string;
  difficulty: 'Standard' | 'Challenging' | 'Expert';
  tags: string[];
  questions: {
    id: string;
    question: string;
    role: string;
    tips: string[];
  }[];
}

export interface InterviewEvaluation {
  communication: number;
  technicalKnowledge: number;
  confidence: number;
  problemSolving: number;
  overall: number;
  strengths: string[];
  weaknesses: string[];
  suggestedImprovements: string[];
  recommendedQuestions: string[];
}

export interface RoadmapStage {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  progress: number;
  topics: string[];
  nextAction: string;
  estimatedWeeks: string;
}

export interface Company {
  id: string;
  name: string;
  logoText: string;
  tagline: string;
  tier: 'Tier 1' | 'Tier 2' | 'Product' | 'Services';
  packageRange: string;
  overview: string;
  rounds: {
    roundNumber: number;
    title: string;
    description: string;
    duration: string;
  }[];
  pattern: {
    aptitudeWeight: string;
    codingWeight: string;
    technicalWeight: string;
    interviewRounds: number;
  };
  aptitudeTopics: string[];
  codingDifficulty: 'Easy' | 'Medium' | 'Hard' | 'Easy-Medium' | 'Medium-Hard';
  technicalTopics: string[];
  faqs: { q: string; a: string }[];
  previousQuestions: {
    title: string;
    type: 'Coding' | 'Technical' | 'Puzzles';
    difficulty: string;
  }[];
}

export interface ResumeData {
  personal: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    summary: string;
  };
  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startYear: string;
    endYear: string;
    cgpa: string;
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  projects: {
    id: string;
    name: string;
    techStack: string;
    description: string;
    link: string;
  }[];
  experience: {
    id: string;
    role: string;
    company: string;
    period: string;
    points: string[];
  }[];
  certifications: string[];
  achievements: string[];
}

export interface AdminStudentOverview {
  id: string;
  name: string;
  email: string;
  college: string;
  branch: string;
  readinessScore: number;
  codingSolved: number;
  testsCompleted: number;
  status: 'Placement Ready' | 'Needs Practice' | 'Struggling';
}

// ============================================================================
// COLLEGE-AWARE PLACEMENT INTELLIGENCE & PERSONALIZED ROADMAP TYPES
// ============================================================================

export type VerificationStatus = 'Verified by TPO' | 'Sample / Demo Record' | 'Community Reported';

export interface RecruiterHistoryRecord {
  id: string;
  companyName: string;
  companyId: string; // references Company.id or slug
  academicYear: string; // e.g. "2024-2025" or "2023-2024"
  status: 'Confirmed' | 'Historical' | 'Expected';
  rolesOffered: string[];
  hiringTier: 'Tier 1' | 'Tier 2' | 'Product' | 'Services';
  packageLPA: string; // e.g. "4.5 - 7.5 LPA"
  offersCount: number; // e.g. 42
  branchesEligible: string[]; // e.g. ["CSE", "IT", "ECE"]
  minCgpa: number; // e.g. 7.0
  maxBacklogs: number; // e.g. 0
  requiredSkills: string[];
  recruitmentStages: string[];
  verifiedStatus: VerificationStatus;
  dataSource: string; // e.g. "College TPO Annual Report 2024" or "Sample Data"
  lastUpdated: string;
}

export interface CollegePlacementData {
  collegeName: string;
  collegeCode: string;
  location: string;
  overview: string;
  isDemoCollege: boolean; // Transparency: marks if sample demo data
  historicalYears: string[];
  branchTrends: {
    branch: string;
    totalStudents: number;
    placedCount: number;
    avgPackageLPA: number;
    highestPackageLPA: number;
    topRecruiters: string[];
  }[];
  recruiterHistory: RecruiterHistoryRecord[];
}

export interface SkillGapItem {
  skill: string;
  category: 'Aptitude' | 'Coding' | 'Technical' | 'Soft Skills';
  studentProficiency: number; // 0 to 100 percentage
  requiredProficiency: number; // 0 to 100 percentage
  gapStatus: 'Met' | 'Needs Practice' | 'Critical Gap';
  recommendedTopic: string;
  moduleLink: string;
}

export interface TargetCompanyMatchResult {
  company: Company;
  matchScore: number; // 0 to 100
  isHistoricalRecruiterAtCollege: boolean;
  recruiterRecord?: RecruiterHistoryRecord;
  eligibilityMet: boolean;
  eligibilityDetails: {
    cgpaMet: boolean;
    backlogMet: boolean;
    branchMet: boolean;
    notes: string;
  };
  assessedSkills: {
    skill: string;
    studentScore: number;
    requiredScore: number;
    status: 'Met' | 'Gap';
  }[];
  missingSkills: string[];
  checklist: {
    id: string;
    label: string;
    completed: boolean;
  }[];
  scoringBreakdown: {
    aptitudeScoreWeight: number;
    codingScoreWeight: number;
    technicalScoreWeight: number;
    interviewScoreWeight: number;
    eligibilityFactor: number;
  };
}

export interface DailyWeeklyRoadmapTask {
  id: string;
  dayNumber: number; // Day 1, 2, ...
  dateString: string; // e.g. "Today", "Tomorrow", "Oct 11"
  weekNumber: number; // Week 1, 2, ...
  title: string;
  topic: string;
  category: 'Aptitude' | 'Coding' | 'Technical' | 'Interview' | 'Company Prep';
  recommendedActivity: string;
  estimatedMinutes: number;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Completed' | 'Postponed';
  moduleHref: string;
  reasonForRecommendation: string;
  targetCompanyRelevance: string; // e.g. "TCS & Amazon SDE priority"
  completedAt?: string;
}

export interface StudentTopicPerformance {
  topic: string;
  category: 'Aptitude' | 'Coding' | 'Technical' | 'Interview';
  score: number; // 0 - 100
  totalAttempts: number;
  lastTested: string;
  status: 'Strength' | 'Moderate' | 'Weakness';
}

export type PlanTaskCategory = 'Coding' | 'Aptitude' | 'Technical' | 'Interview' | 'Revision' | 'Break';

export interface PlanTaskItem {
  id: string;
  timeSlot?: string;
  durationMinutes: number;
  title: string;
  category: PlanTaskCategory;
  description: string;
  targetGoal: string;
  completed: boolean;
  completedAt?: string;
  moduleHref?: string;
}

export interface DaySchedule {
  dayNumber: number;
  dayName: string;
  focusTheme: string;
  tasks: PlanTaskItem[];
}

export interface WeekSchedule {
  weekNumber: number;
  weekTheme: string;
  milestone: string;
  days: DaySchedule[];
}

export interface GeneratedStudyPlan {
  id: string;
  type: 'today' | 'weekly' | 'monthly';
  title: string;
  createdAt: string;
  totalDurationMinutes?: number;
  assumptions: string[];
  targetCompanies: string[];
  weakTopicsAddressed: string[];
  tasks?: PlanTaskItem[];
  days?: DaySchedule[];
  weeks?: WeekSchedule[];
  summaryNote?: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isRuleBased?: boolean;
  suggestedAction?: {
    label: string;
    href: string;
  };
  contextHighlights?: string[];
  plan?: GeneratedStudyPlan;
}

export interface StudentGoal {
  id: string;
  title: string;
  targetCount: number;
  currentCount: number;
  category: 'Coding' | 'Aptitude' | 'Technical' | 'Interview' | 'Hours';
  unit: string;
  completed: boolean;
}

