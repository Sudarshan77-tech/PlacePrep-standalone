'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { usePlacePrep } from '@/context/PlacePrepContext';
import { ResumeData } from '@/types';
import {
  Download,
  Save,
  Check
} from 'lucide-react';

export default function ResumePage() {
  const { resumeData, updateResume, showToast } = usePlacePrep();
  const [resume, setResume] = useState<ResumeData>(resumeData);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handlePersonalChange = (field: keyof typeof resume.personal, val: string) => {
    setResume(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: val }
    }));
  };

  const handleSave = () => {
    updateResume(resume);
    setSavedSuccess(true);
    showToast('Resume draft saved successfully!', 'success');
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#7C3AED]/15 text-[#A78BFA] border border-[#7C3AED]/30">
                ATS-Optimized Builder
              </span>
              <span className="text-xs text-[#9CA3AF]">Campus Standard</span>
            </div>
            <h1 className="text-2xl font-bold text-white mt-1.5">
              Resume Builder & Live Preview
            </h1>
            <p className="text-sm text-[#9CA3AF] mt-1">
              Format your engineering projects, coursework, metrics, and achievements into recruiter-approved templates.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#13131C] hover:bg-[#1C1C2A] border border-[#232334] text-[#D1D5DB] hover:text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-all shadow-sm"
            >
              {savedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4 text-[#9CA3AF]" />}
              <span>{savedSuccess ? 'Saved!' : 'Save Draft'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Tab Toggle for Mobile/Small Screens */}
        <div className="flex lg:hidden bg-[#0D0D14] border border-[#232334] p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'edit'
                ? 'bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white shadow-sm'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            Edit Resume
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'preview'
                ? 'bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white shadow-sm'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            Live Preview
          </button>
        </div>

        {/* 2-COLUMN VIEW: LEFT EDITOR | RIGHT ATS RESUME PREVIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
          {/* LEFT: FORM EDITORS (6 Cols) */}
          <div className={`lg:col-span-6 space-y-5 ${activeTab === 'preview' ? 'hidden lg:block' : ''}`}>
            {/* Personal Details */}
            <div className="bg-[#13131C] rounded-2xl p-5 sm:p-6 border border-[#232334] shadow-[0_4px_24px_rgba(0,0,0,0.4)] space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-[#7C3AED]/20 text-[#A78BFA] flex items-center justify-center text-xs">1</span>
                <span>Personal Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[#D1D5DB] font-semibold mb-1 block">Full Name</label>
                  <input
                    type="text"
                    value={resume.personal.fullName}
                    onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                    className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DB] font-semibold mb-1 block">Target Title</label>
                  <input
                    type="text"
                    value={resume.personal.title}
                    onChange={(e) => handlePersonalChange('title', e.target.value)}
                    className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DB] font-semibold mb-1 block">Email</label>
                  <input
                    type="email"
                    value={resume.personal.email}
                    onChange={(e) => handlePersonalChange('email', e.target.value)}
                    className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DB] font-semibold mb-1 block">Phone</label>
                  <input
                    type="text"
                    value={resume.personal.phone}
                    onChange={(e) => handlePersonalChange('phone', e.target.value)}
                    className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DB] font-semibold mb-1 block">LinkedIn Profile</label>
                  <input
                    type="text"
                    value={resume.personal.linkedin}
                    onChange={(e) => handlePersonalChange('linkedin', e.target.value)}
                    className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DB] font-semibold mb-1 block">GitHub Profile</label>
                  <input
                    type="text"
                    value={resume.personal.github}
                    onChange={(e) => handlePersonalChange('github', e.target.value)}
                    className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#D1D5DB] font-semibold text-xs mb-1 block">Professional Summary</label>
                <textarea
                  rows={3}
                  value={resume.personal.summary}
                  onChange={(e) => handlePersonalChange('summary', e.target.value)}
                  className="w-full p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg text-xs text-white resize-none focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                />
              </div>
            </div>

            {/* Projects Editor */}
            <div className="bg-[#13131C] rounded-2xl p-5 sm:p-6 border border-[#232334] shadow-[0_4px_24px_rgba(0,0,0,0.4)] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-[#7C3AED]/20 text-[#A78BFA] flex items-center justify-center text-xs">2</span>
                  <span>Key Projects</span>
                </h3>
                <span className="text-xs text-[#A78BFA] font-medium">High recruiter impact</span>
              </div>

              {resume.projects.map((proj, idx) => (
                <div key={proj.id} className="p-3.5 bg-[#0D0D14] rounded-xl border border-[#1F1F2E] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">Project #{idx + 1}</span>
                  </div>
                  <input
                    type="text"
                    value={proj.name}
                    placeholder="Project Name"
                    onChange={(e) => {
                      const updated = [...resume.projects];
                      updated[idx].name = e.target.value;
                      setResume({ ...resume, projects: updated });
                    }}
                    className="w-full p-2 bg-[#13131C] border border-[#232334] rounded-lg font-semibold text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  />
                  <input
                    type="text"
                    value={proj.techStack}
                    placeholder="Tech Stack (e.g. Next.js, Node.js, SQL)"
                    onChange={(e) => {
                      const updated = [...resume.projects];
                      updated[idx].techStack = e.target.value;
                      setResume({ ...resume, projects: updated });
                    }}
                    className="w-full p-2 bg-[#13131C] border border-[#232334] rounded-lg text-[11px] text-[#A78BFA] placeholder-[#64748B] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  />
                  <textarea
                    rows={2}
                    value={proj.description}
                    placeholder="Description & quantifiable metrics"
                    onChange={(e) => {
                      const updated = [...resume.projects];
                      updated[idx].description = e.target.value;
                      setResume({ ...resume, projects: updated });
                    }}
                    className="w-full p-2 bg-[#13131C] border border-[#232334] rounded-lg text-xs text-[#D1D5DB] placeholder-[#64748B] resize-none focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  />
                </div>
              ))}
            </div>

            {/* Experience / Internship */}
            <div className="bg-[#13131C] rounded-2xl p-5 sm:p-6 border border-[#232334] shadow-[0_4px_24px_rgba(0,0,0,0.4)] space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-[#7C3AED]/20 text-[#A78BFA] flex items-center justify-center text-xs">3</span>
                <span>Internship & Work Experience</span>
              </h3>
              {resume.experience.map((exp, idx) => (
                <div key={exp.id} className="p-3.5 bg-[#0D0D14] rounded-xl border border-[#1F1F2E] space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={exp.role}
                      placeholder="Role"
                      onChange={(e) => {
                        const updated = [...resume.experience];
                        updated[idx].role = e.target.value;
                        setResume({ ...resume, experience: updated });
                      }}
                      className="w-full p-2 bg-[#13131C] border border-[#232334] rounded-lg font-semibold text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                    />
                    <input
                      type="text"
                      value={exp.company}
                      placeholder="Company Name"
                      onChange={(e) => {
                        const updated = [...resume.experience];
                        updated[idx].company = e.target.value;
                        setResume({ ...resume, experience: updated });
                      }}
                      className="w-full p-2 bg-[#13131C] border border-[#232334] rounded-lg text-[#D1D5DB] placeholder-[#64748B] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: LIVE RESUME PREVIEW (6 Cols) */}
          <div className={`lg:col-span-6 ${activeTab === 'edit' ? 'hidden lg:block' : ''}`}>
            <div className="sticky top-24 bg-[#0F0F17] rounded-2xl p-8 border border-[#232334] shadow-[0_4px_35px_rgba(0,0,0,0.6)] font-sans text-[#E5E7EB] min-h-[750px] print:bg-white print:text-black print:p-0 print:border-none print:shadow-none">
              {/* ATS Header */}
              <div className="text-center pb-4 border-b-2 border-[#7C3AED]/50 print:border-black">
                <h1 className="text-xl font-bold tracking-tight uppercase text-white print:text-black">
                  {resume.personal.fullName}
                </h1>
                <p className="text-xs font-semibold text-[#A78BFA] mt-0.5 print:text-gray-700">{resume.personal.title}</p>
                <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-[#9CA3AF] mt-2 print:text-gray-600">
                  <span>{resume.personal.email}</span>
                  <span>•</span>
                  <span>{resume.personal.phone}</span>
                  <span>•</span>
                  <span>{resume.personal.location}</span>
                  <span>•</span>
                  <span className="font-mono text-[#C4B5FD] print:text-black">{resume.personal.github}</span>
                </div>
              </div>

              {/* Summary */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#C4B5FD] border-b border-[#232334] pb-1 mb-1.5 print:text-black print:border-gray-300">
                  Summary
                </h2>
                <p className="text-[11px] text-[#D1D5DB] leading-relaxed text-justify print:text-gray-800">
                  {resume.personal.summary}
                </p>
              </div>

              {/* Education */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#C4B5FD] border-b border-[#232334] pb-1 mb-2 print:text-black print:border-gray-300">
                  Education
                </h2>
                <div className="space-y-2">
                  {resume.education.map((edu) => (
                    <div key={edu.id} className="text-[11px]">
                      <div className="flex justify-between font-bold text-white print:text-black">
                        <span>{edu.institution}</span>
                        <span className="text-[#9CA3AF] print:text-gray-600">{edu.startYear} - {edu.endYear}</span>
                      </div>
                      <div className="flex justify-between text-[#9CA3AF] print:text-gray-600">
                        <span>{edu.degree} in {edu.field}</span>
                        <span className="font-semibold text-[#A78BFA] print:text-black">CGPA: {edu.cgpa}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#C4B5FD] border-b border-[#232334] pb-1 mb-2 print:text-black print:border-gray-300">
                  Technical Skills
                </h2>
                <div className="space-y-1 text-[11px]">
                  {resume.skills.map((sk, i) => (
                    <div key={i} className="flex">
                      <span className="font-bold text-[#A78BFA] w-44 shrink-0 print:text-black">{sk.category}:</span>
                      <span className="text-[#D1D5DB] print:text-gray-800">{sk.items.join(', ')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#C4B5FD] border-b border-[#232334] pb-1 mb-2 print:text-black print:border-gray-300">
                  Work Experience
                </h2>
                <div className="space-y-2">
                  {resume.experience.map((exp) => (
                    <div key={exp.id} className="text-[11px]">
                      <div className="flex justify-between font-bold text-white print:text-black">
                        <span>{exp.role} — <span className="text-[#A78BFA] print:text-black">{exp.company}</span></span>
                        <span className="font-normal text-[#9CA3AF] print:text-gray-500">{exp.period}</span>
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-[#D1D5DB] mt-1 print:text-gray-800">
                        {exp.points.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#C4B5FD] border-b border-[#232334] pb-1 mb-2 print:text-black print:border-gray-300">
                  Key Projects
                </h2>
                <div className="space-y-2">
                  {resume.projects.map((proj) => (
                    <div key={proj.id} className="text-[11px]">
                      <div className="flex justify-between font-bold text-white print:text-black">
                        <span>{proj.name}</span>
                        <span className="font-mono text-[10px] text-[#A78BFA] print:text-gray-600">{proj.techStack}</span>
                      </div>
                      <p className="text-[#D1D5DB] mt-0.5 leading-relaxed text-justify print:text-gray-800">
                        {proj.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications & Achievements */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#C4B5FD] border-b border-[#232334] pb-1 mb-1.5 print:text-black print:border-gray-300">
                  Certifications & Honors
                </h2>
                <ul className="list-disc list-inside text-[11px] text-[#D1D5DB] space-y-0.5 print:text-gray-800">
                  {resume.certifications.slice(0, 2).map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                  {resume.achievements.slice(0, 2).map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
