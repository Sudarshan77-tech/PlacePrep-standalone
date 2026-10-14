'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { usePlacePrep } from '@/context/PlacePrepContext';
import {
  GraduationCap,
  Building,
  Award,
  Sparkles,
  Edit3,
  Check,
  CheckCircle2,
  BookOpen,
  Target,
  Briefcase
} from 'lucide-react';
import { sampleCompanies } from '@/data/mockData';

export default function ProfilePage() {
  const { user, stats, updateUser, showToast } = usePlacePrep();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    college: user.college,
    branch: user.branch,
    gradYear: user.gradYear,
    currentSkillLevel: user.currentSkillLevel,
    cgpa: user.cgpa ?? 8.82,
    activeBacklogs: user.activeBacklogs ?? 0,
    preferredJobRoles: user.preferredJobRoles || ['Software Development Engineer', 'Full Stack Developer'],
    targetCompanyIds: user.targetCompanyIds || ['amazon', 'tcs', 'infosys'],
    dailyPrepMinutes: user.dailyPrepMinutes || 120,
    placementTargetDate: user.placementTargetDate || '2026-11-15'
  });

  const [newRoleInput, setNewRoleInput] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
    showToast('Profile, academic eligibility, and target companies updated!', 'success');
  };

  const handleToggleTargetCompany = (cid: string) => {
    const current = formData.targetCompanyIds;
    if (current.includes(cid)) {
      setFormData({ ...formData, targetCompanyIds: current.filter(id => id !== cid) });
    } else {
      setFormData({ ...formData, targetCompanyIds: [...current, cid] });
    }
  };

  const handleAddRole = () => {
    if (!newRoleInput.trim()) return;
    if (!formData.preferredJobRoles.includes(newRoleInput.trim())) {
      setFormData({
        ...formData,
        preferredJobRoles: [...formData.preferredJobRoles, newRoleInput.trim()]
      });
      setNewRoleInput('');
    }
  };

  const handleRemoveRole = (role: string) => {
    setFormData({
      ...formData,
      preferredJobRoles: formData.preferredJobRoles.filter(r => r !== role)
    });
  };

  const skillsList = ['Data Structures', 'Algorithms', 'C++', 'Python', 'React', 'Next.js', 'DBMS', 'Operating Systems', 'System Design'];

  const achievementsList = [
    { title: '7-Day Preparation Streak', desc: 'Maintained consistent daily preparation for 7 consecutive days' },
    { title: 'Top 10% in TCS NQT Mock', desc: 'Scored 84% on full cognitive and advanced coding mock drive' },
    { title: 'Algorithmic Problem Solver', desc: 'Solved 80+ campus placement coding challenges' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#7C3AED]/15 text-[#A78BFA] border border-[#7C3AED]/30">
                Student Profile & Placement Targets
              </span>
              <span className="text-xs text-[#9CA3AF]">Campus Verification</span>
            </div>
            <h1 className="text-2xl font-bold text-white mt-1.5">
              Academic Credentials & Target Preferences
            </h1>
            <p className="text-sm text-[#9CA3AF] mt-1">
              Your college profile, academic eligibility credentials, preferred job roles, and target companies power your personalized roadmap.
            </p>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 border border-[#232334] bg-[#13131C] hover:bg-[#1C1C2A] text-[#D1D5DB] hover:text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-all shadow-sm"
          >
            <Edit3 className="w-4 h-4 text-[#A78BFA]" />
            <span>{isEditing ? 'Cancel Editing' : 'Edit Profile & Targets'}</span>
          </button>
        </div>

        {/* PROFILE HERO CARD */}
        <div className="bg-[#13131C] rounded-2xl p-6 sm:p-7 border border-[#232334] shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col md:flex-row items-center sm:items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] text-white font-extrabold text-2xl flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.35)] shrink-0">
            {user.name.charAt(0)}
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
              <h2 className="text-2xl font-bold text-white">{user.name}</h2>
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-[#7C3AED]/20 text-[#C4B5FD] border border-[#7C3AED]/40 inline-block">
                Level: {user.currentSkillLevel}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#9CA3AF] flex items-center gap-1.5 justify-center sm:justify-start">
              <Building className="w-4 h-4 text-[#7C3AED]" />
              <span>{user.college}</span>
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-xs text-[#9CA3AF] pt-1">
              <span className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4 text-[#A78BFA]" />
                {user.branch} • Class of {user.gradYear}
              </span>
              <span>•</span>
              <span className="font-semibold text-white">CGPA: {user.cgpa || 8.82}</span>
              <span>•</span>
              <span className="font-semibold text-emerald-400">{user.activeBacklogs || 0} Backlogs</span>
            </div>
          </div>

          {/* Readiness Index Metric Badge */}
          <div className="bg-[#0D0D14] p-4 rounded-xl border border-[#232334] text-center shrink-0 w-full sm:w-auto shadow-inner">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF]">Readiness Score</span>
            <p className="text-3xl font-extrabold text-[#A78BFA] mt-0.5">{stats.readinessScore}%</p>
            <span className="text-xs font-semibold text-emerald-400">Tier-1 Eligible</span>
          </div>
        </div>

        {/* EDIT FORM (Conditionally Rendered) */}
        {isEditing && (
          <form onSubmit={handleSave} className="bg-[#13131C] rounded-2xl p-6 sm:p-7 border border-[#7C3AED]/40 shadow-[0_0_25px_rgba(124,58,237,0.15)] space-y-5">
            <h3 className="text-base font-bold text-white">Update Profile, Academic & Placement Parameters</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-[#D1D5DB] font-semibold mb-1 block">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-[#D1D5DB] font-semibold mb-1 block">College Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-[#D1D5DB] font-semibold mb-1 block">College / University</label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-[#D1D5DB] font-semibold mb-1 block">Branch / Department</label>
                <input
                  type="text"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-[#D1D5DB] font-semibold mb-1 block">Current CGPA (Out of 10.0)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.cgpa}
                  onChange={(e) => setFormData({ ...formData, cgpa: Number(e.target.value) })}
                  className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-[#D1D5DB] font-semibold mb-1 block">Active Backlogs</label>
                <input
                  type="number"
                  value={formData.activeBacklogs}
                  onChange={(e) => setFormData({ ...formData, activeBacklogs: Number(e.target.value) })}
                  className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-[#D1D5DB] font-semibold mb-1 block">Daily Prep Commitment (Minutes)</label>
                <select
                  value={formData.dailyPrepMinutes}
                  onChange={(e) => setFormData({ ...formData, dailyPrepMinutes: Number(e.target.value) })}
                  className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                >
                  <option value={60}>60 mins (1 hour)</option>
                  <option value={90}>90 mins (1.5 hours)</option>
                  <option value={120}>120 mins (2 hours)</option>
                  <option value={180}>180 mins (3 hours)</option>
                </select>
              </div>

              <div>
                <label className="text-[#D1D5DB] font-semibold mb-1 block">Placement Target Date</label>
                <input
                  type="date"
                  value={formData.placementTargetDate}
                  onChange={(e) => setFormData({ ...formData, placementTargetDate: e.target.value })}
                  className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                />
              </div>
            </div>

            {/* Target Companies Selection */}
            <div>
              <label className="text-[#D1D5DB] font-semibold text-xs mb-2 block">
                Target Companies (Select multiple to drive roadmap priorities):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {sampleCompanies.map((c) => {
                  const isChecked = formData.targetCompanyIds.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleToggleTargetCompany(c.id)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left flex items-center justify-between ${
                        isChecked
                          ? 'bg-[#7C3AED]/20 border-[#7C3AED] text-[#C4B5FD] shadow-[0_0_12px_rgba(124,58,237,0.25)]'
                          : 'bg-[#0D0D14] border-[#232334] text-[#9CA3AF] hover:text-white hover:border-[#38384E]'
                      }`}
                    >
                      <span>{c.name.split(' ')[0]}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-[#A78BFA]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preferred Job Roles */}
            <div>
              <label className="text-[#D1D5DB] font-semibold text-xs mb-1 block">
                Preferred Job Roles:
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {formData.preferredJobRoles.map((role) => (
                  <span
                    key={role}
                    className="px-2.5 py-1 bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#C4B5FD] rounded-md text-xs font-semibold flex items-center gap-1.5"
                  >
                    <span>{role}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveRole(role)}
                      className="text-[#A78BFA] hover:text-rose-400"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. SDE-1, Cloud Engineer, Data Analyst..."
                  value={newRoleInput}
                  onChange={(e) => setNewRoleInput(e.target.value)}
                  className="flex-1 p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                />
                <button
                  type="button"
                  onClick={handleAddRole}
                  className="px-4 py-2 bg-[#1E1E2E] hover:bg-[#28283E] text-white border border-[#2E2E44] rounded-lg text-xs font-semibold transition-colors"
                >
                  Add Role
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#232334]">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-[#232334] text-[#9CA3AF] hover:bg-[#1C1C2A] hover:text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Save All Profile & Placement Parameters</span>
              </button>
            </div>
          </form>
        )}

        {/* ACTIVE TARGET ROLES & COMPANIES SNAPSHOT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-[#13131C] rounded-2xl p-5 sm:p-6 border border-[#232334] shadow-[0_4px_24px_rgba(0,0,0,0.4)] space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#A78BFA]" />
              <span>Target Companies ({user.targetCompanyIds?.length || 0})</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {(user.targetCompanyIds || []).map((cid) => {
                const comp = sampleCompanies.find(c => c.id === cid);
                return (
                  <span key={cid} className="px-3 py-1.5 bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-[#C4B5FD] rounded-lg text-xs font-semibold flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#A78BFA]" />
                    <span>{comp ? comp.name : cid.toUpperCase()}</span>
                  </span>
                );
              })}
            </div>
            <Link href="/companies" className="text-xs font-semibold text-[#A78BFA] hover:text-[#C4B5FD] transition-colors block pt-1">
              View Target Company Match & Preparation Checklist →
            </Link>
          </div>

          <div className="bg-[#13131C] rounded-2xl p-5 sm:p-6 border border-[#232334] shadow-[0_4px_24px_rgba(0,0,0,0.4)] space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-[#A78BFA]" />
              <span>Preferred Job Roles</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {(user.preferredJobRoles || ['Software Engineer']).map((role, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-[#0D0D14] border border-[#232334] text-white rounded-lg text-xs font-semibold">
                  {role}
                </span>
              ))}
            </div>
            <div className="text-xs text-[#9CA3AF] pt-1">
              Daily Prep Time: <strong className="text-white">{user.dailyPrepMinutes || 120} mins/day</strong> • Target Date: <strong className="text-white">{user.placementTargetDate || 'Nov 15, 2026'}</strong>
            </div>
          </div>
        </div>

        {/* VERIFIED SKILLS & CAMPUS ACHIEVEMENTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-[#13131C] rounded-2xl p-5 sm:p-6 border border-[#232334] shadow-[0_4px_24px_rgba(0,0,0,0.4)] space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#A78BFA]" />
              <span>Assessed Competencies</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillsList.map((skill, i) => (
                <span key={i} className="px-3 py-1.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-xs font-medium text-[#D1D5DB] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A78BFA]" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#13131C] rounded-2xl p-5 sm:p-6 border border-[#232334] shadow-[0_4px_24px_rgba(0,0,0,0.4)] space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Campus Badges & Achievements</span>
            </h3>
            <div className="space-y-2.5">
              {achievementsList.map((ach, idx) => (
                <div key={idx} className="p-3 bg-[#0D0D14] rounded-xl border border-[#1F1F2E] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{ach.title}</h4>
                    <p className="text-[11px] text-[#9CA3AF] mt-0.5">{ach.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
