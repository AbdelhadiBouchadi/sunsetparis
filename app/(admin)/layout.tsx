import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import AdminHeader from '@/components/shared/AdminHeader';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Sunset Paris Admin',
  description: 'Sunset paris admin panel',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            'min-h-screen  font-sans antialiased text-dark-700',
            ubuntu.className
          )}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
