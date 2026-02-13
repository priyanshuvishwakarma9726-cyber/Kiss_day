import type { Metadata } from 'next';
import { Inter, Dancing_Script } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const dancingScript = Dancing_Script({ subsets: ['latin'], variable: '--font-dancing-script' });

export const metadata: Metadata = {
  title: 'Happy Kiss Day Meri Jaan 💋',
  description: 'A special surprise for the love of my life.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dancingScript.variable}`}>
      <body className={`${inter.className} bg-pink-50 text-gray-900 text-xl md:text-2xl font-medium antialiased leading-relaxed select-none`}>{children}</body>
    </html>
  );
}
