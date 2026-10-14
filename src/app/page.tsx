'use client';

import React from 'react';
import Link from 'next/link';
import {
  BrainCircuit,
  Code2,
  Cpu,
  Mic,
  FileText,
  Building2,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Target
} from 'lucide-react';

export default function LandingPage() {
  const whyCards = [
    {
      title: 'One Platform',
      desc: 'No more jumping between 5 different websites. Aptitude, coding, CS core subjects, and HR interviews in a single dashboard.',
      icon: Target,
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      title: 'Personalized Learning',
      desc: 'Dynamic roadmaps that detect your weak topics—whether DBMS indexing or sliding-window algorithms—and personalize drills.',
      icon: Sparkles,
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      title: 'Progress Tracking',
      desc: 'Real-time placement readiness score computed across aptitude, coding accuracy, and mock interview performance.',
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Interview Preparation',
      desc: 'AI-evaluated mock interviews covering HR behavioral questions, CS technical defense, and live problem-solving feedback.',
      icon: Mic,
      gradient: 'from-amber-500 to-orange-600'
    }
  ];

  const modules = [
    {
      title: 'Aptitude & Reasoning',
      desc: 'Quantitative, Logical Reasoning, Verbal Ability & Data Interpretation with timed drills and explanations.',
      icon: BrainCircuit,
      href: '/aptitude',
      badge: '450+ Questions'
    },
    {
      title: 'Coding Challenges',
      desc: 'In-browser multi-language editor with instant testcase evaluation, runtime stats, and DP/Graph patterns.',
      icon: Code2,
      href: '/coding',
      badge: 'Multi-Language IDE'
    },
    {
      title: 'Technical MCQs',
      desc: 'Comprehensive tests on DBMS, Operating Systems, Computer Networks, OOP, and Software Engineering.',
      icon: Cpu,
      href: '/technical',
      badge: 'Core CS Subjects'
    },
    {
      title: 'Mock Interviews',
      desc: 'Structured HR, Technical, and Behavioral interview modules with automated performance analytics.',
      icon: Mic,
      href: '/interview',
      badge: 'AI Evaluation'
    },
    {
      title: 'Resume Builder',
      desc: 'ATS-optimized campus resume builder with live professional preview, instant export, and project templates.',
      icon: FileText,
      href: '/resume',
      badge: 'ATS Friendly'
    },
    {
      title: 'Company Preparation',
      desc: 'Detailed hiring patterns, past test question archives, and sectional cutoffs for TCS, Amazon, Infosys, Google & more.',
      icon: Building2,
      href: '/companies',
      badge: '10+ Top Recruiters'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Create Profile',
      desc: 'Set your college, branch, graduation year, and career aspirations (Product vs. IT Services).'
    },
    {
      num: '02',
      title: 'Take Skill Assessment',
      desc: 'Complete the 30-minute diagnostic benchmark to calculate your baseline placement readiness index.'
    },
    {
      num: '03',
      title: 'Follow Learning Path',
      desc: 'Progress through custom roadmaps covering aptitude, data structures, algorithms, and core CS subjects.'
    },
    {
      num: '04',
      title: 'Track Progress & Get Placed',
      desc: 'Take timed company mock drives, simulate interviews, and step into recruitment season fully confident.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#08080C] text-zinc-300 relative selection:bg-purple-600 selection:text-white overflow-hidden">
      {/* Subtle Purple Ambient Glow */}
      <div
        className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(124,58,237,0.18),transparent_70%)]"
        aria-hidden="true"
      />

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#0D0D14]/90 backdrop-blur-md border-b border-[#1F1F2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-purple-700 to-indigo-600 flex items-center justify-center text-white font-black text-base shadow-[0_0_15px_rgba(124,58,237,0.45)] group-hover:scale-105 transition-transform">
              P
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white">
              Place<span className="text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">Prep</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-zinc-400">
            <a href="#why-placeprep" className="hover:text-purple-400 transition-colors">Why PlacePrep</a>
            <a href="#modules" className="hover:text-purple-400 transition-colors">Modules</a>
            <a href="#how-it-works" className="hover:text-purple-400 transition-colors">How It Works</a>
            <a href="#readiness" className="hover:text-purple-400 transition-colors">Readiness Metric</a>
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              href="/login"
              className="px-3.5 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-[#181824] rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="btn-primary text-xs !py-1.5 !px-4"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden border-b border-[#1F1F2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/40 text-purple-300 text-xs font-semibold mb-6 shadow-[0_0_15px_rgba(124,58,237,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Campus Recruitment Season 2026 Ready</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
            Prepare Smarter.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-300 drop-shadow-[0_0_25px_rgba(168,85,247,0.45)]">
              Get Placed.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            One unified platform for aptitude, coding challenges, core CS technical disciplines, mock interviews, and college-aware placement intelligence.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="btn-primary w-full sm:w-auto px-7 py-3 text-sm shadow-[0_0_20px_rgba(124,58,237,0.45)]"
            >
              <span>Start Preparing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#modules"
              className="btn-secondary w-full sm:w-auto px-7 py-3 text-sm"
            >
              Explore Modules
            </a>
          </div>

          {/* Platform Preview Card */}
          <div className="mt-14 max-w-5xl mx-auto rounded-2xl p-2 bg-[#101018] shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-[#232334]">
            <div className="bg-[#13131C] rounded-xl p-5 sm:p-7 text-left border border-[#232334]">
              <div className="flex items-center justify-between pb-4 border-b border-[#232334]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-zinc-500 ml-2">app.placeprep.in/dashboard</span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                  Live Dashboard
                </span>
              </div>

              {/* Mock Dashboard Grid inside Preview */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#181824] p-4 rounded-xl border border-[#232334]">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Placement Readiness</span>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full bg-purple-950/60 flex items-center justify-center font-black text-purple-300 text-base border-4 border-purple-500 shadow-[0_0_15px_rgba(124,58,237,0.4)]">
                      72%
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Good Progress</div>
                      <div className="text-xs text-zinc-400 mt-0.5">Tier-1 Company Ready</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#181824] p-4 rounded-xl border border-[#232334]">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Active Modules</span>
                  <div className="mt-3 space-y-2.5">
                    <div>
                      <div className="flex justify-between text-xs font-medium text-white mb-1">
                        <span>DSA Arrays</span>
                        <span className="text-purple-400 font-bold">70%</span>
                      </div>
                      <div className="w-full bg-[#101018] h-1.5 rounded-full overflow-hidden border border-[#232334]">
                        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-1.5 w-[70%] shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-medium text-white mb-1">
                        <span>Logical Reasoning</span>
                        <span className="text-purple-400 font-bold">55%</span>
                      </div>
                      <div className="w-full bg-[#101018] h-1.5 rounded-full overflow-hidden border border-[#232334]">
                        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-1.5 w-[55%] shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#181824] p-4 rounded-xl border border-[#232334]">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">AI Recommendation</span>
                  <div className="mt-2.5 p-2.5 bg-[#13131C] rounded-lg border border-[#28283C] text-xs">
                    <p className="font-semibold text-purple-300">Practice Medium DSA</p>
                    <p className="text-zinc-400 text-[11px] mt-0.5">Solve 3 sliding window questions to reach 75% coding score.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why PlacePrep Section */}
      <section id="why-placeprep" className="py-20 border-b border-[#1F1F2E] bg-[#0A0A10]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400">The Modern Placement Advantage</h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Why Choose PlacePrep?</p>
            <p className="mt-3 text-sm text-zinc-400">Designed specifically for engineering students preparing for on-campus and off-campus recruitment drives.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="app-card-hover p-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 flex items-center justify-center mb-4 shadow-[0_0_12px_rgba(124,58,237,0.3)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">{card.title}</h3>
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Preparation Modules Section */}
      <section id="modules" className="py-20 border-b border-[#1F1F2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400">All-In-One Toolkit</h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Preparation Modules</p>
            <p className="mt-3 text-sm text-zinc-400">Every stage of your placement screening process covered under one unified interface.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} className="app-card-hover p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 flex items-center justify-center shadow-[0_0_12px_rgba(124,58,237,0.3)]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#181824] border border-[#232334] text-zinc-300">
                        {m.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">{m.title}</h3>
                    <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{m.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#232334]">
                    <Link
                      href={m.href}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <span>View Module</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 border-b border-[#1F1F2E] bg-[#0A0A10]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400">Step-by-Step Blueprint</h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">How PlacePrep Works</p>
            <p className="mt-3 text-sm text-zinc-400">A structured four-step methodology to turn anxious job-hunting into measurable skill acquisition.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((st, i) => (
              <div key={i} className="app-card p-6 border-[#232334]">
                <span className="text-2xl font-black text-purple-400/50 drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]">{st.num}</span>
                <h3 className="mt-2 text-base font-bold text-white">{st.title}</h3>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Readiness Section */}
      <section id="readiness" className="py-20 border-b border-[#1F1F2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#12121C] via-[#161426] to-[#0E0E18] rounded-2xl p-7 sm:p-10 border border-purple-500/30 shadow-[0_0_40px_rgba(124,58,237,0.18)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-purple-300 bg-purple-950/60 border border-purple-500/40 text-xs font-semibold">
                  Intelligent Analytics
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Holistic Placement Readiness Score
                </h2>
                <p className="mt-3 text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  Unlike platforms that only judge coding or only test aptitude, PlacePrep calculates an aggregate readiness index across all 4 placement benchmarks.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#141420] border border-[#232334]">
                    <div className="text-2xl font-black text-purple-300">78%</div>
                    <div className="text-xs text-zinc-400 mt-0.5">Aptitude Score</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#141420] border border-[#232334]">
                    <div className="text-2xl font-black text-indigo-300">65%</div>
                    <div className="text-xs text-zinc-400 mt-0.5">Coding Score</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#141420] border border-[#232334]">
                    <div className="text-2xl font-black text-emerald-300">70%</div>
                    <div className="text-xs text-zinc-400 mt-0.5">Technical Score</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#141420] border border-[#232334]">
                    <div className="text-2xl font-black text-amber-300">74%</div>
                    <div className="text-xs text-zinc-400 mt-0.5">Interview Score</div>
                  </div>
                </div>
              </div>

              {/* Visual Circular Gauge */}
              <div className="flex flex-col items-center justify-center p-6 bg-[#101018] rounded-xl border border-[#232334] text-center">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#1A1A28"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#8B5CF6"
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset="70.3"
                      strokeLinecap="round"
                      fill="transparent"
                      className="drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-black text-white">72%</span>
                    <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider mt-0.5">Overall</span>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                    Target: Tier-1 Placements
                  </span>
                  <p className="text-xs text-zinc-400 mt-2">
                    Continuously computed based on quiz accuracy, code execution speed, and mock reviews.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 text-center border-b border-[#1F1F2E] bg-[#0A0A10]/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Your placement preparation starts here.
          </h2>
          <p className="mt-3 text-sm text-zinc-400 max-w-xl mx-auto">
            Join thousands of pre-final and final year students cracking dream offers at top product and consulting organizations.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/dashboard"
              className="btn-primary px-8 py-3 text-sm shadow-[0_0_24px_rgba(124,58,237,0.5)]"
            >
              <span>Start Preparing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A10] py-8 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-[10px]">
              P
            </div>
            <span className="font-bold text-white">PlacePrep</span>
            <span>— Prepare Smarter. Get Placed.</span>
          </div>
          <div className="flex items-center gap-5 font-medium">
            <Link href="/dashboard" className="hover:text-purple-400 transition-colors">Dashboard</Link>
            <Link href="/aptitude" className="hover:text-purple-400 transition-colors">Aptitude</Link>
            <Link href="/coding" className="hover:text-purple-400 transition-colors">Coding</Link>
            <Link href="/companies" className="hover:text-purple-400 transition-colors">Companies</Link>
            <Link href="/admin" className="hover:text-purple-400 transition-colors">Placement Cell</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
