'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePlacePrep } from '@/context/PlacePrepContext';
import {
  Menu,
  Search,
  Bell,
  Sparkles,
  LogOut,
  Flame,
  Award,
  ChevronDown,
  Wifi,
  WifiOff,
  Settings,
  Sun,
  Moon
} from 'lucide-react';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export function Navbar({ onToggleSidebar }: NavbarProps) {
  const { user, stats, logout, isOnline, resetDemoData, themeMode, toggleTheme } = usePlacePrep();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0D0D14]/95 backdrop-blur-md border-b border-[#1F1F2E] px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Menu & Search */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-[#161622] transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search problems, topics, tests, recruiters..."
            className="w-full pl-10 pr-4 py-2 bg-[#13131C] border border-[#232334] rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/40 transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Network Status Badge */}
        <div
          title={isOnline ? 'Online: Remote sync active' : 'Offline Mode: All tests & modules running locally'}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border transition-colors ${
            isOnline
              ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/30'
              : 'bg-amber-950/50 text-amber-300 border-amber-500/30'
          }`}
        >
          {isOnline ? (
            <>
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Online</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Offline Mode</span>
            </>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-[#161622] transition-colors"
          title={`Switch to ${themeMode === 'light' ? 'Dark' : 'Light'} theme`}
          aria-label="Toggle theme"
        >
          {themeMode === 'light' ? (
            <Moon className="w-4 h-4 text-zinc-400" />
          ) : (
            <Sun className="w-4 h-4 text-amber-400" />
          )}
        </button>

        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-950/40 border border-amber-500/30 rounded-full text-amber-300 text-xs font-semibold">
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>{stats.currentStreak}d streak</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-[#161622] transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full ring-2 ring-[#0D0D14]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#13131C] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.7)] border border-[#232334] p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-[#232334] mb-2">
                <span className="font-semibold text-sm text-white">Notifications</span>
                <span className="text-xs text-purple-400 font-medium cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30">
                  <p className="text-xs font-semibold text-white">Campus Placement Intelligence Updated</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Recruiter history for 2024–2025 verified by TPO.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#181824] border border-[#232334]">
                  <p className="text-xs font-semibold text-white">Offline Storage Verified</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">All modules & test engines are cached for offline study.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Student Profile Pill */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 p-1 sm:pl-3 sm:pr-2 rounded-xl hover:bg-[#161622] transition-all"
          >
            <div className="hidden sm:block text-right">
              <div className="text-xs font-bold text-white leading-none">{user.name}</div>
              <div className="text-[11px] text-zinc-400 mt-0.5 leading-none">{user.branch} • {user.gradYear}</div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-[0_0_12px_rgba(124,58,237,0.4)]">
              {user.name.charAt(0)}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-60 bg-[#13131C] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.7)] border border-[#232334] p-2 z-50">
              <div className="px-3 py-2 border-b border-[#232334]">
                <p className="text-xs font-bold text-white">{user.name}</p>
                <p className="text-[11px] text-zinc-400 truncate">{user.email}</p>
                <p className="text-[10px] text-purple-400 font-medium mt-0.5 truncate">{user.college}</p>
              </div>
              <div className="py-1">
                <Link
                  href="/profile"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-300 hover:bg-[#181824] hover:text-white rounded-lg"
                >
                  <Award className="w-3.5 h-3.5 text-zinc-400" />
                  Profile & Targets
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-300 hover:bg-[#181824] hover:text-white rounded-lg"
                >
                  <Settings className="w-3.5 h-3.5 text-zinc-400" />
                  Settings & Data
                </Link>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    resetDemoData();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-amber-300 hover:bg-amber-950/30 rounded-lg text-left"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Reset Demo State
                </button>
                <div className="border-t border-[#232334] my-1" />
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-950/30 rounded-lg text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
