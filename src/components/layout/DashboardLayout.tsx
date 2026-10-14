'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { PlacePrepAIAssistant } from '@/components/ai/PlacePrepAIAssistant';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#52627A] flex selection:bg-[#315BFA]/10 selection:text-[#315BFA]">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Navbar onToggleSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        <footer className="border-t border-[#E3EAF5] bg-white py-4 px-6 text-center text-xs text-[#8896AB]">
          <p>© 2026 PlacePrep — College-Aware Placement Intelligence Platform. Offline-capable PWA.</p>
        </footer>
      </div>

      {/* Global AI Placement Assistant */}
      <PlacePrepAIAssistant />
    </div>
  );
}
