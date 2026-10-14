'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { usePlacePrep } from '@/context/PlacePrepContext';
import {
  Settings as SettingsIcon,
  RotateCcw,
  HardDrive,
  Wifi,
  WifiOff,
  CheckCircle2,
  Database,
  Key,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export default function SettingsPage() {
  const { user, stats, resetDemoData, isOnline, showToast } = usePlacePrep();

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
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#EBF0FF] text-[#315BFA] border border-[#D4E0FC]">
              System & Preferences
            </span>
            <span className="text-xs text-[#52627A]">Offline & Local Environment</span>
          </div>
          <h1 className="text-2xl font-bold text-[#142748] mt-1.5">
            Application Settings
          </h1>
          <p className="text-sm text-[#52627A] mt-1">
            Manage local storage persistence, test offline capability, and configure future API services.
          </p>
        </div>

        {/* NETWORK & OFFLINE PWA STATUS */}
        <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)] space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#E3EAF5]">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold ${
                isOnline ? 'bg-emerald-600' : 'bg-amber-500'
              }`}>
                {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
              </div>
              <div>
                <h2 className="text-base font-bold text-[#142748]">
                  {isOnline ? 'Online Connectivity Detected' : 'Operating in Offline Mode'}
                </h2>
                <p className="text-xs text-[#52627A] mt-0.5">
                  {isOnline
                    ? 'Connected to local network. All pages, quiz engines, and compilers function independently.'
                    : 'No internet connection required. PlacePrep is running entirely from local cache and in-browser state.'}
                </p>
              </div>
            </div>

            <span className={`px-2.5 py-1 rounded text-xs font-semibold ${
              isOnline ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}>
              {isOnline ? 'Network Connected' : 'Offline Mode'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
            <div className="p-4 bg-[#F7F9FC] rounded-xl border border-[#E3EAF5]">
              <span className="text-[11px] text-[#52627A] font-bold uppercase tracking-wider">Storage Engine</span>
              <p className="text-sm font-bold text-[#142748] mt-1">localStorage & ServiceWorker</p>
              <span className="text-[11px] text-emerald-700 font-semibold">Active & Persistent</span>
            </div>

            <div className="p-4 bg-[#F7F9FC] rounded-xl border border-[#E3EAF5]">
              <span className="text-[11px] text-[#52627A] font-bold uppercase tracking-wider">PWA Status</span>
              <p className="text-sm font-bold text-[#142748] mt-1">Standalone Manifest</p>
              <span className="text-[11px] text-emerald-700 font-semibold">Ready for App Install</span>
            </div>

            <div className="p-4 bg-[#F7F9FC] rounded-xl border border-[#E3EAF5]">
              <span className="text-[11px] text-[#52627A] font-bold uppercase tracking-wider">Cloud Dependency</span>
              <p className="text-sm font-bold text-[#142748] mt-1">Zero External APIs</p>
              <span className="text-[11px] text-[#315BFA] font-semibold">Self-Contained Local</span>
            </div>
          </div>
        </div>

        {/* DEMO DATA RESET CARD */}
        <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E3EAF5]">
            <div>
              <h2 className="text-base font-bold text-[#142748] flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-amber-600" />
                <span>Reset Demo State & Test Records</span>
              </h2>
              <p className="text-xs text-[#52627A] mt-0.5">
                Clear all quiz scores, code submissions, and profile changes back to the default Shivam Nival baseline.
              </p>
            </div>

            <button
              onClick={resetDemoData}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Demo Data</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#52627A] pt-1">
            <span>Tests completed: <strong className="text-[#142748]">{stats.testsCompleted}</strong> • Coding solved: <strong className="text-[#142748]">{stats.problemsSolved}</strong></span>
            <button
              onClick={handleClearCache}
              className="text-xs font-semibold text-[#315BFA] hover:text-[#2548DE] transition-colors"
            >
              Refresh Service Worker Cache
            </button>
          </div>
        </div>

        {/* MODULAR CLOUD ARCHITECTURE GUIDE */}
        <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)] space-y-4">
          <div>
            <h2 className="text-base font-bold text-[#142748] flex items-center gap-2">
              <Database className="w-4 h-4 text-[#315BFA]" />
              <span>Future Cloud Backend & API Extension</span>
            </h2>
            <p className="text-xs text-[#52627A] mt-0.5">
              The application codebase is structured with database schemas in <code>src/types/</code> and modular AI handlers in <code>src/services/</code>.
            </p>
          </div>

          <div className="p-4 bg-[#F7F9FC] rounded-xl border border-[#E3EAF5] text-xs space-y-2 text-[#52627A]">
            <p>
              <strong className="text-[#142748]">Database Integration:</strong> To connect PostgreSQL, Supabase, or MongoDB later, set <code>DATABASE_URL</code> in <code>.env.local</code>. When unset, PlacePrep seamlessly runs off the built-in JSON repository.
            </p>
            <p>
              <strong className="text-[#142748]">Remote AI Integration:</strong> To connect Gemini or OpenAI for interview evaluations, set <code>GEMINI_API_KEY</code> or <code>OPENAI_API_KEY</code>. When unset, PlacePrep runs the local keyword & STAR rubric heuristic engine.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
