import type { Metadata } from 'next'
import { cn } from '@/lib/utils'

import OnchainProvider from '@/providers/onchainProvider'
import { Toaster } from '@/components/ui/sonner'

import { Inter } from 'next/font/google'
// import localFont from 'next/font/local'

import '@/styles/globals.css'

// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// })
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// })

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'cuenta sustantiva',
  description: 'abre tu cuenta y recibe pagos internacionales en 2 minutos',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <OnchainProvider>
          {children}
          <Toaster richColors />
        </OnchainProvider>
      </body>
    </html>
  )
}