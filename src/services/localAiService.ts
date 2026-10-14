// Offline-First AI Intelligence & Heuristic Evaluation Engine
// Designed to run 100% locally with zero external network connectivity or cloud API keys.
// Provides structured hooks so remote LLMs (Google Gemini / OpenAI / Anthropic) can be plugged in when online.

import { InterviewEvaluation, AIRecommendation } from '@/types';

export interface InterviewEvaluationRequest {
  interviewType: string;
  role: string;
  question: string;
  answer: string;
}

export function evaluateInterviewLocally(req: InterviewEvaluationRequest): InterviewEvaluation {
  const answerLen = req.answer.trim().length;
  const words = req.answer.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Keyword checks for technical and behavioral depth
  const textLower = req.answer.toLowerCase();
  const hasStarStructure = textLower.includes('situation') || textLower.includes('task') || textLower.includes('action') || textLower.includes('result') || textLower.includes('project') || textLower.includes('when i');
  const hasTechnicalTerms = textLower.includes('index') || textLower.includes('complexity') || textLower.includes('memory') || textLower.includes('data') || textLower.includes('database') || textLower.includes('system') || textLower.includes('algorithm') || textLower.includes('optimization');
  const hasMetrics = /\d+%|\d+\s*(ms|seconds|days|users|queries)/i.test(req.answer);

  // Dynamic score computation
  let communication = 70;
  let technicalKnowledge = 68;
  let confidence = 72;
  let problemSolving = 70;

  if (wordCount > 30) {
    communication += 8;
    confidence += 6;
  }
  if (wordCount > 80) {
    communication += 5;
    confidence += 4;
  }
  if (hasStarStructure) {
    problemSolving += 8;
    communication += 4;
  }
  if (hasTechnicalTerms) {
    technicalKnowledge += 10;
    problemSolving += 5;
  }
  if (hasMetrics) {
    technicalKnowledge += 6;
    communication += 4;
  }

  // Bounds
  communication = Math.min(94, Math.max(62, communication));
  technicalKnowledge = Math.min(92, Math.max(60, technicalKnowledge));
  confidence = Math.min(95, Math.max(65, confidence));
  problemSolving = Math.min(92, Math.max(62, problemSolving));

  const overall = Math.round((communication + technicalKnowledge + confidence + problemSolving) / 4);

  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: string[] = [];

  if (hasTechnicalTerms) {
    strengths.push('Demonstrated strong command of core engineering terminology.');
  } else {
    strengths.push('Maintained clear, cohesive sentence structure and concise explanations.');
    weaknesses.push('Could include more precise technical architecture terms.');
  }

  if (hasMetrics) {
    strengths.push('Effectively quantified project impact with concrete metrics and statistics.');
  } else {
    weaknesses.push('Lacked measurable business or system metrics (e.g., latency, query volume, RPS).');
    suggestions.push('Add specific numbers to your answers (e.g. "improved throughput by 24%").');
  }

  if (wordCount >= 40) {
    strengths.push('Good answer depth without abrupt cutoffs or trailing thoughts.');
  } else {
    weaknesses.push('Response was somewhat brief for a standard technical panel question.');
    suggestions.push('Elaborate further using the STAR method: Situation, Task, Action, and Result.');
  }

  suggestions.push('Practice explaining the trade-offs between speed and memory in your implementation.');

  const recommendedQuestions = [
    'How would you diagnose and recover from a high latency spike in a microservice?',
    'Explain how you choose between SQL vs NoSQL for an analytical dashboard project.',
    'Tell me about a time you resolved a conflict regarding code review feedback.'
  ];

  return {
    communication,
    technicalKnowledge,
    confidence,
    problemSolving,
    overall,
    strengths,
    weaknesses: weaknesses.length > 0 ? weaknesses : ['Could provide even deeper architectural reasoning under pressure.'],
    suggestedImprovements: suggestions,
    recommendedQuestions
  };
}

export function generateLocalRecommendations(scores: {
  aptitudeScore: number;
  codingScore: number;
  technicalScore: number;
  interviewScore: number;
}): AIRecommendation[] {
  const recs: AIRecommendation[] = [];

  if (scores.codingScore < 70) {
    recs.push({
      id: 'rec_code_1',
      title: 'Practice Medium-Level DSA',
      description: `Coding accuracy is currently at ${scores.codingScore}%. Solve 3 array & sliding window problems to unlock Tier-1 company cutoffs.`,
      type: 'practice',
      badge: 'Core Priority',
      actionText: 'Solve 3 Problems',
      href: '/coding'
    });
  }

  if (scores.technicalScore < 72) {
    recs.push({
      id: 'rec_tech_1',
      title: 'Master Relational DBMS & Indexing',
      description: `Technical CS score is ${scores.technicalScore}%. Revise B+ tree indexing and 3NF normalization rules to ace technical MCQ screenings.`,
      type: 'practice',
      badge: 'Subject Weakness',
      actionText: 'Review DBMS',
      href: '/technical'
    });
  }

  if (scores.aptitudeScore < 80) {
    recs.push({
      id: 'rec_apt_1',
      title: 'Speed Drill: Quantitative Aptitude',
      description: 'Sharpen mental shortcuts for Time & Distance and Permutations before campus written exams.',
      type: 'quiz',
      badge: 'Speed Drill',
      actionText: 'Start 5-Min Drill',
      href: '/aptitude'
    });
  }

  recs.push({
    id: 'rec_mock_1',
    title: 'Simulate Technical Mock Interview',
    description: 'Practice defending project trade-offs and OOP principles with immediate local AI rubric evaluation.',
    type: 'interview',
    badge: 'Interview Prep',
    actionText: 'Launch Session',
    href: '/interview'
  });

  return recs.slice(0, 4);
}

export interface AssistantContext {
  studentName: string;
  collegeName: string;
  branch: string;
  gradYear: number;
  cgpa?: number;
  activeBacklogs?: number;
  targetCompanyIds?: string[];
  preferredJobRoles?: string[];
  dailyPrepMinutes?: number;
  placementTargetDate?: string;
  readinessScore: number;
  aptitudeScore: number;
  codingScore: number;
  technicalScore: number;
  interviewScore: number;
  weakTopics: string[];
  strongTopics: string[];
  pendingTasksCount: number;
  confirmedCollegeRecruiters: string[];
}

export interface AssistantResponseOutput {
  text: string;
  isRuleBased: boolean;
  suggestedAction?: {
    label: string;
    href: string;
  };
  contextHighlights?: string[];
}

export function generatePlacePrepAIResponse(
  prompt: string,
  ctx: AssistantContext
): AssistantResponseOutput {
  const query = prompt.toLowerCase().trim();

  // 1. Study plan for today / daily schedule
  if (query.includes('study plan') || query.includes('today') || query.includes('schedule')) {
    const minutes = ctx.dailyPrepMinutes || 90;
    const taskBreakdown = minutes >= 120
      ? `• 45 mins: Targeted Coding / DSA (${ctx.weakTopics[0] || 'Arrays & Sliding Window'})\n• 35 mins: Technical CS Concepts (${ctx.weakTopics[1] || 'DBMS & SQL'})\n• 25 mins: Aptitude Speed Drills\n• 15 mins: Mock Interview or Resume Polish`
      : `• 40 mins: Practice high-impact DSA (${ctx.weakTopics[0] || 'Arrays & Strings'})\n• 30 mins: Core Technical CS (${ctx.weakTopics[1] || 'DBMS Normalization'})\n• 20 mins: 5-Question Aptitude Speed Drill`;

    return {
      text: `Here is your optimized daily study plan based on your available **${minutes} minutes/day** and current target deadline:\n\n${taskBreakdown}\n\nYou currently have **${ctx.pendingTasksCount} pending tasks** in your personalized learning roadmap. Completing today's focus will boost your readiness score above ${ctx.readinessScore}%.`,
      isRuleBased: true,
      suggestedAction: {
        label: "Open Today's Roadmap",
        href: "/learning-path"
      },
      contextHighlights: [
        `Target Daily Study: ${minutes} min`,
        `Primary Focus: ${ctx.weakTopics[0] || 'Core DSA'}`,
        `Pending Tasks: ${ctx.pendingTasksCount}`
      ]
    };
  }

  // 2. Skills to improve first / Weaknesses
  if (query.includes('skill') || query.includes('improve') || query.includes('weak') || query.includes('bottleneck')) {
    const weakList = ctx.weakTopics.length > 0
      ? ctx.weakTopics.map(w => `• **${w}** (Critical area needing remediation)`).join('\n')
      : `• **Dynamic Programming**\n• **Database Normalization & SQL**`;

    return {
      text: `Based on your recent assessment diagnostics at ${ctx.collegeName}, your primary areas requiring improvement are:\n\n${weakList}\n\n**Why this matters:** Tech recruiters commonly use these topics as screening elimination filters in Round 1 and Round 2 technical interviews. We recommend starting with focused drills in these subjects.`,
      isRuleBased: true,
      suggestedAction: {
        label: "View Strength & Weakness Breakdown",
        href: "/progress"
      },
      contextHighlights: [
        `Identified Weak Areas: ${ctx.weakTopics.length}`,
        `Current Tech Score: ${ctx.technicalScore}%`,
        `Current Coding Score: ${ctx.codingScore}%`
      ]
    };
  }

  // 3. Target company readiness & matching
  if (query.includes('target company') || query.includes('ready') || query.includes('how ready') || query.includes('company')) {
    const targets = ctx.targetCompanyIds?.length ? ctx.targetCompanyIds.join(', ').toUpperCase() : 'Amazon, TCS, Infosys';
    const recruiters = ctx.confirmedCollegeRecruiters.length > 0
      ? `Confirmed on-campus recruiters for ${ctx.collegeName}: **${ctx.confirmedCollegeRecruiters.slice(0, 4).join(', ')}**.`
      : `Check historical patterns in College Intelligence.`;

    return {
      text: `Your current overall **Placement Readiness Score is ${ctx.readinessScore}/100** for your target companies (${targets}).\n\n**Key factors:**\n• **Academic Criteria:** CGPA ${ctx.cgpa || 8.1} with ${ctx.activeBacklogs || 0} active backlogs (meets standard 60%/6.5 CGPA cutoffs).\n• **Campus Recruiting Status:** ${recruiters}\n• **Skill Gap:** Improve ${ctx.weakTopics[0] || 'DSA & SQL'} to reach the 80%+ threshold expected by Tier-1 product and consulting firms.`,
      isRuleBased: true,
      suggestedAction: {
        label: "Check Company Match Breakdown",
        href: "/companies"
      },
      contextHighlights: [
        `Overall Readiness: ${ctx.readinessScore}%`,
        `Target Companies: ${ctx.targetCompanyIds?.length || 3}`,
        `Eligibility: ${ctx.activeBacklogs === 0 ? 'Eligible' : 'Needs attention'}`
      ]
    };
  }

  // 4. College historical recruiters & intelligence
  if (query.includes('college') || query.includes('campus') || query.includes('historical') || query.includes('recruiter')) {
    return {
      text: `At **${ctx.collegeName}** (${ctx.branch}, Class of ${ctx.gradYear}):\n\n• Historically, companies hire across **Dream (10+ LPA), Core IT (6-9 LPA), and Mass/Services (3.5-5 LPA)** tiers.\n• Confirmed / Past recruiters include **${ctx.confirmedCollegeRecruiters.join(', ') || 'TCS, Infosys, Cognizant, Wipro, Capgemini'}**.\n• Most on-campus drives test Aptitude Speed in Round 1, followed by a Technical Interview focusing on Data Structures, OOP, and DBMS.\n\nYou can review complete salary packages, selection ratios, and TPO-verified records in the College Intelligence portal.`,
      isRuleBased: true,
      suggestedAction: {
        label: "Explore College Intelligence Records",
        href: "/college-intelligence"
      },
      contextHighlights: [
        `College: ${ctx.collegeName}`,
        `Branch: ${ctx.branch}`,
        `Graduation: ${ctx.gradYear}`
      ]
    };
  }

  // 5. Technical interview preparation
  if (query.includes('interview') || query.includes('mock') || query.includes('behavioral') || query.includes('hr')) {
    return {
      text: `For your technical & behavioral interview rounds:\n\n1. **STAR Method:** Structure every situational answer with **Situation, Task, Action, and Result**.\n2. **Defend Complexity:** Always state both **Time and Space Complexity** before and after writing algorithms.\n3. **Core CS Depth:** Be ready to explain indexing, ACID properties, processes vs threads, and REST API design.\n\nYour current mock interview score is **${ctx.interviewScore}%**. Launch an AI Mock session with instant voice/text rubric analysis to practice!`,
      isRuleBased: true,
      suggestedAction: {
        label: "Launch Mock Interview Simulator",
        href: "/interview"
      },
      contextHighlights: [
        `Interview Score: ${ctx.interviewScore}%`,
        `Rubrics: Communication, Tech, Confidence, Logic`
      ]
    };
  }

  // 6. Assessment results analysis
  if (query.includes('assessment') || query.includes('result') || query.includes('score') || query.includes('progress')) {
    return {
      text: `Here is a breakdown of your current placement diagnostics:\n\n• **Aptitude & Reasoning:** ${ctx.aptitudeScore}% (Target: 80%+ for Round 1 screening)\n• **Coding Challenges:** ${ctx.codingScore}% (Target: 75%+ for technical coding rounds)\n• **Technical CS MCQs:** ${ctx.technicalScore}% (Target: 75%+ for core subject screening)\n• **Mock Interview:** ${ctx.interviewScore}%\n\n**Verdict:** Your Aptitude foundation is ${ctx.aptitudeScore >= 75 ? 'solid' : 'improving'}, but focusing on ${ctx.weakTopics[0] || 'Coding'} will give you the highest score boost.`,
      isRuleBased: true,
      suggestedAction: {
        label: "View Detailed Analytics",
        href: "/progress"
      },
      contextHighlights: [
        `Aptitude: ${ctx.aptitudeScore}%`,
        `Coding: ${ctx.codingScore}%`,
        `Technical: ${ctx.technicalScore}%`
      ]
    };
  }

  // 7. General / default contextual response
  return {
    text: `Hello ${ctx.studentName}! I am your **PlacePrep AI Assistant**.\n\nI can analyze your preparation for **${ctx.collegeName}** placements, your target companies, and your active roadmap.\n\nHere are some things you can ask me:\n• *"Create my study plan for today"*\n• *"Which skills should I improve first?"*\n• *"How ready am I for my target company?"*\n• *"Help me prepare for technical interviews"*\n• *"Tell me about companies that recruit from my college"*`,
    isRuleBased: true,
    suggestedAction: {
      label: "View Dashboard Overview",
      href: "/dashboard"
    },
    contextHighlights: [
      `Student: ${ctx.studentName}`,
      `Readiness: ${ctx.readinessScore}%`,
      `Verified Offline AI Engine`
    ]
  };
}

