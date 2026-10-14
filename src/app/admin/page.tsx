'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { adminStudents } from '@/data/mockData';
import { AdminStudentOverview, RecruiterHistoryRecord, VerificationStatus } from '@/types';
import { usePlacePrep } from '@/context/PlacePrepContext';
import {
  Users,
  Award,
  Bell,
  Search,
  Plus,
  BookOpen,
  Building2,
  ShieldCheck,
  Edit2,
  Trash2,
  Download,
  Info
} from 'lucide-react';

export default function AdminPage() {
  const { collegeData, addOrUpdateRecruiterRecord, deleteRecruiterRecord, showToast } = usePlacePrep();

  const [students] = useState<AdminStudentOverview[]>(adminStudents);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'students' | 'recruiters' | 'announcements'>('students');

  // Announcement state
  const [announcementText, setAnnouncementText] = useState('');
  const [announcements, setAnnouncements] = useState<string[]>([
    'TCS NQT National Qualifier test simulation opens Saturday at 10:00 AM IST.',
    'Amazon SDE-1 mock interview slots allocated for 2026 pre-final candidates.',
    'Notice from TPO: All student CGPA and backlog criteria must be verified before pool campus registration.'
  ]);

  // Recruiter Record Add/Edit State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<RecruiterHistoryRecord | null>(null);
  const [formData, setFormData] = useState<Partial<RecruiterHistoryRecord>>({
    companyName: '',
    companyId: '',
    academicYear: '2024-2025',
    status: 'Confirmed',
    rolesOffered: ['Software Engineer'],
    hiringTier: 'Services',
    packageLPA: '4.5 - 7.0 LPA',
    offersCount: 25,
    branchesEligible: ['CSE', 'IT'],
    minCgpa: 6.5,
    maxBacklogs: 0,
    requiredSkills: ['Data Structures', 'Aptitude', 'SQL'],
    recruitmentStages: ['Online Test', 'Technical Interview', 'HR Round'],
    verifiedStatus: 'Verified by TPO',
    dataSource: `${collegeData.collegeName} Placement Cell`
  });

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    setAnnouncements([announcementText, ...announcements]);
    setAnnouncementText('');
    showToast('Campus announcement broadcasted', 'success');
  };

  const handleOpenAddModal = () => {
    setEditingRecord(null);
    setFormData({
      companyName: '',
      companyId: '',
      academicYear: '2024-2025',
      status: 'Confirmed',
      rolesOffered: ['Software Engineer'],
      hiringTier: 'Services',
      packageLPA: '4.5 - 7.5 LPA',
      offersCount: 20,
      branchesEligible: ['CSE', 'IT', 'ECE'],
      minCgpa: 6.5,
      maxBacklogs: 0,
      requiredSkills: ['DSA', 'Quantitative Aptitude', 'DBMS'],
      recruitmentStages: ['Written Test', 'Technical Round', 'HR Round'],
      verifiedStatus: 'Verified by TPO',
      dataSource: `${collegeData.collegeName} Placement Cell`
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (rec: RecruiterHistoryRecord) => {
    setEditingRecord(rec);
    setFormData(rec);
    setIsModalOpen(true);
  };

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName) {
      showToast('Please enter company name', 'error');
      return;
    }

    const recToSave: RecruiterHistoryRecord = {
      id: editingRecord ? editingRecord.id : `rec_tpo_${Date.now()}`,
      companyName: formData.companyName,
      companyId: formData.companyId || formData.companyName.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      academicYear: formData.academicYear || '2024-2025',
      status: (formData.status as RecruiterHistoryRecord['status']) || 'Confirmed',
      rolesOffered: Array.isArray(formData.rolesOffered)
        ? formData.rolesOffered
        : formData.rolesOffered ? String(formData.rolesOffered).split(',').map(s => s.trim()) : ['Software Engineer'],
      hiringTier: (formData.hiringTier as RecruiterHistoryRecord['hiringTier']) || 'Services',
      packageLPA: formData.packageLPA || '4.5 - 7.0 LPA',
      offersCount: Number(formData.offersCount) || 10,
      branchesEligible: Array.isArray(formData.branchesEligible)
        ? formData.branchesEligible
        : ['CSE', 'IT'],
      minCgpa: Number(formData.minCgpa) || 6.5,
      maxBacklogs: Number(formData.maxBacklogs) || 0,
      requiredSkills: Array.isArray(formData.requiredSkills)
        ? formData.requiredSkills
        : ['DSA', 'Aptitude'],
      recruitmentStages: Array.isArray(formData.recruitmentStages)
        ? formData.recruitmentStages
        : ['Online Test', 'Interview'],
      verifiedStatus: (formData.verifiedStatus as VerificationStatus) || 'Verified by TPO',
      dataSource: formData.dataSource || 'Placement Cell Records',
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    addOrUpdateRecruiterRecord(recToSave);
    setIsModalOpen(false);
  };

  const handleExportCSV = () => {
    const headers = ['Company', 'Year', 'Status', 'Tier', 'Package', 'Offers', 'Min CGPA', 'Max Backlogs', 'Verified Status'];
    const rows = collegeData.recruiterHistory.map(r => [
      `"${r.companyName}"`,
      r.academicYear,
      r.status,
      r.hiringTier,
      `"${r.packageLPA}"`,
      r.offersCount,
      r.minCgpa,
      r.maxBacklogs,
      `"${r.verifiedStatus}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${collegeData.collegeCode}_tpo_placement_records.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('TPO records exported to CSV successfully', 'success');
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.branch.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                Placement Cell Administration
              </span>
              <span className="text-xs text-[#9CA3AF]">{collegeData.collegeName}</span>
            </div>
            <h1 className="text-2xl font-bold text-white mt-1.5">
              Admin & TPO Placement Intelligence Management
            </h1>
            <p className="text-sm text-[#9CA3AF] mt-1">
              Manage historical recruiter records, academic verification benchmarks, student readiness registry, and campus broadcast notices.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 bg-[#13131C] hover:bg-[#1C1C2A] border border-[#232334] text-[#D1D5DB] hover:text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span>Export Records</span>
            </button>
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Recruiter Record</span>
            </button>
          </div>
        </div>

        {/* DEMO AUTHORIZATION LIMITATION NOTICE */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-200/90 leading-relaxed">
            <strong className="font-semibold text-amber-200">Authentication & Authorization Architecture Notice:</strong> PlacePrep is currently operating in an <em>offline-capable local demo mode</em>. Role-based access control (TPO vs Student) is simulated locally in browser state. For production deployment, connect NextAuth/Clerk and institutional backend SSO to securely restrict recruiter record editing to verified placement cell coordinators.
          </div>
        </div>

        {/* ADMIN OVERVIEW METRICS (4 CARDS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#13131C] p-5 rounded-2xl border border-[#232334] shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF]">Cohort Enrolled</span>
              <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/15 text-[#A78BFA] border border-[#7C3AED]/30 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3.5">
              <span className="text-2xl font-extrabold text-white">1,248</span>
              <p className="text-xs text-[#9CA3AF] mt-0.5">Across {collegeData.branchTrends.length} engineering branches</p>
            </div>
          </div>

          <div className="bg-[#13131C] p-5 rounded-2xl border border-[#232334] shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF]">Recruiter Directory</span>
              <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/15 text-[#A78BFA] border border-[#7C3AED]/30 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3.5">
              <span className="text-2xl font-extrabold text-[#A78BFA]">{collegeData.recruiterHistory.length}</span>
              <p className="text-xs text-[#9CA3AF] mt-0.5">
                {collegeData.recruiterHistory.filter(r => r.status === 'Confirmed').length} Confirmed for 2025-2026
              </p>
            </div>
          </div>

          <div className="bg-[#13131C] p-5 rounded-2xl border border-[#232334] shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF]">Assessment Submissions</span>
              <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/15 text-[#A78BFA] border border-[#7C3AED]/30 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3.5">
              <span className="text-2xl font-extrabold text-white">14,820</span>
              <p className="text-xs text-[#9CA3AF] mt-0.5">Quizzes, code & interview mocks</p>
            </div>
          </div>

          <div className="bg-[#13131C] p-5 rounded-2xl border border-[#232334] shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF]">Cohort Readiness</span>
              <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/15 text-[#A78BFA] border border-[#7C3AED]/30 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3.5">
              <span className="text-2xl font-extrabold text-[#A78BFA]">68.4%</span>
              <p className="text-xs text-[#9CA3AF] mt-0.5">+8.2% benchmark improvement</p>
            </div>
          </div>
        </div>

        {/* TAB TOGGLE: STUDENTS REGISTRY VS RECRUITER HISTORY VS ANNOUNCEMENTS */}
        <div className="flex items-center gap-2 bg-[#0D0D14] border border-[#232334] p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'students'
                ? 'bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white shadow-sm'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            Cohort Student Registry
          </button>
          <button
            onClick={() => setActiveTab('recruiters')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'recruiters'
                ? 'bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white shadow-sm'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            Manage Recruiter Records ({collegeData.recruiterHistory.length})
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'announcements'
                ? 'bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white shadow-sm'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            Campus Broadcast Notices
          </button>
        </div>

        {/* TAB 1: COHORT STUDENT PERFORMANCE TABLE */}
        {activeTab === 'students' && (
          <div className="bg-[#13131C] rounded-2xl p-5 sm:p-7 border border-[#232334] shadow-[0_4px_24px_rgba(0,0,0,0.4)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">Student Placement Readiness Registry</h3>
                <p className="text-xs text-[#9CA3AF] mt-0.5">Real-time candidate rankings for placement drive shortlisting</p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search candidate name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#232334] text-[#9CA3AF] uppercase text-[10px] tracking-wider font-semibold">
                    <th className="pb-3 font-semibold">Candidate</th>
                    <th className="pb-3 font-semibold">Branch</th>
                    <th className="pb-3 font-semibold">Readiness</th>
                    <th className="pb-3 font-semibold">Coding Solved</th>
                    <th className="pb-3 font-semibold">Tests</th>
                    <th className="pb-3 font-semibold">Eligibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1F1F2E]">
                  {filteredStudents.map((st) => (
                    <tr key={st.id} className="hover:bg-[#181824] transition-colors">
                      <td className="py-3.5">
                        <div className="font-bold text-white">{st.name}</div>
                        <div className="text-[11px] text-[#9CA3AF]">{st.email}</div>
                      </td>
                      <td className="py-3.5 text-[#D1D5DB] font-medium">{st.branch}</td>
                      <td className="py-3.5">
                        <span className="font-bold text-[#A78BFA] text-sm">{st.readinessScore}%</span>
                      </td>
                      <td className="py-3.5 text-white font-semibold">{st.codingSolved}</td>
                      <td className="py-3.5 text-white font-semibold">{st.testsCompleted}</td>
                      <td className="py-3.5">
                        <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                          st.status === 'Placement Ready'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : st.status === 'Needs Practice'
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        }`}>
                          {st.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE RECRUITER RECORDS */}
        {activeTab === 'recruiters' && (
          <div className="bg-[#13131C] rounded-2xl p-5 sm:p-7 border border-[#232334] shadow-[0_4px_24px_rgba(0,0,0,0.4)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#232334]">
              <div>
                <h3 className="text-base font-bold text-white">College Historical Recruiter Records</h3>
                <p className="text-xs text-[#9CA3AF] mt-0.5">Edit, add, or verify recruitment records powering student matching</p>
              </div>
              <button
                onClick={handleOpenAddModal}
                className="px-3.5 py-1.5 bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Record</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#232334] text-[#9CA3AF] uppercase text-[10px] tracking-wider font-semibold">
                    <th className="pb-3 font-semibold">Company</th>
                    <th className="pb-3 font-semibold">Academic Year</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Package</th>
                    <th className="pb-3 font-semibold">Offers</th>
                    <th className="pb-3 font-semibold">Verification</th>
                    <th className="pb-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1F1F2E]">
                  {collegeData.recruiterHistory.map((rec) => (
                    <tr key={rec.id} className="hover:bg-[#181824] transition-colors">
                      <td className="py-3 font-bold text-white">{rec.companyName}</td>
                      <td className="py-3 font-medium text-[#9CA3AF]">{rec.academicYear}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          rec.status === 'Confirmed'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-[#0D0D14] text-[#9CA3AF] border border-[#232334]'
                        }`}>
                          {rec.status}
                        </span>
                      </td>
                      <td className="py-3 font-semibold text-white">{rec.packageLPA}</td>
                      <td className="py-3 text-[#A78BFA] font-bold">{rec.offersCount}</td>
                      <td className="py-3">
                        <span className="flex items-center gap-1 text-[11px] text-[#A78BFA] font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#7C3AED]" />
                          <span>{rec.verifiedStatus}</span>
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleOpenEditModal(rec)}
                          className="p-1 text-[#9CA3AF] hover:text-[#C4B5FD] mr-1 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteRecruiterRecord(rec.id)}
                          className="p-1 text-[#9CA3AF] hover:text-rose-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CAMPUS BROADCAST ANNOUNCEMENTS */}
        {activeTab === 'announcements' && (
          <div className="bg-[#13131C] rounded-2xl p-5 sm:p-7 border border-[#232334] shadow-[0_4px_24px_rgba(0,0,0,0.4)] space-y-4">
            <h3 className="text-base font-bold text-white">Broadcast Campus Placement Notices</h3>

            <form onSubmit={handlePostAnnouncement} className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Broadcast notice to all 2026 students..."
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="flex-1 px-3.5 py-2 bg-[#0D0D14] border border-[#232334] rounded-lg text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white font-semibold text-xs rounded-lg shadow-sm transition-all"
              >
                Broadcast Notice
              </button>
            </form>

            <div className="space-y-2">
              {announcements.map((ann, i) => (
                <div key={i} className="p-3 bg-[#0D0D14] rounded-lg border border-[#1F1F2E] text-xs text-[#D1D5DB] flex items-start gap-2.5">
                  <Bell className="w-4 h-4 text-[#A78BFA] shrink-0 mt-0.5" />
                  <span>{ann}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL FOR ADDING / EDITING RECRUITER RECORD */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#13131C] rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[#2B2B40] space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#232334]">
                <h3 className="text-base font-bold text-white">
                  {editingRecord ? 'Edit Recruiter Record' : 'Add Recruiter Record'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-[#9CA3AF] hover:text-white text-sm font-bold w-7 h-7 rounded-lg hover:bg-[#1C1C2A] flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveRecord} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-[#D1D5DB] block mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. TCS or Amazon"
                    className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white placeholder-[#64748B] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#D1D5DB] block mb-1">Academic Year</label>
                    <select
                      value={formData.academicYear}
                      onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                      className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                    >
                      <option value="2025-2026">2025-2026</option>
                      <option value="2024-2025">2024-2025</option>
                      <option value="2023-2024">2023-2024</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-[#D1D5DB] block mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as RecruiterHistoryRecord['status'] })}
                      className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                    >
                      <option value="Confirmed">Confirmed On-Campus</option>
                      <option value="Historical">Historical Record</option>
                      <option value="Expected">Expected / Pipeline</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#D1D5DB] block mb-1">Package LPA</label>
                    <input
                      type="text"
                      value={formData.packageLPA}
                      onChange={(e) => setFormData({ ...formData, packageLPA: e.target.value })}
                      placeholder="e.g. 5.5 - 9.0 LPA"
                      className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white placeholder-[#64748B] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#D1D5DB] block mb-1">Offers Count</label>
                    <input
                      type="number"
                      value={formData.offersCount}
                      onChange={(e) => setFormData({ ...formData, offersCount: Number(e.target.value) })}
                      placeholder="e.g. 35"
                      className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white placeholder-[#64748B] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#D1D5DB] block mb-1">Min CGPA Required</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.minCgpa}
                      onChange={(e) => setFormData({ ...formData, minCgpa: Number(e.target.value) })}
                      className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#D1D5DB] block mb-1">Max Backlogs Allowed</label>
                    <input
                      type="number"
                      value={formData.maxBacklogs}
                      onChange={(e) => setFormData({ ...formData, maxBacklogs: Number(e.target.value) })}
                      className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#D1D5DB] block mb-1">Roles Offered (comma-separated)</label>
                  <input
                    type="text"
                    value={Array.isArray(formData.rolesOffered) ? formData.rolesOffered.join(', ') : formData.rolesOffered}
                    onChange={(e) => setFormData({ ...formData, rolesOffered: e.target.value.split(',').map(s => s.trim()) })}
                    placeholder="SDE-1, Cloud Associate, Systems Engineer"
                    className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white placeholder-[#64748B] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#D1D5DB] block mb-1">Required Skills (comma-separated)</label>
                  <input
                    type="text"
                    value={Array.isArray(formData.requiredSkills) ? formData.requiredSkills.join(', ') : formData.requiredSkills}
                    onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value.split(',').map(s => s.trim()) })}
                    placeholder="Data Structures, DBMS, Aptitude, Java"
                    className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white placeholder-[#64748B] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#D1D5DB] block mb-1">Verification Status & Source</label>
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={formData.verifiedStatus}
                      onChange={(e) => setFormData({ ...formData, verifiedStatus: e.target.value as VerificationStatus })}
                      className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                    >
                      <option value="Verified by TPO">Verified by TPO</option>
                      <option value="Sample / Demo Record">Sample / Demo Record</option>
                      <option value="Community Reported">Community Reported</option>
                    </select>
                    <input
                      type="text"
                      value={formData.dataSource}
                      onChange={(e) => setFormData({ ...formData, dataSource: e.target.value })}
                      placeholder="e.g. College Placement Cell Report"
                      className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white placeholder-[#64748B] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-[#232334]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-[#232334] rounded-lg text-[#9CA3AF] hover:bg-[#1C1C2A] hover:text-white font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white rounded-lg font-semibold shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] transition-all"
                  >
                    Save Recruiter Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
