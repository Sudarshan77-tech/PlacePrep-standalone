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
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-[#E3EAF5] px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Menu & Search */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-[#52627A] hover:bg-[#F7F9FC] transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="w-4 h-4 text-[#8896AB] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search problems, topics, tests, recruiters..."
            className="w-full pl-10 pr-4 py-2 bg-[#F7F9FC] border border-[#E3EAF5] rounded-xl text-xs sm:text-sm text-[#142748] placeholder-[#8896AB] focus:outline-none focus:border-[#315BFA] focus:bg-white transition-all"
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
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-amber-50 text-amber-800 border-amber-300'
          }`}
        >
          {isOnline ? (
            <>
              <Wifi className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Online</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>Offline Mode</span>
            </>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-[#52627A] hover:text-[#142748] hover:bg-[#F7F9FC] transition-colors"
          title={`Switch to ${themeMode === 'light' ? 'Dark' : 'Light'} theme`}
          aria-label="Toggle theme"
        >
          {themeMode === 'light' ? (
            <Moon className="w-4 h-4 text-[#52627A]" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500" />
          )}
        </button>

        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-xs font-semibold">
          <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>{stats.currentStreak}d streak</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 rounded-xl text-[#52627A] hover:text-[#142748] hover:bg-[#F7F9FC] transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#315BFA] rounded-full ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-dropdown border border-[#E3EAF5] p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-[#E3EAF5] mb-2">
                <span className="font-semibold text-sm text-[#142748]">Notifications</span>
                <span className="text-xs text-[#315BFA] font-medium cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100">
                  <p className="text-xs font-semibold text-[#142748]">Campus Placement Intelligence Updated</p>
                  <p className="text-[11px] text-[#52627A] mt-0.5">Recruiter history for 2024–2025 verified by TPO.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F7F9FC] border border-[#E3EAF5]">
                  <p className="text-xs font-semibold text-[#142748]">Offline Storage Verified</p>
                  <p className="text-[11px] text-[#52627A] mt-0.5">All modules & test engines are cached for offline study.</p>
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
            className="flex items-center gap-2.5 p-1 sm:pl-3 sm:pr-2 rounded-xl hover:bg-[#F7F9FC] transition-all"
          >
            <div className="hidden sm:block text-right">
              <div className="text-xs font-bold text-[#142748] leading-none">{user.name}</div>
              <div className="text-[11px] text-[#8896AB] mt-0.5 leading-none">{user.branch} • {user.gradYear}</div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[#315BFA] text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {user.name.charAt(0)}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#8896AB] hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-dropdown border border-[#E3EAF5] p-2 z-50">
              <div className="px-3 py-2 border-b border-[#E3EAF5]">
                <p className="text-xs font-bold text-[#142748]">{user.name}</p>
                <p className="text-[11px] text-[#8896AB] truncate">{user.email}</p>
                <p className="text-[10px] text-[#315BFA] font-medium mt-0.5 truncate">{user.college}</p>
              </div>
              <div className="py-1">
                <Link
                  href="/profile"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#52627A] hover:bg-[#F7F9FC] hover:text-[#142748] rounded-lg"
                >
                  <Award className="w-3.5 h-3.5 text-[#8896AB]" />
                  Profile & Targets
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#52627A] hover:bg-[#F7F9FC] hover:text-[#142748] rounded-lg"
                >
                  <Settings className="w-3.5 h-3.5 text-[#8896AB]" />
                  Settings & Data
                </Link>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    resetDemoData();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-amber-700 hover:bg-amber-50 rounded-lg text-left"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Reset Demo State
                </button>
                <div className="border-t border-[#E3EAF5] my-1" />
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg text-left"
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
