'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { usePlacePrep } from '@/context/PlacePrepContext';
import { interviewTypes } from '@/data/mockData';
import { InterviewType, InterviewEvaluation } from '@/types';
import { evaluateInterviewLocally } from '@/services/localAiService';
import {
  Mic,
  MicOff,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

export default function InterviewPage() {
  const { stats, updateStats, recordActivity } = usePlacePrep();
  const [selectedType, setSelectedType] = useState<InterviewType>(interviewTypes[0]);
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<InterviewEvaluation | null>(null);

  const startInterview = (type: InterviewType) => {
    setSelectedType(type);
    setSessionActive(true);
    setSessionCompleted(false);
    setCurrentQIndex(0);
    setUserAnswer('');
    setEvaluation(null);
  };

  const handleNextOrFinish = () => {
    if (currentQIndex < selectedType.questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setUserAnswer('');
    } else {
      setSessionActive(false);
      setSessionCompleted(true);

      const localEval = evaluateInterviewLocally({
        interviewType: selectedType.title,
        role: selectedType.questions[currentQIndex]?.role || 'Interviewer',
        question: selectedType.questions[currentQIndex]?.question || '',
        answer: userAnswer
      });

      setEvaluation(localEval);
      updateStats({
        mockInterviews: stats.mockInterviews + 1,
        interviewScore: Math.min(99, Math.round((stats.interviewScore + localEval.overall) / 2))
      });
      recordActivity(`${selectedType.title} Mock Interview`, 'Interview', `Overall ${localEval.overall}% (Local Evaluation)`);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold badge-soft-amber">
                Mock Interview Simulation
              </span>
              <span className="text-xs text-zinc-400">STAR & Automated Rubrics</span>
            </div>
            <h1 className="text-2xl font-black text-white mt-1">
              Interactive Placement Mock Interviews
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Practice answering real interviewer questions with automated evaluation for Communication, Tech Depth, and Confidence.
            </p>
          </div>
        </div>

        {/* ACTIVE INTERVIEW SESSION */}
        {sessionActive && (
          <div className="app-card p-6 sm:p-7 space-y-6 border-[#232334]">
            <div className="flex items-center justify-between pb-4 border-b border-[#232334]">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold badge-soft-amber">
                  {selectedType.title}
                </span>
                <span className="text-xs text-zinc-400">
                  Question {currentQIndex + 1} of {selectedType.questions.length}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span>Session Live</span>
              </div>
            </div>

            {/* Split Screen: Left Interviewer | Right Student Response */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Question Card */}
              <div className="lg:col-span-5 bg-[#181824] p-5 rounded-xl border border-[#26263A] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 flex items-center justify-center font-bold text-sm shadow-[0_0_12px_rgba(124,58,237,0.3)]">
                      AI
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-white">{selectedType.questions[currentQIndex].role}</h3>
                      <p className="text-[11px] text-zinc-400">PlacePrep Campus Panel</p>
                    </div>
                  </div>

                  <div className="bg-[#13131C] p-4 rounded-xl border border-[#232334] text-xs sm:text-sm font-medium text-white leading-relaxed shadow-sm">
                    &ldquo;{selectedType.questions[currentQIndex].question}&rdquo;
                  </div>

                  {/* Interviewer Tip */}
                  <div className="mt-3.5 p-3 badge-soft-purple rounded-xl text-xs space-y-1">
                    <span className="font-bold flex items-center gap-1 text-purple-300">
                      <Sparkles className="w-3.5 h-3.5" /> Interviewer Hint
                    </span>
                    <p className="text-[11px] leading-relaxed text-zinc-300">
                      {selectedType.questions[currentQIndex].tips[0]}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#232334] text-[11px] text-zinc-400 flex items-center justify-between">
                  <span>Round Duration: ~{selectedType.avgDuration}</span>
                  <span>STAR Rubric</span>
                </div>
              </div>

              {/* Right: Answer Area */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-white">
                      Your Response (Speech or Typed)
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsRecording(!isRecording)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isRecording
                          ? 'bg-rose-600 text-white animate-pulse shadow-[0_0_12px_rgba(225,29,72,0.5)]'
                          : 'bg-[#181824] border border-[#26263A] text-zinc-300 hover:bg-[#202030] hover:text-white'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-purple-400" />}
                      <span>{isRecording ? 'Listening...' : 'Voice Toggle'}</span>
                    </button>
                  </div>

                  <textarea
                    rows={8}
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type or speak your answer here. Include concrete examples, actions taken, and metrics where applicable..."
                    className="w-full p-3.5 bg-[#0E0E16] border border-[#26263A] rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 resize-none leading-relaxed"
                  />

                  <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-1.5">
                    <span>{userAnswer.split(/\s+/).filter(Boolean).length} words typed</span>
                    <span>Evaluation checks STAR structure & terminology</span>
                  </div>
                </div>

                <div className="flex justify-end pt-3 border-t border-[#232334]">
                  <button
                    onClick={handleNextOrFinish}
                    className="btn-primary text-xs"
                  >
                    <span>{currentQIndex < selectedType.questions.length - 1 ? 'Next Question' : 'Complete & Generate Rubric'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RESULTS SCREEN */}
        {sessionCompleted && evaluation && (
          <div className="app-card p-6 sm:p-7 space-y-6 border-[#232334]">
            <div className="flex items-center justify-between pb-4 border-b border-[#232334]">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                  Rubric Evaluation Completed
                </span>
                <h2 className="text-xl font-bold text-white mt-1">
                  {selectedType.title} Interview Performance
                </h2>
              </div>
              <button
                onClick={() => startInterview(selectedType)}
                className="btn-secondary text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Practice Another</span>
              </button>
            </div>

            {/* Rubrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-xl bg-[#181824] border border-[#232334] text-center">
                <span className="text-xs text-zinc-400 uppercase font-bold">Overall Score</span>
                <p className="text-2xl font-black text-purple-400 mt-1">{evaluation.overall}%</p>
                <span className="text-[11px] text-zinc-400">Combined score</span>
              </div>
              <div className="p-4 rounded-xl bg-[#181824] border border-[#232334] text-center">
                <span className="text-xs text-zinc-400 uppercase font-bold">Communication</span>
                <p className="text-2xl font-black text-emerald-400 mt-1">{evaluation.communication}%</p>
                <span className="text-[11px] text-zinc-400">Clarity & pacing</span>
              </div>
              <div className="p-4 rounded-xl bg-[#181824] border border-[#232334] text-center">
                <span className="text-xs text-zinc-400 uppercase font-bold">Tech Depth</span>
                <p className="text-2xl font-black text-indigo-400 mt-1">{evaluation.technicalKnowledge}%</p>
                <span className="text-[11px] text-zinc-400">Concepts used</span>
              </div>
              <div className="p-4 rounded-xl bg-[#181824] border border-[#232334] text-center">
                <span className="text-xs text-zinc-400 uppercase font-bold">Confidence</span>
                <p className="text-2xl font-black text-amber-400 mt-1">{evaluation.confidence}%</p>
                <span className="text-[11px] text-zinc-400">Tone & flow</span>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1.5">
                <h4 className="text-xs font-bold text-emerald-300 uppercase">Demonstrated Strengths</h4>
                {evaluation.strengths.map((s, i) => (
                  <p key={i} className="text-xs text-emerald-200 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </p>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 space-y-1.5">
                <h4 className="text-xs font-bold text-amber-300 uppercase">Areas for Growth</h4>
                {evaluation.weaknesses.map((w, i) => (
                  <p key={i} className="text-xs text-amber-200 flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{w}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TRACK SELECTION CARDS */}
        {!sessionActive && !sessionCompleted && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {interviewTypes.map((type) => (
              <div
                key={type.id}
                className="app-card-hover p-5 flex flex-col justify-between border-[#232334]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300 flex items-center justify-center">
                      <Mic className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#181824] border border-[#232334] text-zinc-300">
                      {type.questions.length} Questions
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">{type.title}</h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{type.description}</p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#232334] flex items-center justify-between">
                  <span className="text-xs text-zinc-400">{type.avgDuration}</span>
                  <button
                    onClick={() => startInterview(type)}
                    className="btn-primary text-xs"
                  >
                    <span>Start Session</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
