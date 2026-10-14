'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { usePlacePrep } from '@/context/PlacePrepContext';
import { performanceHistoryData } from '@/data/mockData';
import {
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export default function ProgressPage() {
  const { stats, topicPerformances } = usePlacePrep();

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Topic-wise analysis
  const strengths = topicPerformances.filter(t => t.status === 'Strength');
  const weaknesses = topicPerformances.filter(t => t.status === 'Weakness');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold badge-soft-purple">
              Student Diagnostic Analyzer
            </span>
            <span className="text-xs text-zinc-400">Continuous Growth</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1.5">
            Progress Tracking & Skill Diagnostic Intelligence
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Topic-level assessment evaluation, skill bottleneck diagnosis, target company relevance, and performance trends over time.
          </p>
        </div>

        {/* OVERALL READINESS SCORE TREND CHART */}
        <div className="app-card p-5 sm:p-7 border-[#232334] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Score Trajectory</span>
              <h2 className="text-base font-bold text-white mt-0.5">Placement Readiness Trend (Last 6 Weeks)</h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-500/30">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>+14% Growth Since Diagnostic</span>
            </div>
          </div>

          {/* SVG Progress Timeline Graph */}
          <div className="h-52 w-full pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 600 160">
              {/* Grid Lines */}
              <line x1="0" y1="20" x2="600" y2="20" stroke="#232334" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="60" x2="600" y2="60" stroke="#232334" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="100" x2="600" y2="100" stroke="#232334" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="#232334" strokeWidth="1" />

              {/* Area Under Curve */}
              <path
                d="M 50 130 L 150 110 L 250 90 L 350 78 L 450 60 L 550 42 L 550 140 L 50 140 Z"
                fill="url(#purpleGradientArea)"
                opacity="0.3"
              />

              {/* Smooth Trend Line */}
              <polyline
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="50,130 150,110 250,90 350,78 450,60 550,42"
                className="drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]"
              />

              <defs>
                <linearGradient id="purpleGradientArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Data Points */}
              {[
                { x: 50, y: 130, val: '58%' },
                { x: 150, y: 110, val: '62%' },
                { x: 250, y: 90, val: '66%' },
                { x: 350, y: 78, val: '69%' },
                { x: 450, y: 60, val: '71%' },
                { x: 550, y: 42, val: `${stats.readinessScore}%` },
              ].map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="5" fill="#8B5CF6" stroke="#13131C" strokeWidth="2.5" className="drop-shadow-[0_0_6px_rgba(168,85,247,0.7)]" />
                  <text x={pt.x} y={pt.y - 12} textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
                    {pt.val}
                  </text>
                  <text x={pt.x} y="155" textAnchor="middle" fill="#9CA3AF" fontSize="10">
                    Wk {i + 1}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* 4 SECTIONAL PERFORMANCE BARS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="app-card p-5 border-[#232334]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-300">Aptitude & Reasoning</span>
              <span className="text-xs font-bold text-purple-400">{stats.aptitudeScore}%</span>
            </div>
            <div className="w-full bg-[#101018] h-2 rounded-full overflow-hidden border border-[#232334]">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full" style={{ width: `${stats.aptitudeScore}%` }} />
            </div>
            <p className="text-[11px] text-zinc-400 mt-2">Strong speed in Logical Syllogisms</p>
          </div>

          <div className="app-card p-5 border-[#232334]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-300">Coding (DSA)</span>
              <span className="text-xs font-bold text-purple-400">{stats.codingScore}%</span>
            </div>
            <div className="w-full bg-[#101018] h-2 rounded-full overflow-hidden border border-[#232334]">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full" style={{ width: `${stats.codingScore}%` }} />
            </div>
            <p className="text-[11px] text-zinc-400 mt-2">{stats.problemsSolved} Problems Solved</p>
          </div>

          <div className="app-card p-5 border-[#232334]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-300">Technical CS Core</span>
              <span className="text-xs font-bold text-purple-400">{stats.technicalScore}%</span>
            </div>
            <div className="w-full bg-[#101018] h-2 rounded-full overflow-hidden border border-[#232334]">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full" style={{ width: `${stats.technicalScore}%` }} />
            </div>
            <p className="text-[11px] text-zinc-400 mt-2">OS & OOP above campus average</p>
          </div>

          <div className="app-card p-5 border-[#232334]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-300">Mock Interview</span>
              <span className="text-xs font-bold text-purple-400">{stats.interviewScore}%</span>
            </div>
            <div className="w-full bg-[#101018] h-2 rounded-full overflow-hidden border border-[#232334]">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full" style={{ width: `${stats.interviewScore}%` }} />
            </div>
            <p className="text-[11px] text-zinc-400 mt-2">{stats.mockInterviews} Live sessions simulated</p>
          </div>
        </div>

        {/* DETAILED TOPIC-WISE PERFORMANCE TABLE & BOTTLENECK DIAGNOSIS */}
        <div className="app-card p-5 sm:p-7 border-[#232334] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white">Topic-Wise Assessment Performance Breakdown</h2>
              <p className="text-xs text-zinc-400 mt-0.5">Granular diagnosis of test accuracy across all 13 assessed competencies</p>
            </div>
            <span className="text-xs text-zinc-400">
              {weaknesses.length} Bottlenecks Identified
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#232334] text-zinc-400 uppercase text-[10px] tracking-wider font-semibold">
                  <th className="pb-3 font-semibold">Topic Competency</th>
                  <th className="pb-3 font-semibold">Discipline</th>
                  <th className="pb-3 font-semibold">Score</th>
                  <th className="pb-3 font-semibold">Diagnostic Status</th>
                  <th className="pb-3 font-semibold">Attempts</th>
                  <th className="pb-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#232334]">
                {topicPerformances.map((tp, idx) => (
                  <tr key={idx} className="hover:bg-[#181824] transition-colors">
                    <td className="py-3 font-bold text-white">{tp.topic}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#181824] text-zinc-300 border border-[#26263A]">
                        {tp.category}
                      </span>
                    </td>
                    <td className="py-3 font-extrabold text-sm">
                      <span className={tp.score >= 75 ? 'text-emerald-400' : tp.score >= 65 ? 'text-purple-400' : 'text-rose-400'}>
                        {tp.score}%
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold ${
                        tp.status === 'Strength'
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                          : tp.status === 'Moderate'
                          ? 'bg-purple-950/60 text-purple-300 border border-purple-500/30'
                          : 'bg-rose-950/60 text-rose-300 border border-rose-500/30'
                      }`}>
                        {tp.status === 'Strength' ? '✓ Strength' : tp.status === 'Moderate' ? 'Moderate' : '⚠️ Critical Gap'}
                      </span>
                    </td>
                    <td className="py-3 text-zinc-400">{tp.totalAttempts} quizzes</td>
                    <td className="py-3">
                      <Link
                        href={tp.category === 'Technical' ? '/technical' : tp.category === 'Coding' ? '/coding' : '/aptitude'}
                        className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
                      >
                        <span>Practice</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* STRENGTHS vs NEEDS IMPROVEMENT & WEEKLY ACTIVITY CHART */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Strengths & Weaknesses (6 Cols) */}
          <div className="lg:col-span-6 app-card p-5 sm:p-6 border-[#232334] flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-4">Diagnostic Strengths & Weakness Analysis</h3>

              <div className="space-y-3.5">
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Top Assessed Strengths ({strengths.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {strengths.map((st, i) => (
                      <span key={i} className="px-2.5 py-1 bg-[#13131C] border border-emerald-500/30 rounded-lg text-xs font-medium text-emerald-300">
                        {st.topic} ({st.score}%)
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30">
                  <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 uppercase tracking-wider mb-2">
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    <span>Bottlenecks Needing Immediate Focus ({weaknesses.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {weaknesses.map((w, i) => (
                      <span key={i} className="px-2.5 py-1 bg-[#13131C] border border-rose-500/30 rounded-lg text-xs font-medium text-rose-300">
                        {w.topic} ({w.score}%)
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-zinc-500 mt-4 pt-3 border-t border-[#232334]">
              * The Personalized Roadmap engine automatically sequences tasks to eliminate bottlenecks first.
            </p>
          </div>

          {/* Weekly Activity Hours Chart (6 Cols) */}
          <div className="lg:col-span-6 app-card p-5 sm:p-6 border-[#232334]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Weekly Practice Intensity</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Daily hours dedicated to PlacePrep practice</p>
              </div>
              <span className="text-xs font-semibold text-purple-300 bg-purple-950/60 px-2.5 py-1 rounded-md border border-purple-500/30">
                28.4 Total Hours
              </span>
            </div>

            {/* Bar Chart */}
            <div className="h-44 flex items-end justify-between gap-3 pt-3">
              {stats.weeklyHours.map((hrs, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] font-semibold text-zinc-400">{hrs}h</span>
                  <div className="w-full bg-[#101018] rounded-lg flex items-end h-32 overflow-hidden border border-[#232334]">
                    <div
                      className="w-full bg-gradient-to-t from-purple-700 to-purple-500 hover:from-purple-600 hover:to-purple-400 rounded-lg transition-all duration-300 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                      style={{ height: `${(hrs / 7) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-zinc-400">{daysOfWeek[idx]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PERFORMANCE HISTORY DATA TABLE */}
        <div className="app-card p-5 sm:p-7 border-[#232334]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Recent Assessment Submissions & Diagnostic Results</h3>
              <p className="text-xs text-zinc-400 mt-0.5">Detailed records of attempted tests, coding submissions, and interview drills</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#232334] text-zinc-400 uppercase text-[10px] tracking-wider font-semibold">
                  <th className="pb-3 font-semibold">Test / Assessment</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Score</th>
                  <th className="pb-3 font-semibold">Accuracy</th>
                  <th className="pb-3 font-semibold">Attempt Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#232334]">
                {performanceHistoryData.map((row) => (
                  <tr key={row.id} className="hover:bg-[#181824] transition-colors">
                    <td className="py-3.5 font-bold text-white">{row.test}</td>
                    <td className="py-3.5">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#181824] text-zinc-300 border border-[#26263A]">
                        {row.category}
                      </span>
                    </td>
                    <td className="py-3.5 font-bold text-purple-400">{row.score}</td>
                    <td className="py-3.5 font-semibold text-emerald-400">{row.accuracy}</td>
                    <td className="py-3.5 text-zinc-400 text-xs">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
