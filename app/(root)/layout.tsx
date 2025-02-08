import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/shared/theme-provider';
import Header from '@/components/shared/header/Header';
import { ClerkProvider } from '@clerk/nextjs';

const jost = Jost({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-jost',
});

export const metadata: Metadata = {
  title: 'Sunset Paris',
  description: 'Sunset Paris Agency Official Website',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
    other: [
      {
        rel: 'icon',
        url: '/favicon.ico',
        sizes: '32x32',
      },
      {
        rel: 'icon',
        url: '/favicon.ico',
        sizes: '16x16',
      },
    ],
  },
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
          className={`${jost.variable} antialiased bg-background dark:bg-black flex flex-col min-h-screen`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="flex-grow flex flex-col justify-center items-center mt-16 sm:mt-24">
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
