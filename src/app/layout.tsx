import Providers from "./providers"
import { ReactNode } from "react"
import "./globals.css";
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={`${playfair.variable} ${inter.variable}`}>
      <body >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}