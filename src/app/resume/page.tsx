'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { usePlacePrep } from '@/context/PlacePrepContext';
import { ResumeData } from '@/types';
import {
  FileText,
  Download,
  Save,
  Plus,
  Trash2,
  Sparkles,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code,
  Award,
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
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#EBF0FF] text-[#315BFA] border border-[#D4E0FC]">
                ATS-Optimized Builder
              </span>
              <span className="text-xs text-[#52627A]">Campus Standard</span>
            </div>
            <h1 className="text-2xl font-bold text-[#142748] mt-1.5">
              Resume Builder & Live Preview
            </h1>
            <p className="text-sm text-[#52627A] mt-1">
              Format your engineering projects, coursework, metrics, and achievements into recruiter-approved templates.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-white hover:bg-[#F7F9FC] border border-[#E3EAF5] text-[#142748] text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors shadow-[0_1px_3px_rgba(20,39,72,0.03)]"
            >
              {savedSuccess ? <Check className="w-4 h-4 text-emerald-600" /> : <Save className="w-4 h-4 text-[#52627A]" />}
              <span>{savedSuccess ? 'Saved!' : 'Save Draft'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-[#315BFA] hover:bg-[#2548DE] text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Tab Toggle for Mobile/Small Screens */}
        <div className="flex lg:hidden bg-[#F7F9FC] border border-[#E3EAF5] p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'edit' ? 'bg-white text-[#142748] shadow-xs' : 'text-[#52627A]'
            }`}
          >
            Edit Resume
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'preview' ? 'bg-white text-[#142748] shadow-xs' : 'text-[#52627A]'
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
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)] space-y-4">
              <h3 className="text-sm font-bold text-[#142748]">1. Personal Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[#142748] font-semibold mb-1 block">Full Name</label>
                  <input
                    type="text"
                    value={resume.personal.fullName}
                    onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                    className="w-full p-2.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded-lg text-[#142748] focus:outline-none focus:border-[#315BFA]"
                  />
                </div>
                <div>
                  <label className="text-[#142748] font-semibold mb-1 block">Target Title</label>
                  <input
                    type="text"
                    value={resume.personal.title}
                    onChange={(e) => handlePersonalChange('title', e.target.value)}
                    className="w-full p-2.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded-lg text-[#142748] focus:outline-none focus:border-[#315BFA]"
                  />
                </div>
                <div>
                  <label className="text-[#142748] font-semibold mb-1 block">Email</label>
                  <input
                    type="email"
                    value={resume.personal.email}
                    onChange={(e) => handlePersonalChange('email', e.target.value)}
                    className="w-full p-2.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded-lg text-[#142748] focus:outline-none focus:border-[#315BFA]"
                  />
                </div>
                <div>
                  <label className="text-[#142748] font-semibold mb-1 block">Phone</label>
                  <input
                    type="text"
                    value={resume.personal.phone}
                    onChange={(e) => handlePersonalChange('phone', e.target.value)}
                    className="w-full p-2.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded-lg text-[#142748] focus:outline-none focus:border-[#315BFA]"
                  />
                </div>
                <div>
                  <label className="text-[#142748] font-semibold mb-1 block">LinkedIn Profile</label>
                  <input
                    type="text"
                    value={resume.personal.linkedin}
                    onChange={(e) => handlePersonalChange('linkedin', e.target.value)}
                    className="w-full p-2.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded-lg text-[#142748] focus:outline-none focus:border-[#315BFA]"
                  />
                </div>
                <div>
                  <label className="text-[#142748] font-semibold mb-1 block">GitHub Profile</label>
                  <input
                    type="text"
                    value={resume.personal.github}
                    onChange={(e) => handlePersonalChange('github', e.target.value)}
                    className="w-full p-2.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded-lg text-[#142748] focus:outline-none focus:border-[#315BFA]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#142748] font-semibold text-xs mb-1 block">Professional Summary</label>
                <textarea
                  rows={3}
                  value={resume.personal.summary}
                  onChange={(e) => handlePersonalChange('summary', e.target.value)}
                  className="w-full p-2.5 bg-[#F7F9FC] border border-[#E3EAF5] rounded-lg text-xs text-[#142748] resize-none focus:outline-none focus:border-[#315BFA]"
                />
              </div>
            </div>

            {/* Projects Editor */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#142748]">2. Key Projects</h3>
                <span className="text-xs text-[#52627A]">High recruiter impact</span>
              </div>

              {resume.projects.map((proj, idx) => (
                <div key={proj.id} className="p-3.5 bg-[#F7F9FC] rounded-xl border border-[#E3EAF5] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#142748]">Project #{idx + 1}</span>
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
                    className="w-full p-2 bg-white border border-[#E3EAF5] rounded-lg font-semibold text-[#142748] focus:outline-none focus:border-[#315BFA]"
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
                    className="w-full p-2 bg-white border border-[#E3EAF5] rounded-lg text-[11px] text-[#52627A] focus:outline-none focus:border-[#315BFA]"
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
                    className="w-full p-2 bg-white border border-[#E3EAF5] rounded-lg text-xs text-[#142748] resize-none focus:outline-none focus:border-[#315BFA]"
                  />
                </div>
              ))}
            </div>

            {/* Experience / Internship */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)] space-y-4">
              <h3 className="text-sm font-bold text-[#142748]">3. Internship & Work Experience</h3>
              {resume.experience.map((exp, idx) => (
                <div key={exp.id} className="p-3.5 bg-[#F7F9FC] rounded-xl border border-[#E3EAF5] space-y-2 text-xs">
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
                      className="w-full p-2 bg-white border border-[#E3EAF5] rounded-lg font-semibold text-[#142748] focus:outline-none focus:border-[#315BFA]"
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
                      className="w-full p-2 bg-white border border-[#E3EAF5] rounded-lg text-[#142748] focus:outline-none focus:border-[#315BFA]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: LIVE RESUME PREVIEW (6 Cols) */}
          <div className={`lg:col-span-6 ${activeTab === 'edit' ? 'hidden lg:block' : ''}`}>
            <div className="sticky top-24 bg-white rounded-2xl p-8 border border-[#E3EAF5] shadow-[0_1px_3px_rgba(20,39,72,0.03)] font-sans text-[#142748] min-h-[750px]">
              {/* ATS Header */}
              <div className="text-center pb-4 border-b-2 border-[#142748]">
                <h1 className="text-xl font-bold tracking-tight uppercase text-[#142748]">
                  {resume.personal.fullName}
                </h1>
                <p className="text-xs font-semibold text-[#52627A] mt-0.5">{resume.personal.title}</p>
                <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-[#52627A] mt-2">
                  <span>{resume.personal.email}</span>
                  <span>•</span>
                  <span>{resume.personal.phone}</span>
                  <span>•</span>
                  <span>{resume.personal.location}</span>
                  <span>•</span>
                  <span className="font-mono">{resume.personal.github}</span>
                </div>
              </div>

              {/* Summary */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                  Summary
                </h2>
                <p className="text-[11px] text-slate-700 leading-relaxed text-justify">
                  {resume.personal.summary}
                </p>
              </div>

              {/* Education */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  Education
                </h2>
                <div className="space-y-2">
                  {resume.education.map((edu) => (
                    <div key={edu.id} className="text-[11px]">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{edu.institution}</span>
                        <span>{edu.startYear} - {edu.endYear}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>{edu.degree} in {edu.field}</span>
                        <span className="font-semibold text-slate-800">CGPA: {edu.cgpa}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  Technical Skills
                </h2>
                <div className="space-y-1 text-[11px]">
                  {resume.skills.map((sk, i) => (
                    <div key={i} className="flex">
                      <span className="font-bold text-slate-800 w-44 shrink-0">{sk.category}:</span>
                      <span className="text-slate-700">{sk.items.join(', ')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  Work Experience
                </h2>
                <div className="space-y-2">
                  {resume.experience.map((exp) => (
                    <div key={exp.id} className="text-[11px]">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{exp.role} — {exp.company}</span>
                        <span className="font-normal text-slate-500">{exp.period}</span>
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-700 mt-1">
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
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  Key Projects
                </h2>
                <div className="space-y-2">
                  {resume.projects.map((proj) => (
                    <div key={proj.id} className="text-[11px]">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{proj.name}</span>
                        <span className="font-normal text-slate-500">{proj.techStack}</span>
                      </div>
                      <p className="text-slate-700 mt-0.5 leading-relaxed text-justify">
                        {proj.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications & Achievements */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                  Certifications & Honors
                </h2>
                <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-0.5">
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
