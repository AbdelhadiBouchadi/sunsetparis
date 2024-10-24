import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import AdminHeader from '@/components/shared/AdminHeader';
import { Toaster } from '@/components/ui/toaster';

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
            'min-h-screen  font-sans antialiased text-dark-700 bg-dark-300',
            ubuntu.className
          )}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
