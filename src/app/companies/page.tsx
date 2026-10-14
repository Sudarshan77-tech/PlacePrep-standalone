'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { usePlacePrep } from '@/context/PlacePrepContext';
import { sampleCompanies } from '@/data/mockData';
import { Company } from '@/types';
import { calculateCompanyMatch } from '@/services/roadmapEngine';
import {
  Building2,
  Briefcase,
  ChevronRight,
  HelpCircle,
  Code2,
  Clock,
  Layers,
  ArrowRight,
  CheckCircle2,
  Search,
  Filter,
  Check,
  X,
  AlertTriangle,
  Sparkles,
  Info,
  ShieldCheck,
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
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#EBF0FF] text-[#315BFA] border border-[#D4E0FC]">
                Target Company Intelligence
              </span>
              <span className="text-xs text-[#52627A]">10 Verified Campus Profiles</span>
            </div>
            <h1 className="text-2xl font-bold text-[#142748] mt-1.5">
              Target Company Readiness & Skill Gap Match
            </h1>
            <p className="text-sm text-[#52627A] mt-1">
              Transparent readiness estimates, required skills, missing gaps, and historical campus recruitment status for <strong className="text-[#142748] font-semibold">{user.college}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#52627A] font-medium">Active Targets:</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#315BFA] text-white">
              {targetCompanyIds.length} Selected
            </span>
          </div>
        </div>

        {/* TRANSPARENCY & SCORING METHOD NOTICE */}
        <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E3EAF5] flex items-start gap-3 text-xs text-[#52627A]">
          <Info className="w-4 h-4 text-[#315BFA] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p>
              <strong className="text-[#142748] font-semibold">Documented Match Scoring Method:</strong> Readiness percentage is computed from student assessment scores across Aptitude ({matchResult.scoringBreakdown.aptitudeScoreWeight}%), Coding ({matchResult.scoringBreakdown.codingScoreWeight}%), Technical CS ({matchResult.scoringBreakdown.technicalScoreWeight}%), and Interview ({matchResult.scoringBreakdown.interviewScoreWeight}%), conditioned on eligibility criteria.
            </p>
            <p className="text-[#52627A]/80 text-[11px]">
              * Historical recruiters reflect verified or sample past campus visits. An active record indicates past recruitment patterns and does not guarantee future openings.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)]">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-[#52627A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search TCS, Infosys, Amazon, Microsoft..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F7F9FC] border border-[#E3EAF5] rounded-lg text-xs sm:text-sm text-[#142748] placeholder-[#52627A]/60 focus:outline-none focus:border-[#315BFA] focus:ring-1 focus:ring-[#315BFA]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setFilterTargetOnly(!filterTargetOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                filterTargetOnly
                  ? 'bg-[#315BFA] text-white'
                  : 'bg-[#F7F9FC] text-[#52627A] hover:text-[#142748] border border-[#E3EAF5]'
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
                    ? 'bg-[#142748] text-white'
                    : 'bg-[#F7F9FC] text-[#52627A] hover:text-[#142748] border border-[#E3EAF5]'
                }`}
              >
                {t === 'all' ? 'All Roles' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Company Quick-Selection Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {filteredCompanies.map((c) => {
            const isSelected = selectedCompany.id === c.id;
            const isTarget = targetCompanyIds.includes(c.id);

            return (
              <button
                key={c.id}
                onClick={() => setSelectedCompany(c)}
                className={`px-3.5 py-2 rounded-xl border text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#142748] text-white border-[#142748]'
                    : 'bg-white border-[#E3EAF5] text-[#52627A] hover:text-[#142748] hover:border-[#D4E0FC]'
                }`}
              >
                <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-[#F7F9FC] text-[#142748]'
                }`}>
                  {c.logoText.slice(0, 2)}
                </span>
                <span>{c.name}</span>
                {isTarget && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500" title="Target Company" />
                )}
              </button>
            );
          })}
        </div>

        {/* SELECTED COMPANY MATCH DOSSIER */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)] space-y-6">
          {/* Header Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3EAF5]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#315BFA] text-white font-bold text-sm flex items-center justify-center shadow-xs">
                {selectedCompany.logoText}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-[#142748]">{selectedCompany.name}</h2>
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-[#EBF0FF] text-[#315BFA] border border-[#D4E0FC]">
                    {selectedCompany.tier}
                  </span>
                </div>
                <p className="text-xs text-[#52627A] mt-0.5">{selectedCompany.tagline}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleToggleTargetCompany(selectedCompany.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                  targetCompanyIds.includes(selectedCompany.id)
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    : 'bg-[#315BFA] hover:bg-[#2548DE] text-white shadow-xs'
                }`}
              >
                {targetCompanyIds.includes(selectedCompany.id) ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
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
            <div className="p-5 rounded-xl bg-[#142748] text-white flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase font-bold tracking-wider text-blue-200">
                  Documented Match Score
                </span>
                <div className="mt-2.5 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold">{matchResult.matchScore}%</span>
                  <span className="text-xs text-blue-200">Readiness Match</span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Based on your current Aptitude ({stats.aptitudeScore}%), Coding ({stats.codingScore}%), and Technical ({stats.technicalScore}%) test evaluations.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-blue-200">
                Placement cutoff estimate: 75%+
              </div>
            </div>

            {/* College Recruitment Status */}
            <div className="p-5 rounded-xl bg-[#F7F9FC] border border-[#E3EAF5] flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase font-bold tracking-wider text-[#52627A]">
                  Campus Recruitment History
                </span>
                <div className="mt-3">
                  {matchResult.isHistoricalRecruiterAtCollege ? (
                    <div className="space-y-1.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Recruited at {user.college}</span>
                      </span>
                      <p className="text-xs text-[#52627A] mt-2 leading-relaxed">
                        {matchResult.recruiterRecord?.status === 'Confirmed' ? '● Confirmed on-campus drive' : 'Historical visits on record'}
                        {' '}({matchResult.recruiterRecord?.offersCount || 0} historical offers).
                      </p>
                      <p className="text-[11px] text-[#52627A] font-medium">
                        Typical Package: {matchResult.recruiterRecord?.packageLPA}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Off-Campus / National Qualifier</span>
                      </span>
                      <p className="text-xs text-[#52627A] mt-2 leading-relaxed">
                        No direct on-campus visits recorded in {user.college} records. Hiring is conducted via National Qualifier Drives (e.g., CodeVita, NQT, off-campus careers).
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E3EAF5] text-[11px] text-[#52627A]">
                Verified via College TPO Registry
              </div>
            </div>

            {/* Academic Eligibility */}
            <div className="p-5 rounded-xl bg-[#F7F9FC] border border-[#E3EAF5] flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase font-bold tracking-wider text-[#52627A]">
                  Academic Eligibility Check
                </span>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#52627A]">Min CGPA ({matchResult.recruiterRecord?.minCgpa || 7.0}):</span>
                    <span className={`font-semibold ${matchResult.eligibilityDetails.cgpaMet ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {matchResult.eligibilityDetails.cgpaMet ? `✓ ${user.cgpa || 8.8} Met` : `✗ ${user.cgpa || 8.8}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#52627A]">Backlogs Allowed ({matchResult.recruiterRecord?.maxBacklogs || 0}):</span>
                    <span className="font-semibold text-emerald-700">
                      ✓ {user.activeBacklogs || 0} Backlogs
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#52627A]">Branch ({user.branch}):</span>
                    <span className="font-semibold text-emerald-700">✓ Eligible</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E3EAF5] text-[11px]">
                <span className={`font-semibold ${matchResult.eligibilityMet ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {matchResult.eligibilityMet ? '✓ Overall Eligibility Clear' : '⚠️ Review Academic Criteria'}
                </span>
              </div>
            </div>
          </div>

          {/* ASSESSED SKILLS VS MISSING SKILLS GAP */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Assessed Skills */}
            <div className="p-5 rounded-xl bg-[#F7F9FC] border border-[#E3EAF5] space-y-3.5">
              <h3 className="text-sm font-bold text-[#142748]">Assessed Skill Benchmark Match</h3>
              <div className="space-y-3">
                {matchResult.assessedSkills.map((sk, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-[#142748]">{sk.skill}</span>
                      <span className={sk.status === 'Met' ? 'text-emerald-700 font-semibold' : 'text-amber-700 font-semibold'}>
                        {sk.studentScore}% / {sk.requiredScore}% ({sk.status})
                      </span>
                    </div>
                    <div className="w-full bg-[#E3EAF5] h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${sk.status === 'Met' ? 'bg-emerald-600' : 'bg-amber-500'}`}
                        style={{ width: `${Math.min(100, (sk.studentScore / sk.requiredScore) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Skills & Recommended Action */}
            <div className="p-5 rounded-xl bg-[#F7F9FC] border border-[#E3EAF5] flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#142748]">Missing Skills & Recommended Focus</h3>
                <div className="mt-3 space-y-2">
                  {matchResult.missingSkills.length > 0 ? (
                    matchResult.missingSkills.map((ms, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-white border border-[#E3EAF5] text-xs flex items-center justify-between">
                        <span className="font-medium text-[#142748]">{ms}</span>
                        <Link
                          href="/learning-path"
                          className="text-[11px] font-semibold text-[#315BFA] hover:text-[#2548DE] flex items-center gap-1"
                        >
                          <span>Add to Roadmap</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="p-3.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs border border-emerald-200">
                      ✓ No critical skill gaps detected for {selectedCompany.name}! Maintain test frequency to sustain your readiness.
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E3EAF5]">
                <Link
                  href="/learning-path"
                  className="w-full py-2 bg-[#315BFA] hover:bg-[#2548DE] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Customized Roadmap for {selectedCompany.name}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* COMPANY SPECIFIC PREPARATION CHECKLIST */}
          <div className="bg-[#F7F9FC] p-5 rounded-xl border border-[#E3EAF5] space-y-3">
            <h3 className="text-sm font-bold text-[#142748]">
              {selectedCompany.name} Preparation Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {matchResult.checklist.map((item) => (
                <div key={item.id} className="p-3 bg-white rounded-lg border border-[#E3EAF5] flex items-center gap-2.5 text-xs">
                  <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 ${
                    item.completed ? 'bg-emerald-600 text-white' : 'border border-[#CBD5E1]'
                  }`}>
                    {item.completed && <Check className="w-3 h-3" />}
                  </div>
                  <span className={item.completed ? 'text-[#142748] font-medium' : 'text-[#52627A]'}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RECRUITMENT ROUNDS & TEST ARCHIVES */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#52627A] mb-3">Hiring Rounds Breakdown</h3>
            <div className="space-y-2.5">
              {selectedCompany.rounds.map((round) => (
                <div
                  key={round.roundNumber}
                  className="p-3.5 rounded-xl border border-[#E3EAF5] bg-[#F7F9FC] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[#315BFA] text-white font-bold text-xs flex items-center justify-center shrink-0">
                      R{round.roundNumber}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#142748]">{round.title}</h4>
                      <p className="text-xs text-[#52627A] mt-0.5">{round.description}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#52627A] bg-white px-2.5 py-1 rounded-md border border-[#E3EAF5] shrink-0">
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
