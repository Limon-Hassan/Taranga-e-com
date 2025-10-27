import { Nunito, Noto_Sans_Bengali } from 'next/font/google';
import './globals.css';
import Navber from '../Componets/Navber';
import Navber_1 from '../Componets/Navber_1';
import Navber_2 from '../Componets/Navber_2';
import Footer from '../Componets/Footer';
import ClientProvider from './ClientProvider';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-nunito',
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-bengali',
});

export const metadata = {
  title: 'Deluxe X Deal BD',
  description:
    'Your one-stop hardware shop for premium quality drill machines, power tools, and industrial equipment — built to last, trusted by professionals',
  icons: {
    icon: '/favicon.ico',
  },
  alternates: {
    canonical: 'https://deluxexdeal.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${notoBengali.variable}`}>
        <Navber />
        <Navber_1 />
        <Navber_2 />
        <ClientProvider>{children}</ClientProvider>
        <Footer />
      </body>
    </html>
  );
}
