'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BrainCircuit,
  Code2,
  Cpu,
  Mic,
  Route,
  Building2,
  FileText,
  BarChart3,
  User,
  Settings,
  ShieldAlert,
  Sparkles,
  GraduationCap,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeClass?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/progress', label: 'Strengths & Diagnostics', icon: BarChart3, badge: 'Live', badgeClass: 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30' },
    ]
  },
  {
    title: 'Preparation',
    items: [
      { href: '/learning-path', label: 'Personalized Roadmap', icon: Route, badge: 'Daily Plan', badgeClass: 'badge-soft-purple' },
      { href: '/aptitude', label: 'Aptitude & Reasoning', icon: BrainCircuit },
      { href: '/coding', label: 'Coding Practice', icon: Code2, badge: 'IDE', badgeClass: 'badge-soft-purple' },
      { href: '/technical', label: 'Technical MCQs', icon: Cpu },
      { href: '/interview', label: 'Mock Interview', icon: Mic, badge: 'AI Rubric', badgeClass: 'badge-soft-amber' },
    ]
  },
  {
    title: 'College Intelligence',
    items: [
      { href: '/college-intelligence', label: 'Campus Recruiter Intel', icon: GraduationCap, badge: 'TPO Data', badgeClass: 'badge-soft-purple' },
      { href: '/companies', label: 'Target Company Match', icon: Building2 },
    ]
  },
  {
    title: 'Career',
    items: [
      { href: '/resume', label: 'ATS Resume Builder', icon: FileText },
      { href: '/profile', label: 'Profile & Targets', icon: User },
      { href: '/admin', label: 'Placement Cell (TPO)', icon: ShieldAlert, badge: 'Admin', badgeClass: 'badge-soft-rose' },
      { href: '/settings', label: 'Settings', icon: Settings },
    ]
  }
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0D0D14] border-r border-[#1F1F2E] flex flex-col transition-transform duration-200 ease-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#1F1F2E]">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-purple-700 to-indigo-600 flex items-center justify-center text-white font-black text-base shadow-[0_0_15px_rgba(124,58,237,0.45)] group-hover:scale-105 transition-transform">
              P
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                Place<span className="text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">Prep</span>
              </span>
              <span className="hidden sm:block text-[10px] uppercase font-bold tracking-wider text-zinc-500">
                Placement Platform
              </span>
            </div>
          </Link>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#1A1A28]"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Sectioned Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-0.5">
              <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                {section.title}
              </div>
              {section.items.map(link => {
                const Icon = link.icon;
                const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href + '/'));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all group ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-[0_2px_14px_rgba(124,58,237,0.4)]'
                        : 'text-zinc-400 hover:text-white hover:bg-[#161622]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-purple-400'}`} />
                      <span className="truncate">{link.label}</span>
                    </div>

                    {link.badge && (
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ml-1.5 ${
                          isActive ? 'bg-white/20 text-white' : link.badgeClass || 'bg-[#181824] text-zinc-400 border border-[#232334]'
                        }`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer info pill */}
        <div className="p-3 border-t border-[#1F1F2E] bg-[#0A0A10]/60">
          <div className="p-2.5 rounded-xl bg-[#13131C] border border-[#232334] flex items-center justify-between text-[11px] shadow-sm">
            <div className="flex items-center gap-1.5 text-zinc-200 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Offline Ready</span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
              PWA
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
