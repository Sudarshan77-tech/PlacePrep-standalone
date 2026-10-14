'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { usePlacePrep } from '@/context/PlacePrepContext';
import { aptitudeCategories, sampleAptitudeQuestions } from '@/data/mockData';
import { AptitudeQuestion } from '@/types';
import {
  BrainCircuit,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Flag,
  ArrowRight,
  ArrowLeft,
  Filter,
  Sparkles
} from 'lucide-react';

export default function AptitudePage() {
  const { recordActivity } = usePlacePrep();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isQuizActive, setIsQuizActive] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Quiz state
  const [questions, setQuestions] = useState<AptitudeQuestion[]>(sampleAptitudeQuestions);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 mins

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isQuizActive && !quizFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isQuizActive, quizFinished, timeLeft]);

  const startQuiz = (topicTitle?: string) => {
    setIsQuizActive(true);
    setQuizFinished(false);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setFlaggedQuestions(new Set());
    setTimeLeft(300);
  };

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const toggleFlag = () => {
    setFlaggedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(currentIndex)) {
        next.delete(currentIndex);
      } else {
        next.add(currentIndex);
      }
      return next;
    });
  };

  const handleFinishQuiz = () => {
    setQuizFinished(true);
    setIsQuizActive(false);

    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });

    const scorePct = Math.round((correct / questions.length) * 100);
    recordActivity('Aptitude Practice Drill', 'Aptitude', `${scorePct}% (${correct}/${questions.length})`);
  };

  const correctCount = questions.filter((q, idx) => selectedAnswers[idx] === q.correctAnswer).length;
  const wrongCount = questions.filter((q, idx) => selectedAnswers[idx] !== undefined && selectedAnswers[idx] !== q.correctAnswer).length;
  const unansweredCount = questions.length - Object.keys(selectedAnswers).length;
  const accuracy = Object.keys(selectedAnswers).length > 0
    ? Math.round((correctCount / Object.keys(selectedAnswers).length) * 100)
    : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold badge-soft-blue">
                Aptitude & Reasoning
              </span>
              <span className="text-xs text-[#8896AB]">4 Core Categories</span>
            </div>
            <h1 className="text-2xl font-black text-[#142748] mt-1">
              Aptitude Practice & Speed Drills
            </h1>
            <p className="text-xs sm:text-sm text-[#52627A]">
              Master quantitative shortcuts, logical deduction, and verbal patterns for campus entrance tests.
            </p>
          </div>

          {!isQuizActive && !quizFinished && (
            <button
              onClick={() => startQuiz()}
              className="btn-primary text-xs sm:text-sm"
            >
              <Clock className="w-4 h-4" />
              <span>Start 5-Min Speed Drill</span>
            </button>
          )}
        </div>

        {/* QUIZ INTERFACE */}
        {isQuizActive && (
          <div className="app-card p-6 sm:p-7 space-y-4">
            {/* Top Bar: Progress & Timer */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E3EAF5]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8896AB]">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#F7F9FC] border border-[#E3EAF5] text-[#52627A]">
                  {questions[currentIndex].difficulty}
                </span>
                <span className="text-xs text-[#52627A] hidden sm:inline">
                  {questions[currentIndex].topic}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-700 rounded-lg text-xs font-bold border border-rose-200">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
                <button
                  onClick={toggleFlag}
                  className={`p-1.5 rounded-lg border text-xs font-medium transition-all ${
                    flaggedQuestions.has(currentIndex)
                      ? 'bg-amber-50 border-amber-300 text-amber-700'
                      : 'border-[#E3EAF5] text-[#52627A] hover:bg-[#F7F9FC]'
                  }`}
                  title="Mark for review"
                  aria-label="Flag question"
                >
                  <Flag className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Question Text */}
            <div className="py-4">
              <h2 className="text-base sm:text-lg font-bold text-[#142748] leading-relaxed">
                {questions[currentIndex].question}
              </h2>

              {/* Options */}
              <div className="mt-5 space-y-2.5">
                {questions[currentIndex].options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#EEF2FF] border-[#315BFA] text-[#142748] shadow-xs'
                          : 'bg-white border-[#E3EAF5] hover:border-[#CBD8EC] hover:bg-[#F7F9FC] text-[#52627A]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                          isSelected ? 'bg-[#315BFA] text-white' : 'bg-[#F7F9FC] border border-[#E3EAF5] text-[#52627A]'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{option}</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[#315BFA] bg-[#315BFA]' : 'border-[#CBD8EC]'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Bar: Navigator & Next/Prev Actions */}
            <div className="pt-4 border-t border-[#E3EAF5] flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Question Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 sm:pb-0">
                {questions.map((_, i) => {
                  const isAnswered = selectedAnswers[i] !== undefined;
                  const isFlagged = flaggedQuestions.has(i);
                  const isCurrent = currentIndex === i;

                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all relative ${
                        isCurrent
                          ? 'bg-[#315BFA] text-white'
                          : isAnswered
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-[#F7F9FC] border border-[#E3EAF5] text-[#52627A] hover:bg-[#E3EAF5]'
                      }`}
                    >
                      {i + 1}
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full ring-1 ring-white" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(prev => prev - 1)}
                  className="btn-secondary text-xs disabled:opacity-40"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex(prev => prev + 1)}
                    className="btn-primary text-xs"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinishQuiz}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5"
                  >
                    <span>Submit Drill</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* RESULTS SCREEN */}
        {quizFinished && (
          <div className="app-card p-6 sm:p-7 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E3EAF5]">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Performance Evaluation
                </span>
                <h2 className="text-xl font-bold text-[#142748] mt-1">
                  Speed Drill Completed
                </h2>
                <p className="text-xs text-[#8896AB]">
                  Time taken: {formatTime(300 - timeLeft)} • 5 Questions Attempted
                </p>
              </div>

              <button
                onClick={() => startQuiz()}
                className="btn-secondary text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Drill</span>
              </button>
            </div>

            {/* Score Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E3EAF5] text-center">
                <span className="text-xs text-[#8896AB] font-semibold uppercase">Score</span>
                <p className="text-2xl font-black text-[#315BFA] mt-1">
                  {Math.round((correctCount / questions.length) * 100)}%
                </p>
                <span className="text-[11px] text-[#8896AB]">{correctCount} of {questions.length} Correct</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E3EAF5] text-center">
                <span className="text-xs text-[#8896AB] font-semibold uppercase">Accuracy</span>
                <p className="text-2xl font-black text-emerald-600 mt-1">{accuracy}%</p>
                <span className="text-[11px] text-[#8896AB]">Attempted questions</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E3EAF5] text-center">
                <span className="text-xs text-[#8896AB] font-semibold uppercase">Correct</span>
                <p className="text-2xl font-black text-emerald-600 mt-1">{correctCount}</p>
                <span className="text-[11px] text-[#8896AB]">Positive marks</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E3EAF5] text-center">
                <span className="text-xs text-[#8896AB] font-semibold uppercase">Wrong / Skipped</span>
                <p className="text-2xl font-black text-rose-500 mt-1">{wrongCount} / {unansweredCount}</p>
                <span className="text-[11px] text-[#8896AB]">Review below</span>
              </div>
            </div>

            {/* Answer Explanations Review */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-[#142748]">Detailed Explanations</h3>
              {questions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div key={q.id} className="p-4 rounded-xl border border-[#E3EAF5] bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#8896AB]">Question {idx + 1}</span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        isCorrect ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {isCorrect ? '✓ Correct' : '✗ Incorrect / Skipped'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-[#142748]">{q.question}</p>

                    <div className="text-xs text-[#52627A] space-y-0.5">
                      <p>
                        Your Answer:{' '}
                        <span className={isCorrect ? 'font-bold text-emerald-700' : 'font-bold text-rose-600'}>
                          {userAns !== undefined ? q.options[userAns] : 'Not Answered'}
                        </span>
                      </p>
                      <p>
                        Correct Answer:{' '}
                        <span className="font-bold text-emerald-700">{q.options[q.correctAnswer]}</span>
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#F7F9FC] text-[11px] text-[#52627A] border border-[#E3EAF5]">
                      <strong className="text-[#142748]">Explanation:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CATEGORY EXPLORER */}
        {!isQuizActive && !quizFinished && (
          <>
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs text-[#8896AB] font-semibold">
                <Filter className="w-3.5 h-3.5" />
                <span>Category:</span>
              </div>
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-[#315BFA] text-white'
                    : 'bg-white border border-[#E3EAF5] text-[#52627A] hover:bg-[#F7F9FC]'
                }`}
              >
                All Categories
              </button>
              {aptitudeCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === c.id
                      ? 'bg-[#315BFA] text-white'
                      : 'bg-white border border-[#E3EAF5] text-[#52627A] hover:bg-[#F7F9FC]'
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {aptitudeCategories
                .filter(cat => selectedCategory === 'all' || selectedCategory === cat.id)
                .map((category) => (
                  <div
                    key={category.id}
                    className="app-card-hover p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#315BFA] flex items-center justify-center">
                          <BrainCircuit className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#F7F9FC] border border-[#E3EAF5] text-[#52627A]">
                          {category.questionCount} Questions
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#142748]">{category.title}</h3>
                      <p className="text-xs text-[#52627A] mt-1 leading-relaxed">{category.description}</p>

                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {category.topics.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-[#F7F9FC] border border-[#E3EAF5] text-[11px] font-medium text-[#52627A]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-[#E3EAF5] flex items-center justify-between">
                      <span className="text-xs text-[#8896AB]">Avg Time: {category.avgTimeMins} mins</span>
                      <button
                        onClick={() => startQuiz(category.title)}
                        className="btn-primary text-xs"
                      >
                        <span>Start Practice Quiz</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
