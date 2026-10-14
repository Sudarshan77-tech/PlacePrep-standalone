'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { usePlacePrep } from '@/context/PlacePrepContext';
import {
  RotateCcw,
  Wifi,
  WifiOff,
  Database
} from 'lucide-react';

export default function SettingsPage() {
  const { stats, resetDemoData, isOnline, showToast } = usePlacePrep();

  const handleClearCache = () => {
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name));
      });
      showToast('Offline cache refreshed!', 'info');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#7C3AED]/15 text-[#A78BFA] border border-[#7C3AED]/30">
              System & Preferences
            </span>
            <span className="text-xs text-[#9CA3AF]">Offline & Local Environment</span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-1.5">
            Application Settings
          </h1>
          <p className="text-sm text-[#9CA3AF] mt-1">
            Manage local storage persistence, test offline capability, and configure future API services.
          </p>
        </div>

        {/* NETWORK & OFFLINE PWA STATUS */}
        <div className="bg-[#13131C] rounded-2xl p-5 sm:p-7 border border-[#232334] shadow-[0_4px_24px_rgba(0,0,0,0.4)] space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#232334]">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                isOnline ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
              </div>
              <div>
                <h2 className="text-base font-bold text-white">
                  {isOnline ? 'Online Connectivity Detected' : 'Operating in Offline Mode'}
                </h2>
                <p className="text-xs text-[#9CA3AF] mt-0.5">
                  {isOnline
                    ? 'Connected to local network. All pages, quiz engines, and compilers function independently.'
                    : 'No internet connection required. PlacePrep is running entirely from local cache and in-browser state.'}
                </p>
              </div>
            </div>

            <span className={`px-2.5 py-1 rounded text-xs font-semibold ${
              isOnline ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
            }`}>
              {isOnline ? 'Network Connected' : 'Offline Mode'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
            <div className="p-4 bg-[#0D0D14] rounded-xl border border-[#1F1F2E]">
              <span className="text-[11px] text-[#9CA3AF] font-bold uppercase tracking-wider">Storage Engine</span>
              <p className="text-sm font-bold text-white mt-1">localStorage & ServiceWorker</p>
              <span className="text-[11px] text-emerald-400 font-semibold">Active & Persistent</span>
            </div>

            <div className="p-4 bg-[#0D0D14] rounded-xl border border-[#1F1F2E]">
              <span className="text-[11px] text-[#9CA3AF] font-bold uppercase tracking-wider">PWA Status</span>
              <p className="text-sm font-bold text-white mt-1">Standalone Manifest</p>
              <span className="text-[11px] text-emerald-400 font-semibold">Ready for App Install</span>
            </div>

            <div className="p-4 bg-[#0D0D14] rounded-xl border border-[#1F1F2E]">
              <span className="text-[11px] text-[#9CA3AF] font-bold uppercase tracking-wider">Cloud Dependency</span>
              <p className="text-sm font-bold text-white mt-1">Zero External APIs</p>
              <span className="text-[11px] text-[#A78BFA] font-semibold">Self-Contained Local</span>
            </div>
          </div>
        </div>

        {/* DEMO DATA RESET CARD */}
        <div className="bg-[#13131C] rounded-2xl p-5 sm:p-7 border border-[#232334] shadow-[0_4px_24px_rgba(0,0,0,0.4)] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#232334]">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>Reset Demo State & Test Records</span>
              </h2>
              <p className="text-xs text-[#9CA3AF] mt-0.5">
                Clear all quiz scores, code submissions, and profile changes back to the default Shivam Nival baseline.
              </p>
            </div>

            <button
              onClick={resetDemoData}
              className="px-4 py-2 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2 shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Demo Data</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#9CA3AF] pt-1">
            <span>Tests completed: <strong className="text-white">{stats.testsCompleted}</strong> • Coding solved: <strong className="text-white">{stats.problemsSolved}</strong></span>
            <button
              onClick={handleClearCache}
              className="text-xs font-semibold text-[#A78BFA] hover:text-[#C4B5FD] transition-colors"
            >
              Refresh Service Worker Cache
            </button>
          </div>
        </div>

        {/* MODULAR CLOUD ARCHITECTURE GUIDE */}
        <div className="bg-[#13131C] rounded-2xl p-5 sm:p-7 border border-[#232334] shadow-[0_4px_24px_rgba(0,0,0,0.4)] space-y-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-[#A78BFA]" />
              <span>Future Cloud Backend & API Extension</span>
            </h2>
            <p className="text-xs text-[#9CA3AF] mt-0.5">
              The application codebase is structured with database schemas in <code className="px-1.5 py-0.5 rounded bg-[#181824] text-[#C4B5FD] font-mono text-[11px] border border-[#2B2B40]">src/types/</code> and modular AI handlers in <code className="px-1.5 py-0.5 rounded bg-[#181824] text-[#C4B5FD] font-mono text-[11px] border border-[#2B2B40]">src/services/</code>.
            </p>
          </div>

          <div className="p-4 bg-[#0D0D14] rounded-xl border border-[#1F1F2E] text-xs space-y-2 text-[#9CA3AF]">
            <p>
              <strong className="text-white">Database Integration:</strong> To connect PostgreSQL, Supabase, or MongoDB later, set <code className="px-1.5 py-0.5 rounded bg-[#181824] text-[#C4B5FD] font-mono text-[11px] border border-[#2B2B40]">DATABASE_URL</code> in <code className="px-1.5 py-0.5 rounded bg-[#181824] text-[#C4B5FD] font-mono text-[11px] border border-[#2B2B40]">.env.local</code>. When unset, PlacePrep seamlessly runs off the built-in JSON repository.
            </p>
            <p>
              <strong className="text-white">Remote AI Integration:</strong> To connect Gemini or OpenAI for interview evaluations, set <code className="px-1.5 py-0.5 rounded bg-[#181824] text-[#C4B5FD] font-mono text-[11px] border border-[#2B2B40]">GEMINI_API_KEY</code> or <code className="px-1.5 py-0.5 rounded bg-[#181824] text-[#C4B5FD] font-mono text-[11px] border border-[#2B2B40]">OPENAI_API_KEY</code>. When unset, PlacePrep runs the local keyword & STAR rubric heuristic engine.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
