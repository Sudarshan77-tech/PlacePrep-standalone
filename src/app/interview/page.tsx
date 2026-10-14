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
  CheckCircle2,
  Clock,
  ShieldCheck
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
              <span className="text-xs text-[#8896AB]">STAR & Automated Rubrics</span>
            </div>
            <h1 className="text-2xl font-black text-[#142748] mt-1">
              Interactive Placement Mock Interviews
            </h1>
            <p className="text-xs sm:text-sm text-[#52627A]">
              Practice answering real interviewer questions with automated evaluation for Communication, Tech Depth, and Confidence.
            </p>
          </div>
        </div>

        {/* ACTIVE INTERVIEW SESSION */}
        {sessionActive && (
          <div className="app-card p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E3EAF5]">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold badge-soft-amber">
                  {selectedType.title}
                </span>
                <span className="text-xs text-[#8896AB]">
                  Question {currentQIndex + 1} of {selectedType.questions.length}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span>Session Live</span>
              </div>
            </div>

            {/* Split Screen: Left Interviewer | Right Student Response */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Question Card */}
              <div className="lg:col-span-5 bg-[#F7F9FC] p-5 rounded-xl border border-[#E3EAF5] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                      AI
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#142748]">{selectedType.questions[currentQIndex].role}</h3>
                      <p className="text-[11px] text-[#8896AB]">PlacePrep Campus Panel</p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E3EAF5] text-xs sm:text-sm font-medium text-[#142748] leading-relaxed shadow-2xs">
                    &ldquo;{selectedType.questions[currentQIndex].question}&rdquo;
                  </div>

                  {/* Interviewer Tip */}
                  <div className="mt-3.5 p-3 badge-soft-blue rounded-xl text-xs space-y-1">
                    <span className="font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Interviewer Hint
                    </span>
                    <p className="text-[11px] leading-relaxed">
                      {selectedType.questions[currentQIndex].tips[0]}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E3EAF5] text-[11px] text-[#8896AB] flex items-center justify-between">
                  <span>Round Duration: ~{selectedType.avgDuration}</span>
                  <span>STAR Rubric</span>
                </div>
              </div>

              {/* Right: Answer Area */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-[#142748]">
                      Your Response (Speech or Typed)
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsRecording(!isRecording)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isRecording
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-[#F7F9FC] border border-[#E3EAF5] text-[#52627A] hover:bg-[#E3EAF5]'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                      <span>{isRecording ? 'Listening...' : 'Voice Toggle'}</span>
                    </button>
                  </div>

                  <textarea
                    rows={8}
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type or speak your answer here. Include concrete examples, actions taken, and metrics where applicable..."
                    className="w-full p-3.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded-xl text-xs sm:text-sm text-[#142748] placeholder-[#8896AB] focus:outline-none focus:border-[#315BFA] focus:bg-white resize-none leading-relaxed"
                  />

                  <div className="flex items-center justify-between text-[11px] text-[#8896AB] mt-1.5">
                    <span>{userAnswer.split(/\s+/).filter(Boolean).length} words typed</span>
                    <span>Evaluation checks STAR structure & terminology</span>
                  </div>
                </div>

                <div className="flex justify-end pt-3 border-t border-[#E3EAF5]">
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
          <div className="app-card p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E3EAF5]">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Rubric Evaluation Completed
                </span>
                <h2 className="text-xl font-bold text-[#142748] mt-1">
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
              <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E3EAF5] text-center">
                <span className="text-xs text-[#8896AB] uppercase font-bold">Overall Score</span>
                <p className="text-2xl font-black text-[#315BFA] mt-1">{evaluation.overall}%</p>
                <span className="text-[11px] text-[#8896AB]">Combined score</span>
              </div>
              <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E3EAF5] text-center">
                <span className="text-xs text-[#8896AB] uppercase font-bold">Communication</span>
                <p className="text-2xl font-black text-emerald-600 mt-1">{evaluation.communication}%</p>
                <span className="text-[11px] text-[#8896AB]">Clarity & pacing</span>
              </div>
              <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E3EAF5] text-center">
                <span className="text-xs text-[#8896AB] uppercase font-bold">Tech Depth</span>
                <p className="text-2xl font-black text-indigo-600 mt-1">{evaluation.technicalKnowledge}%</p>
                <span className="text-[11px] text-[#8896AB]">Concepts used</span>
              </div>
              <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E3EAF5] text-center">
                <span className="text-xs text-[#8896AB] uppercase font-bold">Confidence</span>
                <p className="text-2xl font-black text-amber-600 mt-1">{evaluation.confidence}%</p>
                <span className="text-[11px] text-[#8896AB]">Tone & flow</span>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                <h4 className="text-xs font-bold text-emerald-900 uppercase">Demonstrated Strengths</h4>
                {evaluation.strengths.map((s, i) => (
                  <p key={i} className="text-xs text-emerald-800 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </p>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                <h4 className="text-xs font-bold text-amber-900 uppercase">Areas for Growth</h4>
                {evaluation.weaknesses.map((w, i) => (
                  <p key={i} className="text-xs text-amber-800 flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
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
                className="app-card-hover p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                      <Mic className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#F7F9FC] border border-[#E3EAF5] text-[#52627A]">
                      {type.questions.length} Questions
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#142748]">{type.title}</h3>
                  <p className="text-xs text-[#52627A] mt-1 leading-relaxed">{type.description}</p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#E3EAF5] flex items-center justify-between">
                  <span className="text-xs text-[#8896AB]">{type.avgDuration}</span>
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
