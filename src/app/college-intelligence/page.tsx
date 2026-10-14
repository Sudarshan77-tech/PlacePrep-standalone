'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { usePlacePrep } from '@/context/PlacePrepContext';
import { RecruiterHistoryRecord, VerificationStatus } from '@/types';
import {
  GraduationCap,
  Building2,
  Calendar,
  Award,
  Users,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Plus,
  Edit2,
  Trash2,
  AlertTriangle,
  Info,
  ArrowRight,
  TrendingUp,
  Download,
  FileSpreadsheet
} from 'lucide-react';

export default function CollegeIntelligencePage() {
  const { user, collegeData, addOrUpdateRecruiterRecord, deleteRecruiterRecord, showToast } = usePlacePrep();

  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingRecord, setEditingRecord] = useState<RecruiterHistoryRecord | null>(null);

  // Form state for TPO / Admin adding or editing historical recruiter record
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
    dataSource: 'College TPO Annual Records'
  });

  const filteredRecruiters = collegeData.recruiterHistory.filter(r => {
    const matchYear = selectedYear === 'all' || r.academicYear === selectedYear;
    const matchStatus = selectedStatus === 'all' || r.status === selectedStatus;
    const matchSearch = r.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        r.rolesOffered.some(role => role.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        r.requiredSkills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchYear && matchStatus && matchSearch;
  });

  const handleOpenAddModal = () => {
    setEditingRecord(null);
    setFormData({
      companyName: '',
      companyId: '',
      academicYear: '2024-2025',
      status: 'Confirmed',
      rolesOffered: ['Software Development Engineer'],
      hiringTier: 'Services',
      packageLPA: '4.5 - 7.5 LPA',
      offersCount: 20,
      branchesEligible: ['CSE', 'IT', 'ECE'],
      minCgpa: 6.5,
      maxBacklogs: 0,
      requiredSkills: ['DSA', 'Quantitative Aptitude', 'DBMS'],
      recruitmentStages: ['Written Test', 'Technical Round', 'HR Interview'],
      verifiedStatus: 'Verified by TPO',
      dataSource: `${user.college} Placement Cell`
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
      id: editingRecord ? editingRecord.id : `rec_${Date.now()}`,
      companyName: formData.companyName,
      companyId: formData.companyId || formData.companyName.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      academicYear: formData.academicYear || '2024-2025',
      status: (formData.status as any) || 'Confirmed',
      rolesOffered: Array.isArray(formData.rolesOffered) ? formData.rolesOffered : (formData.rolesOffered ? String(formData.rolesOffered).split(',').map(s => s.trim()) : ['Software Engineer']),
      hiringTier: (formData.hiringTier as any) || 'Services',
      packageLPA: formData.packageLPA || '4.0 - 6.0 LPA',
      offersCount: Number(formData.offersCount) || 10,
      branchesEligible: Array.isArray(formData.branchesEligible) ? formData.branchesEligible : (formData.branchesEligible ? String(formData.branchesEligible).split(',').map(s => s.trim()) : ['CSE', 'IT']),
      minCgpa: Number(formData.minCgpa) || 6.0,
      maxBacklogs: Number(formData.maxBacklogs) || 0,
      requiredSkills: Array.isArray(formData.requiredSkills) ? formData.requiredSkills : (formData.requiredSkills ? String(formData.requiredSkills).split(',').map(s => s.trim()) : ['DSA', 'SQL']),
      recruitmentStages: Array.isArray(formData.recruitmentStages) ? formData.recruitmentStages : (formData.recruitmentStages ? String(formData.recruitmentStages).split(',').map(s => s.trim()) : ['Online Test', 'Technical Interview', 'HR Interview']),
      verifiedStatus: (formData.verifiedStatus as VerificationStatus) || 'Verified by TPO',
      dataSource: formData.dataSource || 'TPO Entry',
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    addOrUpdateRecruiterRecord(recToSave);
    setIsModalOpen(false);
  };

  const handleExportCSV = () => {
    const headers = 'Company,Year,Status,Tier,Package,Offers,Min CGPA,Required Skills,Verification,Data Source\n';
    const rows = collegeData.recruiterHistory.map(r =>
      `"${r.companyName}","${r.academicYear}","${r.status}","${r.hiringTier}","${r.packageLPA}","${r.offersCount}","${r.minCgpa}","${r.requiredSkills.join('; ')}","${r.verifiedStatus}","${r.dataSource}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${collegeData.collegeCode}_historical_placement_records.csv`;
    a.click();
    showToast('Placement history records exported to CSV', 'success');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#EBF0FF] text-[#315BFA] border border-[#D4E0FC]">
                Institutional Intelligence
              </span>
              <span className="text-xs text-[#52627A]">TPO Verified History</span>
            </div>
            <h1 className="text-2xl font-bold text-[#142748] mt-1.5">
              College Placement Intelligence & Recruiter Archives
            </h1>
            <p className="text-sm text-[#52627A] mt-1">
              Exam patterns, branch eligibility, historical hiring counts, and confirmed recruiters for <strong className="text-[#142748] font-semibold">{user.college}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 bg-white hover:bg-[#F7F9FC] border border-[#E3EAF5] text-[#52627A] hover:text-[#142748] font-semibold text-xs rounded-xl shadow-[0_1px_3px_rgba(20,39,72,0.03)] transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#52627A]" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 bg-[#315BFA] hover:bg-[#2548DE] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Recruiter Record</span>
            </button>
          </div>
        </div>

        {/* TRANSPARENCY NOTICE BANNER */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <strong className="font-semibold text-amber-950">Data Transparency Notice:</strong> The records displayed below combine <strong>{collegeData.collegeName}</strong> sample historical records and demo placement records for benchmarking. Records marked as <em>&quot;Verified by TPO&quot;</em> simulate official placement office data, while records marked as <em>&quot;Sample / Demo Record&quot;</em> provide illustrative preparation patterns. Placement stats are estimates and do not guarantee future recruitment visits or selection.
          </div>
        </div>

        {/* COLLEGE SNAPSHOT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#52627A]">Total Recruiters</span>
              <Building2 className="w-4 h-4 text-[#315BFA]" />
            </div>
            <div className="mt-3.5">
              <span className="text-2xl font-extrabold text-[#142748]">{collegeData.recruiterHistory.length}</span>
              <p className="text-xs text-[#52627A] mt-0.5">Across {collegeData.historicalYears.length} academic seasons</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#52627A]">Confirmed Drives</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-3.5">
              <span className="text-2xl font-extrabold text-emerald-600">
                {collegeData.recruiterHistory.filter(r => r.status === 'Confirmed').length}
              </span>
              <p className="text-xs text-[#52627A] mt-0.5">On-campus drives scheduled</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#52627A]">CSE Branch Avg</span>
              <TrendingUp className="w-4 h-4 text-[#315BFA]" />
            </div>
            <div className="mt-3.5">
              <span className="text-2xl font-extrabold text-[#142748]">₹7.8 LPA</span>
              <p className="text-xs text-[#52627A] mt-0.5">Highest: ₹42.0 LPA (Amazon)</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#52627A]">Your Eligibility</span>
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="mt-3.5">
              <span className="text-2xl font-extrabold text-[#315BFA]">92%</span>
              <p className="text-xs text-[#52627A] mt-0.5">CGPA {user.cgpa || 8.8} & 0 backlogs</p>
            </div>
          </div>
        </div>

        {/* BRANCH-WISE PLACEMENT TRENDS */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#142748]">Branch-Wise Historical Trends</h2>
              <p className="text-xs text-[#52627A] mt-0.5">Placement conversion ratios and average CTC by engineering department</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {collegeData.branchTrends.map((bt, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E3EAF5] flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-xs font-bold text-[#142748]">{bt.branch}</h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-lg font-extrabold text-[#315BFA]">
                      {Math.round((bt.placedCount / bt.totalStudents) * 100)}%
                    </span>
                    <span className="text-[11px] text-[#52627A]">
                      ({bt.placedCount}/{bt.totalStudents} placed)
                    </span>
                  </div>
                  <div className="w-full bg-[#E3EAF5] h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-[#315BFA] h-1.5 rounded-full"
                      style={{ width: `${(bt.placedCount / bt.totalStudents) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E3EAF5] text-[11px] text-[#52627A] space-y-1">
                  <div>Avg Package: <strong className="text-[#142748]">₹{bt.avgPackageLPA} LPA</strong></div>
                  <div>Top: <strong className="text-[#142748]">{bt.topRecruiters.slice(0, 2).join(', ')}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECRUITER ARCHIVES WITH SEARCH & FILTERS */}
        <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-[#142748]">Historical & Confirmed Recruiter Directory</h2>
              <p className="text-xs text-[#52627A] mt-0.5">Filter by academic season, drive status, and skill requirements</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full sm:w-60">
                <Search className="w-3.5 h-3.5 text-[#52627A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search company or skill..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded-lg text-xs text-[#142748] placeholder-[#52627A]/60 focus:outline-none focus:border-[#315BFA] focus:ring-1 focus:ring-[#315BFA]"
                />
              </div>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-1.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded-lg text-xs font-semibold text-[#52627A] focus:outline-none focus:border-[#315BFA]"
              >
                <option value="all">All Academic Years</option>
                <option value="2025-2026">2025-2026 Season</option>
                <option value="2024-2025">2024-2025 Season</option>
                <option value="2023-2024">2023-2024 Season</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-1.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded-lg text-xs font-semibold text-[#52627A] focus:outline-none focus:border-[#315BFA]"
              >
                <option value="all">All Drive Status</option>
                <option value="Confirmed">Confirmed Drives</option>
                <option value="Historical">Historical Record</option>
              </select>
            </div>
          </div>

          {/* Recruiter Records Cards */}
          <div className="space-y-3.5">
            {filteredRecruiters.map((rec) => {
              const isConfirmed = rec.status === 'Confirmed';
              const isEligible = (user.cgpa || 8.0) >= rec.minCgpa && (user.activeBacklogs || 0) <= rec.maxBacklogs;

              return (
                <div
                  key={rec.id}
                  className="p-5 rounded-xl border border-[#E3EAF5] hover:border-[#315BFA]/40 transition-colors bg-white shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#142748] text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {rec.companyName.slice(0, 3).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-[#142748]">{rec.companyName}</h3>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            isConfirmed ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-[#F7F9FC] text-[#52627A] border border-[#E3EAF5]'
                          }`}>
                            {rec.status === 'Confirmed' ? '● Confirmed On-Campus' : 'Historical Data'}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EBF0FF] text-[#315BFA] border border-[#D4E0FC]">
                            {rec.academicYear}
                          </span>
                        </div>
                        <p className="text-xs text-[#52627A] mt-0.5">
                          Roles: <span className="font-semibold text-[#142748]">{rec.rolesOffered.join(', ')}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#142748]">{rec.packageLPA}</span>
                        <div className="text-[10px] text-[#52627A]">{rec.offersCount} Offers Made</div>
                      </div>

                      {/* Admin edit / delete actions */}
                      <button
                        onClick={() => handleOpenEditModal(rec)}
                        className="p-1.5 text-[#52627A] hover:text-[#315BFA] rounded-lg hover:bg-[#F7F9FC] transition-colors"
                        title="Edit Record"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteRecruiterRecord(rec.id)}
                        className="p-1.5 text-[#52627A] hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Requirements & Stages Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-[#E3EAF5] text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-[#52627A] uppercase tracking-wider">Eligibility Criteria</span>
                      <p className="text-[#142748] mt-1">
                        Min CGPA: <strong>{rec.minCgpa}</strong> • Max Backlogs: <strong>{rec.maxBacklogs}</strong>
                      </p>
                      <p className="text-[#52627A] text-[11px] mt-0.5">
                        Branches: {rec.branchesEligible.join(', ')}
                      </p>
                      <div className="mt-1.5">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                          isEligible ? 'text-emerald-800 bg-emerald-50 border border-emerald-200' : 'text-rose-700 bg-rose-50 border border-rose-200'
                        }`}>
                          {isEligible ? '✓ You Meet Eligibility' : '⚠️ Below Criteria Benchmark'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-[#52627A] uppercase tracking-wider">Required Skills Tested</span>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {rec.requiredSkills.map((sk, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded text-[10px] text-[#142748] font-medium">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-[#52627A] uppercase tracking-wider">Selection Process</span>
                      <ol className="list-decimal list-inside text-[#52627A] text-[11px] mt-1 space-y-0.5">
                        {rec.recruitmentStages.map((stg, idx) => (
                          <li key={idx}>{stg}</li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Footer provenance & verification tag */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[10px] text-[#52627A] border-t border-[#F1F5F9]">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3 h-3 text-[#315BFA]" />
                      <span>{rec.verifiedStatus}</span>
                      <span>•</span>
                      <span>Source: {rec.dataSource}</span>
                    </div>
                    <span>Last Updated: {rec.lastUpdated}</span>
                  </div>
                </div>
              );
            })}

            {filteredRecruiters.length === 0 && (
              <div className="p-8 text-center text-[#52627A] text-xs">
                No recruiter records match your current filter query.
              </div>
            )}
          </div>
        </div>

        {/* MODAL FOR ADDING / EDITING RECRUITER RECORD */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-[#142748]/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-[#E3EAF5] space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#E3EAF5]">
                <h3 className="text-base font-bold text-[#142748]">
                  {editingRecord ? 'Edit Placement Record' : 'Add Recruiter Placement Record'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-[#52627A] hover:text-[#142748] text-sm font-bold w-7 h-7 rounded-lg hover:bg-[#F7F9FC] flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveRecord} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-[#142748] block mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. TCS or Amazon"
                    className="w-full p-2.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded-lg text-[#142748] focus:outline-none focus:border-[#315BFA]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#142748] block mb-1">Academic Year</label>
                    <select
                      value={formData.academicYear}
                      onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                      className="w-full p-2.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded-lg text-[#142748] focus:outline-none focus:border-[#315BFA]"
                    >
                      <option value="2025-2026">2025-2026</option>
                      <option value="2024-2025">2024-2025</option>
                      <option value="2023-2024">2023-2024</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-[#142748] block mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full p-2.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded-lg text-[#142748] focus:outline-none focus:border-[#315BFA]"
                    >
                      <option value="Confirmed">Confirmed On-Campus</option>
                      <option value="Historical">Historical Record</option>
                      <option value="Expected">Expected / Pipeline</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#142748] block mb-1">Package LPA</label>
                    <input
                      type="text"
                      value={formData.packageLPA}
                      onChange={(e) => setFormData({ ...formData, packageLPA: e.target.value })}
                      placeholder="e.g. 5.5 - 9.0 LPA"
                      className="w-full p-2.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded-lg text-[#142748] focus:outline-none focus:border-[#315BFA]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#142748] block mb-1">Offers Count</label>
                    <input
                      type="number"
                      value={formData.offersCount}
                      onChange={(e) => setFormData({ ...formData, offersCount: Number(e.target.value) })}
                      placeholder="e.g. 35"
                      className="w-full p-2.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded-lg text-[#142748] focus:outline-none focus:border-[#315BFA]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#142748] block mb-1">Min CGPA Required</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.minCgpa}
                      onChange={(e) => setFormData({ ...formData, minCgpa: Number(e.target.value) })}
                      className="w-full p-2.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded-lg text-[#142748] focus:outline-none focus:border-[#315BFA]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#142748] block mb-1">Max Backlogs Allowed</label>
                    <input
                      type="number"
                      value={formData.maxBacklogs}
                      onChange={(e) => setFormData({ ...formData, maxBacklogs: Number(e.target.value) })}
                      className="w-full p-2.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded-lg text-[#142748] focus:outline-none focus:border-[#315BFA]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#142748] block mb-1">Roles Offered (comma-separated)</label>
                  <input
                    type="text"
                    value={Array.isArray(formData.rolesOffered) ? formData.rolesOffered.join(', ') : formData.rolesOffered}
                    onChange={(e) => setFormData({ ...formData, rolesOffered: e.target.value as any })}
                    placeholder="SDE-1, Cloud Associate, Systems Engineer"
                    className="w-full p-2.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded-lg text-[#142748] focus:outline-none focus:border-[#315BFA]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#142748] block mb-1">Required Skills (comma-separated)</label>
                  <input
                    type="text"
                    value={Array.isArray(formData.requiredSkills) ? formData.requiredSkills.join(', ') : formData.requiredSkills}
                    onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value as any })}
                    placeholder="Data Structures, DBMS, Aptitude, Java"
                    className="w-full p-2.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded-lg text-[#142748] focus:outline-none focus:border-[#315BFA]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#142748] block mb-1">Verification Status & Source</label>
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={formData.verifiedStatus}
                      onChange={(e) => setFormData({ ...formData, verifiedStatus: e.target.value as any })}
                      className="w-full p-2.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded-lg text-[#142748] focus:outline-none focus:border-[#315BFA]"
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
                      className="w-full p-2.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded-lg text-[#142748] focus:outline-none focus:border-[#315BFA]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-[#E3EAF5]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-[#E3EAF5] rounded-lg text-[#52627A] hover:bg-[#F7F9FC] font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#315BFA] hover:bg-[#2548DE] text-white rounded-lg font-semibold shadow-xs transition-colors"
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
