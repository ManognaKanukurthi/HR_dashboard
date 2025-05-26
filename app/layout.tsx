import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { BookmarkProvider } from '@/contexts/BookmarkContext';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HR Performance Dashboard',
  description: 'Track employee performance, manage bookmarks, and view insights',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <BookmarkProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1 container mx-auto px-4 py-6">
                {children}
              </main>
              <Toaster />
            </div>
          </BookmarkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}