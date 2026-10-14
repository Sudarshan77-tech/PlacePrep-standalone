'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePlacePrep } from '@/context/PlacePrepContext';
import { generatePlacePrepAIResponse, AssistantContext } from '@/services/localAiService';
import { AIChatMessage, GeneratedStudyPlan, PlanTaskItem } from '@/types';
import {
  Sparkles,
  X,
  Send,
  RotateCcw,
  Bot,
  User,
  ArrowRight,
  Info,
  Maximize2,
  Minimize2,
  Check,
  Calendar,
  Clock,
  Target,
  Trophy,
  CheckCircle2,
  Layers
} from 'lucide-react';

const SUGGESTED_QUERIES = [
  "Create today's plan for 2 hours",
  "Make my weekly placement preparation plan",
  "Create a 30-day DSA roadmap",
  "I only have one hour today; what should I study?",
  "What is DSA?",
  "How should I prepare for TCS?",
  "Teach me the STAR method",
  "Find my weak topics"
];

function StudyPlanCard({
  plan,
  onToggleTask,
  onSelectPrompt
}: {
  plan: GeneratedStudyPlan;
  onToggleTask: (planId: string, taskId: string) => void;
  onSelectPrompt?: (prompt: string) => void;
}) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedWeek, setSelectedWeek] = useState(1);

  // Compute completion stats
  let totalTasks = 0;
  let completedTasks = 0;

  if (plan.tasks) {
    totalTasks += plan.tasks.length;
    completedTasks += plan.tasks.filter(t => t.completed).length;
  }
  if (plan.days) {
    plan.days.forEach(d => {
      totalTasks += d.tasks.length;
      completedTasks += d.tasks.filter(t => t.completed).length;
    });
  }
  if (plan.weeks) {
    plan.weeks.forEach(w => {
      w.days.forEach(d => {
        totalTasks += d.tasks.length;
        completedTasks += d.tasks.filter(t => t.completed).length;
      });
    });
  }

  const completionPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const getCategoryStyle = (cat: PlanTaskItem['category']) => {
    switch (cat) {
      case 'Coding':
        return 'bg-indigo-950/70 text-indigo-300 border-indigo-500/40';
      case 'Aptitude':
        return 'bg-amber-950/70 text-amber-300 border-amber-500/40';
      case 'Technical':
        return 'bg-cyan-950/70 text-cyan-300 border-cyan-500/40';
      case 'Interview':
        return 'bg-purple-950/70 text-purple-300 border-purple-500/40';
      case 'Revision':
        return 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40';
      case 'Break':
        return 'bg-zinc-800 text-zinc-300 border-zinc-700/50';
      default:
        return 'bg-purple-950/60 text-purple-300 border-purple-500/30';
    }
  };

  const renderTaskItem = (task: PlanTaskItem) => (
    <div
      key={task.id}
      className={`p-2.5 rounded-xl border transition-all ${
        task.completed
          ? 'bg-[#12121C]/90 border-purple-900/40 opacity-75'
          : 'bg-[#161624] border-[#252538] hover:border-purple-500/30'
      }`}
    >
      <div className="flex items-start gap-2.5">
        <button
          type="button"
          onClick={() => onToggleTask(plan.id, task.id)}
          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all shrink-0 mt-0.5 ${
            task.completed
              ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 border-purple-400 text-white shadow-[0_0_8px_rgba(147,51,234,0.5)]'
              : 'bg-[#0D0D14] border-zinc-600 hover:border-purple-400 text-transparent'
          }`}
          aria-label={task.completed ? 'Mark task as pending' : 'Mark task as completed'}
        >
          <Check className="w-3.5 h-3.5" />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getCategoryStyle(
                task.category
              )}`}
            >
              {task.category}
            </span>
            {task.timeSlot && (
              <span className="text-[10px] font-mono text-zinc-400 px-1.5 py-0.5 rounded bg-[#0E0E16] border border-[#232334]">
                {task.timeSlot}
              </span>
            )}
            <span className="text-[10px] text-zinc-400">
              {task.durationMinutes}m
            </span>
            {task.completed && (
              <span className="text-[10px] font-bold text-emerald-400 ml-auto flex items-center gap-0.5">
                ✓ Done
              </span>
            )}
          </div>

          <h4
            className={`text-xs font-semibold ${
              task.completed ? 'line-through text-zinc-400' : 'text-white'
            }`}
          >
            {task.title}
          </h4>

          <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
            {task.description}
          </p>

          {task.targetGoal && (
            <div className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-purple-300/90 bg-purple-950/30 px-2 py-0.5 rounded border border-purple-500/20">
              <Target className="w-3 h-3 text-purple-400 shrink-0" />
              <span className="truncate">Goal: {task.targetGoal}</span>
            </div>
          )}

          {task.moduleHref && (
            <div className="mt-2">
              <Link
                href={task.moduleHref}
                className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-300 hover:text-white transition-colors"
              >
                <span>Practice Module</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-3 p-3.5 rounded-xl bg-[#12121C] border border-purple-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] space-y-3">
      {/* Plan Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#232334] pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-950/70 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
            {plan.type === 'today' ? (
              <Clock className="w-4 h-4" />
            ) : plan.type === 'weekly' ? (
              <Calendar className="w-4 h-4" />
            ) : (
              <Layers className="w-4 h-4" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-xs sm:text-sm text-white">{plan.title}</h3>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-950/60 text-purple-300 border border-purple-500/40">
                {plan.type === 'today' ? 'Daily' : plan.type === 'weekly' ? 'Weekly' : '30-Day'}
              </span>
            </div>
            {plan.totalDurationMinutes && (
              <span className="text-[10px] text-zinc-400">
                Total Allocated Time: {plan.totalDurationMinutes} mins
              </span>
            )}
          </div>
        </div>

        {plan.targetCompanies && plan.targetCompanies.length > 0 && (
          <div className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-[#181826] border border-[#26263A] text-purple-300 font-medium">
            <span>🎯 {plan.targetCompanies.join(', ')}</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-zinc-400 font-medium">Progress</span>
          <span className="font-semibold text-purple-300">
            {completedTasks} / {totalTasks} tasks completed ({completionPct}%)
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#1C1C2C] overflow-hidden border border-[#232334]">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 transition-all duration-300"
            style={{ width: `${completionPct}%` }}
          />
        </div>
      </div>

      {plan.summaryNote && (
        <p className="text-[11px] text-zinc-300 italic">{plan.summaryNote}</p>
      )}

      {/* Plan Specific Content */}
      {plan.type === 'today' && plan.tasks && (
        <div className="space-y-2">
          {plan.tasks.map(t => renderTaskItem(t))}
        </div>
      )}

      {plan.type === 'weekly' && plan.days && (
        <div className="space-y-2.5">
          {/* Day selector tabs */}
          <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar">
            {plan.days.map(d => {
              const isSelected = d.dayNumber === selectedDay;
              const dayCompleted = d.tasks.filter(t => t.completed).length;
              return (
                <button
                  key={d.dayNumber}
                  type="button"
                  onClick={() => setSelectedDay(d.dayNumber)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-sm'
                      : 'bg-[#151522] text-zinc-400 border-[#232334] hover:text-white hover:border-purple-500/30'
                  }`}
                >
                  Day {d.dayNumber}
                  <span className="text-[10px] ml-1 opacity-75">
                    ({dayCompleted}/{d.tasks.length})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Day Content */}
          {(() => {
            const currentDay = plan.days.find(d => d.dayNumber === selectedDay) || plan.days[0];
            return (
              <div className="space-y-2">
                <div className="px-2 py-1 bg-[#151522] rounded-lg border border-[#232334] flex items-center justify-between text-xs">
                  <span className="font-bold text-purple-300">{currentDay.dayName}</span>
                  <span className="text-[11px] text-zinc-400 truncate max-w-[200px]">
                    {currentDay.focusTheme}
                  </span>
                </div>
                <div className="space-y-2">
                  {currentDay.tasks.map(t => renderTaskItem(t))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {plan.type === 'monthly' && plan.weeks && (
        <div className="space-y-2.5">
          {/* Week selector tabs */}
          <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar">
            {plan.weeks.map(w => {
              const isSelected = w.weekNumber === selectedWeek;
              let weekTotal = 0;
              let weekCompleted = 0;
              w.days.forEach(d => {
                weekTotal += d.tasks.length;
                weekCompleted += d.tasks.filter(t => t.completed).length;
              });

              return (
                <button
                  key={w.weekNumber}
                  type="button"
                  onClick={() => setSelectedWeek(w.weekNumber)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-sm'
                      : 'bg-[#151522] text-zinc-400 border-[#232334] hover:text-white hover:border-purple-500/30'
                  }`}
                >
                  Week {w.weekNumber}
                  <span className="text-[10px] ml-1 opacity-75">
                    ({weekCompleted}/{weekTotal})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Week Content */}
          {(() => {
            const currentWeek = plan.weeks.find(w => w.weekNumber === selectedWeek) || plan.weeks[0];
            return (
              <div className="space-y-2">
                <div className="p-2 bg-[#151522] rounded-lg border border-[#232334] space-y-1">
                  <div className="text-xs font-bold text-purple-300">
                    Week {currentWeek.weekNumber}: {currentWeek.weekTheme}
                  </div>
                  {currentWeek.milestone && (
                    <div className="text-[11px] text-amber-300 flex items-start gap-1">
                      <Trophy className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                      <span>Milestone: {currentWeek.milestone}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  {currentWeek.days.flatMap(d => d.tasks).map(t => renderTaskItem(t))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Assumptions & Notes */}
      {plan.assumptions && plan.assumptions.length > 0 && (
        <div className="p-2 rounded-lg bg-[#0E0E16] border border-[#232334] text-[10px] text-zinc-400 space-y-0.5">
          {plan.assumptions.map((asm, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <span className="text-purple-400">•</span>
              <span>{asm}</span>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#232334]">
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Saved to your Active Plans</span>
        </div>
        {onSelectPrompt && (
          <button
            type="button"
            onClick={() =>
              onSelectPrompt(
                plan.type === 'today'
                  ? "Make today's plan 1 hour"
                  : "Make tomorrow's coding session shorter"
              )
            }
            className="text-[11px] text-purple-300 hover:text-white underline hover:no-underline font-medium transition-colors"
          >
            {plan.type === 'today' ? 'Adjust duration →' : 'Shorten session →'}
          </button>
        )}
      </div>
    </div>
  );
}

export function PlacePrepAIAssistant() {
  const {
    user,
    stats,
    collegeData,
    roadmapTasks,
    topicPerformances,
    chatMessages,
    addChatMessage,
    resetChatHistory,
    activePlans,
    saveStudyPlan,
    togglePlanTask
  } = usePlacePrep();

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping, isOpen]);

  // Focus textarea when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend ?? input).trim();
    if (!query || isTyping) return;

    const userMsg: AIChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    addChatMessage(userMsg);
    setInput('');
    setIsTyping(true);

    const weakTopics = topicPerformances
      .filter(t => t.status === 'Weakness')
      .map(t => t.topic);
    const strongTopics = topicPerformances
      .filter(t => t.status === 'Strength')
      .map(t => t.topic);
    const pendingCount = roadmapTasks.filter(t => t.status === 'Pending').length;
    const confirmedRecruiters = collegeData.recruiterHistory
      .filter(r => r.status === 'Confirmed')
      .map(r => r.companyName);

    const ctx: AssistantContext = {
      studentName: user.name,
      collegeName: collegeData.collegeName,
      branch: user.branch,
      gradYear: user.gradYear,
      cgpa: user.cgpa,
      activeBacklogs: user.activeBacklogs,
      targetCompanyIds: user.targetCompanyIds,
      preferredJobRoles: user.preferredJobRoles,
      dailyPrepMinutes: user.dailyPrepMinutes,
      placementTargetDate: user.placementTargetDate,
      readinessScore: stats.readinessScore,
      aptitudeScore: stats.aptitudeScore,
      codingScore: stats.codingScore,
      technicalScore: stats.technicalScore,
      interviewScore: stats.interviewScore,
      weakTopics,
      strongTopics,
      pendingTasksCount: pendingCount,
      confirmedCollegeRecruiters: confirmedRecruiters
    };

    setTimeout(() => {
      try {
        const resp = generatePlacePrepAIResponse(query, ctx, chatMessages, activePlans);

        if (resp.plan) {
          saveStudyPlan(resp.plan);
        }

        const aiMsg: AIChatMessage = {
          id: `ai_${Date.now()}`,
          sender: 'assistant',
          text: resp.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRuleBased: resp.isRuleBased,
          suggestedAction: resp.suggestedAction,
          contextHighlights: resp.contextHighlights,
          plan: resp.plan
        };
        addChatMessage(aiMsg);
      } catch {
        addChatMessage({
          id: `err_${Date.now()}`,
          sender: 'assistant',
          text: 'An error occurred while generating your response. Please try again or ask a specific question.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      } finally {
        setIsTyping(false);
      }
    }, 350);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-full shadow-[0_0_24px_rgba(124,58,237,0.5)] transition-all duration-150 active:scale-95 group ring-1 ring-purple-400/40"
        aria-label="Open PlacePrep AI Placement Assistant"
      >
        <div className="relative">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-purple-900" />
        </div>
        <span className="font-semibold text-xs tracking-tight pr-0.5">PlacePrep AI</span>
      </button>

      {/* Slide-over / Modal Chat Panel */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-200 flex flex-col bg-[#111119] border border-purple-500/30 shadow-[0_0_40px_rgba(124,58,237,0.22)] rounded-2xl overflow-hidden ${
            isExpanded
              ? 'inset-4 sm:inset-10 max-w-4xl mx-auto'
              : 'bottom-20 right-4 sm:right-6 w-[94vw] sm:w-[440px] h-[620px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-[#151520] border-b border-[#232334] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-xs sm:text-sm text-white">PlacePrep AI</h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-950/60 text-purple-300 border border-purple-500/40">
                    Local Offline Engine
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400 truncate max-w-[210px]">
                  Placement Intelligence Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-zinc-400">
              <button
                onClick={resetChatHistory}
                className="p-1.5 rounded-lg hover:bg-[#1F1F2E] hover:text-white transition-colors"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsExpanded(prev => !prev)}
                className="hidden sm:block p-1.5 rounded-lg hover:bg-[#1F1F2E] hover:text-white transition-colors"
                title={isExpanded ? 'Collapse' : 'Expand'}
                aria-label="Toggle full view"
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[#1F1F2E] hover:text-white transition-colors"
                title="Close Assistant"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Assistant Transparency Notice */}
          <div className="px-3.5 py-1.5 bg-[#14141E] border-b border-[#232334] flex items-center gap-2 text-[11px] text-zinc-400">
            <Info className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span className="truncate">
              Grounded in your profile & college benchmarks. 100% offline & persistent.
            </span>
          </div>

          {/* Conversation History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#0A0A10]">
            {chatMessages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0 text-xs shadow-xs mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className="max-w-[88%] space-y-1.5">
                    <div
                      className={`p-3 rounded-xl text-xs sm:text-sm leading-relaxed ${
                        isUser
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-xs shadow-[0_2px_12px_rgba(124,58,237,0.35)]'
                          : 'bg-[#161622] text-zinc-100 border border-[#26263A] rounded-tl-xs shadow-sm'
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>

                      {/* Interactive Study Plan Card */}
                      {msg.plan && (
                        <StudyPlanCard
                          plan={msg.plan}
                          onToggleTask={togglePlanTask}
                          onSelectPrompt={(p) => handleSend(p)}
                        />
                      )}

                      {/* Context highlights */}
                      {msg.contextHighlights && msg.contextHighlights.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-[#26263A] flex flex-wrap gap-1.5">
                          {msg.contextHighlights.map((hl, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#1C1C2A] text-purple-300 border border-purple-500/25"
                            >
                              {hl}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Interactive Suggested Action */}
                    {msg.suggestedAction && (
                      <Link
                        href={msg.suggestedAction.href}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#181826] hover:bg-purple-950/50 border border-purple-500/40 rounded-lg text-xs font-semibold text-purple-300 transition-colors shadow-xs"
                      >
                        <span>{msg.suggestedAction.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}

                    <div
                      className={`text-[10px] text-zinc-500 px-1 ${
                        isUser ? 'text-right' : 'text-left'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-700 to-indigo-800 text-white flex items-center justify-center shrink-0 text-xs shadow-xs mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 items-center text-zinc-500 text-xs py-1">
                <div className="w-6 h-6 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-300 flex items-center justify-center text-xs">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-[#161622] px-3 py-2 rounded-xl rounded-tl-xs border border-[#26263A] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full ai-dot-1" />
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full ai-dot-2" />
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full ai-dot-3" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Prompt Pills */}
          <div className="px-3 py-2 bg-[#14141E] border-t border-[#232334] overflow-x-auto flex gap-1.5 no-scrollbar">
            {SUGGESTED_QUERIES.map((sq, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(sq)}
                className="text-[11px] font-medium whitespace-nowrap px-2.5 py-1 rounded-full bg-[#181824] hover:bg-purple-950/50 hover:text-purple-300 hover:border-purple-500/40 border border-[#232334] text-zinc-300 transition-colors shrink-0"
              >
                {sq}
              </button>
            ))}
          </div>

          {/* Input Box: Arbitrary free-text input with Enter to send & Shift+Enter for new line */}
          <div className="p-3 bg-[#14141E] border-t border-[#232334] flex items-end gap-2">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything or request study plan... (Enter to send, Shift+Enter for line)"
              className="flex-1 resize-none max-h-28 p-2.5 bg-[#0D0D14] border border-[#232334] rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/40 transition-all leading-normal"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="p-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white rounded-xl shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all shrink-0 cursor-pointer disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

