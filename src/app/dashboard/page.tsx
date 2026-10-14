'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { usePlacePrep } from '@/context/PlacePrepContext';
import {
  Flame,
  CheckCircle2,
  Code2,
  BrainCircuit,
  Cpu,
  Mic,
  ArrowRight,
  ChevronRight,
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
        <div className="app-card p-6 sm:p-7 relative overflow-hidden border border-[#232334] bg-gradient-to-r from-[#13131C] via-[#161426] to-[#13131C] shadow-[0_0_30px_rgba(124,58,237,0.12)]">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-soft-purple text-xs font-semibold mb-3">
              <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
              <span>{user.college} • {user.branch} • Class of {user.gradYear}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome back, {user.name} 👋
            </h1>

            <p className="mt-2 text-sm text-zinc-300 leading-relaxed max-w-2xl">
              Your personalized roadmap is aligned with <strong className="text-white">{collegeData.collegeName}</strong> placement trends and your {user.targetCompanyIds?.length || 4} target companies.
              Targeting: <strong className="text-purple-400">{user.preferredJobRoles?.[0] || 'Software Engineer'}</strong>.
            </p>

            {/* Target placement deadline and action pill */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="/learning-path"
                className="btn-primary text-xs sm:text-sm shadow-[0_0_18px_rgba(124,58,237,0.4)]"
              >
                <span>Continue Today&apos;s Preparation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/college-intelligence"
                className="btn-secondary text-xs sm:text-sm"
              >
                <Building2 className="w-4 h-4 text-purple-400" />
                <span>Campus Recruiter Intel</span>
              </Link>

              {user.placementTargetDate && (
                <div className="px-3 py-1.5 rounded-xl bg-[#181824] border border-[#28283C] text-zinc-300 text-xs font-medium flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  <span>Target Date: {user.placementTargetDate}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* B. PLACEMENT READINESS OVERVIEW & METRICS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Readiness Score Card (5 Cols) */}
          <div className="lg:col-span-5 app-card p-6 flex flex-col justify-between border-[#232334]">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Preparation Score</span>
                  <h2 className="text-base font-bold text-white mt-0.5">Placement Readiness Index</h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
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
                      stroke="#1A1A28"
                      strokeWidth="9"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#8B5CF6"
                      strokeWidth="9"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * stats.readinessScore) / 100}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-700 ease-out drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-2xl font-black text-white">{stats.readinessScore}%</span>
                    <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider">Ready</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs w-full sm:w-auto">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.6)]" /> Aptitude
                    </span>
                    <span className="font-bold text-white">{stats.aptitudeScore}%</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_6px_rgba(99,102,241,0.6)]" /> Coding
                    </span>
                    <span className="font-bold text-white">{stats.codingScore}%</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" /> Technical CS
                    </span>
                    <span className="font-bold text-white">{stats.technicalScore}%</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]" /> Mock Interview
                    </span>
                    <span className="font-bold text-white">{stats.interviewScore}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3.5 border-t border-[#232334] space-y-1 text-xs text-zinc-500">
              <div className="flex items-center justify-between">
                <span>Weighted across 4 assessment areas</span>
                <Link href="/progress" className="font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-0.5">
                  Detailed Breakdown <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <p className="text-[10px] text-zinc-500 italic">
                * Score reflects syllabus coverage & tests completed. Does not guarantee job offer.
              </p>
            </div>
          </div>

          {/* Activity Metrics & Weekly Chart Grid (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            {/* Quick Stat Counter Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="app-card p-3.5 border-[#232334]">
                <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-300 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="mt-2.5">
                  <span className="text-xl font-black text-white">{stats.testsCompleted}</span>
                  <p className="text-[11px] font-medium text-zinc-400">Tests Done</p>
                </div>
              </div>

              <div className="app-card p-3.5 border-[#232334]">
                <div className="w-8 h-8 rounded-lg bg-indigo-950/60 border border-indigo-500/40 text-indigo-300 flex items-center justify-center">
                  <Code2 className="w-4 h-4" />
                </div>
                <div className="mt-2.5">
                  <span className="text-xl font-black text-white">{stats.problemsSolved}</span>
                  <p className="text-[11px] font-medium text-zinc-400">Problems Solved</p>
                </div>
              </div>

              <div className="app-card p-3.5 border-[#232334]">
                <div className="w-8 h-8 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300 flex items-center justify-center">
                  <Mic className="w-4 h-4" />
                </div>
                <div className="mt-2.5">
                  <span className="text-xl font-black text-white">{stats.mockInterviews}</span>
                  <p className="text-[11px] font-medium text-zinc-400">Mock Interviews</p>
                </div>
              </div>

              <div className="app-card p-3.5 border-[#232334]">
                <div className="w-8 h-8 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 flex items-center justify-center">
                  <Flame className="w-4 h-4" />
                </div>
                <div className="mt-2.5">
                  <span className="text-xl font-black text-white">{stats.currentStreak}d</span>
                  <p className="text-[11px] font-medium text-zinc-400">Prep Streak</p>
                </div>
              </div>
            </div>

            {/* Weekly Activity & Study Time Chart */}
            <div className="app-card p-5 flex-1 flex flex-col justify-between border-[#232334]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Weekly Activity & Study Time</h3>
                  <p className="text-[11px] text-zinc-400">{totalWeeklyHours} total hours logged this week</p>
                </div>
                <span className="text-xs font-bold text-purple-300 bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded-md">
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
                        <span className="text-[10px] font-bold text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          {hours}h
                        </span>
                        <div className="w-full bg-[#0D0D14] border border-[#232334] rounded-t-md overflow-hidden h-full flex items-end">
                          <div
                            className="w-full bg-gradient-to-t from-purple-700 to-purple-500 rounded-t-sm transition-all duration-500 group-hover:from-purple-600 group-hover:to-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                            style={{ height: `${heightPercent}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-semibold text-zinc-500 group-hover:text-zinc-300">
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
          <div className="lg:col-span-7 app-card p-6 flex flex-col justify-between border-[#232334]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-white">Today&apos;s Prioritized Preparation Plan</h2>
                  <p className="text-xs text-zinc-400">
                    Allocated for {user.dailyPrepMinutes || 120} min/day study availability
                  </p>
                </div>
                <Link href="/learning-path" className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-0.5">
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
                          ? 'bg-[#101018] border-[#232334] opacity-70'
                          : 'bg-[#181824] border-[#26263A] hover:border-purple-500/40 shadow-sm'
                      }`}
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              task.priority === 'High'
                                ? 'bg-rose-950/60 text-rose-300 border border-rose-500/40'
                                : 'bg-purple-950/60 text-purple-300 border border-purple-500/40'
                            }`}
                          >
                            {task.priority} Priority
                          </span>
                          <span className="text-[11px] text-zinc-400 font-medium">
                            ~{task.estimatedMinutes} mins
                          </span>
                          <span className="text-[11px] text-zinc-500">•</span>
                          <span className="text-[11px] text-zinc-300 font-semibold">{task.category}</span>
                        </div>

                        <h3 className={`text-xs sm:text-sm font-bold ${isCompleted ? 'line-through text-zinc-500' : 'text-white'}`}>
                          {task.title}
                        </h3>

                        <p className="text-xs text-zinc-300">{task.recommendedActivity}</p>

                        <p className="text-[11px] text-purple-400 font-medium pt-0.5">
                          {task.targetCompanyRelevance}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => toggleTaskStatus(task.id)}
                          className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                            isCompleted
                              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                              : 'bg-[#14141E] hover:bg-[#1E1E2C] text-zinc-300 border-[#28283C]'
                          }`}
                          title={isCompleted ? 'Mark as Pending' : 'Mark as Complete'}
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Done</span>
                        </button>

                        <button
                          onClick={() => postponeTask(task.id)}
                          className="p-2 rounded-lg border border-[#28283C] bg-[#14141E] hover:bg-[#1E1E2C] text-zinc-300 text-xs font-semibold"
                          title="Postpone by 2 days"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>

                        <Link
                          href={task.moduleHref}
                          className="btn-primary !py-1.5 !px-3 text-xs shadow-xs flex items-center gap-1"
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

            <div className="mt-4 pt-3 border-t border-[#232334] flex items-center justify-between text-xs text-zinc-500">
              <span>Next Milestone: <strong className="text-white">{nextMilestone?.title || 'Diagnostic Assessment'}</strong></span>
              <span className="font-semibold text-purple-400">Adaptive Learning Roadmap</span>
            </div>
          </div>

          {/* Campus Recruiter Intel Snapshot (5 Cols) */}
          <div className="lg:col-span-5 app-card p-6 flex flex-col justify-between border-[#232334]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-white">Campus Recruiter Intel</h2>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded badge-soft-purple">
                      TPO Data
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">{collegeData.collegeName}</p>
                </div>
                <Link href="/college-intelligence" className="text-xs font-bold text-purple-400 hover:text-purple-300">
                  Full Records
                </Link>
              </div>

              <div className="space-y-3">
                {confirmedRecruiters.slice(0, 3).map((rec) => (
                  <div key={rec.id} className="p-3 rounded-xl bg-[#181824] border border-[#26263A] text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{rec.companyName}</span>
                      <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        Confirmed Drive
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-zinc-300">
                      <span>Package: <strong className="text-white">{rec.packageLPA}</strong></span>
                      <span>•</span>
                      <span>Cutoff: <strong className="text-white">{rec.minCgpa} CGPA</strong></span>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {rec.requiredSkills.slice(0, 3).map((sk, sIdx) => (
                        <span key={sIdx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#13131C] border border-[#232334] text-zinc-300">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#232334]">
              <Link
                href="/companies"
                className="w-full py-2 bg-[#181824] hover:bg-[#202030] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-[#28283C]"
              >
                <span>Check Target Company Match Details</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* D. TOPIC STRENGTHS & WEAKNESSES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="app-card p-5 space-y-3 border-[#232334]">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Assessed Strengths ({strengths.length})</span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                Score ≥ 75%
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {strengths.map((s, i) => (
                <span key={i} className="px-2.5 py-1 bg-emerald-950/50 text-emerald-300 rounded-lg text-xs font-semibold border border-emerald-500/30">
                  {s.topic} ({s.score}%)
                </span>
              ))}
            </div>
          </div>

          <div className="app-card p-5 space-y-3 border-[#232334]">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Priority Skill Bottlenecks ({weaknesses.length})</span>
              </h3>
              <span className="text-[10px] font-bold text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-500/30">
                Score &lt; 55%
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {weaknesses.map((w, i) => (
                <Link
                  key={i}
                  href={w.category === 'Coding' ? '/coding' : w.category === 'Aptitude' ? '/aptitude' : '/technical'}
                  className="px-2.5 py-1 bg-rose-950/50 hover:bg-rose-900/40 text-rose-300 rounded-lg text-xs font-semibold border border-rose-500/30 transition-colors flex items-center gap-1 group"
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
          <div className="lg:col-span-5 app-card p-6 border-[#232334]">
            <div className="mb-4">
              <h2 className="text-base font-bold text-white">Placement Preparation Modules</h2>
              <p className="text-xs text-zinc-400">Direct shortcuts to interactive practice</p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/aptitude"
                className="p-3 rounded-xl bg-[#181824] hover:bg-[#202030] border border-[#26263A] hover:border-purple-500/50 transition-all flex items-center gap-2.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-950/60 text-purple-300 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <BrainCircuit className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">Aptitude</p>
                  <p className="text-[10px] text-zinc-400">Timed drills</p>
                </div>
              </Link>

              <Link
                href="/coding"
                className="p-3 rounded-xl bg-[#181824] hover:bg-[#202030] border border-[#26263A] hover:border-purple-500/50 transition-all flex items-center gap-2.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-950/60 text-indigo-300 border border-indigo-500/30 flex items-center justify-center shrink-0">
                  <Code2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">Coding IDE</p>
                  <p className="text-[10px] text-zinc-400">Compiler sandbox</p>
                </div>
              </Link>

              <Link
                href="/technical"
                className="p-3 rounded-xl bg-[#181824] hover:bg-[#202030] border border-[#26263A] hover:border-purple-500/50 transition-all flex items-center gap-2.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-950/60 text-purple-300 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">Core CS</p>
                  <p className="text-[10px] text-zinc-400">MCQ Quizzes</p>
                </div>
              </Link>

              <Link
                href="/interview"
                className="p-3 rounded-xl bg-[#181824] hover:bg-[#202030] border border-[#26263A] hover:border-purple-500/50 transition-all flex items-center gap-2.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-950/60 text-amber-300 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Mic className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">Interview</p>
                  <p className="text-[10px] text-zinc-400">AI Rubrics</p>
                </div>
              </Link>

              <Link
                href="/resume"
                className="p-3 rounded-xl bg-[#181824] hover:bg-[#202030] border border-[#26263A] hover:border-purple-500/50 transition-all flex items-center gap-2.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">Resume</p>
                  <p className="text-[10px] text-zinc-400">ATS Builder</p>
                </div>
              </Link>

              <Link
                href="/companies"
                className="p-3 rounded-xl bg-[#181824] hover:bg-[#202030] border border-[#26263A] hover:border-purple-500/50 transition-all flex items-center gap-2.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-950/60 text-purple-300 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">Companies</p>
                  <p className="text-[10px] text-zinc-400">Match & Patterns</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Activity Stream (7 Cols) */}
          <div className="lg:col-span-7 app-card p-6 flex flex-col justify-between border-[#232334]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-white">Recent Assessment Activity</h2>
                  <p className="text-xs text-zinc-400">Your test attempts and mock interview sessions</p>
                </div>
                <Link href="/progress" className="text-xs font-bold text-purple-400 hover:text-purple-300">
                  View Full History
                </Link>
              </div>

              <div className="divide-y divide-[#232334]">
                {activities.slice(0, 4).map((act) => (
                  <div key={act.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#181824] border border-[#26263A] flex items-center justify-center text-zinc-300 shrink-0">
                        {act.category === 'Aptitude' && <BrainCircuit className="w-4 h-4 text-purple-400" />}
                        {act.category === 'Coding' && <Code2 className="w-4 h-4 text-indigo-400" />}
                        {act.category === 'Technical' && <Cpu className="w-4 h-4 text-purple-400" />}
                        {act.category === 'Interview' && <Mic className="w-4 h-4 text-amber-400" />}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-white truncate">{act.title}</h4>
                        <p className="text-[10px] text-zinc-400 flex items-center gap-1.5">
                          <span>{act.category}</span>
                          <span>•</span>
                          <span>{act.timestamp}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {act.score && (
                        <span className="text-xs font-bold text-white bg-[#181824] border border-[#26263A] px-2.5 py-1 rounded-lg">
                          {act.score}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                        Recorded
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#232334] flex items-center justify-between text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Stored locally in browser</span>
              </span>
              <Link href="/progress" className="font-bold text-purple-400 hover:text-purple-300">
                Analytics →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
