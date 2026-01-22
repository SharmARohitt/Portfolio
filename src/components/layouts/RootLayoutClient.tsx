'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';

export default function RootLayoutClient({
  children,
  geistSans,
  geistMono,
  playfair,
}: {
  children: React.ReactNode;
  geistSans: string;
  geistMono: string;
  playfair: string;
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body
        className={`${geistSans} ${geistMono} ${playfair} antialiased bg-gray-900`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
