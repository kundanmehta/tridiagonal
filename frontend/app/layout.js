import { Sora, Manrope } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['300', '400', '600', '700', '800'],
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata = {
  title: 'Process Consulting and Technology Solutions | Tridiagonal',
  description:
    'Tridiagonal Solutions is a leading CFD, FEA, and DEM consulting company offering advanced modeling, simulation, and one of the largest technology validation & scale-up testing facilities.',
  keywords:
    'CFD, FEA, DEM, computational fluid dynamics, finite element analysis, process consulting, technology validation, scale-up centre',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable}`}>
      <body suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
