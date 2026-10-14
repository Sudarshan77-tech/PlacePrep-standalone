'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { usePlacePrep } from '@/context/PlacePrepContext';
import { codingProblems } from '@/data/mockData';
import { CodingProblem } from '@/types';
import {
  Code2,
  Play,
  Send,
  CheckCircle2,
  Clock,
  HardDrive,
  Flame,
  Filter,
  Terminal
} from 'lucide-react';

export default function CodingPage() {
  const { stats, updateStats, recordActivity, showToast } = usePlacePrep();
  const [selectedProblem, setSelectedProblem] = useState<CodingProblem>(codingProblems[0]);
  const [selectedLang, setSelectedLang] = useState<'cpp' | 'python' | 'java' | 'javascript'>('python');
  const [code, setCode] = useState<string>(codingProblems[0].starterCode.python);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [filterTag, setFilterTag] = useState<string>('all');

  // Execution state
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [runResult, setRunResult] = useState<{
    status: 'passed' | 'failed' | 'idle';
    runtime?: string;
    memory?: string;
    testCasesPassed?: string;
    output?: string;
  }>({ status: 'idle' });

  const handleSelectProblem = (prob: CodingProblem) => {
    setSelectedProblem(prob);
    setCode(prob.starterCode[selectedLang]);
    setRunResult({ status: 'idle' });
  };

  const handleLanguageChange = (lang: 'cpp' | 'python' | 'java' | 'javascript') => {
    setSelectedLang(lang);
    setCode(selectedProblem.starterCode[lang]);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setRunResult({ status: 'idle' });
    setTimeout(() => {
      setIsRunning(false);
      setRunResult({
        status: 'passed',
        runtime: '42 ms',
        memory: '14.2 MB',
        testCasesPassed: '3 / 3 test cases passed',
        output: 'Target sum matches at expected output indices.'
      });
      showToast('Sample testcases passed!', 'success');
    }, 700);
  };

  const handleSubmitCode = () => {
    setIsSubmitting(true);
    setRunResult({ status: 'idle' });
    setTimeout(() => {
      setIsSubmitting(false);
      setRunResult({
        status: 'passed',
        runtime: '38 ms',
        memory: '13.8 MB',
        testCasesPassed: 'All test cases passed (64/64)',
        output: 'Accepted. Faster than 89.4% of submissions.'
      });

      updateStats({
        problemsSolved: stats.problemsSolved + 1,
        codingScore: Math.min(99, stats.codingScore + 1)
      });
      recordActivity(selectedProblem.title, 'Coding', 'Accepted (38ms, 13.8MB)');
    }, 1000);
  };

  const allTags = ['Arrays', 'Strings', 'Linked List', 'Dynamic Programming', 'Sliding Window', 'Hash Table'];

  const filteredProblems = codingProblems.filter(p => {
    const matchDiff = filterDifficulty === 'all' || p.difficulty.toLowerCase() === filterDifficulty.toLowerCase();
    const matchTag = filterTag === 'all' || p.tags.includes(filterTag);
    return matchDiff && matchTag;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Stats Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold badge-soft-blue">
                Coding Practice
              </span>
              <span className="text-xs text-[#8896AB]">DSA & Technical Rounds</span>
            </div>
            <h1 className="text-2xl font-black text-[#142748] mt-1">
              Coding Challenges & Sandbox IDE
            </h1>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-2.5">
            <div className="px-3 py-1.5 bg-white border border-[#E3EAF5] rounded-xl text-xs shadow-2xs">
              <span className="text-[#8896AB]">Solved:</span>{' '}
              <strong className="text-[#142748]">{stats.problemsSolved}</strong>
            </div>
            <div className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-xs font-semibold text-amber-800 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{stats.currentStreak}d streak</span>
            </div>
            <div className="px-3 py-1.5 badge-soft-blue rounded-xl text-xs font-semibold">
              Score: {stats.codingScore}%
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="app-card p-3 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#8896AB] pl-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>

          {(['all', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setFilterDifficulty(diff)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterDifficulty === diff
                  ? 'bg-[#315BFA] text-white'
                  : 'bg-[#F7F9FC] text-[#52627A] hover:bg-[#E3EAF5]'
              }`}
            >
              {diff === 'all' ? 'All' : diff}
            </button>
          ))}

          <div className="h-4 w-px bg-[#E3EAF5] mx-1 hidden sm:block" />

          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(filterTag === tag ? 'all' : tag)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                filterTag === tag
                  ? 'bg-[#142748] text-white'
                  : 'bg-[#F7F9FC] text-[#52627A] hover:bg-[#E3EAF5]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Problem Selector Bar */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          {filteredProblems.map((prob) => {
            const isSelected = selectedProblem.id === prob.id;
            return (
              <button
                key={prob.id}
                onClick={() => handleSelectProblem(prob)}
                className={`px-3.5 py-2 rounded-xl border text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#315BFA] text-white border-[#315BFA] shadow-xs'
                    : 'bg-white border-[#E3EAF5] text-[#142748] hover:border-[#315BFA]/50 hover:bg-[#F7F9FC]'
                }`}
              >
                <span>{prob.title}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : prob.difficulty === 'Easy'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : prob.difficulty === 'Medium'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}>
                  {prob.difficulty}
                </span>
              </button>
            );
          })}
        </div>

        {/* SPLIT SCREEN: LEFT STATEMENT | RIGHT CODE EDITOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[580px]">
          {/* Left: Problem Details (5 Cols) */}
          <div className="lg:col-span-5 app-card p-6 flex flex-col justify-between overflow-y-auto max-h-[680px]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E3EAF5]">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  selectedProblem.difficulty === 'Easy'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : selectedProblem.difficulty === 'Medium'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}>
                  {selectedProblem.difficulty}
                </span>
                <span className="text-xs text-[#8896AB]">Acceptance: {selectedProblem.acceptance}</span>
              </div>

              <h2 className="text-lg font-bold text-[#142748] mt-3">{selectedProblem.title}</h2>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
                {selectedProblem.tags.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-[#F7F9FC] border border-[#E3EAF5] text-[#52627A] rounded text-[11px] font-medium">
                    {t}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="text-xs sm:text-sm text-[#52627A] leading-relaxed whitespace-pre-line">
                {selectedProblem.description}
              </div>

              {/* Examples */}
              <div className="mt-5 space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8896AB]">Examples</h3>
                {selectedProblem.examples.map((ex, i) => (
                  <div key={i} className="p-3 bg-[#F7F9FC] rounded-xl border border-[#E3EAF5] font-mono text-xs">
                    <div className="text-[#52627A]"><span className="text-[#8896AB]">Input:</span> {ex.input}</div>
                    <div className="text-[#142748] font-bold mt-1"><span className="text-[#8896AB] font-normal">Output:</span> {ex.output}</div>
                    {ex.explanation && (
                      <div className="text-[#8896AB] font-sans text-[11px] mt-1 pt-1 border-t border-[#E3EAF5]">
                        Explanation: {ex.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div className="mt-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8896AB] mb-1.5">Constraints</h3>
                <ul className="space-y-1 text-xs text-[#52627A] list-disc list-inside">
                  {selectedProblem.constraints.map((c, i) => (
                    <li key={i} className="font-mono text-[11px]">{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right: Code Editor & Execution Panel (7 Cols) */}
          <div className="lg:col-span-7 bg-[#142748] rounded-2xl border border-[#23385D] shadow-card flex flex-col justify-between overflow-hidden">
            {/* Editor Top Bar */}
            <div className="bg-[#0D1D38] px-4 py-2.5 border-b border-[#23385D] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-1">solution.{selectedLang === 'python' ? 'py' : selectedLang === 'cpp' ? 'cpp' : selectedLang === 'java' ? 'java' : 'js'}</span>
              </div>

              {/* Language Selector */}
              <select
                value={selectedLang}
                onChange={(e) => handleLanguageChange(e.target.value as any)}
                className="bg-[#1C3256] border border-[#2E4874] text-white text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-[#315BFA]"
              >
                <option value="python">Python 3</option>
                <option value="cpp">C++ 20</option>
                <option value="java">Java 17</option>
                <option value="javascript">JavaScript (ES6)</option>
              </select>
            </div>

            {/* Code Editor Area */}
            <div className="flex-1 p-4 bg-[#142748] font-mono text-xs sm:text-sm">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={15}
                spellCheck={false}
                className="w-full h-full bg-transparent text-emerald-300 font-mono text-xs sm:text-sm focus:outline-none resize-none leading-relaxed selection:bg-[#315BFA]/40"
              />
            </div>

            {/* Testcase & Execution Results Drawer */}
            {runResult.status !== 'idle' && (
              <div className="bg-[#0D1D38] border-t border-[#23385D] p-3.5 font-mono text-xs">
                <div className="flex items-center justify-between pb-1.5 border-b border-[#23385D] mb-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">{runResult.testCasesPassed}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {runResult.runtime}
                    </span>
                    <span className="flex items-center gap-1">
                      <HardDrive className="w-3 h-3" /> {runResult.memory}
                    </span>
                  </div>
                </div>
                <div className="text-slate-300 text-[11px]">
                  Output: {runResult.output}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="bg-[#0D1D38] p-3.5 border-t border-[#23385D] flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                <Terminal className="w-3.5 h-3.5 text-[#315BFA]" />
                <span>Compiler Sandbox Active</span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleRunCode}
                  disabled={isRunning || isSubmitting}
                  className="px-3.5 py-1.5 bg-[#1C3256] hover:bg-[#28436E] disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  {isRunning ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Run Code</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleSubmitCode}
                  disabled={isRunning || isSubmitting}
                  className="px-4 py-1.5 bg-[#315BFA] hover:bg-[#2548DE] disabled:opacity-50 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
                >
                  {isSubmitting ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
