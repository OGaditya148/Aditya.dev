// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aditya Agarwal — Full-Stack Engineer & Builder',
  description:
    'Portfolio of Aditya Agarwal — Full-Stack Engineer from Agra, India. Specialising in React, Next.js, Node.js, AI integrations, and cloud infrastructure.',
  keywords: [
    'Aditya Agarwal',
    'Full-Stack Engineer',
    'React Developer',
    'Next.js',
    'Portfolio',
    'Agra India',
  ],
  authors: [{ name: 'Aditya Agarwal' }],
  openGraph: {
    title: 'Aditya Agarwal — Full-Stack Engineer',
    description: 'Building at the intersection of systems, AI & the web.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Agarwal — Full-Stack Engineer',
    description: 'Building at the intersection of systems, AI & the web.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#050508] text-slate-200 antialiased overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
