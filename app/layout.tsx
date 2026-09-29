import type { Metadata } from 'next'
import localFont from 'next/font/local'
import favicon from '../fav.png'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const coconat = localFont({
  src: '../Coconat-Demi.otf',
  variable: '--font-display',
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'),
  title: { default: 'Sudip Acharya | Blogs', template: '%s | Sudip Acharya Blogs' },
  description: 'Stories, ideas, and considered observations.',
  icons: {
    icon: [{url: favicon.src, type: 'image/png'}],
    shortcut: [{url: favicon.src, type: 'image/png'}],
    apple: [{url: favicon.src, type: 'image/png'}],
  },
  openGraph: { type: 'website', siteName: 'Sudip Acharya | Blogs' },
  robots: { index: true, follow: true }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={coconat.variable}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
