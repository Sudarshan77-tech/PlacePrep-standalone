import type { Metadata, Viewport } from 'next';
import './globals.css';
import { PlacePrepProvider } from '@/context/PlacePrepContext';

export const metadata: Metadata = {
  title: 'PlacePrep - Prepare Smarter. Get Placed.',
  description: 'The all-in-one placement preparation platform for aptitude, coding challenges, technical MCQs, mock interviews, and placement-readiness analytics.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
        <PlacePrepProvider>
          {children}
        </PlacePrepProvider>
      </body>
    </html>
  );
}
