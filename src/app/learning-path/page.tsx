'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { usePlacePrep } from '@/context/PlacePrepContext';
import { roadmapStages } from '@/data/mockData';
import { analyzeStudentSkillGaps } from '@/services/roadmapEngine';
import {
  Route,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
  SlidersHorizontal,
  Check,
  CheckCircle
} from 'lucide-react';

export default function LearningPathPage() {
  const {
    user,
    stats,
    collegeData,
    roadmapTasks,
    topicPerformances,
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
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold badge-soft-blue">
                Personalized Roadmap
              </span>
              <span className="text-xs text-[#8896AB]">College & Recruiter Adaptive</span>
            </div>
            <h1 className="text-2xl font-black text-[#142748] mt-1">
              Personalized Placement Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-[#52627A]">
              Generated for <strong>{user.college}</strong> recruitment patterns, your {user.targetCompanyIds?.length || 4} target companies, and skill gap priorities.
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
        <div className="app-card p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E3EAF5]">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#315BFA]" />
              <h2 className="text-sm font-bold text-[#142748]">Roadmap Parameters & Study Schedule</h2>
            </div>
            <span className="text-xs text-[#8896AB]">
              Target Date: <strong className="text-[#142748]">{user.placementTargetDate || 'Nov 15, 2026'}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
            {/* Daily Availability */}
            <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E3EAF5] space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[#52627A] font-semibold">Daily Availability:</span>
                <strong className="text-[#315BFA] font-bold">{prepMinutes} mins / day</strong>
              </div>
              <div className="flex gap-1.5 pt-1">
                {[60, 90, 120, 180].map((m) => (
                  <button
                    key={m}
                    onClick={() => handleUpdateDailyTime(m)}
                    className={`flex-1 py-1 rounded-lg font-bold text-[11px] transition-all ${
                      prepMinutes === m
                        ? 'bg-[#315BFA] text-white shadow-2xs'
                        : 'bg-white border border-[#E3EAF5] text-[#52627A] hover:bg-[#E3EAF5]'
                    }`}
                  >
                    {m === 60 ? '1h' : m === 90 ? '1.5h' : m === 120 ? '2h' : '3h'}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Recruiters Snapshot */}
            <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E3EAF5] space-y-1.5">
              <span className="text-[#52627A] font-semibold block">Target Recruiters:</span>
              <div className="flex flex-wrap gap-1">
                {(user.targetCompanyIds || []).map((cid) => (
                  <span key={cid} className="px-2 py-0.5 rounded bg-white border border-[#E3EAF5] text-[#315BFA] font-bold uppercase text-[10px]">
                    {cid}
                  </span>
                ))}
              </div>
              <Link href="/companies" className="text-[11px] text-[#315BFA] font-semibold hover:underline block pt-0.5">
                Edit Target Recruiters →
              </Link>
            </div>

            {/* Completion Progress Metric */}
            <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E3EAF5] flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="text-[#52627A] font-semibold">Tasks Done:</span>
                <strong className="text-emerald-700 font-bold">{completedCount} of {roadmapTasks.length}</strong>
              </div>
              <div className="w-full bg-[#E3EAF5] h-1.5 rounded-full overflow-hidden mt-2">
                <div
                  className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <span className="text-[10px] text-[#8896AB] mt-1">{completionPercentage}% Roadmap Completed</span>
            </div>
          </div>
        </div>

        {/* AI RECOMMENDED NEXT STEP HIGHLIGHT CARD */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#F1EDFF] border border-[#DDD6FE] text-[#5B21B6] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#5B21B6]" />
            <span>Personalized Diagnostic Recommendation</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#142748] leading-relaxed">
            &ldquo;Your DBMS score (58%) and Dynamic Programming (42%) are priority focus areas for Tier-1 eligibility. Work through 3NF indexing drills today.&rdquo;
          </h2>
          <p className="text-xs text-[#52627A] leading-relaxed">
            Strengthening these two subjects will elevate your readiness index from 72% to 81%, passing the shortlisting threshold for Product companies.
          </p>

          <div className="pt-1 flex items-center gap-3">
            <Link
              href="/technical"
              className="btn-primary text-xs"
            >
              <span>Execute DBMS Priority Drill</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* TAB TOGGLE: DAILY & WEEKLY TASKS VS 7-STAGE CURRICULUM */}
        <div className="flex items-center gap-1.5 bg-[#E3EAF5] p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'daily'
                ? 'bg-white text-[#142748] shadow-2xs'
                : 'text-[#52627A] hover:text-[#142748]'
            }`}
          >
            Daily & Weekly Plan ({roadmapTasks.length} Tasks)
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'roadmap'
                ? 'bg-white text-[#142748] shadow-2xs'
                : 'text-[#52627A] hover:text-[#142748]'
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
                      ? 'bg-[#142748] text-white'
                      : 'bg-white border border-[#E3EAF5] text-[#52627A] hover:bg-[#F7F9FC]'
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
                    className={`app-card p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
                      isCompleted
                        ? 'bg-[#F7F9FC] border-[#E3EAF5] opacity-75'
                        : isPostponed
                        ? 'border-[#E3EAF5] bg-[#F7F9FC]/50'
                        : 'hover:border-[#315BFA]/50 shadow-subtle'
                    }`}
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-[#142748]">{task.dateString}</span>
                        <span className="text-xs text-[#8896AB]">•</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          task.priority === 'High'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-blue-50 text-[#315BFA] border border-blue-200'
                        }`}>
                          {task.priority} Priority
                        </span>
                        <span className="text-[11px] text-[#8896AB] font-medium">~{task.estimatedMinutes} mins</span>
                        <span className="text-[11px] text-[#8896AB]">•</span>
                        <span className="text-[11px] text-[#52627A] font-medium">{task.category}</span>
                      </div>

                      <h3 className={`text-sm sm:text-base font-bold ${isCompleted ? 'line-through text-[#8896AB]' : 'text-[#142748]'}`}>
                        {task.title}
                      </h3>

                      <p className="text-xs text-[#52627A]">{task.recommendedActivity}</p>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] pt-1">
                        <span className="text-[#315BFA] font-medium">{task.targetCompanyRelevance}</span>
                        <span className="text-[#8896AB]">•</span>
                        <span className="text-[#8896AB] italic">{task.reasonForRecommendation}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
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
                        className="btn-primary text-xs"
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
                className="app-card p-5 sm:p-6 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#315BFA] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {stage.id}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-[#142748]">{stage.title}</h3>
                      <p className="text-xs text-[#52627A]">Estimated Duration: {stage.estimatedWeeks} Weeks</p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold w-fit ${
                    stage.status === 'completed'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : stage.status === 'in-progress'
                      ? 'bg-blue-50 text-[#315BFA] border border-blue-200'
                      : 'bg-[#F7F9FC] text-[#8896AB] border border-[#E3EAF5]'
                  }`}>
                    {stage.status === 'completed' ? 'Completed' : stage.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                  </span>
                </div>

                <p className="text-xs text-[#52627A]">{stage.description}</p>

                <div>
                  <div className="flex justify-between text-xs text-[#52627A] mb-1 font-medium">
                    <span>Curriculum Progress</span>
                    <span className="font-bold text-[#142748]">{stage.progress}%</span>
                  </div>
                  <div className="w-full bg-[#E3EAF5] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#315BFA] h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${stage.progress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-[#E3EAF5]">
                  <h4 className="text-xs font-bold text-[#142748] uppercase tracking-wider">Key Topics Covered:</h4>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {stage.topics.map((topic, idx) => (
                      <span key={idx} className="p-2 rounded-lg bg-[#F7F9FC] border border-[#E3EAF5] text-xs font-medium text-[#142748]">
                        {topic}
                      </span>
                    ))}
                  </div>
                  {stage.nextAction && (
                    <div className="mt-3 p-2.5 rounded-lg bg-[#F1EDFF] border border-[#DDD6FE] text-xs flex items-center justify-between text-[#5B21B6]">
                      <span className="font-medium">Next Action: {stage.nextAction}</span>
                      <Sparkles className="w-4 h-4 text-[#5B21B6] shrink-0" />
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
