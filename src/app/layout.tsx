import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

const mainFont = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'reFilc',
  description: 'reFilc website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={mainFont.className}>{children}</body>
    </html>
  )
}
