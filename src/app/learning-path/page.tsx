'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { usePlacePrep } from '@/context/PlacePrepContext';
import { roadmapStages } from '@/data/mockData';
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  SlidersHorizontal,
  CheckCircle
} from 'lucide-react';

export default function LearningPathPage() {
  const {
    user,
    roadmapTasks,
    toggleTaskStatus,
    postponeTask,
    regenerateRoadmap,
    updateUser,
    showToast
  } = usePlacePrep();

  const [activeTab, setActiveTab] = useState<'daily' | 'roadmap'>('daily');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [prepMinutes, setPrepMinutes] = useState<number>(user.dailyPrepMinutes || 120);

  const handleUpdateDailyTime = (mins: number) => {
    setPrepMinutes(mins);
    updateUser({ dailyPrepMinutes: mins });
    showToast(`Daily study commitment updated to ${mins} mins (${Math.round(mins/60)} hrs)`, 'info');
  };

  const completedCount = roadmapTasks.filter(t => t.status === 'Completed').length;
  const completionPercentage = roadmapTasks.length > 0
    ? Math.round((completedCount / roadmapTasks.length) * 100)
    : 0;

  const filteredTasks = roadmapTasks.filter(t => {
    if (filterCategory === 'all') return true;
    return t.category === filterCategory;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold badge-soft-purple">
                Personalized Roadmap
              </span>
              <span className="text-xs text-zinc-400">College & Recruiter Adaptive</span>
            </div>
            <h1 className="text-2xl font-black text-white mt-1">
              Personalized Placement Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Generated for <strong className="text-white">{user.college}</strong> recruitment patterns, your {user.targetCompanyIds?.length || 4} target companies, and skill gap priorities.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={regenerateRoadmap}
              className="btn-secondary text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Regenerate Roadmap</span>
            </button>
          </div>
        </div>

        {/* ROADMAP TARGET CONTROLS */}
        <div className="app-card p-5 sm:p-6 space-y-4 border-[#232334]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#232334]">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-purple-400" />
              <h2 className="text-sm font-bold text-white">Roadmap Parameters & Study Schedule</h2>
            </div>
            <span className="text-xs text-zinc-400">
              Target Date: <strong className="text-white">{user.placementTargetDate || 'Nov 15, 2026'}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
            {/* Daily Availability */}
            <div className="p-3.5 rounded-xl bg-[#181824] border border-[#26263A] space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 font-semibold">Daily Availability:</span>
                <strong className="text-purple-400 font-bold">{prepMinutes} mins / day</strong>
              </div>
              <div className="flex gap-1.5 pt-1">
                {[60, 90, 120, 180].map((m) => (
                  <button
                    key={m}
                    onClick={() => handleUpdateDailyTime(m)}
                    className={`flex-1 py-1 rounded-lg font-bold text-[11px] transition-all ${
                      prepMinutes === m
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
                        : 'bg-[#13131C] border border-[#232334] text-zinc-400 hover:text-white hover:bg-[#202030]'
                    }`}
                  >
                    {m === 60 ? '1h' : m === 90 ? '1.5h' : m === 120 ? '2h' : '3h'}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Recruiters Snapshot */}
            <div className="p-3.5 rounded-xl bg-[#181824] border border-[#26263A] space-y-1.5">
              <span className="text-zinc-400 font-semibold block">Target Recruiters:</span>
              <div className="flex flex-wrap gap-1">
                {(user.targetCompanyIds || []).map((cid) => (
                  <span key={cid} className="px-2 py-0.5 rounded bg-[#13131C] border border-purple-500/30 text-purple-300 font-bold uppercase text-[10px]">
                    {cid}
                  </span>
                ))}
              </div>
              <Link href="/companies" className="text-[11px] text-purple-400 font-semibold hover:underline block pt-0.5">
                Edit Target Recruiters →
              </Link>
            </div>

            {/* Completion Progress Metric */}
            <div className="p-3.5 rounded-xl bg-[#181824] border border-[#26263A] flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 font-semibold">Tasks Done:</span>
                <strong className="text-emerald-400 font-bold">{completedCount} of {roadmapTasks.length}</strong>
              </div>
              <div className="w-full bg-[#13131C] h-1.5 rounded-full overflow-hidden mt-2 border border-[#232334]">
                <div
                  className="bg-gradient-to-r from-purple-500 to-emerald-400 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <span className="text-[10px] text-zinc-400 mt-1">{completionPercentage}% Roadmap Completed</span>
            </div>
          </div>
        </div>

        {/* AI RECOMMENDED NEXT STEP HIGHLIGHT CARD */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-purple-900/30 to-indigo-950/40 border border-purple-500/40 text-purple-200 space-y-3 shadow-[0_0_30px_rgba(124,58,237,0.15)]">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Personalized Diagnostic Recommendation</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            &ldquo;Your DBMS score (58%) and Dynamic Programming (42%) are priority focus areas for Tier-1 eligibility. Work through 3NF indexing drills today.&rdquo;
          </h2>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Strengthening these two subjects will elevate your readiness index from 72% to 81%, passing the shortlisting threshold for Product companies.
          </p>

          <div className="pt-1 flex items-center gap-3">
            <Link
              href="/technical"
              className="btn-primary text-xs shadow-[0_0_15px_rgba(124,58,237,0.4)]"
            >
              <span>Execute DBMS Priority Drill</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* TAB TOGGLE: DAILY & WEEKLY TASKS VS 7-STAGE CURRICULUM */}
        <div className="flex items-center gap-1.5 bg-[#13131C] p-1 rounded-xl w-fit border border-[#232334]">
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'daily'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Daily & Weekly Plan ({roadmapTasks.length} Tasks)
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'roadmap'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            7-Stage Curriculum
          </button>
        </div>

        {/* VIEW 1: DAILY & WEEKLY ACTION PLAN */}
        {activeTab === 'daily' && (
          <div className="space-y-4">
            {/* Filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {(['all', 'Technical', 'Coding', 'Aptitude', 'Interview', 'Company Prep'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    filterCategory === cat
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_10px_rgba(124,58,237,0.3)]'
                      : 'bg-[#181824] border border-[#232334] text-zinc-400 hover:text-white hover:bg-[#202030]'
                  }`}
                >
                  {cat === 'all' ? 'All Activities' : cat}
                </button>
              ))}
            </div>

            {/* Tasks List */}
            <div className="space-y-3">
              {filteredTasks.map((task) => {
                const isCompleted = task.status === 'Completed';
                const isPostponed = task.status === 'Postponed';

                return (
                  <div
                    key={task.id}
                    className={`app-card p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all border-[#232334] ${
                      isCompleted
                        ? 'bg-[#101018] opacity-70'
                        : isPostponed
                        ? 'bg-[#12121A]/60'
                        : 'bg-[#161622] hover:border-purple-500/40 shadow-sm'
                    }`}
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-white">{task.dateString}</span>
                        <span className="text-xs text-zinc-500">•</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          task.priority === 'High'
                            ? 'bg-rose-950/60 text-rose-300 border border-rose-500/40'
                            : 'bg-purple-950/60 text-purple-300 border border-purple-500/40'
                        }`}>
                          {task.priority} Priority
                        </span>
                        <span className="text-[11px] text-zinc-400 font-medium">~{task.estimatedMinutes} mins</span>
                        <span className="text-[11px] text-zinc-500">•</span>
                        <span className="text-[11px] text-zinc-300 font-medium">{task.category}</span>
                      </div>

                      <h3 className={`text-sm sm:text-base font-bold ${isCompleted ? 'line-through text-zinc-500' : 'text-white'}`}>
                        {task.title}
                      </h3>

                      <p className="text-xs text-zinc-300">{task.recommendedActivity}</p>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] pt-1">
                        <span className="text-purple-400 font-medium">{task.targetCompanyRelevance}</span>
                        <span className="text-zinc-500">•</span>
                        <span className="text-zinc-400 italic">{task.reasonForRecommendation}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
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
                        className="btn-primary !py-1.5 !px-3 text-xs"
                      >
                        <span>Start</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: 7-STAGE CURRICULUM */}
        {activeTab === 'roadmap' && (
          <div className="space-y-4">
            {roadmapStages.map((stage) => (
              <div
                key={stage.id}
                className="app-card p-5 sm:p-6 space-y-3 border-[#232334]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-[0_0_10px_rgba(124,58,237,0.4)]">
                      {stage.id}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-white">{stage.title}</h3>
                      <p className="text-xs text-zinc-400">Estimated Duration: {stage.estimatedWeeks} Weeks</p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold w-fit ${
                    stage.status === 'completed'
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                      : stage.status === 'in-progress'
                      ? 'bg-purple-950/60 text-purple-300 border border-purple-500/30'
                      : 'bg-[#181824] text-zinc-400 border border-[#232334]'
                  }`}>
                    {stage.status === 'completed' ? 'Completed' : stage.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                  </span>
                </div>

                <p className="text-xs text-zinc-300">{stage.description}</p>

                <div>
                  <div className="flex justify-between text-xs text-zinc-400 mb-1 font-medium">
                    <span>Curriculum Progress</span>
                    <span className="font-bold text-white">{stage.progress}%</span>
                  </div>
                  <div className="w-full bg-[#101018] rounded-full h-1.5 overflow-hidden border border-[#232334]">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 h-1.5 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                      style={{ width: `${stage.progress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-[#232334]">
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Key Topics Covered:</h4>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {stage.topics.map((topic, idx) => (
                      <span key={idx} className="p-2 rounded-lg bg-[#181824] border border-[#232334] text-xs font-medium text-zinc-200">
                        {topic}
                      </span>
                    ))}
                  </div>
                  {stage.nextAction && (
                    <div className="mt-3 p-2.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-xs flex items-center justify-between text-purple-300">
                      <span className="font-medium">Next Action: {stage.nextAction}</span>
                      <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
