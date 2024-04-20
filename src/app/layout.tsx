import type { Metadata } from 'next';

import { Providers } from '@/components';

import { inter } from '@/config/fonts';

import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s - Markish | Shop',
    default: 'Home - Markish | Shop',
  },
  description: 'Una tienda virtual de productos.',
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang='es'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
