import {
  InterviewEvaluation,
  AIRecommendation,
  GeneratedStudyPlan,
  PlanTaskItem,
  DaySchedule,
  WeekSchedule,
  AIChatMessage
} from '@/types';

export interface InterviewEvaluationRequest {
  interviewType: string;
  role: string;
  question: string;
  answer: string;
}

export function evaluateInterviewLocally(req: InterviewEvaluationRequest): InterviewEvaluation {
  const words = req.answer.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const textLower = req.answer.toLowerCase();
  const hasStarStructure = textLower.includes('situation') || textLower.includes('task') || textLower.includes('action') || textLower.includes('result') || textLower.includes('project') || textLower.includes('when i');
  const hasTechnicalTerms = textLower.includes('index') || textLower.includes('complexity') || textLower.includes('memory') || textLower.includes('data') || textLower.includes('database') || textLower.includes('system') || textLower.includes('algorithm') || textLower.includes('optimization');
  const hasMetrics = /\d+%|\d+\s*(ms|seconds|days|users|queries)/i.test(req.answer);

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
  plan?: GeneratedStudyPlan;
}

/**
 * Natural language duration parser
 * Handles expressions like "2 hours", "two hours", "1 hour", "an hour", "30 mins", "90 minutes", "1.5 hours"
 */
export function parseDurationMinutes(query: string): number | null {
  const q = query.toLowerCase();

  const hrMatch = q.match(/(\d+(?:\.\d+)?)\s*(?:hours?|hrs?|h)\b/);
  const minMatch = q.match(/(\d+)\s*(?:minutes?|mins?|m)\b/);

  if (hrMatch && minMatch) {
    return Math.round(parseFloat(hrMatch[1]) * 60 + parseInt(minMatch[1], 10));
  }
  if (hrMatch) {
    return Math.round(parseFloat(hrMatch[1]) * 60);
  }
  if (minMatch) {
    return parseInt(minMatch[1], 10);
  }

  // Word-based numbers
  if (q.includes('half an hour') || q.includes('half hour')) return 30;
  if (q.includes('one and a half hour') || q.includes('1.5 hour')) return 90;
  if (q.includes('two and a half hour') || q.includes('2.5 hour')) return 150;
  if (q.includes('one hour') || q.includes('an hour')) return 60;
  if (q.includes('two hours')) return 120;
  if (q.includes('three hours')) return 180;
  if (q.includes('four hours')) return 240;
  if (q.includes('five hours')) return 300;
  if (q.includes('forty five min') || q.includes('45 min')) return 45;
  if (q.includes('ninety min') || q.includes('90 min')) return 90;

  return null;
}

/**
 * Helper to preserve completed tasks across plan revisions
 */
function preserveCompletedTasks(existingPlan: GeneratedStudyPlan | undefined, newTasks: PlanTaskItem[]) {
  if (!existingPlan) return;
  const completedTitles = new Set<string>();

  const collect = (tasks?: PlanTaskItem[]) => {
    tasks?.forEach(t => {
      if (t.completed) completedTitles.add(t.title.toLowerCase().trim());
    });
  };

  collect(existingPlan.tasks);
  existingPlan.days?.forEach(d => collect(d.tasks));
  existingPlan.weeks?.forEach(w => w.days.forEach(d => collect(d.tasks)));

  newTasks.forEach(t => {
    if (completedTitles.has(t.title.toLowerCase().trim())) {
      t.completed = true;
    }
  });
}

/**
 * Builds Today's Structured Plan with time slots, categories, measurable targets, and breaks
 */
export function buildTodayPlan(
  minutes: number,
  ctx: AssistantContext,
  company?: string,
  isExplicitDuration: boolean = true,
  existingPlan?: GeneratedStudyPlan,
  adjustmentNote?: string
): GeneratedStudyPlan {
  const planId = existingPlan?.id || `plan_today_${Date.now()}`;
  const weakDsa = ctx.weakTopics[0] || 'Arrays & Sliding Window';
  const weakTech = ctx.weakTopics[1] || 'DBMS & SQL Normalization';
  const targetComp = company || (ctx.targetCompanyIds?.[0] ? ctx.targetCompanyIds[0].toUpperCase() : 'Tier-1 Tech');

  let tasks: PlanTaskItem[] = [];

  if (minutes <= 60) {
    const dsaTime = Math.max(25, Math.round(minutes * 0.5));
    const aptTime = Math.max(20, Math.round(minutes * 0.35));
    const revTime = Math.max(5, minutes - dsaTime - aptTime);

    tasks = [
      {
        id: `${planId}_t1`,
        timeSlot: `Slot 1 (0 to ${dsaTime} min)`,
        durationMinutes: dsaTime,
        title: `Targeted Coding: ${weakDsa}`,
        category: 'Coding',
        description: `Solve 1 Medium problem focusing on boundary conditions and O(N) space/time efficiency for ${targetComp}.`,
        targetGoal: '1 problem solved with all test cases passing',
        completed: false,
        moduleHref: '/coding'
      },
      {
        id: `${planId}_t2`,
        timeSlot: `Slot 2 (${dsaTime} to ${dsaTime + aptTime} min)`,
        durationMinutes: aptTime,
        title: 'Speed Aptitude: Quant & Logical Sprint',
        category: 'Aptitude',
        description: 'Complete 6 rapid-fire questions on Time & Work or Syllogisms under strict timed conditions.',
        targetGoal: '6 timed questions with 80%+ accuracy',
        completed: false,
        moduleHref: '/aptitude'
      },
      {
        id: `${planId}_t3`,
        timeSlot: `Slot 3 (${dsaTime + aptTime} to ${minutes} min)`,
        durationMinutes: revTime,
        title: 'Daily Synthesis & Error Log Review',
        category: 'Revision',
        description: 'Record any tricky edge cases and formula shortcuts into your review notebook.',
        targetGoal: 'Log at least 2 key algorithmic takeaways',
        completed: false,
        moduleHref: '/progress'
      }
    ];
  } else if (minutes <= 120) {
    const dsaTime = 40;
    const techTime = 25;
    const breakTime = 10;
    const aptTime = 25;
    const itvTime = Math.max(10, minutes - dsaTime - techTime - breakTime - aptTime);

    tasks = [
      {
        id: `${planId}_t1`,
        timeSlot: 'Slot 1 (09:00 - 09:40)',
        durationMinutes: dsaTime,
        title: `Targeted DSA Sprint: ${weakDsa}`,
        category: 'Coding',
        description: `Implement optimal solutions for 2 LeetCode-style medium questions frequently asked by ${targetComp}.`,
        targetGoal: '2 Medium problems solved & complexity analyzed',
        completed: false,
        moduleHref: '/coding'
      },
      {
        id: `${planId}_t2`,
        timeSlot: 'Slot 2 (09:40 - 10:05)',
        durationMinutes: techTime,
        title: `Core CS Mastery: ${weakTech}`,
        category: 'Technical',
        description: 'Deep-dive into high-yield technical interview concepts (e.g. 3NF/BCNF anomalies, indexing, ACID transactions).',
        targetGoal: 'Answer 5 technical screening questions correctly',
        completed: false,
        moduleHref: '/technical'
      },
      {
        id: `${planId}_t3`,
        timeSlot: 'Slot 3 (10:05 - 10:15)',
        durationMinutes: breakTime,
        title: 'Cognitive Recovery & Hydration Break',
        category: 'Break',
        description: 'Step away from screen, hydrate, and relax your eyes to maintain peak cognitive focus.',
        targetGoal: 'Complete 10 minutes away from digital displays',
        completed: false
      },
      {
        id: `${planId}_t4`,
        timeSlot: 'Slot 4 (10:15 - 10:40)',
        durationMinutes: aptTime,
        title: 'Quantitative & Logical Aptitude Drills',
        category: 'Aptitude',
        description: 'Solve 8 timed speed questions focusing on mental shortcuts for campus placement written tests.',
        targetGoal: '8 questions completed with under 90s per question',
        completed: false,
        moduleHref: '/aptitude'
      },
      {
        id: `${planId}_t5`,
        timeSlot: `Slot 5 (10:40 - ${10 + Math.floor((40 + itvTime) / 60)}:${String((40 + itvTime) % 60).padStart(2, '0')})`,
        durationMinutes: itvTime,
        title: 'Interview STAR Drill & Project Defense',
        category: 'Interview',
        description: 'Formulate a structured STAR (Situation, Task, Action, Result) behavioral response for your main resume project.',
        targetGoal: 'Practice 1 complete STAR story for HR/Technical rounds',
        completed: false,
        moduleHref: '/interview'
      }
    ];
  } else {
    // > 120 mins
    const dsaTime = Math.round(minutes * 0.35);
    const techTime = Math.round(minutes * 0.22);
    const break1 = 15;
    const aptTime = Math.round(minutes * 0.2);
    const break2 = 10;
    const itvTime = Math.max(15, minutes - dsaTime - techTime - break1 - aptTime - break2);

    tasks = [
      {
        id: `${planId}_t1`,
        timeSlot: 'Block 1',
        durationMinutes: dsaTime,
        title: `Intensive Algorithm Practice: ${weakDsa}`,
        category: 'Coding',
        description: `Solve 3 Medium/Hard problems focusing on optimal data structures, edge cases, and recursive vs iterative trade-offs for ${targetComp}.`,
        targetGoal: '3 Medium problems fully implemented and benchmarked',
        completed: false,
        moduleHref: '/coding'
      },
      {
        id: `${planId}_t2`,
        timeSlot: 'Block 2',
        durationMinutes: break1,
        title: 'Physical Stretch & Screen Break',
        category: 'Break',
        description: 'Reset visual focus and perform light stretches to sustain focus across extended sessions.',
        targetGoal: '15-minute physical walk/stretch',
        completed: false
      },
      {
        id: `${planId}_t3`,
        timeSlot: 'Block 3',
        durationMinutes: techTime,
        title: `Core CS System Concepts: ${weakTech}`,
        category: 'Technical',
        description: 'Study indexing architectures, transaction isolation levels, and process synchronization with diagrams.',
        targetGoal: 'Diagram 2 system concepts & test with 8 MCQs',
        completed: false,
        moduleHref: '/technical'
      },
      {
        id: `${planId}_t4`,
        timeSlot: 'Block 4',
        durationMinutes: break2,
        title: 'Short Hydration Break',
        category: 'Break',
        description: 'Refill water and reset posture before speed drills.',
        targetGoal: '10-minute mental rest',
        completed: false
      },
      {
        id: `${planId}_t5`,
        timeSlot: 'Block 5',
        durationMinutes: aptTime,
        title: 'Aptitude Speed Test & Pattern Recognition',
        category: 'Aptitude',
        description: 'Complete 12 high-frequency campus placement aptitude questions with strict 1-minute time constraints.',
        targetGoal: '12 questions solved with >= 85% accuracy',
        completed: false,
        moduleHref: '/aptitude'
      },
      {
        id: `${planId}_t6`,
        timeSlot: 'Block 6',
        durationMinutes: itvTime,
        title: 'AI Mock Interview & Resume Defense',
        category: 'Interview',
        description: 'Practice answering 2 technical behavioral questions using the STAR framework with local rubric evaluation.',
        targetGoal: 'Complete 1 simulated AI mock session',
        completed: false,
        moduleHref: '/interview'
      }
    ];
  }

  preserveCompletedTasks(existingPlan, tasks);

  const assumptions: string[] = [];
  if (isExplicitDuration) {
    assumptions.push(`Custom duration allocated: ${minutes} minutes as requested.`);
  } else {
    assumptions.push(`Default duration assumed: ${minutes} minutes based on your profile preference (${ctx.dailyPrepMinutes || 90}m).`);
  }
  if (company) {
    assumptions.push(`Targeted towards ${company} campus recruitment pattern.`);
  }
  if (adjustmentNote) {
    assumptions.push(adjustmentNote);
  }

  return {
    id: planId,
    type: 'today',
    title: `Today's Study Schedule (${minutes} mins)`,
    createdAt: new Date().toISOString(),
    totalDurationMinutes: minutes,
    assumptions,
    targetCompanies: company ? [company] : (ctx.targetCompanyIds?.map(c => c.toUpperCase()) || ['Tier-1 Tech']),
    weakTopicsAddressed: [weakDsa, weakTech],
    tasks,
    summaryNote: `Focusing on ${weakDsa} and ${weakTech}. Check off tasks as you complete them to track your progress!`
  };
}

/**
 * Builds a 7-day Weekly Schedule with distinct daily themes and realistic distribution
 */
export function buildWeeklyPlan(
  ctx: AssistantContext,
  company?: string,
  existingPlan?: GeneratedStudyPlan,
  adjustmentNote?: string
): GeneratedStudyPlan {
  const planId = existingPlan?.id || `plan_weekly_${Date.now()}`;
  const targetComp = company || (ctx.targetCompanyIds?.[0] ? ctx.targetCompanyIds[0].toUpperCase() : 'Campus Placement Drives');
  const weakDsa = ctx.weakTopics[0] || 'Arrays & Sliding Window';
  const weakTech = ctx.weakTopics[1] || 'DBMS & SQL';

  const days: DaySchedule[] = [
    {
      dayNumber: 1,
      dayName: 'Day 1: Monday',
      focusTheme: `DSA Foundations & ${weakDsa}`,
      tasks: [
        {
          id: `${planId}_d1_t1`,
          timeSlot: '09:00 - 09:45',
          durationMinutes: 45,
          title: `Two Pointers & Sliding Window Practice (${weakDsa})`,
          category: 'Coding',
          description: 'Solve 2 LeetCode medium questions with clean complexity bounds.',
          targetGoal: '2 problems solved & verified',
          completed: false,
          moduleHref: '/coding'
        },
        {
          id: `${planId}_d1_t2`,
          timeSlot: '09:45 - 10:15',
          durationMinutes: 30,
          title: 'Time & Space Complexity Proofs',
          category: 'Technical',
          description: 'Analyze master theorem and recursion tree methods for Big-O notation.',
          targetGoal: 'Complete 5 complexity MCQs',
          completed: false,
          moduleHref: '/technical'
        },
        {
          id: `${planId}_d1_t3`,
          timeSlot: '10:15 - 10:30',
          durationMinutes: 15,
          title: 'Active Recall & Error Logging',
          category: 'Revision',
          description: 'Document tricky pointer edge cases encountered during coding.',
          targetGoal: 'Log at least 2 edge cases',
          completed: false
        }
      ]
    },
    {
      dayNumber: 2,
      dayName: 'Day 2: Tuesday',
      focusTheme: `Relational Databases & ${weakTech}`,
      tasks: [
        {
          id: `${planId}_d2_t1`,
          timeSlot: '09:00 - 09:45',
          durationMinutes: 45,
          title: 'Database Normalization (1NF, 2NF, 3NF, BCNF)',
          category: 'Technical',
          description: 'Master functional dependencies, loss-less decomposition, and dependency preservation.',
          targetGoal: 'Decompose 3 unnormalized schemas correctly',
          completed: false,
          moduleHref: '/technical'
        },
        {
          id: `${planId}_d2_t2`,
          timeSlot: '09:45 - 10:15',
          durationMinutes: 30,
          title: 'Complex SQL Queries & Subqueries',
          category: 'Technical',
          description: 'Write queries involving self-joins, window functions (ROW_NUMBER, DENSE_RANK), and GROUP BY.',
          targetGoal: 'Solve 4 SQL queries without syntax errors',
          completed: false,
          moduleHref: '/technical'
        },
        {
          id: `${planId}_d2_t3`,
          timeSlot: '10:15 - 10:30',
          durationMinutes: 15,
          title: 'Quick Aptitude Speed Drill',
          category: 'Aptitude',
          description: '5 mental arithmetic questions on percentages and ratios.',
          targetGoal: '5 questions answered in under 6 minutes',
          completed: false,
          moduleHref: '/aptitude'
        }
      ]
    },
    {
      dayNumber: 3,
      dayName: 'Day 3: Wednesday',
      focusTheme: 'Quantitative & Logical Aptitude Sprint',
      tasks: [
        {
          id: `${planId}_d3_t1`,
          timeSlot: '09:00 - 09:45',
          durationMinutes: 45,
          title: 'Time, Speed & Distance / Work & Wages',
          category: 'Aptitude',
          description: 'Master relative velocity, boats & streams, and efficiency formulas.',
          targetGoal: '10 problems completed with >= 80% accuracy',
          completed: false,
          moduleHref: '/aptitude'
        },
        {
          id: `${planId}_d3_t2`,
          timeSlot: '09:45 - 10:15',
          durationMinutes: 30,
          title: 'Logical Deduction: Syllogisms & Seating Arrangement',
          category: 'Aptitude',
          description: 'Practice Venn diagram method for syllogisms and circular seating puzzles.',
          targetGoal: 'Solve 2 complex puzzle sets',
          completed: false,
          moduleHref: '/aptitude'
        },
        {
          id: `${planId}_d3_t3`,
          timeSlot: '10:15 - 10:30',
          durationMinutes: 15,
          title: 'Rest & Cognitive Refresh',
          category: 'Break',
          description: 'Light walking and eye relaxation.',
          targetGoal: '15m screen-free rest',
          completed: false
        }
      ]
    },
    {
      dayNumber: 4,
      dayName: 'Day 4: Thursday',
      focusTheme: 'Trees, Recursion & Binary Search',
      tasks: [
        {
          id: `${planId}_d4_t1`,
          timeSlot: '09:00 - 09:50',
          durationMinutes: 50,
          title: 'Binary Tree Traversals (BFS & DFS)',
          category: 'Coding',
          description: 'Implement Level Order, Inorder, and Lowest Common Ancestor (LCA).',
          targetGoal: 'Implement 2 tree problems from scratch',
          completed: false,
          moduleHref: '/coding'
        },
        {
          id: `${planId}_d4_t2`,
          timeSlot: '09:50 - 10:20',
          durationMinutes: 30,
          title: 'Binary Search on Solution Space',
          category: 'Coding',
          description: 'Solve allocation problems (e.g. painter partition, book allocation).',
          targetGoal: '1 binary search optimization problem',
          completed: false,
          moduleHref: '/coding'
        },
        {
          id: `${planId}_d4_t3`,
          timeSlot: '10:20 - 10:30',
          durationMinutes: 10,
          title: 'Flashcard Formula Review',
          category: 'Revision',
          description: 'Review tree height vs depth definitions and BST property invariants.',
          targetGoal: 'Review 10 flashcards',
          completed: false
        }
      ]
    },
    {
      dayNumber: 5,
      dayName: 'Day 5: Friday',
      focusTheme: 'Operating Systems & Computer Networks',
      tasks: [
        {
          id: `${planId}_d5_t1`,
          timeSlot: '09:00 - 09:40',
          durationMinutes: 40,
          title: 'Process Management, Threads & Deadlocks',
          category: 'Technical',
          description: 'Understand 4 Coffman conditions for deadlock, race conditions, and mutex vs semaphores.',
          targetGoal: 'Diagram banker algorithm & review 6 MCQs',
          completed: false,
          moduleHref: '/technical'
        },
        {
          id: `${planId}_d5_t2`,
          timeSlot: '09:40 - 10:10',
          durationMinutes: 30,
          title: 'TCP/IP, 3-Way Handshake & HTTP/HTTPS',
          category: 'Technical',
          description: 'Study socket communication, OSI layers, DNS resolution, and TLS handshakes.',
          targetGoal: 'Complete 5 networking screening MCQs',
          completed: false,
          moduleHref: '/technical'
        },
        {
          id: `${planId}_d5_t3`,
          timeSlot: '10:10 - 10:30',
          durationMinutes: 20,
          title: 'Behavioral Interview STAR Story Prep',
          category: 'Interview',
          description: 'Draft your answer for "Tell me about a challenging technical bug you resolved".',
          targetGoal: '1 fully formatted STAR response',
          completed: false,
          moduleHref: '/interview'
        }
      ]
    },
    {
      dayNumber: 6,
      dayName: 'Day 6: Saturday',
      focusTheme: 'Full Mock Assessment & Company Simulation',
      tasks: [
        {
          id: `${planId}_d6_t1`,
          timeSlot: '10:00 - 11:00',
          durationMinutes: 60,
          title: `Timed Comprehensive Placement Test (${targetComp} format)`,
          category: 'Aptitude',
          description: 'Simulate full Round 1 written test: 20 Aptitude + 15 Core CS MCQs under strict time limits.',
          targetGoal: 'Complete test & achieve >= 75% score',
          completed: false,
          moduleHref: '/aptitude'
        },
        {
          id: `${planId}_d6_t2`,
          timeSlot: '11:15 - 12:00',
          durationMinutes: 45,
          title: 'Live Coding Challenge Sprint',
          category: 'Coding',
          description: 'Solve 2 timed algorithmic challenges within 45 minutes without looking at solutions.',
          targetGoal: 'Pass all test cases within time limit',
          completed: false,
          moduleHref: '/coding'
        },
        {
          id: `${planId}_d6_t3`,
          timeSlot: '12:00 - 12:20',
          durationMinutes: 20,
          title: 'Test Performance Diagnostics & Error Analysis',
          category: 'Revision',
          description: 'Examine incorrect answers to identify recurring weak patterns.',
          targetGoal: 'Annotate every wrong answer with correction note',
          completed: false,
          moduleHref: '/progress'
        }
      ]
    },
    {
      dayNumber: 7,
      dayName: 'Day 7: Sunday',
      focusTheme: 'Weekly Review, Retest Weak Topics & Reset',
      tasks: [
        {
          id: `${planId}_d7_t1`,
          timeSlot: '10:00 - 10:45',
          durationMinutes: 45,
          title: 'Remediate Weak Subject Identified in Mock',
          category: 'Technical',
          description: `Target re-learning for ${weakTech} or test questions missed during Saturday mock.`,
          targetGoal: 'Solve 5 re-test questions correctly',
          completed: false,
          moduleHref: '/technical'
        },
        {
          id: `${planId}_d7_t2`,
          timeSlot: '10:45 - 11:15',
          durationMinutes: 30,
          title: 'AI Mock Interview Simulator',
          category: 'Interview',
          description: 'Complete one 15-minute mock interview session with rubric evaluation.',
          targetGoal: 'Score >= 75% on communication and technical rubrics',
          completed: false,
          moduleHref: '/interview'
        },
        {
          id: `${planId}_d7_t3`,
          timeSlot: '11:15 - 11:30',
          durationMinutes: 15,
          title: 'Weekly Retrospective & Next Week Schedule Check',
          category: 'Revision',
          description: 'Review overall readiness gains and prepare goals for the upcoming week.',
          targetGoal: 'Review overall readiness index',
          completed: false,
          moduleHref: '/dashboard'
        }
      ]
    }
  ];

  // Preserve completed tasks across days
  days.forEach(d => preserveCompletedTasks(existingPlan, d.tasks));

  const assumptions = [
    `Structured 7-day preparation cycle designed for ${targetComp} patterns.`,
    'Realistic workload distribution: DSA (35%), Core CS (25%), Aptitude (20%), Mock Assessments (20%).'
  ];
  if (adjustmentNote) assumptions.push(adjustmentNote);

  return {
    id: planId,
    type: 'weekly',
    title: '7-Day Placement Preparation Schedule',
    createdAt: new Date().toISOString(),
    assumptions,
    targetCompanies: company ? [company] : (ctx.targetCompanyIds?.map(c => c.toUpperCase()) || ['Tier-1 Tech']),
    weakTopicsAddressed: [weakDsa, weakTech],
    days,
    summaryNote: 'Work through each day systematically. Each day balances theory, coding, aptitude, and revision.'
  };
}

/**
 * Builds a 30-Day (4-Week) Milestone-Driven Placement Roadmap
 * Note: Clearly disclaims that placement/score outcomes are not guaranteed.
 */
export function buildMonthlyPlan(
  ctx: AssistantContext,
  company?: string,
  existingPlan?: GeneratedStudyPlan
): GeneratedStudyPlan {
  const planId = existingPlan?.id || `plan_monthly_${Date.now()}`;
  const targetComp = company || (ctx.targetCompanyIds?.[0] ? ctx.targetCompanyIds[0].toUpperCase() : 'Tier-1 & Core IT Companies');
  const weakDsa = ctx.weakTopics[0] || 'Arrays & Sliding Window';
  const weakTech = ctx.weakTopics[1] || 'Relational DBMS & SQL';

  const weeks: WeekSchedule[] = [
    {
      weekNumber: 1,
      weekTheme: 'Foundational Problem Solving & Quantitative Mastery',
      milestone: 'Solve 20 fundamental DSA questions and achieve 75%+ in Quantitative Aptitude diagnostic.',
      days: [
        {
          dayNumber: 1,
          dayName: 'Week 1 Focus',
          focusTheme: `Arrays, Two Pointers & Basic Math (${weakDsa})`,
          tasks: [
            {
              id: `${planId}_w1_t1`,
              durationMinutes: 60,
              title: 'Arrays & Two Pointers Fundamentals',
              category: 'Coding',
              description: 'Prefix sums, sliding window, and two-pointer patterns.',
              targetGoal: '5 Medium problems solved',
              completed: false,
              moduleHref: '/coding'
            },
            {
              id: `${planId}_w1_t2`,
              durationMinutes: 45,
              title: 'Number Theory & Percentages / Ratios',
              category: 'Aptitude',
              description: 'LCM/HCF shortcuts, divisibility rules, and percentage change equations.',
              targetGoal: '15 speed drills with 85%+ accuracy',
              completed: false,
              moduleHref: '/aptitude'
            },
            {
              id: `${planId}_w1_t3`,
              durationMinutes: 30,
              title: 'Time & Space Complexity Formalization',
              category: 'Technical',
              description: 'Big-O, Big-Omega, Big-Theta, and auxiliary space analysis.',
              targetGoal: 'Analyze complexity for all solved code',
              completed: false,
              moduleHref: '/technical'
            }
          ]
        }
      ]
    },
    {
      weekNumber: 2,
      weekTheme: 'Advanced Data Structures & Relational Databases',
      milestone: 'Master Trees, Linked Lists, Stack/Queue and 3NF/BCNF Database Normalization.',
      days: [
        {
          dayNumber: 2,
          dayName: 'Week 2 Focus',
          focusTheme: `Trees, Stacks & ${weakTech}`,
          tasks: [
            {
              id: `${planId}_w2_t1`,
              durationMinutes: 60,
              title: 'Trees & Monotonic Stacks',
              category: 'Coding',
              description: 'Binary Tree traversals, LCA, next greater element, and valid parentheses.',
              targetGoal: '6 Medium problems solved',
              completed: false,
              moduleHref: '/coding'
            },
            {
              id: `${planId}_w2_t2`,
              durationMinutes: 45,
              title: 'DBMS Normalization & Indexing Deep Dive',
              category: 'Technical',
              description: 'B+ Tree indexing vs Hash indexing, 3NF vs BCNF, and ACID transaction isolation.',
              targetGoal: 'Complete 10 high-frequency DBMS interview MCQs',
              completed: false,
              moduleHref: '/technical'
            },
            {
              id: `${planId}_w2_t3`,
              durationMinutes: 30,
              title: 'Permutations, Combinations & Probability',
              category: 'Aptitude',
              description: 'Conditional probability, dice/card problems, and arrangement logic.',
              targetGoal: '10 problems completed in under 15 minutes',
              completed: false,
              moduleHref: '/aptitude'
            }
          ]
        }
      ]
    },
    {
      weekNumber: 3,
      weekTheme: 'Core Systems (OS, Networks, OOP) & Mid-Term Sprints',
      milestone: 'Pass comprehensive technical CS fundamentals screening and build 2 system diagrams.',
      days: [
        {
          dayNumber: 3,
          dayName: 'Week 3 Focus',
          focusTheme: 'OS, Networks, OOP & Dynamic Programming Intro',
          tasks: [
            {
              id: `${planId}_w3_t1`,
              durationMinutes: 60,
              title: 'Dynamic Programming: 1D & Knapsack Patterns',
              category: 'Coding',
              description: 'Memoization vs Tabulation, climbing stairs, house robber, and 0/1 knapsack.',
              targetGoal: '4 DP problems solved & state transitions explained',
              completed: false,
              moduleHref: '/coding'
            },
            {
              id: `${planId}_w3_t2`,
              durationMinutes: 45,
              title: 'Operating Systems & Concurrency Deep-Dive',
              category: 'Technical',
              description: 'Virtual memory, paging, thrashing, semaphores, and inter-process communication.',
              targetGoal: 'Score >= 80% on OS diagnostic test',
              completed: false,
              moduleHref: '/technical'
            },
            {
              id: `${planId}_w3_t3`,
              durationMinutes: 30,
              title: 'Object-Oriented Design & Clean Code Principles',
              category: 'Technical',
              description: 'SOLID principles, Singleton, Factory pattern, and interface segregation.',
              targetGoal: 'Implement 1 design pattern in your chosen language',
              completed: false,
              moduleHref: '/technical'
            }
          ]
        }
      ]
    },
    {
      weekNumber: 4,
      weekTheme: 'Company Drive Simulations, Mock Interviews & Final Polish',
      milestone: 'Simulate 2 full company recruitment test drives and 2 AI mock interviews with 80%+ readiness.',
      days: [
        {
          dayNumber: 4,
          dayName: 'Week 4 Focus',
          focusTheme: `Full Drive Simulation for ${targetComp}`,
          tasks: [
            {
              id: `${planId}_w4_t1`,
              durationMinutes: 60,
              title: `Simulated Company Test Drive (${targetComp} Pattern)`,
              category: 'Aptitude',
              description: 'Timed full assessment: Aptitude + Coding + Core CS MCQs.',
              targetGoal: 'Achieve >= 75% overall composite score',
              completed: false,
              moduleHref: '/aptitude'
            },
            {
              id: `${planId}_w4_t2`,
              durationMinutes: 45,
              title: 'AI Technical Mock Interview Simulation',
              category: 'Interview',
              description: 'Defend resume projects, discuss system trade-offs, and practice STAR method.',
              targetGoal: 'Achieve >= 75% on Communication & Tech rubrics',
              completed: false,
              moduleHref: '/interview'
            },
            {
              id: `${planId}_w4_t3`,
              durationMinutes: 30,
              title: 'Resume & Project Architecture Review',
              category: 'Interview',
              description: 'Verify bullet points use strong action verbs and concrete impact metrics.',
              targetGoal: 'Polish resume metrics & review readiness index',
              completed: false,
              moduleHref: '/resume'
            }
          ]
        }
      ]
    }
  ];

  weeks.forEach(w => {
    w.days.forEach(d => preserveCompletedTasks(existingPlan, d.tasks));
  });

  return {
    id: planId,
    type: 'monthly',
    title: '30-Day Placement Preparation Roadmap',
    createdAt: new Date().toISOString(),
    assumptions: [
      `Progressive 4-week roadmap calibrated for ${targetComp} eligibility standards.`,
      'Weekly milestones advance from foundational coding to system architecture and mock drives.',
      'Note: Placement outcomes depend on dedication, consistent practice, and interview dynamics. No specific placement offer or test score is guaranteed.'
    ],
    targetCompanies: company ? [company] : (ctx.targetCompanyIds?.map(c => c.toUpperCase()) || ['Tier-1 Tech']),
    weakTopicsAddressed: [weakDsa, weakTech],
    weeks,
    summaryNote: 'Follow this 30-day progression week-by-week. Review milestones at the end of each week.'
  };
}

/**
 * Detects company names inside arbitrary user prompts
 */
function extractTargetCompany(query: string): string | undefined {
  const q = query.toLowerCase();
  if (q.includes('tcs')) return 'TCS';
  if (q.includes('amazon')) return 'Amazon';
  if (q.includes('infosys')) return 'Infosys';
  if (q.includes('wipro')) return 'Wipro';
  if (q.includes('cognizant') || q.includes('cts')) return 'Cognizant';
  if (q.includes('accenture')) return 'Accenture';
  if (q.includes('google')) return 'Google';
  if (q.includes('microsoft')) return 'Microsoft';
  if (q.includes('capgemini')) return 'Capgemini';
  if (q.includes('deloitte')) return 'Deloitte';
  return undefined;
}

/**
 * Handles follow-up adjustments on existing active plans while preserving completed tasks
 */
function handleFollowUpAdjustment(
  query: string,
  ctx: AssistantContext,
  activePlans?: {
    today?: GeneratedStudyPlan;
    weekly?: GeneratedStudyPlan;
    monthly?: GeneratedStudyPlan;
  }
): AssistantResponseOutput | null {
  const q = query.toLowerCase();

  // 1. Follow-up: "Make tomorrow's coding session shorter" / "Make coding shorter"
  if (
    (q.includes('tomorrow') || q.includes('coding')) &&
    (q.includes('shorter') || q.includes('reduce') || q.includes('less time') || q.includes('cut'))
  ) {
    const weeklyPlan = activePlans?.weekly || buildWeeklyPlan(ctx);
    const day2 = weeklyPlan.days?.find(d => d.dayNumber === 2);

    if (day2) {
      day2.tasks = day2.tasks.map(t => {
        if (t.category === 'Coding' || t.title.toLowerCase().includes('coding') || t.title.toLowerCase().includes('sql') || t.title.toLowerCase().includes('database')) {
          const newDur = Math.max(15, Math.round(t.durationMinutes * 0.6));
          return {
            ...t,
            durationMinutes: newDur,
            title: `${t.title} (Shortened to ${newDur}m)`,
            timeSlot: `Adjusted (${newDur}m focus)`
          };
        }
        return t;
      });

      const updatedWeekly: GeneratedStudyPlan = {
        ...weeklyPlan,
        id: weeklyPlan.id,
        assumptions: [
          ...weeklyPlan.assumptions,
          'Adjusted: Tomorrow\'s technical/coding session shortened as requested. Completed tasks preserved.'
        ],
        days: weeklyPlan.days
      };

      return {
        text: `Got it! I have updated tomorrow's schedule in your **7-Day Weekly Plan**:\n\n• Shortened the intensive coding/technical session to **25 minutes**.\n• Preserved all your completed tasks and existing progress.\n• Maintained the core problem-solving objective so your preparation stays on track.`,
        isRuleBased: true,
        plan: updatedWeekly,
        contextHighlights: [
          'Session Shortened: 25 mins',
          'Completed Tasks Preserved',
          'Weekly Schedule Updated'
        ],
        suggestedAction: {
          label: 'View Learning Path',
          href: '/learning-path'
        }
      };
    }
  }

  // 2. Follow-up: Adjusting today's duration: e.g. "Make today's plan 1 hour", "I only have one hour today"
  const parsedMin = parseDurationMinutes(query);
  if (
    parsedMin &&
    (q.includes('today') || q.includes('plan') || q.includes('schedule') || q.includes('only have') || q.includes('got') || q.includes('make'))
  ) {
    const company = extractTargetCompany(query);
    const adjustedToday = buildTodayPlan(parsedMin, ctx, company, true, activePlans?.today, `Adjusted to ${parsedMin} minutes from previous plan.`);

    return {
      text: `Understood! I've regenerated your **Today's Study Plan** for **${parsedMin} minutes**${company ? ` tailored for ${company}` : ''}.\n\n• Tasks and time slots have been balanced across DSA, Aptitude, and Core CS.\n• Any tasks you already completed have been preserved.\n\nCheck off tasks as you finish them:`,
      isRuleBased: true,
      plan: adjustedToday,
      contextHighlights: [
        `Duration: ${parsedMin} mins`,
        `Focus: ${adjustedToday.weakTopicsAddressed[0]}`,
        'Interactive Checklist'
      ],
      suggestedAction: {
        label: 'Open Coding Module',
        href: '/coding'
      }
    };
  }

  return null;
}

/**
 * Main AI Assistant Response Generator
 * Handles free-text questions, greetings, plan generation, CS concepts, company guides, and fallbacks
 */
export function generatePlacePrepAIResponse(
  prompt: string,
  ctx: AssistantContext,
  conversationHistory?: AIChatMessage[],
  activePlans?: {
    today?: GeneratedStudyPlan;
    weekly?: GeneratedStudyPlan;
    monthly?: GeneratedStudyPlan;
  }
): AssistantResponseOutput {
  const query = prompt.toLowerCase().trim();
  const company = extractTargetCompany(query);

  // Check for follow-up adjustments first
  const followUpResponse = handleFollowUpAdjustment(query, ctx, activePlans);
  if (followUpResponse) {
    return followUpResponse;
  }

  // 1. Monthly Study Plan / 30-Day Roadmap
  if (
    query.includes('monthly') ||
    query.includes('30-day') ||
    query.includes('30 day') ||
    query.includes('4-week') ||
    query.includes('4 week') ||
    query.includes('four week') ||
    query.includes('four-week') ||
    query.includes('next month')
  ) {
    const monthlyPlan = buildMonthlyPlan(ctx, company, activePlans?.monthly);
    return {
      text: `Here is your structured **30-Day Placement Preparation Roadmap**${company ? ` tailored for **${company}**` : ''}!\n\nThis roadmap is organized into 4 progressive weekly milestones:\n• **Week 1:** Foundational Problem Solving & Quantitative Mastery\n• **Week 2:** Advanced Data Structures & Relational Databases (${ctx.weakTopics[1] || 'DBMS'})\n• **Week 3:** Core Systems (OS, Networks, OOP) & Mid-Term Sprints\n• **Week 4:** Company Drive Simulations & Mock Interviews\n\nNote: Placement outcomes depend on dedication, consistent practice, and interview dynamics. No specific placement offer or test score is guaranteed.`,
      isRuleBased: true,
      plan: monthlyPlan,
      contextHighlights: [
        'Milestone-Driven: 4 Weeks',
        `Target: ${company || 'Tier-1 & Core IT'}`,
        'Weekly Reviews & Mock Drives'
      ],
      suggestedAction: {
        label: 'Explore Target Companies',
        href: '/companies'
      }
    };
  }

  // 2. Weekly Study Plan / 7-Day Schedule
  if (
    query.includes('weekly') ||
    query.includes('week') ||
    query.includes('seven day') ||
    query.includes('7-day') ||
    query.includes('7 day') ||
    query.includes('seven-day') ||
    query.includes('next 7') ||
    query.includes('next seven')
  ) {
    const weeklyPlan = buildWeeklyPlan(ctx, company, activePlans?.weekly);
    return {
      text: `Here is your comprehensive **7-Day Placement Preparation Schedule**${company ? ` customized for **${company}**` : ''}!\n\nWorkload is distributed realistically across the week:\n• **Days 1-2:** Core Algorithm Foundations & Relational DBMS\n• **Day 3:** Speed Aptitude & Logical Reasoning\n• **Days 4-5:** Trees, Recursion, Operating Systems & Networks\n• **Day 6:** Timed Placement Mock Assessment\n• **Day 7:** Error Remediation & AI Mock Interview`,
      isRuleBased: true,
      plan: weeklyPlan,
      contextHighlights: [
        '7-Day Realistic Distribution',
        `Target: ${company || 'Campus Drives'}`,
        'Integrated Mock Test & Review'
      ],
      suggestedAction: {
        label: 'View Personalized Roadmap',
        href: '/learning-path'
      }
    };
  }

  // 3. Today's Study Plan / Daily Schedule
  if (
    query.includes('today') ||
    query.includes('daily') ||
    query.includes('study plan') ||
    query.includes('schedule') ||
    query.includes('what should i study') ||
    query.includes('plan my preparation')
  ) {
    const explicitMin = parseDurationMinutes(query);
    const duration = explicitMin ?? (ctx.dailyPrepMinutes || 90);
    const isExplicit = explicitMin !== null;

    const todayPlan = buildTodayPlan(duration, ctx, company, isExplicit, activePlans?.today);
    return {
      text: `Here is your actionable **Today's Study Plan** for **${duration} minutes**${company ? ` targeted for **${company}**` : ''}:\n\n${
        isExplicit
          ? `Allocated based on your requested ${duration} minutes.`
          : `Assuming your default study allocation of ${duration} minutes today. You can adjust this anytime (for example: "Give me a 2-hour plan").`
      }\n\nCheck off each task as you complete it:`,
      isRuleBased: true,
      plan: todayPlan,
      contextHighlights: [
        `Duration: ${duration} mins`,
        `Focus: ${todayPlan.weakTopicsAddressed[0]}`,
        `Pending Tasks: ${ctx.pendingTasksCount}`
      ],
      suggestedAction: {
        label: 'Start Today\'s Practice',
        href: '/coding'
      }
    };
  }

  // 4. Greetings & Casual Chat
  if (
    query === 'hello' ||
    query === 'hi' ||
    query === 'hey' ||
    query.startsWith('hello ') ||
    query.startsWith('hi ') ||
    query.startsWith('hey ') ||
    query.includes('good morning') ||
    query.includes('good afternoon') ||
    query.includes('good evening') ||
    query.includes('who are you')
  ) {
    return {
      text: `Hello ${ctx.studentName}! I am your PlacePrep AI Assistant.\n\nI can analyze your preparation for ${ctx.collegeName} placements.\n\nHere are some things you can ask me:\n• Create my study plan for today\n• Which skills should I improve first?\n• How ready am I for my target company?\n• Help me prepare for technical interviews\n• Tell me about companies that recruit from my college`,
      isRuleBased: true,
      contextHighlights: [
        `Student: ${ctx.studentName}`,
        `Readiness: ${ctx.readinessScore}%`,
        `College: ${ctx.collegeName}`
      ],
      suggestedAction: {
        label: 'Create Today\'s Plan',
        href: '/learning-path'
      }
    };
  }

  // 5. Definitions & Explanations: "What is DSA?"
  if (query.includes('what is dsa') || query.includes('explain dsa') || query.includes('dsa meaning')) {
    return {
      text: `### What is DSA (Data Structures & Algorithms)?\n\n**DSA** is the foundation of computer science and the primary filter used by top tech companies (Amazon, Microsoft, Google, TCS Digital) to evaluate candidate problem-solving abilities.\n\n1. **Data Structures:** Ways of organizing, storing, and accessing data efficiently in memory.\n   • Linear: Arrays, Linked Lists, Stacks, Queues.\n   • Non-Linear: Trees, Binary Search Trees, Heaps, Graphs, Hash Tables.\n\n2. **Algorithms:** Step-by-step mathematical procedures for processing data and solving specific problems.\n   • Core Patterns: Two Pointers, Sliding Window, Binary Search, DFS/BFS, Recursion & Backtracking, Dynamic Programming, Greedy.\n\n3. **Why Campus Recruiters Care:**\n   • **Time Complexity (Big-O):** Does your solution scale gracefully when handling large inputs?\n   • **Space Complexity:** Can you optimize RAM usage under memory-constrained servers?\n   • **Code Robustness:** Can you identify edge cases (null inputs, duplicate elements, overflow)?\n\nWould you like me to build a daily or weekly study schedule focusing on DSA?`,
      isRuleBased: true,
      suggestedAction: {
        label: 'Open Coding Arena',
        href: '/coding'
      },
      contextHighlights: [
        'Data Structures & Algorithms',
        'Time & Space Complexity',
        'Core Recruiter Filter'
      ]
    };
  }

  // 6. Definitions & Explanations: Core CS (DBMS, Normalization, ACID)
  if (query.includes('dbms') || query.includes('normalization') || query.includes('acid') || query.includes('database')) {
    return {
      text: `### Database Management Systems (DBMS) Essentials\n\n**1. Database Normalization:**\nTechnique of organizing relational tables to minimize data redundancy and prevent insertion, update, and deletion anomalies:\n• **1NF:** Atomic values per cell, unique column names, primary key.\n• **2NF:** In 1NF + no partial dependency (all non-key attributes fully depend on candidate key).\n• **3NF:** In 2NF + no transitive dependency (non-prime attribute depends only on primary key).\n• **BCNF:** For every functional dependency X -> Y, X must be a super key.\n\n**2. ACID Properties:**\n• **A - Atomicity:** All operations in a transaction succeed, or the entire transaction rolls back.\n• **C - Consistency:** Preserves database invariants before and after commit.\n• **I - Isolation:** Concurrent transactions execute without interfering with one another.\n• **D - Durability:** Once committed, changes persist even across power or system crashes.\n\n**3. Indexing:** B+ Trees allow logarithmic lookup by maintaining balanced multi-level node pointers on disk.`,
      isRuleBased: true,
      suggestedAction: {
        label: 'Practice DBMS MCQs',
        href: '/technical'
      },
      contextHighlights: [
        '1NF, 2NF, 3NF & BCNF',
        'ACID Properties',
        'B+ Tree Indexing'
      ]
    };
  }

  // 7. Definitions & Explanations: OOP (Object-Oriented Programming)
  if (query.includes('oop') || query.includes('object oriented') || query.includes('polymorphism') || query.includes('inheritance')) {
    return {
      text: `### 4 Pillars of Object-Oriented Programming (OOP)\n\n1. **Encapsulation:** Bundling data (state) and methods (behavior) inside a single unit (class) while restricting direct outside access via private/protected access modifiers.\n\n2. **Abstraction:** Hiding complex internal implementation details and exposing only the essential interface (such as abstract classes and interfaces).\n\n3. **Inheritance:** Enabling a child class to acquire fields and methods of a parent class to promote code reusability (IS-A relationship).\n\n4. **Polymorphism:** Ability of an entity to take multiple forms:\n   • Compile-time (Static): Method overloading.\n   • Runtime (Dynamic): Method overriding via virtual functions.\n\nRecruiter Tip: Be ready to explain the difference between Composition (HAS-A) and Inheritance (IS-A).`,
      isRuleBased: true,
      suggestedAction: {
        label: 'Review Technical Concepts',
        href: '/technical'
      },
      contextHighlights: [
        'Encapsulation & Abstraction',
        'Inheritance & Polymorphism',
        'Design Patterns'
      ]
    };
  }

  // 8. Definitions & Explanations: Operating Systems
  if (query.includes('operating system') || query.includes('process vs thread') || query.includes('deadlock') || query.includes('virtual memory')) {
    return {
      text: `### Operating Systems (OS) Interview Essentials\n\n1. **Process vs Thread:**\n   • **Process:** Independent execution program with its own address space, file handles, and memory map.\n   • **Thread:** Lightweight unit within a process sharing the same address space and heap, with its own stack and registers.\n\n2. **Deadlock Conditions (Coffman Conditions):**\n   • Mutual Exclusion (only one process uses a resource at a time)\n   • Hold and Wait (process holds resource while waiting for another)\n   • No Preemption (resource cannot be forcibly seized)\n   • Circular Wait (closed loop of dependencies)\n\n3. **Virtual Memory & Paging:** Translates virtual addresses to physical RAM frames via Page Tables and TLB cache. Thrashing occurs when page faults dominate CPU execution.`,
      isRuleBased: true,
      suggestedAction: {
        label: 'Practice OS MCQs',
        href: '/technical'
      },
      contextHighlights: [
        'Process vs Thread',
        '4 Coffman Deadlock Conditions',
        'Paging & Virtual Memory'
      ]
    };
  }

  // 9. Company Specific Preparation: TCS, Amazon, Infosys, etc.
  if (company || query.includes('company prep') || query.includes('campus drive')) {
    const compName = company || 'TCS';
    const compDetails: Record<string, string> = {
      TCS: '• **Rounds:** TCS NQT (Numerical, Verbal, Reasoning) + Hands-on Coding (2 questions: Easy/Medium) -> Technical Interview -> HR.\n• **Key Focus:** Fast mental arithmetic, string manipulations, arrays, and basic DBMS/OOP concepts.\n• **Hiring Tiers:** Prime (9 LPA), Digital (7 LPA), Ninja (3.36 LPA).',
      Amazon: '• **Rounds:** Online Assessment (2 Medium/Hard DSA + Work Styles) -> 3-4 Rounds of Technical & System Design + Leadership Principles.\n• **Key Focus:** Trees, Graphs, Dynamic Programming, and 16 Leadership Principles evaluated via the STAR method.\n• **Standard Package:** 28 - 45 LPA (SDE-1).',
      Infosys: '• **Rounds:** InfyTQ / HackWithInfy / On-Campus written (Reasoning, Mathematical, Verbal, Pseudocode) -> Technical + HR Interview.\n• **Key Focus:** Pseudocode dry-runs, basic recursion, relational database queries.\n• **Hiring Tiers:** Specialist Programmer (9.5 LPA), DSE (6.25 LPA), System Engineer (3.6 LPA).'
    };

    const details = compDetails[compName] || `• **Pattern:** Online Screening (Aptitude & Technical MCQs) -> Coding Assessment -> Technical Panel -> HR Discussion.\n• **Recommended Focus:** Review ${ctx.weakTopics[0] || 'Arrays & DBMS'} and practice 5 company previous papers.`;

    return {
      text: `### ${compName} Placement Preparation Strategy\n\n${details}\n\n**Your Current Readiness:**\n• Readiness Score: **${ctx.readinessScore}%**\n• Recommended Next Step: Generate a target study plan or solve previous questions.`,
      isRuleBased: true,
      suggestedAction: {
        label: `View ${compName} Profile`,
        href: '/companies'
      },
      contextHighlights: [
        `Company: ${compName}`,
        `Your Readiness: ${ctx.readinessScore}%`,
        'Drive Pattern & Syllabus'
      ]
    };
  }

  // 10. Technical Interviews & STAR Method
  if (query.includes('interview') || query.includes('star method') || query.includes('behavioral') || query.includes('hr round')) {
    return {
      text: `### Mastering Placement Interviews with the STAR Method\n\nTop recruiters evaluate your behavioral and technical depth using the **STAR Framework**:\n\n1. **S - Situation (15%):** Set the context. Describe the project, company, or challenge clearly and concisely.\n2. **T - Task (15%):** What was your specific responsibility? What goal or metric needed to be achieved?\n3. **A - Action (50%):** The most important section! Detail the tools, design choices, algorithms, and leadership decisions you personally executed.\n4. **R - Result (20%):** Quantify the outcome! Use concrete numbers (for example: "reduced query latency by 32%", "supported 5,000 concurrent students").\n\nYour current mock interview score is **${ctx.interviewScore}%**. Launch an AI Mock session with instant voice/text rubric analysis to practice!`,
      isRuleBased: true,
      suggestedAction: {
        label: 'Launch Mock Interview Simulator',
        href: '/interview'
      },
      contextHighlights: [
        'STAR Method Framework',
        `Interview Score: ${ctx.interviewScore}%`,
        'Measurable Impact'
      ]
    };
  }

  // 11. Weaknesses & Skill Gaps
  if (query.includes('skill') || query.includes('improve') || query.includes('weak') || query.includes('bottleneck')) {
    const weakList = ctx.weakTopics.length > 0
      ? ctx.weakTopics.map(w => `• **${w}** (Requires remedial practice)`).join('\n')
      : `• Dynamic Programming\n• Database Normalization & SQL`;

    return {
      text: `Based on your recent assessment diagnostics at ${ctx.collegeName}, your primary areas requiring improvement are:\n\n${weakList}\n\n**Why this matters:** Tech recruiters commonly use these topics as screening elimination filters in Round 1 and Round 2 technical interviews. We recommend starting with focused drills in these subjects.`,
      isRuleBased: true,
      suggestedAction: {
        label: 'View Strength & Weakness Breakdown',
        href: '/progress'
      },
      contextHighlights: [
        `Identified Weak Areas: ${ctx.weakTopics.length}`,
        `Current Tech Score: ${ctx.technicalScore}%`,
        `Current Coding Score: ${ctx.codingScore}%`
      ]
    };
  }

  // 12. College Recruiter Intelligence
  if (query.includes('college') || query.includes('campus') || query.includes('historical') || query.includes('recruiter')) {
    return {
      text: `At ${ctx.collegeName} (${ctx.branch}, Class of ${ctx.gradYear}):\n\n• Historically, companies hire across **Dream (10+ LPA), Core IT (6-9 LPA), and Mass/Services (3.5-5 LPA)** tiers.\n• Confirmed / Past recruiters include **${ctx.confirmedCollegeRecruiters.join(', ') || 'TCS, Infosys, Cognizant, Wipro, Capgemini'}**.\n• Most on-campus drives test Aptitude Speed in Round 1, followed by a Technical Interview focusing on Data Structures, OOP, and DBMS.\n\nYou can review complete salary packages, selection ratios, and TPO-verified records in the College Intelligence portal.`,
      isRuleBased: true,
      suggestedAction: {
        label: 'Explore College Intelligence Records',
        href: '/college-intelligence'
      },
      contextHighlights: [
        `College: ${ctx.collegeName}`,
        `Branch: ${ctx.branch}`,
        `Graduation: ${ctx.gradYear}`
      ]
    };
  }

  // 13. Honest Fallback for Unrecognized / Open-Ended Questions
  // Rather than repeating the generic welcome message, directly acknowledge the user's query and provide actionable placement guidance.
  return {
    text: `I received your question: "${prompt.length > 60 ? prompt.slice(0, 60) + '...' : prompt}"\n\nAs your local offline PlacePrep AI Assistant, my core intelligence is specialized in engineering placement training, campus drives, and technical interview preparation for ${ctx.collegeName}.\n\nWhile I cannot answer general knowledge or out-of-scope queries offline, I can immediately assist you with:\n1. **Personalized Study Plans:** Say "Create today's plan for 2 hours" or "Make my weekly plan"\n2. **DSA & Core CS Concepts:** Ask "What is DSA?", "Explain DBMS normalization", or "What is OOP?"\n3. **Company Guidance:** Ask "How to prepare for TCS / Amazon?"\n4. **Mock Interview Preparation:** Ask "How do I use the STAR method?"\n\nWhich of these would you like to prepare right now?`,
    isRuleBased: true,
    suggestedAction: {
      label: 'Create Today\'s Plan',
      href: '/learning-path'
    },
    contextHighlights: [
      `Query Analyzed: ${prompt.slice(0, 25)}`,
      'Offline AI Placement Engine',
      `Target: ${ctx.collegeName}`
    ]
  };
}


