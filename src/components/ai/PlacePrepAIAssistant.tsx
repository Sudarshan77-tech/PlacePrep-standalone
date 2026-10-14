'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePlacePrep } from '@/context/PlacePrepContext';
import { generatePlacePrepAIResponse, AssistantContext } from '@/services/localAiService';
import { AIChatMessage } from '@/types';
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
  Minimize2
} from 'lucide-react';

const SUGGESTED_QUERIES = [
  'Create today\'s study plan',
  'Find my weak topics',
  'Check my target-company readiness',
  'Explain why this topic is important',
  'Practice interview questions',
  'Prepare for past college recruiters'
];

export function PlacePrepAIAssistant() {
  const {
    user,
    stats,
    collegeData,
    roadmapTasks,
    topicPerformances
  } = usePlacePrep();

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      text: `Hello **${user.name}**! 👋 I am your **PlacePrep AI Assistant**.\n\nI can analyze your preparation for **${collegeData.collegeName}** recruitment drives, target company cutoffs, assessed weaknesses, and active roadmap tasks.\n\nWhat would you like to focus on right now?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRuleBased: true,
      suggestedAction: {
        label: "View Today's Roadmap",
        href: '/learning-path'
      }
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus textarea when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend ?? input).trim();
    if (!query) return;

    const userMsg: AIChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
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
      const resp = generatePlacePrepAIResponse(query, ctx);
      const aiMsg: AIChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        text: resp.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRuleBased: resp.isRuleBased,
        suggestedAction: resp.suggestedAction,
        contextHighlights: resp.contextHighlights
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `msg_welcome_${Date.now()}`,
        sender: 'assistant',
        text: `Conversation reset. Ready to assist your placement roadmap for **${collegeData.collegeName}**! What would you like to prepare next?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRuleBased: true
      }
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-2.5 bg-[#315BFA] hover:bg-[#2548DE] text-white rounded-full shadow-dropdown transition-all duration-150 active:scale-95 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315BFA]"
        aria-label="Open PlacePrep AI Placement Assistant"
      >
        <div className="relative">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-[#315BFA]" />
        </div>
        <span className="font-semibold text-xs tracking-tight pr-0.5">PlacePrep AI</span>
      </button>

      {/* Slide-over / Modal Chat Panel */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-200 flex flex-col bg-white border border-[#E3EAF5] shadow-dropdown rounded-2xl overflow-hidden ${
            isExpanded
              ? 'inset-4 sm:inset-10 max-w-4xl mx-auto'
              : 'bottom-20 right-4 sm:right-6 w-[94vw] sm:w-[420px] h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-white border-b border-[#E3EAF5] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#F1EDFF] border border-[#DDD6FE] flex items-center justify-center text-[#5B21B6]">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-xs sm:text-sm text-[#142748]">PlacePrep AI</h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#F1EDFF] text-[#5B21B6] border border-[#DDD6FE]">
                    Local Engine
                  </span>
                </div>
                <p className="text-[10px] text-[#8896AB] truncate max-w-[210px]">
                  Placement Intelligence Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[#52627A]">
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg hover:bg-[#F7F9FC] hover:text-[#142748] transition-colors"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsExpanded(prev => !prev)}
                className="hidden sm:block p-1.5 rounded-lg hover:bg-[#F7F9FC] hover:text-[#142748] transition-colors"
                title={isExpanded ? 'Collapse' : 'Expand'}
                aria-label="Toggle full view"
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[#F7F9FC] hover:text-[#142748] transition-colors"
                title="Close Assistant"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Assistant Transparency Disclaimer Notice */}
          <div className="px-3.5 py-1.5 bg-[#F7F9FC] border-b border-[#E3EAF5] flex items-center gap-2 text-[11px] text-[#52627A]">
            <Info className="w-3.5 h-3.5 text-[#315BFA] shrink-0" />
            <span className="truncate">
              Grounded in your real profile and college benchmarks. 100% offline.
            </span>
          </div>

          {/* Conversation History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#F7F9FC]/50">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-lg bg-[#F1EDFF] border border-[#DDD6FE] text-[#5B21B6] flex items-center justify-center shrink-0 text-xs shadow-2xs mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className="max-w-[85%] space-y-1.5">
                    <div
                      className={`p-3 rounded-xl text-xs sm:text-sm leading-relaxed ${
                        isUser
                          ? 'bg-[#315BFA] text-white rounded-tr-xs shadow-xs'
                          : 'bg-white text-[#142748] border border-[#E3EAF5] rounded-tl-xs shadow-subtle'
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>

                      {/* Context highlights */}
                      {msg.contextHighlights && msg.contextHighlights.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-[#E3EAF5] flex flex-wrap gap-1.5">
                          {msg.contextHighlights.map((hl, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F7F9FC] text-[#52627A] border border-[#E3EAF5]"
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
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-[#F7F9FC] border border-[#E3EAF5] rounded-lg text-xs font-semibold text-[#315BFA] transition-colors shadow-2xs"
                      >
                        <span>{msg.suggestedAction.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}

                    <div
                      className={`text-[10px] text-[#8896AB] px-1 ${
                        isUser ? 'text-right' : 'text-left'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-6 h-6 rounded-lg bg-[#142748] text-white flex items-center justify-center shrink-0 text-xs shadow-2xs mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 items-center text-[#8896AB] text-xs py-1">
                <div className="w-6 h-6 rounded-lg bg-[#F1EDFF] border border-[#DDD6FE] text-[#5B21B6] flex items-center justify-center text-xs">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white px-3 py-2 rounded-xl rounded-tl-xs border border-[#E3EAF5] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#315BFA] rounded-full ai-dot-1" />
                  <span className="w-1.5 h-1.5 bg-[#315BFA] rounded-full ai-dot-2" />
                  <span className="w-1.5 h-1.5 bg-[#315BFA] rounded-full ai-dot-3" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Prompt Pills */}
          <div className="px-3 py-2 bg-white border-t border-[#E3EAF5] overflow-x-auto flex gap-1.5 no-scrollbar">
            {SUGGESTED_QUERIES.map((sq, i) => (
              <button
                key={i}
                onClick={() => handleSend(sq)}
                className="text-[11px] font-medium whitespace-nowrap px-2.5 py-1 rounded-full bg-[#F7F9FC] hover:bg-[#EEF2FF] hover:text-[#315BFA] hover:border-[#D0DBFE] border border-[#E3EAF5] text-[#52627A] transition-colors shrink-0"
              >
                {sq}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-[#E3EAF5] flex items-end gap-2">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about study plan, weak topics, or companies... (Enter to send)"
              className="flex-1 resize-none max-h-24 p-2.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded-xl text-xs sm:text-sm text-[#142748] placeholder-[#8896AB] focus:outline-none focus:border-[#315BFA] focus:bg-white transition-all"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="p-2.5 bg-[#315BFA] hover:bg-[#2548DE] disabled:bg-[#E3EAF5] text-white disabled:text-[#8896AB] rounded-xl shadow-xs transition-colors shrink-0"
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
