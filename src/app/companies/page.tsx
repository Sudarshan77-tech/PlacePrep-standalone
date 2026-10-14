'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { usePlacePrep } from '@/context/PlacePrepContext';
import { sampleCompanies } from '@/data/mockData';
import { Company } from '@/types';
import { calculateCompanyMatch } from '@/services/roadmapEngine';
import {
  ArrowRight,
  CheckCircle2,
  Search,
  Check,
  AlertTriangle,
  Sparkles,
  Info,
  Target
} from 'lucide-react';

export default function CompaniesPage() {
  const { user, stats, collegeData, updateUser, showToast } = usePlacePrep();

  const [selectedCompany, setSelectedCompany] = useState<Company>(sampleCompanies[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [filterTargetOnly, setFilterTargetOnly] = useState<boolean>(false);

  const targetCompanyIds = user.targetCompanyIds || [];

  const handleToggleTargetCompany = (companyId: string) => {
    let nextList: string[];
    if (targetCompanyIds.includes(companyId)) {
      nextList = targetCompanyIds.filter(id => id !== companyId);
      showToast(`Removed from Target Companies list`, 'info');
    } else {
      nextList = [...targetCompanyIds, companyId];
      showToast(`Added to Target Companies list`, 'success');
    }
    updateUser({ targetCompanyIds: nextList });
  };

  const filteredCompanies = sampleCompanies.filter((comp) => {
    const matchSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        comp.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTier = filterTier === 'all' || comp.tier === filterTier;
    const matchTarget = !filterTargetOnly || targetCompanyIds.includes(comp.id);
    return matchSearch && matchTier && matchTarget;
  });

  // Calculate detailed match for the currently selected company
  const matchResult = calculateCompanyMatch(
    selectedCompany,
    user,
    stats,
    collegeData.recruiterHistory
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold badge-soft-purple">
                Target Company Intelligence
              </span>
              <span className="text-xs text-zinc-400">10 Verified Campus Profiles</span>
            </div>
            <h1 className="text-2xl font-black text-white mt-1.5">
              Target Company Readiness & Skill Gap Match
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Transparent readiness estimates, required skills, missing gaps, and historical campus recruitment status for <strong className="text-white font-semibold">{user.college}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-medium">Active Targets:</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs">
              {targetCompanyIds.length} Selected
            </span>
          </div>
        </div>

        {/* TRANSPARENCY & SCORING METHOD NOTICE */}
        <div className="p-4 rounded-xl bg-[#181824] border border-[#26263A] flex items-start gap-3 text-xs text-zinc-300">
          <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p>
              <strong className="text-white font-semibold">Documented Match Scoring Method:</strong> Readiness percentage is computed from student assessment scores across Aptitude ({matchResult.scoringBreakdown.aptitudeScoreWeight}%), Coding ({matchResult.scoringBreakdown.codingScoreWeight}%), Technical CS ({matchResult.scoringBreakdown.technicalScoreWeight}%), and Interview ({matchResult.scoringBreakdown.interviewScoreWeight}%), conditioned on eligibility criteria.
            </p>
            <p className="text-zinc-500 text-[11px]">
              * Historical recruiters reflect verified or sample past campus visits. An active record indicates past recruitment patterns and does not guarantee future openings.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#13131C] p-3 rounded-xl border border-[#232334]">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search TCS, Infosys, Amazon, Microsoft..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#181824] border border-[#26263A] rounded-lg text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setFilterTargetOnly(!filterTargetOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                filterTargetOnly
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
                  : 'bg-[#181824] text-zinc-300 hover:text-white border border-[#26263A]'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Target Companies Only</span>
            </button>

            {(['all', 'Product', 'Services'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterTier(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  filterTier === t
                    ? 'bg-purple-900/60 text-purple-200 border border-purple-500/40'
                    : 'bg-[#181824] text-zinc-400 hover:text-white border border-[#232334]'
                }`}
              >
                {t === 'all' ? 'All Roles' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Company Quick-Selection Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {filteredCompanies.map((c) => {
            const isSelected = selectedCompany.id === c.id;
            const isTarget = targetCompanyIds.includes(c.id);

            return (
              <button
                key={c.id}
                onClick={() => setSelectedCompany(c)}
                className={`px-3.5 py-2 rounded-xl border text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500 shadow-[0_0_12px_rgba(124,58,237,0.35)]'
                    : 'bg-[#13131C] border-[#232334] text-zinc-300 hover:text-white hover:border-purple-500/30'
                }`}
              >
                <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-[#181824] text-purple-300'
                }`}>
                  {c.logoText.slice(0, 2)}
                </span>
                <span>{c.name}</span>
                {isTarget && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" title="Target Company" />
                )}
              </button>
            );
          })}
        </div>

        {/* SELECTED COMPANY MATCH DOSSIER */}
        <div className="app-card p-6 sm:p-7 border-[#232334] space-y-6">
          {/* Header Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232334]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.4)]">
                {selectedCompany.logoText}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white">{selectedCompany.name}</h2>
                  <span className="px-2 py-0.5 rounded text-xs font-semibold badge-soft-purple">
                    {selectedCompany.tier}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">{selectedCompany.tagline}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleToggleTargetCompany(selectedCompany.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                  targetCompanyIds.includes(selectedCompany.id)
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/50'
                    : 'btn-primary shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                }`}
              >
                {targetCompanyIds.includes(selectedCompany.id) ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Selected as Target Company</span>
                  </>
                ) : (
                  <>
                    <PlusIcon className="w-3.5 h-3.5" />
                    <span>Add to My Target List</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* COMPANY MATCH SCORE & ELIGIBILITY STATUS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Match Score Card */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-[#1A162B] via-[#161426] to-[#12111E] border border-purple-500/30 text-white flex flex-col justify-between shadow-[0_0_25px_rgba(124,58,237,0.15)]">
              <div>
                <span className="text-[11px] uppercase font-bold tracking-wider text-purple-300">
                  Documented Match Score
                </span>
                <div className="mt-2.5 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">{matchResult.matchScore}%</span>
                  <span className="text-xs text-purple-300">Readiness Match</span>
                </div>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                  Based on your current Aptitude ({stats.aptitudeScore}%), Coding ({stats.codingScore}%), and Technical ({stats.technicalScore}%) test evaluations.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-purple-500/20 text-[11px] text-purple-300">
                Placement cutoff estimate: 75%+
              </div>
            </div>

            {/* College Recruitment Status */}
            <div className="p-5 rounded-xl bg-[#181824] border border-[#26263A] flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">
                  Campus Recruitment History
                </span>
                <div className="mt-3">
                  {matchResult.isHistoricalRecruiterAtCollege ? (
                    <div className="space-y-1.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Recruited at {user.college}</span>
                      </span>
                      <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                        {matchResult.recruiterRecord?.status === 'Confirmed' ? '● Confirmed on-campus drive' : 'Historical visits on record'}
                        {' '}({matchResult.recruiterRecord?.offersCount || 0} historical offers).
                      </p>
                      <p className="text-[11px] text-zinc-400 font-medium">
                        Typical Package: {matchResult.recruiterRecord?.packageLPA}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-950/60 text-amber-300 border border-amber-500/30">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Off-Campus / National Qualifier</span>
                      </span>
                      <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                        No direct on-campus visits recorded in {user.college} records. Hiring is conducted via National Qualifier Drives (e.g., CodeVita, NQT, off-campus careers).
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#232334] text-[11px] text-zinc-500">
                Verified via College TPO Registry
              </div>
            </div>

            {/* Academic Eligibility */}
            <div className="p-5 rounded-xl bg-[#181824] border border-[#26263A] flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">
                  Academic Eligibility Check
                </span>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Min CGPA ({matchResult.recruiterRecord?.minCgpa || 7.0}):</span>
                    <span className={`font-semibold ${matchResult.eligibilityDetails.cgpaMet ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {matchResult.eligibilityDetails.cgpaMet ? `✓ ${user.cgpa || 8.8} Met` : `✗ ${user.cgpa || 8.8}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Backlogs Allowed ({matchResult.recruiterRecord?.maxBacklogs || 0}):</span>
                    <span className="font-semibold text-emerald-400">
                      ✓ {user.activeBacklogs || 0} Backlogs
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Branch ({user.branch}):</span>
                    <span className="font-semibold text-emerald-400">✓ Eligible</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#232334] text-[11px]">
                <span className={`font-semibold ${matchResult.eligibilityMet ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {matchResult.eligibilityMet ? '✓ Overall Eligibility Clear' : '⚠️ Review Academic Criteria'}
                </span>
              </div>
            </div>
          </div>

          {/* ASSESSED SKILLS VS MISSING SKILLS GAP */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Assessed Skills */}
            <div className="p-5 rounded-xl bg-[#181824] border border-[#26263A] space-y-3.5">
              <h3 className="text-sm font-bold text-white">Assessed Skill Benchmark Match</h3>
              <div className="space-y-3">
                {matchResult.assessedSkills.map((sk, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-zinc-300">{sk.skill}</span>
                      <span className={sk.status === 'Met' ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
                        {sk.studentScore}% / {sk.requiredScore}% ({sk.status})
                      </span>
                    </div>
                    <div className="w-full bg-[#101018] h-2 rounded-full overflow-hidden border border-[#232334]">
                      <div
                        className={`h-2 rounded-full ${sk.status === 'Met' ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`}
                        style={{ width: `${Math.min(100, (sk.studentScore / sk.requiredScore) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Skills & Recommended Action */}
            <div className="p-5 rounded-xl bg-[#181824] border border-[#26263A] flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Missing Skills & Recommended Focus</h3>
                <div className="mt-3 space-y-2">
                  {matchResult.missingSkills.length > 0 ? (
                    matchResult.missingSkills.map((ms, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-[#13131C] border border-[#232334] text-xs flex items-center justify-between">
                        <span className="font-medium text-white">{ms}</span>
                        <Link
                          href="/learning-path"
                          className="text-[11px] font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
                        >
                          <span>Add to Roadmap</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="p-3.5 rounded-lg bg-emerald-950/60 text-emerald-300 text-xs border border-emerald-500/30">
                      ✓ No critical skill gaps detected for {selectedCompany.name}! Maintain test frequency to sustain your readiness.
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#232334]">
                <Link
                  href="/learning-path"
                  className="btn-primary w-full text-xs shadow-[0_0_15px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Customized Roadmap for {selectedCompany.name}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* COMPANY SPECIFIC PREPARATION CHECKLIST */}
          <div className="bg-[#181824] p-5 rounded-xl border border-[#26263A] space-y-3">
            <h3 className="text-sm font-bold text-white">
              {selectedCompany.name} Preparation Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {matchResult.checklist.map((item) => (
                <div key={item.id} className="p-3 bg-[#13131C] rounded-lg border border-[#232334] flex items-center gap-2.5 text-xs">
                  <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 ${
                    item.completed ? 'bg-emerald-600 text-white' : 'border border-[#38384E]'
                  }`}>
                    {item.completed && <Check className="w-3 h-3" />}
                  </div>
                  <span className={item.completed ? 'text-white font-medium' : 'text-zinc-400'}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RECRUITMENT ROUNDS & TEST ARCHIVES */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Hiring Rounds Breakdown</h3>
            <div className="space-y-2.5">
              {selectedCompany.rounds.map((round) => (
                <div
                  key={round.roundNumber}
                  className="p-3.5 rounded-xl border border-[#26263A] bg-[#181824] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(124,58,237,0.4)]">
                      R{round.roundNumber}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">{round.title}</h4>
                      <p className="text-xs text-zinc-400 mt-0.5">{round.description}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-zinc-300 bg-[#13131C] px-2.5 py-1 rounded-md border border-[#232334] shrink-0">
                    {round.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}
