import '../globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Navigation from './components/navigation'

const mainFont = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'reFilc',
    description: 'reFilc web application',
}

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={mainFont.className}>
                <Navigation />
                {children}
            </body>
        </html>
    )
}
