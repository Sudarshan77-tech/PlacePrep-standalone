'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePlacePrep } from '@/context/PlacePrepContext';
import { UserPlus, Mail, Lock, User, GraduationCap, Building } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { updateUser, login } = usePlacePrep();
  const [formData, setFormData] = useState({
    name: 'Shivam Nival',
    email: 'shivam.nival@engg.edu',
    password: 'password123',
    college: 'National Institute of Engineering & Technology',
    branch: 'Computer Science and Engineering',
    gradYear: 2026,
    skillLevel: 'Intermediate' as 'Beginner' | 'Intermediate' | 'Advanced'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      updateUser({
        name: formData.name,
        email: formData.email,
        college: formData.college,
        branch: formData.branch,
        gradYear: Number(formData.gradYear),
        currentSkillLevel: formData.skillLevel
      });
      login(formData.email);
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#08080C] relative overflow-hidden flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-[#7C3AED]/40">
      {/* Ambient Royal Purple Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9] flex items-center justify-center text-white font-bold text-xl shadow-[0_0_20px_rgba(124,58,237,0.4)] group-hover:scale-105 transition-transform">
            P
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-white">
            Place<span className="text-[#A78BFA]">Prep</span>
          </span>
        </Link>
        <h2 className="text-2xl font-extrabold text-white">Create your student account</h2>
        <p className="mt-2 text-sm text-[#9CA3AF]">
          Already registered?{' '}
          <Link href="/login" className="font-semibold text-[#A78BFA] hover:text-[#C4B5FD] underline transition-colors">
            Sign into existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4 relative z-10">
        <div className="bg-[#13131C] py-8 px-6 shadow-[0_4px_30px_rgba(0,0,0,0.6)] rounded-2xl border border-[#232334] sm:px-10">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D1D5DB] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0D0D14] border border-[#232334] rounded-xl text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D1D5DB] mb-1">
                  College Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0D0D14] border border-[#232334] rounded-xl text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#D1D5DB] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0D0D14] border border-[#232334] rounded-xl text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#D1D5DB] mb-1">
                College / University Name
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0D0D14] border border-[#232334] rounded-xl text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D1D5DB] mb-1">
                  Branch / Department
                </label>
                <input
                  type="text"
                  required
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#0D0D14] border border-[#232334] rounded-xl text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D1D5DB] mb-1">
                  Graduation Year
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.gradYear}
                    onChange={(e) => setFormData({ ...formData, gradYear: Number(e.target.value) })}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0D0D14] border border-[#232334] rounded-xl text-sm text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  >
                    <option value={2025}>2025 (Immediate Season)</option>
                    <option value={2026}>2026 (Pre-Final / Final)</option>
                    <option value={2027}>2027 (Pre-Final)</option>
                    <option value={2028}>2028 (Sophomore)</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#D1D5DB] mb-1.5">
                Current Coding & Aptitude Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setFormData({ ...formData, skillLevel: lvl })}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      formData.skillLevel === lvl
                        ? 'border-[#7C3AED] bg-[#7C3AED]/20 text-[#C4B5FD] shadow-[0_0_12px_rgba(124,58,237,0.25)]'
                        : 'border-[#232334] bg-[#0D0D14] text-[#9CA3AF] hover:text-white hover:border-[#38384E]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] hover:opacity-95 text-white font-semibold rounded-xl shadow-[0_0_25px_rgba(124,58,237,0.35)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account & Calculate Score</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
