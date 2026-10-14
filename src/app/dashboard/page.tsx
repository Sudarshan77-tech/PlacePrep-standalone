'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { usePlacePrep } from '@/context/PlacePrepContext';
import { recommendedModules } from '@/data/mockData';
import { generateLocalRecommendations } from '@/services/localAiService';
import {
  Sparkles,
  Flame,
  CheckCircle2,
  Code2,
  BrainCircuit,
  Cpu,
  Mic,
  ArrowRight,
  ChevronRight,
  Target,
  Building2,
  GraduationCap,
  Calendar,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle,
  Briefcase
} from 'lucide-react';

export default function DashboardPage() {
  const {
    user,
    stats,
    activities,
    collegeData,
    roadmapTasks,
    topicPerformances,
    toggleTaskStatus,
    postponeTask
  } = usePlacePrep();

  const localRecs = generateLocalRecommendations({
    aptitudeScore: stats.aptitudeScore,
    codingScore: stats.codingScore,
    technicalScore: stats.technicalScore,
    interviewScore: stats.interviewScore
  });

  // Today's roadmap tasks
  const todayTasks = roadmapTasks.filter(t => t.dateString.includes('Today') || t.dayNumber === 1);
  const nextMilestone = roadmapTasks.find(t => t.status === 'Pending');

  // Topic-wise strengths and weaknesses
  const weaknesses = topicPerformances.filter(t => t.status === 'Weakness');
  const strengths = topicPerformances.filter(t => t.status === 'Strength');

  // Confirmed college recruiters
  const confirmedRecruiters = collegeData.recruiterHistory.filter(r => r.status === 'Confirmed');

  // Weekly hours chart values
  const weeklyHours = stats.weeklyHours?.length === 7 ? stats.weeklyHours : [2.5, 3.2, 4.0, 1.8, 3.5, 4.5, 3.0];
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxWeeklyHour = Math.max(...weeklyHours, 5);
  const totalWeeklyHours = weeklyHours.reduce((acc, h) => acc + h, 0).toFixed(1);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* A. PERSONALIZED GREETING & PROFILE SUMMARY */}
        <div className="app-card p-6 sm:p-7 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full badge-soft-blue text-xs font-semibold mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{user.college} • {user.branch} • Class of {user.gradYear}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#142748]">
              Welcome back, {user.name} 👋
            </h1>

            <p className="mt-2 text-sm text-[#52627A] leading-relaxed max-w-2xl">
              Your personalized roadmap is aligned with <strong>{collegeData.collegeName}</strong> placement trends and your {user.targetCompanyIds?.length || 4} target companies.
              Targeting: <strong className="text-[#315BFA]">{user.preferredJobRoles?.[0] || 'Software Engineer'}</strong>.
            </p>

            {/* Target placement deadline and action pill */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="/learning-path"
                className="btn-primary text-xs sm:text-sm"
              >
                <span>Continue Today&apos;s Preparation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/college-intelligence"
                className="btn-secondary text-xs sm:text-sm"
              >
                <Building2 className="w-4 h-4 text-[#315BFA]" />
                <span>Campus Recruiter Intel</span>
              </Link>

              {user.placementTargetDate && (
                <div className="px-3 py-1.5 rounded-lg bg-[#F7F9FC] border border-[#E3EAF5] text-[#52627A] text-xs font-medium flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#315BFA]" />
                  <span>Target Date: {user.placementTargetDate}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* B. PLACEMENT READINESS OVERVIEW & METRICS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Readiness Score Card (5 Cols) */}
          <div className="lg:col-span-5 app-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8896AB]">Preparation Score</span>
                  <h2 className="text-base font-bold text-[#142748] mt-0.5">Placement Readiness Index</h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {stats.readinessScore >= 75 ? 'Placement Ready' : 'On Track'}
                </span>
              </div>

              {/* Gauge & Metrics */}
              <div className="my-6 flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#E3EAF5"
                      strokeWidth="9"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#315BFA"
                      strokeWidth="9"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * stats.readinessScore) / 100}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-2xl font-black text-[#142748]">{stats.readinessScore}%</span>
                    <span className="text-[10px] text-[#8896AB] font-bold uppercase tracking-wider">Ready</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs w-full sm:w-auto">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[#52627A] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#315BFA]" /> Aptitude
                    </span>
                    <span className="font-bold text-[#142748]">{stats.aptitudeScore}%</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[#52627A] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#4F46E5]" /> Coding
                    </span>
                    <span className="font-bold text-[#142748]">{stats.codingScore}%</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[#52627A] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#059669]" /> Technical CS
                    </span>
                    <span className="font-bold text-[#142748]">{stats.technicalScore}%</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[#52627A] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#D97706]" /> Mock Interview
                    </span>
                    <span className="font-bold text-[#142748]">{stats.interviewScore}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3.5 border-t border-[#E3EAF5] space-y-1 text-xs text-[#8896AB]">
              <div className="flex items-center justify-between">
                <span>Weighted across 4 assessment areas</span>
                <Link href="/progress" className="font-semibold text-[#315BFA] hover:underline flex items-center gap-0.5">
                  Detailed Breakdown <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <p className="text-[10px] text-[#8896AB] italic">
                * Score reflects syllabus coverage & tests completed. Does not guarantee job offer.
              </p>
            </div>
          </div>

          {/* Activity Metrics & Weekly Chart Grid (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            {/* Quick Stat Counter Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="app-card p-3.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#315BFA] flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="mt-2.5">
                  <span className="text-xl font-black text-[#142748]">{stats.testsCompleted}</span>
                  <p className="text-[11px] font-medium text-[#8896AB]">Tests Done</p>
                </div>
              </div>

              <div className="app-card p-3.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Code2 className="w-4 h-4" />
                </div>
                <div className="mt-2.5">
                  <span className="text-xl font-black text-[#142748]">{stats.problemsSolved}</span>
                  <p className="text-[11px] font-medium text-[#8896AB]">Problems Solved</p>
                </div>
              </div>

              <div className="app-card p-3.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Mic className="w-4 h-4" />
                </div>
                <div className="mt-2.5">
                  <span className="text-xl font-black text-[#142748]">{stats.mockInterviews}</span>
                  <p className="text-[11px] font-medium text-[#8896AB]">Mock Interviews</p>
                </div>
              </div>

              <div className="app-card p-3.5">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Flame className="w-4 h-4" />
                </div>
                <div className="mt-2.5">
                  <span className="text-xl font-black text-[#142748]">{stats.currentStreak}d</span>
                  <p className="text-[11px] font-medium text-[#8896AB]">Prep Streak</p>
                </div>
              </div>
            </div>

            {/* Weekly Activity & Study Time Chart */}
            <div className="app-card p-5 flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xs font-bold text-[#142748] uppercase tracking-wider">Weekly Activity & Study Time</h3>
                  <p className="text-[11px] text-[#8896AB]">{totalWeeklyHours} total hours logged this week</p>
                </div>
                <span className="text-xs font-bold text-[#315BFA] bg-blue-50 px-2 py-0.5 rounded-md">
                  Goal: 20h / wk
                </span>
              </div>

              {/* Bar visualization */}
              <div className="pt-2">
                <div className="flex items-end justify-between gap-2 h-24">
                  {weeklyHours.map((hours, idx) => {
                    const heightPercent = Math.min(100, Math.round((hours / maxWeeklyHour) * 100));
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                        <span className="text-[10px] font-bold text-[#8896AB] opacity-0 group-hover:opacity-100 transition-opacity">
                          {hours}h
                        </span>
                        <div className="w-full bg-[#F7F9FC] border border-[#E3EAF5] rounded-t-md overflow-hidden h-full flex items-end">
                          <div
                            className="w-full bg-[#315BFA] rounded-t-sm transition-all duration-500 group-hover:bg-[#2548DE]"
                            style={{ height: `${heightPercent}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-semibold text-[#8896AB]">
                          {daysOfWeek[idx]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* C. TODAY'S PREPARATION PLAN & COLLEGE RECRUITER INSIGHTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Today's Tasks (7 Cols) */}
          <div className="lg:col-span-7 app-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-[#142748]">Today&apos;s Prioritized Preparation Plan</h2>
                  <p className="text-xs text-[#8896AB]">
                    Allocated for {user.dailyPrepMinutes || 120} min/day study availability
                  </p>
                </div>
                <Link href="/learning-path" className="text-xs font-bold text-[#315BFA] hover:underline flex items-center gap-0.5">
                  Full Roadmap <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {todayTasks.map((task) => {
                  const isCompleted = task.status === 'Completed';

                  return (
                    <div
                      key={task.id}
                      className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                        isCompleted
                          ? 'bg-[#F7F9FC] border-[#E3EAF5] opacity-75'
                          : 'bg-white border-[#E3EAF5] hover:border-[#315BFA]/40 shadow-subtle'
                      }`}
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              task.priority === 'High'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-blue-50 text-[#315BFA] border border-blue-200'
                            }`}
                          >
                            {task.priority} Priority
                          </span>
                          <span className="text-[11px] text-[#8896AB] font-medium">
                            ~{task.estimatedMinutes} mins
                          </span>
                          <span className="text-[11px] text-[#8896AB]">•</span>
                          <span className="text-[11px] text-[#52627A] font-semibold">{task.category}</span>
                        </div>

                        <h3 className={`text-xs sm:text-sm font-bold ${isCompleted ? 'line-through text-[#8896AB]' : 'text-[#142748]'}`}>
                          {task.title}
                        </h3>

                        <p className="text-xs text-[#52627A]">{task.recommendedActivity}</p>

                        <p className="text-[11px] text-[#315BFA] font-medium pt-0.5">
                          {task.targetCompanyRelevance}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => toggleTaskStatus(task.id)}
                          className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                            isCompleted
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                              : 'bg-white hover:bg-[#F7F9FC] text-[#52627A] border-[#E3EAF5]'
                          }`}
                          title={isCompleted ? 'Mark as Pending' : 'Mark as Complete'}
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span className="text-[11px]">{isCompleted ? 'Done' : 'Done'}</span>
                        </button>

                        <button
                          onClick={() => postponeTask(task.id)}
                          className="p-2 rounded-lg border border-[#E3EAF5] hover:bg-[#F7F9FC] text-[#52627A] text-xs font-semibold"
                          title="Postpone by 2 days"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>

                        <Link
                          href={task.moduleHref}
                          className="px-3 py-1.5 bg-[#315BFA] hover:bg-[#2548DE] text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1"
                        >
                          <span>Practice</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E3EAF5] flex items-center justify-between text-xs text-[#8896AB]">
              <span>Next Milestone: <strong className="text-[#142748]">{nextMilestone?.title || 'Diagnostic Assessment'}</strong></span>
              <span className="font-semibold text-[#315BFA]">Adaptive Learning Roadmap</span>
            </div>
          </div>

          {/* Campus Recruiter Intel Snapshot (5 Cols) */}
          <div className="lg:col-span-5 app-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-[#142748]">Campus Recruiter Intel</h2>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded badge-soft-blue">
                      TPO Data
                    </span>
                  </div>
                  <p className="text-xs text-[#8896AB]">{collegeData.collegeName}</p>
                </div>
                <Link href="/college-intelligence" className="text-xs font-bold text-[#315BFA] hover:underline">
                  Full Records
                </Link>
              </div>

              <div className="space-y-3">
                {confirmedRecruiters.slice(0, 3).map((rec) => (
                  <div key={rec.id} className="p-3 rounded-xl bg-[#F7F9FC] border border-[#E3EAF5] text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#142748] text-sm">{rec.companyName}</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Confirmed Drive
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-[#52627A]">
                      <span>Package: <strong className="text-[#142748]">{rec.packageLPA}</strong></span>
                      <span>•</span>
                      <span>Cutoff: <strong className="text-[#142748]">{rec.minCgpa} CGPA</strong></span>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {rec.requiredSkills.slice(0, 3).map((sk, sIdx) => (
                        <span key={sIdx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-white border border-[#E3EAF5] text-[#52627A]">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E3EAF5]">
              <Link
                href="/companies"
                className="w-full py-2 bg-[#F7F9FC] hover:bg-[#E3EAF5] text-[#142748] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-[#E3EAF5]"
              >
                <span>Check Target Company Match Details</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#8896AB]" />
              </Link>
            </div>
          </div>
        </div>

        {/* D. TOPIC STRENGTHS & WEAKNESSES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="app-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#142748] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Assessed Strengths ({strengths.length})</span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Score ≥ 75%
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {strengths.map((s, i) => (
                <span key={i} className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold border border-emerald-200">
                  {s.topic} ({s.score}%)
                </span>
              ))}
            </div>
          </div>

          <div className="app-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#142748] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Priority Skill Bottlenecks ({weaknesses.length})</span>
              </h3>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                Score &lt; 55%
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {weaknesses.map((w, i) => (
                <Link
                  key={i}
                  href={w.category === 'Coding' ? '/coding' : w.category === 'Aptitude' ? '/aptitude' : '/technical'}
                  className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-lg text-xs font-semibold border border-rose-200 transition-colors flex items-center gap-1 group"
                >
                  <span>{w.topic} ({w.score}%)</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* E. QUICK ACTIONS & RECENT ACTIVITY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Quick Actions Shortcuts (5 Cols) */}
          <div className="lg:col-span-5 app-card p-6">
            <div className="mb-4">
              <h2 className="text-base font-bold text-[#142748]">Placement Preparation Modules</h2>
              <p className="text-xs text-[#8896AB]">Direct shortcuts to interactive practice</p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/aptitude"
                className="p-3 rounded-xl bg-[#F7F9FC] hover:bg-white border border-[#E3EAF5] hover:border-[#315BFA] transition-all flex items-center gap-2.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#315BFA] flex items-center justify-center shrink-0">
                  <BrainCircuit className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#142748] truncate">Aptitude</p>
                  <p className="text-[10px] text-[#8896AB]">Timed drills</p>
                </div>
              </Link>

              <Link
                href="/coding"
                className="p-3 rounded-xl bg-[#F7F9FC] hover:bg-white border border-[#E3EAF5] hover:border-[#315BFA] transition-all flex items-center gap-2.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Code2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#142748] truncate">Coding IDE</p>
                  <p className="text-[10px] text-[#8896AB]">Compiler sandbox</p>
                </div>
              </Link>

              <Link
                href="/technical"
                className="p-3 rounded-xl bg-[#F7F9FC] hover:bg-white border border-[#E3EAF5] hover:border-[#315BFA] transition-all flex items-center gap-2.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#142748] truncate">Core CS</p>
                  <p className="text-[10px] text-[#8896AB]">MCQ Quizzes</p>
                </div>
              </Link>

              <Link
                href="/interview"
                className="p-3 rounded-xl bg-[#F7F9FC] hover:bg-white border border-[#E3EAF5] hover:border-[#315BFA] transition-all flex items-center gap-2.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Mic className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#142748] truncate">Interview</p>
                  <p className="text-[10px] text-[#8896AB]">AI Rubrics</p>
                </div>
              </Link>

              <Link
                href="/resume"
                className="p-3 rounded-xl bg-[#F7F9FC] hover:bg-white border border-[#E3EAF5] hover:border-[#315BFA] transition-all flex items-center gap-2.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#142748] truncate">Resume</p>
                  <p className="text-[10px] text-[#8896AB]">ATS Builder</p>
                </div>
              </Link>

              <Link
                href="/companies"
                className="p-3 rounded-xl bg-[#F7F9FC] hover:bg-white border border-[#E3EAF5] hover:border-[#315BFA] transition-all flex items-center gap-2.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#315BFA] flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#142748] truncate">Companies</p>
                  <p className="text-[10px] text-[#8896AB]">Match & Patterns</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Activity Stream (7 Cols) */}
          <div className="lg:col-span-7 app-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-[#142748]">Recent Assessment Activity</h2>
                  <p className="text-xs text-[#8896AB]">Your test attempts and mock interview sessions</p>
                </div>
                <Link href="/progress" className="text-xs font-bold text-[#315BFA] hover:underline">
                  View Full History
                </Link>
              </div>

              <div className="divide-y divide-[#E3EAF5]">
                {activities.slice(0, 4).map((act) => (
                  <div key={act.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#F7F9FC] border border-[#E3EAF5] flex items-center justify-center text-[#52627A] shrink-0">
                        {act.category === 'Aptitude' && <BrainCircuit className="w-4 h-4 text-[#315BFA]" />}
                        {act.category === 'Coding' && <Code2 className="w-4 h-4 text-indigo-600" />}
                        {act.category === 'Technical' && <Cpu className="w-4 h-4 text-purple-600" />}
                        {act.category === 'Interview' && <Mic className="w-4 h-4 text-amber-600" />}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-[#142748] truncate">{act.title}</h4>
                        <p className="text-[10px] text-[#8896AB] flex items-center gap-1.5">
                          <span>{act.category}</span>
                          <span>•</span>
                          <span>{act.timestamp}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {act.score && (
                        <span className="text-xs font-bold text-[#142748] bg-[#F7F9FC] border border-[#E3EAF5] px-2.5 py-1 rounded-lg">
                          {act.score}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Recorded
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E3EAF5] flex items-center justify-between text-xs text-[#8896AB]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Stored locally in browser</span>
              </span>
              <Link href="/progress" className="font-bold text-[#315BFA] hover:underline">
                Analytics →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
