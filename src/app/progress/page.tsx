'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { usePlacePrep } from '@/context/PlacePrepContext';
import { performanceHistoryData } from '@/data/mockData';
import { analyzeStudentSkillGaps } from '@/services/roadmapEngine';
import {
  TrendingUp,
  BrainCircuit,
  Code2,
  Cpu,
  Mic,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Target,
  ArrowRight,
  ShieldCheck,
  Info
} from 'lucide-react';

export default function ProgressPage() {
  const { stats, topicPerformances, user } = usePlacePrep();

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Topic-wise analysis
  const strengths = topicPerformances.filter(t => t.status === 'Strength');
  const weaknesses = topicPerformances.filter(t => t.status === 'Weakness');
  const moderates = topicPerformances.filter(t => t.status === 'Moderate');

  const skillGaps = analyzeStudentSkillGaps(topicPerformances, user.targetCompanyIds || []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#EBF0FF] text-[#315BFA] border border-[#D4E0FC]">
              Student Diagnostic Analyzer
            </span>
            <span className="text-xs text-[#52627A]">Continuous Growth</span>
          </div>
          <h1 className="text-2xl font-bold text-[#142748] mt-1.5">
            Progress Tracking & Skill Diagnostic Intelligence
          </h1>
          <p className="text-sm text-[#52627A] mt-1">
            Topic-level assessment evaluation, skill bottleneck diagnosis, target company relevance, and performance trends over time.
          </p>
        </div>

        {/* OVERALL READINESS SCORE TREND CHART */}
        <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#52627A]">Score Trajectory</span>
              <h2 className="text-base font-bold text-[#142748] mt-0.5">Placement Readiness Trend (Last 6 Weeks)</h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>+14% Growth Since Diagnostic</span>
            </div>
          </div>

          {/* SVG Progress Timeline Graph */}
          <div className="h-52 w-full pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 600 160">
              {/* Grid Lines */}
              <line x1="0" y1="20" x2="600" y2="20" stroke="#E3EAF5" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="60" x2="600" y2="60" stroke="#E3EAF5" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="100" x2="600" y2="100" stroke="#E3EAF5" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="#E3EAF5" strokeWidth="1" />

              {/* Area Under Curve */}
              <path
                d="M 50 130 L 150 110 L 250 90 L 350 78 L 450 60 L 550 42 L 550 140 L 50 140 Z"
                fill="url(#blueGradientArea)"
                opacity="0.15"
              />

              {/* Smooth Trend Line */}
              <polyline
                fill="none"
                stroke="#315BFA"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="50,130 150,110 250,90 350,78 450,60 550,42"
              />

              <defs>
                <linearGradient id="blueGradientArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#315BFA" />
                  <stop offset="100%" stopColor="#ffffff" />
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
                  <circle cx={pt.x} cy={pt.y} r="4.5" fill="#315BFA" stroke="#ffffff" strokeWidth="2.5" />
                  <text x={pt.x} y={pt.y - 10} textAnchor="middle" fill="#142748" fontSize="11" fontWeight="700">
                    {pt.val}
                  </text>
                  <text x={pt.x} y="155" textAnchor="middle" fill="#52627A" fontSize="10">
                    Wk {i + 1}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* 4 SECTIONAL PERFORMANCE BARS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#52627A]">Aptitude & Reasoning</span>
              <span className="text-xs font-bold text-[#315BFA]">{stats.aptitudeScore}%</span>
            </div>
            <div className="w-full bg-[#E3EAF5] h-2 rounded-full overflow-hidden">
              <div className="bg-[#315BFA] h-2 rounded-full" style={{ width: `${stats.aptitudeScore}%` }} />
            </div>
            <p className="text-[11px] text-[#52627A] mt-2">Strong speed in Logical Syllogisms</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#52627A]">Coding (DSA)</span>
              <span className="text-xs font-bold text-[#315BFA]">{stats.codingScore}%</span>
            </div>
            <div className="w-full bg-[#E3EAF5] h-2 rounded-full overflow-hidden">
              <div className="bg-[#315BFA] h-2 rounded-full" style={{ width: `${stats.codingScore}%` }} />
            </div>
            <p className="text-[11px] text-[#52627A] mt-2">{stats.problemsSolved} Problems Solved</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#52627A]">Technical CS Core</span>
              <span className="text-xs font-bold text-[#315BFA]">{stats.technicalScore}%</span>
            </div>
            <div className="w-full bg-[#E3EAF5] h-2 rounded-full overflow-hidden">
              <div className="bg-[#315BFA] h-2 rounded-full" style={{ width: `${stats.technicalScore}%` }} />
            </div>
            <p className="text-[11px] text-[#52627A] mt-2">OS & OOP above campus average</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#52627A]">Mock Interview</span>
              <span className="text-xs font-bold text-[#315BFA]">{stats.interviewScore}%</span>
            </div>
            <div className="w-full bg-[#E3EAF5] h-2 rounded-full overflow-hidden">
              <div className="bg-[#315BFA] h-2 rounded-full" style={{ width: `${stats.interviewScore}%` }} />
            </div>
            <p className="text-[11px] text-[#52627A] mt-2">{stats.mockInterviews} Live sessions simulated</p>
          </div>
        </div>

        {/* DETAILED TOPIC-WISE PERFORMANCE TABLE & BOTTLENECK DIAGNOSIS */}
        <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-[#142748]">Topic-Wise Assessment Performance Breakdown</h2>
              <p className="text-xs text-[#52627A] mt-0.5">Granular diagnosis of test accuracy across all 13 assessed competencies</p>
            </div>
            <span className="text-xs text-[#52627A]">
              {weaknesses.length} Bottlenecks Identified
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E3EAF5] text-[#52627A] uppercase text-[10px] tracking-wider font-semibold">
                  <th className="pb-3 font-semibold">Topic Competency</th>
                  <th className="pb-3 font-semibold">Discipline</th>
                  <th className="pb-3 font-semibold">Score</th>
                  <th className="pb-3 font-semibold">Diagnostic Status</th>
                  <th className="pb-3 font-semibold">Attempts</th>
                  <th className="pb-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3EAF5]">
                {topicPerformances.map((tp, idx) => (
                  <tr key={idx} className="hover:bg-[#F7F9FC] transition-colors">
                    <td className="py-3 font-bold text-[#142748]">{tp.topic}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#F7F9FC] text-[#52627A] border border-[#E3EAF5]">
                        {tp.category}
                      </span>
                    </td>
                    <td className="py-3 font-extrabold text-sm">
                      <span className={tp.score >= 75 ? 'text-emerald-700' : tp.score >= 65 ? 'text-[#315BFA]' : 'text-rose-600'}>
                        {tp.score}%
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold ${
                        tp.status === 'Strength'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : tp.status === 'Moderate'
                          ? 'bg-[#EBF0FF] text-[#315BFA] border border-[#D4E0FC]'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}>
                        {tp.status === 'Strength' ? '✓ Strength' : tp.status === 'Moderate' ? 'Moderate' : '⚠️ Critical Gap'}
                      </span>
                    </td>
                    <td className="py-3 text-[#52627A]">{tp.totalAttempts} quizzes</td>
                    <td className="py-3">
                      <Link
                        href={tp.category === 'Technical' ? '/technical' : tp.category === 'Coding' ? '/coding' : '/aptitude'}
                        className="text-xs font-semibold text-[#315BFA] hover:text-[#2548DE] flex items-center gap-1"
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
          <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-6 border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)] flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-[#142748] mb-4">Diagnostic Strengths & Weakness Analysis</h3>

              <div className="space-y-3.5">
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-950 uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Top Assessed Strengths ({strengths.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {strengths.map((st, i) => (
                      <span key={i} className="px-2.5 py-1 bg-white border border-emerald-200 rounded-lg text-xs font-medium text-emerald-800">
                        {st.topic} ({st.score}%)
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
                  <div className="flex items-center gap-2 text-xs font-semibold text-rose-950 uppercase tracking-wider mb-2">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>Bottlenecks Needing Immediate Focus ({weaknesses.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {weaknesses.map((w, i) => (
                      <span key={i} className="px-2.5 py-1 bg-white border border-rose-200 rounded-lg text-xs font-medium text-rose-800">
                        {w.topic} ({w.score}%)
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#52627A] mt-4 pt-3 border-t border-[#E3EAF5]">
              * The Personalized Roadmap engine automatically sequences tasks to eliminate bottlenecks first.
            </p>
          </div>

          {/* Weekly Activity Hours Chart (6 Cols) */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-6 border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#142748]">Weekly Practice Intensity</h3>
                <p className="text-xs text-[#52627A] mt-0.5">Daily hours dedicated to PlacePrep practice</p>
              </div>
              <span className="text-xs font-semibold text-[#315BFA] bg-[#EBF0FF] px-2.5 py-1 rounded-md border border-[#D4E0FC]">
                28.4 Total Hours
              </span>
            </div>

            {/* Bar Chart */}
            <div className="h-44 flex items-end justify-between gap-3 pt-3">
              {stats.weeklyHours.map((hrs, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] font-semibold text-[#52627A]">{hrs}h</span>
                  <div className="w-full bg-[#E3EAF5] rounded-lg flex items-end h-32 overflow-hidden">
                    <div
                      className="w-full bg-[#315BFA] hover:bg-[#2548DE] rounded-lg transition-all duration-300"
                      style={{ height: `${(hrs / 7) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-[#52627A]">{daysOfWeek[idx]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PERFORMANCE HISTORY DATA TABLE */}
        <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#142748]">Recent Assessment Submissions & Diagnostic Results</h3>
              <p className="text-xs text-[#52627A] mt-0.5">Detailed records of attempted tests, coding submissions, and interview drills</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#E3EAF5] text-[#52627A] uppercase text-[10px] tracking-wider font-semibold">
                  <th className="pb-3 font-semibold">Test / Assessment</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Score</th>
                  <th className="pb-3 font-semibold">Accuracy</th>
                  <th className="pb-3 font-semibold">Attempt Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3EAF5]">
                {performanceHistoryData.map((row) => (
                  <tr key={row.id} className="hover:bg-[#F7F9FC] transition-colors">
                    <td className="py-3.5 font-bold text-[#142748]">{row.test}</td>
                    <td className="py-3.5">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#F7F9FC] text-[#52627A] border border-[#E3EAF5]">
                        {row.category}
                      </span>
                    </td>
                    <td className="py-3.5 font-bold text-[#315BFA]">{row.score}</td>
                    <td className="py-3.5 font-semibold text-emerald-700">{row.accuracy}</td>
                    <td className="py-3.5 text-[#52627A] text-xs">{row.date}</td>
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
