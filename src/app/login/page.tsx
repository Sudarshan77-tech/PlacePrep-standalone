'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePlacePrep } from '@/context/PlacePrepContext';
import { LogIn, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = usePlacePrep();
  const [email, setEmail] = useState('shivam.nival@engg.edu');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email);
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#08080C] relative overflow-hidden flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-[#7C3AED]/40">
      {/* Ambient Royal Purple Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-purple-600/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9] flex items-center justify-center text-white font-bold text-xl shadow-[0_0_20px_rgba(124,58,237,0.4)] group-hover:scale-105 transition-transform">
            P
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-white">
            Place<span className="text-[#A78BFA]">Prep</span>
          </span>
        </Link>
        <h2 className="text-2xl font-extrabold text-white">Sign in to your account</h2>
        <p className="mt-2 text-sm text-[#9CA3AF]">
          Continue your placement journey or{' '}
          <Link href="/register" className="font-semibold text-[#A78BFA] hover:text-[#C4B5FD] underline transition-colors">
            create a new student profile
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 relative z-10">
        <div className="bg-[#13131C] py-8 px-6 shadow-[0_4px_30px_rgba(0,0,0,0.6)] rounded-2xl border border-[#232334] sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#D1D5DB] mb-1.5">
                College Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0D0D14] border border-[#232334] rounded-xl text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  placeholder="student@engg.edu"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D1D5DB]">
                  Password
                </label>
                <a href="#" className="text-xs font-semibold text-[#A78BFA] hover:text-[#C4B5FD] transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0D0D14] border border-[#232334] rounded-xl text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#232334] bg-[#0D0D14] text-[#7C3AED] focus:ring-[#7C3AED] accent-[#7C3AED]"
                />
                <span className="text-xs text-[#9CA3AF]">Remember this device</span>
              </label>
              <span className="text-[11px] text-[#A78BFA] font-medium bg-[#7C3AED]/10 px-2 py-0.5 rounded border border-[#7C3AED]/20">Demo preset loaded</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] hover:opacity-95 text-white font-semibold rounded-xl shadow-[0_0_25px_rgba(124,58,237,0.35)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#232334]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#13131C] px-2 text-[#9CA3AF] font-semibold tracking-wider">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={() => {
                  login('student.google@engg.edu');
                  router.push('/dashboard');
                }}
                className="w-full py-2.5 px-4 bg-[#0D0D14] hover:bg-[#181824] border border-[#232334] rounded-xl text-xs font-semibold text-[#D1D5DB] hover:text-white flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.37 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.39-1.49-.39-2.27s.14-1.55.39-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.63 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Continue with College Google SSO</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
