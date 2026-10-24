'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  StudentStats,
  ResumeData,
  ActivityItem,
  CollegePlacementData,
  RecruiterHistoryRecord,
  DailyWeeklyRoadmapTask,
  StudentTopicPerformance,
  GeneratedStudyPlan,
  AIChatMessage,
  PlanTaskItem
} from '@/types';
import {
  initialStudent,
  studentStats as defaultStats,
  initialResume,
  recentActivities as defaultActivities,
  defaultCollegePlacementData,
  sampleTopicPerformances,
  initialPersonalizedRoadmapTasks
} from '@/data/mockData';
import {
  generatePersonalizedRoadmap
} from '@/services/roadmapEngine';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface PlacePrepContextType {
  user: User;
  stats: StudentStats;
  resumeData: ResumeData;
  activities: ActivityItem[];
  collegeData: CollegePlacementData;
  roadmapTasks: DailyWeeklyRoadmapTask[];
  topicPerformances: StudentTopicPerformance[];
  toasts: Toast[];
  isOnline: boolean;
  updateUser: (updated: Partial<User>) => void;
  updateStats: (updated: Partial<StudentStats>) => void;
  updateResume: (updated: ResumeData) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  recordActivity: (title: string, category: 'Aptitude' | 'Coding' | 'Technical' | 'Interview', score: string) => void;
  resetDemoData: () => void;
  // Roadmap task actions
  toggleTaskStatus: (taskId: string) => void;
  postponeTask: (taskId: string) => void;
  regenerateRoadmap: () => void;
  // Admin / TPO college placement record management
  addOrUpdateRecruiterRecord: (record: RecruiterHistoryRecord) => void;
  deleteRecruiterRecord: (id: string) => void;
  updateCollegeOverview: (overview: Partial<CollegePlacementData>) => void;
  // Study plans & AI Assistant chat persistence
  activePlans: {
    today?: GeneratedStudyPlan;
    weekly?: GeneratedStudyPlan;
    monthly?: GeneratedStudyPlan;
  };
  saveStudyPlan: (plan: GeneratedStudyPlan) => void;
  togglePlanTask: (planId: string, taskId: string) => void;
  clearActivePlan: (type: 'today' | 'weekly' | 'monthly') => void;
  chatMessages: AIChatMessage[];
  addChatMessage: (msg: AIChatMessage) => void;
  updateChatMessagePlan: (messageId: string, updatedPlan: GeneratedStudyPlan) => void;
  resetChatHistory: () => void;
  isLoggedIn: boolean;
  themeMode: 'light' | 'dark';
  toggleTheme: () => void;
  login: (email: string) => void;
  logout: () => void;
}

const PlacePrepContext = createContext<PlacePrepContextType | undefined>(undefined);

export function PlacePrepProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(initialStudent);
  const [stats, setStats] = useState<StudentStats>(defaultStats);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResume);
  const [activities, setActivities] = useState<ActivityItem[]>(defaultActivities);
  const [collegeData, setCollegeData] = useState<CollegePlacementData>(defaultCollegePlacementData);
  const [roadmapTasks, setRoadmapTasks] = useState<DailyWeeklyRoadmapTask[]>(initialPersonalizedRoadmapTasks);
  const [topicPerformances, setTopicPerformances] = useState<StudentTopicPerformance[]>(sampleTopicPerformances);
  const [activePlans, setActivePlans] = useState<{
    today?: GeneratedStudyPlan;
    weekly?: GeneratedStudyPlan;
    monthly?: GeneratedStudyPlan;
  }>({});
  const [chatMessages, setChatMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      text: `Hello ${initialStudent.name}! I am your PlacePrep AI Assistant.\n\nI can analyze your preparation for ${initialStudent.college} placements.\n\nHere are some things you can ask me:\n• Create my study plan for today\n• Which skills should I improve first?\n• How ready am I for my target company?\n• Help me prepare for technical interviews\n• Tell me about companies that recruit from my college`,
      timestamp: 'Just now',
      isRuleBased: true,
      suggestedAction: {
        label: "Create Today's Plan",
        href: '/learning-path'
      }
    }
  ]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');

  // Monitor network online/offline status
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);

      const handleOnline = () => {
        setIsOnline(true);
        showToast('Internet connected — Online mode', 'info');
      };
      const handleOffline = () => {
        setIsOnline(false);
        showToast('No internet detected — Running in Offline Mode', 'warning');
      };

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
        navigator.serviceWorker.register('/sw.js').catch((err) => {
          console.warn('Service worker registration:', err);
        });
      }

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  // Load state from localStorage on initial render
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('placeprep_user');
      const savedStats = localStorage.getItem('placeprep_stats');
      const savedResume = localStorage.getItem('placeprep_resume');
      const savedActivities = localStorage.getItem('placeprep_activities');
      const savedCollegeData = localStorage.getItem('placeprep_college_data');
      const savedRoadmap = localStorage.getItem('placeprep_roadmap');
      const savedTopics = localStorage.getItem('placeprep_topics');
      const savedTheme = localStorage.getItem('placeprep_theme');
      const loggedIn = localStorage.getItem('placeprep_auth');
      const savedPlans = localStorage.getItem('placeprep_active_plans');
      const savedChat = localStorage.getItem('placeprep_ai_chat_history');

      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedStats) setStats(JSON.parse(savedStats));
      if (savedResume) setResumeData(JSON.parse(savedResume));
      if (savedActivities) setActivities(JSON.parse(savedActivities));
      if (savedCollegeData) setCollegeData(JSON.parse(savedCollegeData));
      if (savedRoadmap) setRoadmapTasks(JSON.parse(savedRoadmap));
      if (savedTopics) setTopicPerformances(JSON.parse(savedTopics));
      if (savedPlans) setActivePlans(JSON.parse(savedPlans));
      if (savedChat) {
        try {
          const parsed: AIChatMessage[] = JSON.parse(savedChat);
          const cleaned = parsed.map(m => {
            if (m.id.startsWith('msg_welcome') && m.text.includes('**PlacePrep AI Assistant**')) {
              return {
                ...m,
                text: `Hello ${initialStudent.name}! I am your PlacePrep AI Assistant.\n\nI can analyze your preparation for ${initialStudent.college} placements.\n\nHere are some things you can ask me:\n• Create my study plan for today\n• Which skills should I improve first?\n• How ready am I for my target company?\n• Help me prepare for technical interviews\n• Tell me about companies that recruit from my college`
              };
            }
            return m;
          });
          setChatMessages(cleaned);
        } catch {
          // ignore parsing error
        }
      }
      if (savedTheme === 'light') {
        setThemeMode('light');
        document.documentElement.classList.remove('dark');
      } else {
        setThemeMode('dark');
        document.documentElement.classList.add('dark');
      }
      if (loggedIn !== null) setIsLoggedIn(loggedIn === 'true');
    } catch {
      // Local storage fallback
    }
  }, []);

  const toggleTheme = () => {
    setThemeMode(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('placeprep_theme', next);
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const updateUser = (updated: Partial<User>) => {
    setUser(prev => {
      const next = { ...prev, ...updated };
      localStorage.setItem('placeprep_user', JSON.stringify(next));
      return next;
    });
  };

  const updateStats = (updated: Partial<StudentStats>) => {
    setStats(prev => {
      const next = { ...prev, ...updated };
      localStorage.setItem('placeprep_stats', JSON.stringify(next));
      return next;
    });
  };

  const updateResume = (updated: ResumeData) => {
    setResumeData(updated);
    localStorage.setItem('placeprep_resume', JSON.stringify(updated));
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const recordActivity = (title: string, category: 'Aptitude' | 'Coding' | 'Technical' | 'Interview', score: string) => {
    showToast(`Recorded: ${title} (${score})`, 'success');

    const newActivity: ActivityItem = {
      id: `act_${Date.now()}`,
      title,
      category,
      timestamp: 'Just now',
      score,
      status: 'completed'
    };

    setActivities(prev => {
      const next = [newActivity, ...prev];
      localStorage.setItem('placeprep_activities', JSON.stringify(next));
      return next;
    });

    // Update topic score and aggregate stats dynamically
    setStats(prev => {
      let apt = prev.aptitudeScore;
      let cod = prev.codingScore;
      let tch = prev.technicalScore;
      let itv = prev.interviewScore;

      if (category === 'Aptitude') apt = Math.min(99, apt + 1);
      if (category === 'Coding') cod = Math.min(99, cod + 1);
      if (category === 'Technical') tch = Math.min(99, tch + 1);
      if (category === 'Interview') itv = Math.min(99, itv + 1);

      const readiness = Math.round((apt * 0.25) + (cod * 0.35) + (tch * 0.2) + (itv * 0.2));

      const next = {
        ...prev,
        aptitudeScore: apt,
        codingScore: cod,
        technicalScore: tch,
        interviewScore: itv,
        readinessScore: readiness,
        testsCompleted: prev.testsCompleted + (category !== 'Coding' ? 1 : 0),
        problemsSolved: prev.problemsSolved + (category === 'Coding' ? 1 : 0),
        mockInterviews: prev.mockInterviews + (category === 'Interview' ? 1 : 0),
      };
      localStorage.setItem('placeprep_stats', JSON.stringify(next));
      return next;
    });
  };

  // Toggle Roadmap Task completion
  const toggleTaskStatus = (taskId: string) => {
    setRoadmapTasks(prev => {
      const next = prev.map(t => {
        if (t.id === taskId) {
          const isComp = t.status === 'Completed';
          return {
            ...t,
            status: (isComp ? 'Pending' : 'Completed') as 'Pending' | 'Completed',
            completedAt: isComp ? undefined : new Date().toISOString()
          };
        }
        return t;
      });
      localStorage.setItem('placeprep_roadmap', JSON.stringify(next));
      return next;
    });
    showToast('Roadmap task updated', 'info');
  };

  // Postpone Roadmap Task
  const postponeTask = (taskId: string) => {
    setRoadmapTasks(prev => {
      const next = prev.map(t => {
        if (t.id === taskId) {
          return {
            ...t,
            status: 'Postponed' as const,
            dateString: 'Postponed'
          };
        }
        return t;
      });
      localStorage.setItem('placeprep_roadmap', JSON.stringify(next));
      return next;
    });
    showToast('Task moved to postponed queue', 'info');
  };

  // Regenerate / Update Roadmap based on current scores and target companies
  const regenerateRoadmap = () => {
    const freshTasks = generatePersonalizedRoadmap(user, stats, topicPerformances, collegeData);
    setRoadmapTasks(freshTasks);
    localStorage.setItem('placeprep_roadmap', JSON.stringify(freshTasks));
    showToast('Personalized roadmap adapted to your latest scores & target companies!', 'success');
  };

  // Admin / TPO Recruiter Record Management
  const addOrUpdateRecruiterRecord = (record: RecruiterHistoryRecord) => {
    setCollegeData(prev => {
      const existingIdx = prev.recruiterHistory.findIndex(r => r.id === record.id);
      let updatedList = [...prev.recruiterHistory];
      if (existingIdx >= 0) {
        updatedList[existingIdx] = record;
      } else {
        updatedList = [record, ...updatedList];
      }
      const next = { ...prev, recruiterHistory: updatedList };
      localStorage.setItem('placeprep_college_data', JSON.stringify(next));
      return next;
    });
    showToast(`Placement record for ${record.companyName} saved successfully!`, 'success');
  };

  const deleteRecruiterRecord = (id: string) => {
    setCollegeData(prev => {
      const updatedList = prev.recruiterHistory.filter(r => r.id !== id);
      const next = { ...prev, recruiterHistory: updatedList };
      localStorage.setItem('placeprep_college_data', JSON.stringify(next));
      return next;
    });
    showToast('Placement record deleted', 'info');
  };

  const updateCollegeOverview = (overview: Partial<CollegePlacementData>) => {
    setCollegeData(prev => {
      const next = { ...prev, ...overview };
      localStorage.setItem('placeprep_college_data', JSON.stringify(next));
      return next;
    });
    showToast('College details updated', 'success');
  };

  // Study Plan Management & Task Checkbox State Toggling
  const saveStudyPlan = (newPlan: GeneratedStudyPlan) => {
    setActivePlans(prev => {
      const existing = prev[newPlan.type];
      // Preserve completed tasks when revising a plan
      if (existing) {
        const completedTitles = new Set<string>();
        const collect = (tasks?: PlanTaskItem[]) => {
          tasks?.forEach(t => {
            if (t.completed) completedTitles.add(t.title.toLowerCase().trim());
          });
        };
        collect(existing.tasks);
        existing.days?.forEach(d => collect(d.tasks));
        existing.weeks?.forEach(w => w.days.forEach(d => collect(d.tasks)));

        const markCompleted = (tasks?: PlanTaskItem[]) => {
          tasks?.forEach(t => {
            if (completedTitles.has(t.title.toLowerCase().trim())) {
              t.completed = true;
            }
          });
        };
        markCompleted(newPlan.tasks);
        newPlan.days?.forEach(d => markCompleted(d.tasks));
        newPlan.weeks?.forEach(w => w.days.forEach(d => markCompleted(d.tasks)));
      }

      const next = { ...prev, [newPlan.type]: newPlan };
      try {
        localStorage.setItem('placeprep_active_plans', JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
    showToast(`Saved ${newPlan.title} to active plans!`, 'success');
  };

  const togglePlanTask = (planId: string, taskId: string) => {
    let toggledTitle = '';
    let isNowCompleted = false;

    setActivePlans(prev => {
      const next = { ...prev };

      const updateTasks = (tasks?: PlanTaskItem[]) => {
        if (!tasks) return tasks;
        return tasks.map(t => {
          if (t.id === taskId) {
            isNowCompleted = !t.completed;
            toggledTitle = t.title;
            return {
              ...t,
              completed: isNowCompleted,
              completedAt: isNowCompleted ? new Date().toISOString() : undefined
            };
          }
          return t;
        });
      };

      for (const key of ['today', 'weekly', 'monthly'] as const) {
        const p = next[key];
        if (p && p.id === planId) {
          if (p.tasks) p.tasks = updateTasks(p.tasks);
          if (p.days) {
            p.days = p.days.map(d => ({ ...d, tasks: updateTasks(d.tasks) || [] }));
          }
          if (p.weeks) {
            p.weeks = p.weeks.map(w => ({
              ...w,
              days: w.days.map(d => ({ ...d, tasks: updateTasks(d.tasks) || [] }))
            }));
          }
        }
      }

      try {
        localStorage.setItem('placeprep_active_plans', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });

    // Also update any chat messages that contain this plan
    setChatMessages(prev => {
      const updateTasks = (tasks?: PlanTaskItem[]) => {
        if (!tasks) return tasks;
        return tasks.map(t => {
          if (t.id === taskId) {
            return {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? new Date().toISOString() : undefined
            };
          }
          return t;
        });
      };

      const updated = prev.map(m => {
        if (m.plan && m.plan.id === planId) {
          const p = { ...m.plan };
          if (p.tasks) p.tasks = updateTasks(p.tasks);
          if (p.days) {
            p.days = p.days.map(d => ({ ...d, tasks: updateTasks(d.tasks) || [] }));
          }
          if (p.weeks) {
            p.weeks = p.weeks.map(w => ({
              ...w,
              days: w.days.map(d => ({ ...d, tasks: updateTasks(d.tasks) || [] }))
            }));
          }
          return { ...m, plan: p };
        }
        return m;
      });

      try {
        localStorage.setItem('placeprep_ai_chat_history', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    if (toggledTitle) {
      showToast(isNowCompleted ? `✓ Task completed: ${toggledTitle}` : `Task marked pending: ${toggledTitle}`, 'info');
    }
  };

  const clearActivePlan = (type: 'today' | 'weekly' | 'monthly') => {
    setActivePlans(prev => {
      const next = { ...prev };
      delete next[type];
      try {
        localStorage.setItem('placeprep_active_plans', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    showToast(`Active ${type} plan cleared`, 'info');
  };

  const addChatMessage = (msg: AIChatMessage) => {
    setChatMessages(prev => {
      const next = [...prev, msg];
      try {
        localStorage.setItem('placeprep_ai_chat_history', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const updateChatMessagePlan = (messageId: string, updatedPlan: GeneratedStudyPlan) => {
    setChatMessages(prev => {
      const next = prev.map(m => m.id === messageId ? { ...m, plan: updatedPlan } : m);
      try {
        localStorage.setItem('placeprep_ai_chat_history', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    saveStudyPlan(updatedPlan);
  };

  const resetChatHistory = () => {
    const welcome: AIChatMessage = {
      id: `msg_welcome_${Date.now()}`,
      sender: 'assistant',
      text: `Hello ${user.name}! I am your PlacePrep AI Assistant.\n\nI can analyze your preparation for ${user.college} placements.\n\nHere are some things you can ask me:\n• Create my study plan for today\n• Which skills should I improve first?\n• How ready am I for my target company?\n• Help me prepare for technical interviews\n• Tell me about companies that recruit from my college`,
      timestamp: 'Just now',
      isRuleBased: true,
      suggestedAction: {
        label: "Create Today's Plan",
        href: '/learning-path'
      }
    };
    setChatMessages([welcome]);
    try {
      localStorage.removeItem('placeprep_ai_chat_history');
    } catch {
      // ignore
    }
    showToast('Conversation reset', 'info');
  };

  const resetDemoData = () => {
    try {
      localStorage.removeItem('placeprep_user');
      localStorage.removeItem('placeprep_stats');
      localStorage.removeItem('placeprep_resume');
      localStorage.removeItem('placeprep_activities');
      localStorage.removeItem('placeprep_college_data');
      localStorage.removeItem('placeprep_roadmap');
      localStorage.removeItem('placeprep_topics');
      localStorage.removeItem('placeprep_auth');
      localStorage.removeItem('placeprep_active_plans');
      localStorage.removeItem('placeprep_ai_chat_history');
    } catch {
      // ignore
    }
    setUser(initialStudent);
    setStats(defaultStats);
    setResumeData(initialResume);
    setActivities(defaultActivities);
    setCollegeData(defaultCollegePlacementData);
    setRoadmapTasks(initialPersonalizedRoadmapTasks);
    setTopicPerformances(sampleTopicPerformances);
    setActivePlans({});
    setChatMessages([
      {
        id: 'msg_welcome',
        sender: 'assistant',
        text: `Hello ${initialStudent.name}! I am your PlacePrep AI Assistant.\n\nI can analyze your preparation for ${initialStudent.college} placements.\n\nHere are some things you can ask me:\n• Create my study plan for today\n• Which skills should I improve first?\n• How ready am I for my target company?\n• Help me prepare for technical interviews\n• Tell me about companies that recruit from my college`,
        timestamp: 'Just now',
        isRuleBased: true,
        suggestedAction: {
          label: "Create Today's Plan",
          href: '/learning-path'
        }
      }
    ]);
    setIsLoggedIn(true);
    showToast('Demo data reset to default factory state!', 'success');
  };

  const login = (email: string) => {
    setIsLoggedIn(true);
    localStorage.setItem('placeprep_auth', 'true');
    showToast(`Signed in as ${email}`, 'success');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('placeprep_auth', 'false');
    showToast('Signed out successfully', 'info');
  };

  return (
    <PlacePrepContext.Provider
      value={{
        user,
        stats,
        resumeData,
        activities,
        collegeData,
        roadmapTasks,
        topicPerformances,
        toasts,
        isOnline,
        updateUser,
        updateStats,
        updateResume,
        showToast,
        recordActivity,
        resetDemoData,
        toggleTaskStatus,
        postponeTask,
        regenerateRoadmap,
        addOrUpdateRecruiterRecord,
        deleteRecruiterRecord,
        updateCollegeOverview,
        activePlans,
        saveStudyPlan,
        togglePlanTask,
        clearActivePlan,
        chatMessages,
        addChatMessage,
        updateChatMessagePlan,
        resetChatHistory,
        isLoggedIn,
        themeMode,
        toggleTheme,
        login,
        logout
      }}
    >
      {children}
      {/* Toast notifications */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.6)] border text-sm font-medium flex items-center gap-3 transition-all backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-[#13131C] text-emerald-300 border-emerald-500/40 shadow-emerald-950/20'
                : toast.type === 'error'
                ? 'bg-[#13131C] text-rose-300 border-rose-500/40 shadow-rose-950/20'
                : toast.type === 'warning'
                ? 'bg-[#13131C] text-amber-300 border-amber-500/40 shadow-amber-950/20'
                : 'bg-[#13131C] text-purple-200 border-purple-500/40 shadow-purple-950/30'
            }`}
          >
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </PlacePrepContext.Provider>
  );
}

export function usePlacePrep() {
  const context = useContext(PlacePrepContext);
  if (!context) {
    throw new Error('usePlacePrep must be used within PlacePrepProvider');
  }
  return context;
}
