'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { usePlacePrep } from '@/context/PlacePrepContext';
import { technicalTopics, sampleTechQuestions } from '@/data/mockData';
import { TechnicalTopic } from '@/types';
import {
  Cpu,
  Database,
  Network,
  Server,
  Layers,
  Code,
  HardDrive,
  Clock,
  RotateCcw,
  ArrowRight
} from 'lucide-react';

export default function TechnicalPage() {
  const { recordActivity } = usePlacePrep();
  const [selectedTopic, setSelectedTopic] = useState<TechnicalTopic | null>(null);
  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [testFinished, setTestFinished] = useState<boolean>(false);

  // Test state
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(180);

  const getTopicIcon = (name: string) => {
    switch (name) {
      case 'Database': return Database;
      case 'Cpu': return Cpu;
      case 'Server': return Server;
      case 'Layers': return Layers;
      case 'Code': return Code;
      case 'HardDrive': return HardDrive;
      default: return Network;
    }
  };

  const handleStartTest = (topic: TechnicalTopic) => {
    setSelectedTopic(topic);
    setIsTestActive(true);
    setTestFinished(false);
    setCurrentIdx(0);
    setAnswers({});
    setTimeLeft(180);
  };

  const handleSelectOption = (optIdx: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentIdx]: optIdx
    }));
  };

  const handleFinishTest = () => {
    setIsTestActive(false);
    setTestFinished(true);

    let correct = 0;
    sampleTechQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) correct++;
    });

    const scorePct = Math.round((correct / sampleTechQuestions.length) * 100);
    recordActivity(`${selectedTopic?.title || 'Technical'} MCQ Drill`, 'Technical', `${scorePct}% (${correct}/${sampleTechQuestions.length})`);
  };

  const correctCount = sampleTechQuestions.filter((q, idx) => answers[idx] === q.correctAnswer).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold badge-soft-purple">
                Core Computer Science
              </span>
              <span className="text-xs text-[#8896AB]">7 Essential Subjects</span>
            </div>
            <h1 className="text-2xl font-black text-[#142748] mt-1">
              Technical MCQs & Concept Mastery
            </h1>
            <p className="text-xs sm:text-sm text-[#52627A]">
              Prepare for technical screening rounds in DBMS, Operating Systems, Computer Networks, and OOP.
            </p>
          </div>
        </div>

        {/* ACTIVE TEST INTERFACE */}
        {isTestActive && selectedTopic && (
          <div className="app-card p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-[#E3EAF5]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#315BFA]">
                  {selectedTopic.title} • Question {currentIdx + 1} of {sampleTechQuestions.length}
                </span>
                <span className="ml-2 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#F7F9FC] border border-[#E3EAF5] text-[#52627A]">
                  {sampleTechQuestions[currentIdx].difficulty}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-700 rounded-lg text-xs font-bold border border-rose-200">
                <Clock className="w-3.5 h-3.5" />
                <span>Timed Drill</span>
              </div>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-[#142748] leading-relaxed">
              {sampleTechQuestions[currentIdx].question}
            </h2>

            <div className="mt-4 space-y-2.5">
              {sampleTechQuestions[currentIdx].options.map((opt, optIdx) => {
                const isSelected = answers[currentIdx] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#F1EDFF] border-[#DDD6FE] text-[#142748] shadow-xs'
                        : 'bg-white border-[#E3EAF5] hover:border-[#CBD8EC] hover:bg-[#F7F9FC] text-[#52627A]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'bg-[#5B21B6] text-white' : 'bg-[#F7F9FC] border border-[#E3EAF5] text-[#52627A]'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-[#5B21B6] bg-[#5B21B6]' : 'border-[#CBD8EC]'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-[#E3EAF5] flex items-center justify-between">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => prev - 1)}
                className="btn-secondary text-xs disabled:opacity-40"
              >
                Previous
              </button>

              {currentIdx < sampleTechQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentIdx(prev => prev + 1)}
                  className="btn-primary text-xs"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleFinishTest}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs"
                >
                  Submit Answers
                </button>
              )}
            </div>
          </div>
        )}

        {/* RESULTS SCREEN */}
        {testFinished && (
          <div className="app-card p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E3EAF5]">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Assessment Completed
                </span>
                <h2 className="text-xl font-bold text-[#142748] mt-1">
                  {selectedTopic?.title} MCQ Drill Result
                </h2>
              </div>
              <button
                onClick={() => handleStartTest(selectedTopic!)}
                className="btn-secondary text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Drill</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E3EAF5] text-center">
                <span className="text-xs text-[#8896AB] uppercase font-bold">Accuracy</span>
                <p className="text-2xl font-black text-[#315BFA] mt-1">
                  {Math.round((correctCount / sampleTechQuestions.length) * 100)}%
                </p>
                <span className="text-[11px] text-[#8896AB]">{correctCount} of {sampleTechQuestions.length} correct</span>
              </div>
              <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E3EAF5] text-center">
                <span className="text-xs text-[#8896AB] uppercase font-bold">Category Benchmark</span>
                <p className="text-2xl font-black text-emerald-600 mt-1">75%</p>
                <span className="text-[11px] text-[#8896AB]">Target cutoff for screening</span>
              </div>
              <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E3EAF5] text-center">
                <span className="text-xs text-[#8896AB] uppercase font-bold">Status</span>
                <p className="text-lg font-bold text-[#142748] mt-2">
                  {correctCount >= 2 ? 'Meets Cutoff' : 'Needs Practice'}
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-[#142748]">Question Review</h3>
              {sampleTechQuestions.map((q, idx) => {
                const userAns = answers[idx];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div key={q.id} className="p-4 rounded-xl border border-[#E3EAF5] bg-white space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#8896AB]">Question {idx + 1}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isCorrect ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    </div>
                    <p className="font-semibold text-[#142748]">{q.question}</p>
                    <p className="text-[#52627A]">
                      Correct: <strong className="text-emerald-700">{q.options[q.correctAnswer]}</strong>
                    </p>
                    <div className="p-2 bg-[#F7F9FC] rounded-lg text-[11px] text-[#52627A] border border-[#E3EAF5]">
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TOPIC SELECTION GRID */}
        {!isTestActive && !testFinished && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {technicalTopics.map((topic) => {
              const Icon = getTopicIcon(topic.iconName);
              return (
                <div
                  key={topic.id}
                  className="app-card-hover p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg bg-[#F1EDFF] border border-[#DDD6FE] text-[#5B21B6] flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#F7F9FC] border border-[#E3EAF5] text-[#52627A]">
                        {topic.questionsCount} MCQs
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#142748]">{topic.title}</h3>
                    <p className="text-xs text-[#52627A] mt-1 leading-relaxed">{topic.shortDesc}</p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-[#E3EAF5] flex items-center justify-between">
                    <span className="text-xs text-[#8896AB]">Difficulty: {topic.difficulty}</span>
                    <button
                      onClick={() => handleStartTest(topic)}
                      className="btn-primary text-xs"
                    >
                      <span>Start Drill</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
