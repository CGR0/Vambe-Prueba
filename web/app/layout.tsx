import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Footer from '../components/layout/footer';
import Header from '../components/layout/header';
import { DataProvider } from '@/hooks/dataContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Vambe - Clients metrics',
  description:
    'Métricas relevantes acerca del análisis de transcripciones de reuniones con potenciales clientes.',
  icons: {
    icon: 'https://framerusercontent.com/images/RYXavxrUUIEFBDZ5KSNqEmJQuo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="flex flex-col w-full h-full min-h-screen overflow-y-auto">
          <DataProvider>
            <Header />
            {children}
          </DataProvider>
          <Footer />
        </main>
      </body>
    </html>
  );
}
