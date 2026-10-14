'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { PlacePrepAIAssistant } from '@/components/ai/PlacePrepAIAssistant';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#08080C] text-zinc-200 flex relative selection:bg-purple-600 selection:text-white">
      {/* Subtle Purple Ambient Glow */}
      <div
        className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(124,58,237,0.14),transparent_70%)]"
        aria-hidden="true"
      />

      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 relative z-10">
        <Navbar onToggleSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        <footer className="border-t border-[#1F1F2E] bg-[#0D0D14]/80 backdrop-blur-sm py-4 px-6 text-center text-xs text-zinc-500">
          <p>© 2026 PlacePrep — College-Aware Placement Intelligence Platform. Offline-capable PWA.</p>
        </footer>
      </div>

      {/* Global AI Placement Assistant */}
      <PlacePrepAIAssistant />
    </div>
  );
}
