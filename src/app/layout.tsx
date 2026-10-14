import type { Metadata, Viewport } from 'next';
import './globals.css';
import { PlacePrepProvider } from '@/context/PlacePrepContext';

export const metadata: Metadata = {
  title: 'PlacePrep - Prepare Smarter. Get Placed.',
  description: 'The all-in-one placement preparation platform for aptitude, coding challenges, technical MCQs, mock interviews, and placement-readiness analytics.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#7C3AED',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#08080C] text-zinc-100 selection:bg-purple-600 selection:text-white">
        <PlacePrepProvider>
          {children}
        </PlacePrepProvider>
      </body>
    </html>
  );
}
