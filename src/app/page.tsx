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
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Users,
  Award,
  Zap,
  Target
} from 'lucide-react';

export default function LandingPage() {
  const whyCards = [
    {
      title: 'One Platform',
      desc: 'No more jumping between 5 different websites. Aptitude, coding, CS core subjects, and HR interviews in a single dashboard.',
      icon: Target,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Personalized Learning',
      desc: 'Dynamic roadmaps that detect your weak topics—whether DBMS indexing or sliding-window algorithms—and personalize drills.',
      icon: Sparkles,
      gradient: 'from-purple-500 to-pink-600'
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
    <div className="min-h-screen bg-[#F7F9FC] text-[#52627A]">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E3EAF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#315BFA] flex items-center justify-center text-white font-bold text-base shadow-xs">
              P
            </div>
            <span className="font-extrabold text-lg tracking-tight text-[#142748]">
              Place<span className="text-[#315BFA]">Prep</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-[#52627A]">
            <a href="#why-placeprep" className="hover:text-[#315BFA] transition-colors">Why PlacePrep</a>
            <a href="#modules" className="hover:text-[#315BFA] transition-colors">Modules</a>
            <a href="#how-it-works" className="hover:text-[#315BFA] transition-colors">How It Works</a>
            <a href="#readiness" className="hover:text-[#315BFA] transition-colors">Readiness Metric</a>
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              href="/login"
              className="px-3.5 py-1.5 text-xs font-semibold text-[#52627A] hover:text-[#142748] hover:bg-[#F7F9FC] rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-1.5 text-xs font-semibold text-white bg-[#315BFA] hover:bg-[#2548DE] rounded-lg shadow-xs transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-14 pb-16 overflow-hidden bg-white border-b border-[#E3EAF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EBF0FF] border border-[#D4E0FC] text-[#315BFA] text-xs font-semibold mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Campus Recruitment Season 2026 Ready</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#142748] tracking-tight max-w-4xl mx-auto leading-tight">
            Prepare Smarter. <span className="text-[#315BFA]">Get Placed.</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#52627A] max-w-2xl mx-auto leading-relaxed">
            One unified platform for aptitude, coding challenges, core CS technical disciplines, mock interviews, and college-aware placement intelligence.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-6 py-2.5 bg-[#315BFA] hover:bg-[#2548DE] text-white font-semibold text-sm rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>Start Preparing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#modules"
              className="w-full sm:w-auto px-6 py-2.5 bg-white hover:bg-[#F7F9FC] text-[#52627A] hover:text-[#142748] font-semibold text-sm rounded-xl border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)] transition-colors"
            >
              Explore Modules
            </a>
          </div>

          {/* Platform Preview Card */}
          <div className="mt-12 max-w-5xl mx-auto rounded-2xl p-2 bg-[#F7F9FC] shadow-[0_1px_3px_rgba(20,39,72,0.03)] border border-[#E3EAF5]">
            <div className="bg-white rounded-xl p-5 sm:p-7 text-left border border-[#E3EAF5]">
              <div className="flex items-center justify-between pb-4 border-b border-[#E3EAF5]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono text-[#52627A] ml-2">app.placeprep.in/dashboard</span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Live Dashboard
                </span>
              </div>

              {/* Mock Dashboard Grid inside Preview */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#F7F9FC] p-4 rounded-xl border border-[#E3EAF5]">
                  <span className="text-[11px] font-bold text-[#52627A] uppercase tracking-wider">Placement Readiness</span>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full bg-[#EBF0FF] flex items-center justify-center font-extrabold text-[#315BFA] text-base border-4 border-[#315BFA]">
                      72%
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#142748]">Good Progress</div>
                      <div className="text-xs text-[#52627A] mt-0.5">Tier-1 Company Ready</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F7F9FC] p-4 rounded-xl border border-[#E3EAF5]">
                  <span className="text-[11px] font-bold text-[#52627A] uppercase tracking-wider">Active Modules</span>
                  <div className="mt-3 space-y-2.5">
                    <div>
                      <div className="flex justify-between text-xs font-medium text-[#142748] mb-1">
                        <span>DSA Arrays</span>
                        <span className="text-[#315BFA] font-bold">70%</span>
                      </div>
                      <div className="w-full bg-[#E3EAF5] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#315BFA] h-1.5 w-[70%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-medium text-[#142748] mb-1">
                        <span>Logical Reasoning</span>
                        <span className="text-[#315BFA] font-bold">55%</span>
                      </div>
                      <div className="w-full bg-[#E3EAF5] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#315BFA] h-1.5 w-[55%]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F7F9FC] p-4 rounded-xl border border-[#E3EAF5]">
                  <span className="text-[11px] font-bold text-[#52627A] uppercase tracking-wider">AI Recommendation</span>
                  <div className="mt-2.5 p-2.5 bg-white rounded-lg border border-[#E3EAF5] text-xs">
                    <p className="font-semibold text-[#142748]">Practice Medium DSA</p>
                    <p className="text-[#52627A] text-[11px] mt-0.5">Solve 3 sliding window questions to reach 75% coding score.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why PlacePrep Section */}
      <section id="why-placeprep" className="py-16 bg-[#F7F9FC] border-b border-[#E3EAF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#315BFA]">The Modern Placement Advantage</h2>
            <p className="mt-2 text-3xl font-extrabold text-[#142748] tracking-tight">Why Choose PlacePrep?</p>
            <p className="mt-2 text-sm text-[#52627A]">Designed specifically for engineering students preparing for on-campus and off-campus recruitment drives.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {whyCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="bg-white p-6 rounded-xl border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)] hover:border-[#315BFA]/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#EBF0FF] text-[#315BFA] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#142748]">{card.title}</h3>
                  <p className="mt-1.5 text-xs text-[#52627A] leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Preparation Modules Section */}
      <section id="modules" className="py-16 bg-white border-b border-[#E3EAF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#315BFA]">All-In-One Toolkit</h2>
            <p className="mt-2 text-3xl font-extrabold text-[#142748] tracking-tight">Preparation Modules</p>
            <p className="mt-2 text-sm text-[#52627A]">Every stage of your placement screening process covered under one unified interface.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} className="bg-[#F7F9FC] p-6 rounded-xl border border-[#E3EAF5] hover:border-[#315BFA]/40 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-white border border-[#E3EAF5] text-[#315BFA] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white border border-[#E3EAF5] text-[#52627A]">
                        {m.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#142748]">{m.title}</h3>
                    <p className="mt-1.5 text-xs text-[#52627A] leading-relaxed">{m.desc}</p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-[#E3EAF5]">
                    <Link
                      href={m.href}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#315BFA] hover:text-[#2548DE] transition-colors"
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
      <section id="how-it-works" className="py-16 bg-[#F7F9FC] border-b border-[#E3EAF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#315BFA]">Step-by-Step Blueprint</h2>
            <p className="mt-2 text-3xl font-extrabold text-[#142748] tracking-tight">How PlacePrep Works</p>
            <p className="mt-2 text-sm text-[#52627A]">A structured four-step methodology to turn anxious job-hunting into measurable skill acquisition.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((st, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)]">
                <span className="text-2xl font-black text-[#CBD5E1]">{st.num}</span>
                <h3 className="mt-2 text-base font-bold text-[#142748]">{st.title}</h3>
                <p className="mt-1 text-xs text-[#52627A] leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Readiness Section */}
      <section id="readiness" className="py-16 bg-white border-b border-[#E3EAF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#142748] rounded-2xl p-7 sm:p-10 text-white shadow-premium">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="px-2.5 py-0.5 rounded text-blue-200 bg-white/10 text-xs font-semibold">
                  Intelligent Analytics
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
                  Holistic Placement Readiness Score
                </h2>
                <p className="mt-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Unlike platforms that only judge coding or only test aptitude, PlacePrep calculates an aggregate readiness index across all 4 placement benchmarks.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-2xl font-bold text-blue-300">78%</div>
                    <div className="text-xs text-slate-300 mt-0.5">Aptitude Score</div>
                  </div>
                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-2xl font-bold text-indigo-300">65%</div>
                    <div className="text-xs text-slate-300 mt-0.5">Coding Score</div>
                  </div>
                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-2xl font-bold text-emerald-300">70%</div>
                    <div className="text-xs text-slate-300 mt-0.5">Technical Score</div>
                  </div>
                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-2xl font-bold text-amber-300">74%</div>
                    <div className="text-xs text-slate-300 mt-0.5">Interview Score</div>
                  </div>
                </div>
              </div>

              {/* Visual Circular Gauge */}
              <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-xl border border-white/10 text-center">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#315BFA"
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset="70.3"
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-extrabold text-white">72%</span>
                    <span className="text-[10px] text-blue-200 font-semibold uppercase tracking-wider mt-0.5">Overall</span>
                  </div>
                </div>

                <div className="mt-3.5">
                  <span className="inline-block px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                    Target: Tier-1 Placements
                  </span>
                  <p className="text-xs text-slate-400 mt-1.5">
                    Continuously computed based on quiz accuracy, code execution speed, and mock reviews.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-[#F7F9FC] text-center border-b border-[#E3EAF5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#142748] tracking-tight">
            Your placement preparation starts here.
          </h2>
          <p className="mt-3 text-sm text-[#52627A] max-w-xl mx-auto">
            Join thousands of pre-final and final year students cracking dream offers at top product and consulting organizations.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/dashboard"
              className="px-6 py-2.5 bg-[#315BFA] hover:bg-[#2548DE] text-white font-semibold text-sm rounded-xl shadow-xs flex items-center gap-2 transition-colors"
            >
              <span>Start Preparing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-xs text-[#52627A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#315BFA] flex items-center justify-center text-white font-bold text-[10px]">
              P
            </div>
            <span className="font-bold text-[#142748]">PlacePrep</span>
            <span>— Prepare Smarter. Get Placed.</span>
          </div>
          <div className="flex items-center gap-5 font-medium">
            <Link href="/dashboard" className="hover:text-[#315BFA] transition-colors">Dashboard</Link>
            <Link href="/aptitude" className="hover:text-[#315BFA] transition-colors">Aptitude</Link>
            <Link href="/coding" className="hover:text-[#315BFA] transition-colors">Coding</Link>
            <Link href="/companies" className="hover:text-[#315BFA] transition-colors">Companies</Link>
            <Link href="/admin" className="hover:text-[#315BFA] transition-colors">Placement Cell</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
