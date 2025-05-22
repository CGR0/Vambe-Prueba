import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Footer from '../components/layout/footer';
import Header from '../components/layout/header';
import { DataProvider } from '../hooks/dataContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Análisis de reuniones',
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
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="flex flex-col w-full h-full min-h-screen overflow-y-auto min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100">
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
