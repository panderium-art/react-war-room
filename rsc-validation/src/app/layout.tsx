import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'React Server Components - Deep Dive',
  description: 'Understanding RSC with examples, best practices, and common pitfalls',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

