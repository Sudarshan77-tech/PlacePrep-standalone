// Personalized Placement Intelligence and Roadmap Engine for PlacePrep
// Operates 100% locally with transparent, verifiable heuristics and offline persistence.
// Incorporates student college, target companies, assessed strengths & weaknesses, and prep deadline.

import {
  User,
  StudentStats,
  Company,
  RecruiterHistoryRecord,
  CollegePlacementData,
  SkillGapItem,
  TargetCompanyMatchResult,
  DailyWeeklyRoadmapTask,
  StudentTopicPerformance
} from '@/types';
import { sampleCompanies, defaultCollegePlacementData } from '@/data/mockData';

// ============================================================================
// 1. TOPIC & SKILL GAP ANALYZER
// ============================================================================

export function analyzeStudentSkillGaps(
  topicPerformances: StudentTopicPerformance[],
  targetCompanyIds: string[]
): SkillGapItem[] {
  // If student hasn't completed any assessments, handle gracefully
  if (!topicPerformances || topicPerformances.length === 0) {
    return [];
  }

  const selectedCompanies = sampleCompanies.filter(c => targetCompanyIds.includes(c.id));
  const gaps: SkillGapItem[] = [];

  // Skill mappings to PlacePrep modules
  const topicMap: Record<string, { category: 'Aptitude' | 'Coding' | 'Technical' | 'Soft Skills'; href: string; benchmark: number }> = {
    'Dynamic Programming': { category: 'Coding', href: '/coding', benchmark: 70 },
    'Database Normalization & SQL': { category: 'Technical', href: '/technical', benchmark: 75 },
    'Arrays & Two Pointers': { category: 'Coding', href: '/coding', benchmark: 75 },
    'Strings & Sliding Window': { category: 'Coding', href: '/coding', benchmark: 70 },
    'Linked List & Stacks': { category: 'Coding', href: '/coding', benchmark: 70 },
    'Quantitative Aptitude': { category: 'Aptitude', href: '/aptitude', benchmark: 75 },
    'Logical Reasoning & Syllogisms': { category: 'Aptitude', href: '/aptitude', benchmark: 75 },
    'Verbal Ability & Grammar': { category: 'Aptitude', href: '/aptitude', benchmark: 70 },
    'Operating Systems & Concurrency': { category: 'Technical', href: '/technical', benchmark: 75 },
    'Object-Oriented Programming (OOP)': { category: 'Technical', href: '/technical', benchmark: 80 },
    'Computer Networks (OSI/TCP)': { category: 'Technical', href: '/technical', benchmark: 70 },
    'HR Behavioral & STAR Structure': { category: 'Soft Skills', href: '/interview', benchmark: 75 },
    'Technical Architecture Defense': { category: 'Soft Skills', href: '/interview', benchmark: 75 },
  };

  topicPerformances.forEach(tp => {
    const meta = topicMap[tp.topic] || { category: tp.category, href: '/dashboard', benchmark: 70 };
    const required = meta.benchmark;
    const studentScore = tp.score;

    let gapStatus: 'Met' | 'Needs Practice' | 'Critical Gap' = 'Met';
    if (studentScore < required - 15) {
      gapStatus = 'Critical Gap';
    } else if (studentScore < required) {
      gapStatus = 'Needs Practice';
    }

    gaps.push({
      skill: tp.topic,
      category: meta.category,
      studentProficiency: studentScore,
      requiredProficiency: required,
      gapStatus,
      recommendedTopic: `${tp.topic} Remediation`,
      moduleLink: meta.href
    });
  });

  return gaps.sort((a, b) => {
    // Sort critical gaps first, then needs practice, then met
    const weight = { 'Critical Gap': 3, 'Needs Practice': 2, 'Met': 1 };
    return weight[b.gapStatus] - weight[a.gapStatus];
  });
}

// ============================================================================
// 2. TARGET COMPANY MATCH ENGINE
// ============================================================================

export function calculateCompanyMatch(
  company: Company,
  user: User,
  stats: StudentStats,
  recruiterHistory: RecruiterHistoryRecord[]
): TargetCompanyMatchResult {
  // Check if company is on college's historical recruiter list
  const recRecord = recruiterHistory.find(
    r => r.companyId === company.id || r.companyName.toLowerCase().includes(company.name.toLowerCase().slice(0, 5))
  );
  const isHistoricalRecruiterAtCollege = !!recRecord;

  // Eligibility check
  const studentCgpa = user.cgpa ?? 8.0;
  const studentBacklogs = user.activeBacklogs ?? 0;
  const minCgpaReq = recRecord?.minCgpa ?? (company.tier === 'Product' ? 7.5 : 6.0);
  const maxBacklogsReq = recRecord?.maxBacklogs ?? 0;

  const cgpaMet = studentCgpa >= minCgpaReq;
  const backlogMet = studentBacklogs <= maxBacklogsReq;
  const branchMet = recRecord
    ? recRecord.branchesEligible.some(b => user.branch.toLowerCase().includes(b.toLowerCase()) || b === 'All')
    : true;

  const eligibilityMet = cgpaMet && backlogMet && branchMet;

  // Transparent scoring method breakdown:
  // - Aptitude component: weight 25%
  // - Coding component: weight 35%
  // - Technical component: weight 25%
  // - Mock Interview component: weight 15%
  // - Multiplied by eligibility factor (0.85 if eligibility criteria missed, 1.0 if met)
  let rawScore = (stats.aptitudeScore * 0.25) +
                 (stats.codingScore * 0.35) +
                 (stats.technicalScore * 0.25) +
                 (stats.interviewScore * 0.15);

  // If tier is Product (e.g. Amazon, Google), adjust coding weight higher
  if (company.tier === 'Product') {
    rawScore = (stats.aptitudeScore * 0.15) +
               (stats.codingScore * 0.50) +
               (stats.technicalScore * 0.20) +
               (stats.interviewScore * 0.15);
  }

  const eligibilityFactor = eligibilityMet ? 1.0 : 0.85;
  const matchScore = Math.min(98, Math.max(20, Math.round(rawScore * eligibilityFactor)));

  // Assessed skills mapping
  const assessedSkills = [
    {
      skill: 'Quantitative & Analytical Aptitude',
      studentScore: stats.aptitudeScore,
      requiredScore: company.tier === 'Product' ? 70 : 75,
      status: (stats.aptitudeScore >= (company.tier === 'Product' ? 70 : 75) ? 'Met' : 'Gap') as 'Met' | 'Gap'
    },
    {
      skill: `Hands-on DSA (${company.codingDifficulty})`,
      studentScore: stats.codingScore,
      requiredScore: company.tier === 'Product' ? 80 : 65,
      status: (stats.codingScore >= (company.tier === 'Product' ? 80 : 65) ? 'Met' : 'Gap') as 'Met' | 'Gap'
    },
    {
      skill: 'Core CS Subjects (DBMS/OS/OOP)',
      studentScore: stats.technicalScore,
      requiredScore: 70,
      status: (stats.technicalScore >= 70 ? 'Met' : 'Gap') as 'Met' | 'Gap'
    },
    {
      skill: 'Interview & Communication Rubrics',
      studentScore: stats.interviewScore,
      requiredScore: 72,
      status: (stats.interviewScore >= 72 ? 'Met' : 'Gap') as 'Met' | 'Gap'
    }
  ];

  const missingSkills: string[] = [];
  if (stats.codingScore < (company.tier === 'Product' ? 80 : 65)) {
    missingSkills.push(`Advanced DSA (${company.codingDifficulty} level)`);
  }
  if (stats.technicalScore < 70) {
    missingSkills.push('DBMS Normalization & SQL Queries');
  }
  if (stats.aptitudeScore < 75 && company.tier === 'Services') {
    missingSkills.push('Speed Aptitude & Reasoning Cutoff');
  }

  const checklist = [
    { id: 'c1', label: `Target CGPA >= ${minCgpaReq}`, completed: cgpaMet },
    { id: 'c2', label: `Zero active backlogs`, completed: backlogMet },
    { id: 'c3', label: `Solved 50+ DSA problems in C++/Python`, completed: stats.problemsSolved >= 50 },
    { id: 'c4', label: `Reviewed ${company.name} interview rounds & archives`, completed: true },
    { id: 'c5', label: `Completed 1 full mock drive simulation`, completed: stats.testsCompleted >= 10 }
  ];

  return {
    company,
    matchScore,
    isHistoricalRecruiterAtCollege,
    recruiterRecord: recRecord,
    eligibilityMet,
    eligibilityDetails: {
      cgpaMet,
      backlogMet,
      branchMet,
      notes: eligibilityMet
        ? 'Eligible according to historical college placement criteria.'
        : `Criteria Alert: Student CGPA (${studentCgpa}) vs Req (${minCgpaReq}) or Backlogs (${studentBacklogs}).`
    },
    assessedSkills,
    missingSkills,
    checklist,
    scoringBreakdown: {
      aptitudeScoreWeight: company.tier === 'Product' ? 15 : 25,
      codingScoreWeight: company.tier === 'Product' ? 50 : 35,
      technicalScoreWeight: company.tier === 'Product' ? 20 : 25,
      interviewScoreWeight: 15,
      eligibilityFactor
    }
  };
}

// ============================================================================
// 3. PERSONALIZED ROADMAP GENERATION ENGINE
// ============================================================================

export function generatePersonalizedRoadmap(
  user: User,
  stats: StudentStats,
  topicPerformances: StudentTopicPerformance[],
  collegeData: CollegePlacementData
): DailyWeeklyRoadmapTask[] {
  const tasks: DailyWeeklyRoadmapTask[] = [];
  const targetCompanyIds = user.targetCompanyIds || ['tcs', 'amazon'];
  const dailyTime = user.dailyPrepMinutes || 120;

  // Identify student's weakest areas
  const weakTopics = topicPerformances
    .filter(t => t.score < 70)
    .sort((a, b) => a.score - b.score);

  // Identify confirmed college recruiters
  const confirmedRecruiters = collegeData.recruiterHistory.filter(
    r => targetCompanyIds.includes(r.companyId) || r.status === 'Confirmed'
  );

  let taskIdCounter = 1;

  // Day 1: Priority Remediation of the lowest scoring topic
  const lowestTopic = weakTopics[0] || { topic: 'Database Management Systems', category: 'Technical' };
  tasks.push({
    id: `task_gen_${taskIdCounter++}`,
    dayNumber: 1,
    dateString: 'Today (Day 1)',
    weekNumber: 1,
    title: `${lowestTopic.topic}: Foundations & Practice`,
    topic: lowestTopic.topic,
    category: lowestTopic.category as any,
    recommendedActivity: `Study ${lowestTopic.topic} core concepts and attempt a 10-question practice test`,
    estimatedMinutes: Math.min(60, Math.round(dailyTime * 0.5)),
    priority: 'High',
    status: 'Pending',
    moduleHref: lowestTopic.category === 'Technical' ? '/technical' : lowestTopic.category === 'Coding' ? '/coding' : '/aptitude',
    reasonForRecommendation: `Identified as your highest-risk gap based on your current assessment score.`,
    targetCompanyRelevance: `Directly tested in campus screening rounds for ${confirmedRecruiters[0]?.companyName || 'Target Companies'}`
  });

  // Day 1 Task 2: Core Coding / DSA Challenge
  tasks.push({
    id: `task_gen_${taskIdCounter++}`,
    dayNumber: 1,
    dateString: 'Today (Day 1)',
    weekNumber: 1,
    title: 'High-Frequency DSA Coding Problem',
    topic: 'Arrays & Two Pointers',
    category: 'Coding',
    recommendedActivity: 'Implement Two Sum and Longest Substring in compiler editor with optimal O(N) space-time',
    estimatedMinutes: Math.min(60, Math.round(dailyTime * 0.5)),
    priority: 'High',
    status: 'Pending',
    moduleHref: '/coding',
    reasonForRecommendation: 'Coding accuracy accounts for 35% - 50% of your placement readiness score.',
    targetCompanyRelevance: 'Amazon OA, TCS Digital & Infosys SP mandatory coding test'
  });

  // Day 2: Second weak topic or algorithmic problem
  const secondWeak = weakTopics[1] || { topic: 'Dynamic Programming', category: 'Coding' };
  tasks.push({
    id: `task_gen_${taskIdCounter++}`,
    dayNumber: 2,
    dateString: 'Tomorrow (Day 2)',
    weekNumber: 1,
    title: `${secondWeak.topic} Tabulation & Memory Practice`,
    topic: secondWeak.topic,
    category: secondWeak.category as any,
    recommendedActivity: 'Solve 1 Medium difficulty dynamic programming or recursion challenge in PlacePrep IDE',
    estimatedMinutes: Math.min(60, Math.round(dailyTime * 0.5)),
    priority: 'High',
    status: 'Pending',
    moduleHref: '/coding',
    reasonForRecommendation: `Your proficiency in ${secondWeak.topic} needs reinforcement before online coding tests.`,
    targetCompanyRelevance: 'Target Product & Service Technical Rounds'
  });

  // Day 2 Task 2: Aptitude Speed Drills
  tasks.push({
    id: `task_gen_${taskIdCounter++}`,
    dayNumber: 2,
    dateString: 'Tomorrow (Day 2)',
    weekNumber: 1,
    title: 'Quantitative & Logical Timed Quiz Drill',
    topic: 'Quantitative Aptitude',
    category: 'Aptitude',
    recommendedActivity: 'Take a 5-minute timed aptitude drill and review missed question explanations',
    estimatedMinutes: 30,
    priority: 'Medium',
    status: 'Pending',
    moduleHref: '/aptitude',
    reasonForRecommendation: 'Essential for passing sectional elimination cutoffs on day-one recruiter drives.',
    targetCompanyRelevance: 'TCS NQT, Accenture Cognitive & Infosys Reasoning'
  });

  // Day 3: College Recruiter Blueprint Analysis
  const primaryRecruiter = confirmedRecruiters[0] || collegeData.recruiterHistory[0];
  tasks.push({
    id: `task_gen_${taskIdCounter++}`,
    dayNumber: 3,
    dateString: 'Day 3',
    weekNumber: 1,
    title: `${primaryRecruiter ? primaryRecruiter.companyName : 'Target Recruiter'} Pattern & Archive Drill`,
    topic: 'Company Specific Preparation',
    category: 'Company Prep',
    recommendedActivity: `Study the exact recruitment stages and past-style test archives for ${primaryRecruiter ? primaryRecruiter.companyName : 'dream companies'}`,
    estimatedMinutes: 45,
    priority: 'Medium',
    status: 'Pending',
    moduleHref: '/companies',
    reasonForRecommendation: `Historical data from ${user.college} shows ${primaryRecruiter ? primaryRecruiter.offersCount : 50}+ offers from this recruiter.`,
    targetCompanyRelevance: `${primaryRecruiter ? primaryRecruiter.companyName : 'Campus Placement'} Drive Target`
  });

  // Day 4: AI Mock Interview Simulation
  tasks.push({
    id: `task_gen_${taskIdCounter++}`,
    dayNumber: 4,
    dateString: 'Day 4',
    weekNumber: 1,
    title: 'Technical Mock Interview Simulation',
    topic: 'Technical Interview Simulation',
    category: 'Interview',
    recommendedActivity: 'Complete a live AI mock interview defending OOP, DBMS indexing, and system trade-offs',
    estimatedMinutes: 40,
    priority: 'High',
    status: 'Pending',
    moduleHref: '/interview',
    reasonForRecommendation: 'Practice verbal explanation using the STAR method with immediate rubric evaluation.',
    targetCompanyRelevance: 'Technical Round 1 & 2 at Target Companies'
  });

  // Day 5: Full Mock Assessment Simulation
  tasks.push({
    id: `task_gen_${taskIdCounter++}`,
    dayNumber: 5,
    dateString: 'Day 5',
    weekNumber: 1,
    title: 'Comprehensive Diagnostic Test Simulation',
    topic: 'Full Mock Test',
    category: 'Aptitude',
    recommendedActivity: 'Simulate full exam conditions with Quantitative, Logical, and Verbal timed questions',
    estimatedMinutes: 50,
    priority: 'Medium',
    status: 'Pending',
    moduleHref: '/aptitude',
    reasonForRecommendation: 'Validates aggregate score improvement and updates your Placement Readiness score.',
    targetCompanyRelevance: 'Cohort Benchmark & Shortlisting Eligibility'
  });

  return tasks;
}
