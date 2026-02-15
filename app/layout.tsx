import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import './globals.css'

const cairo = Cairo({ 
  subsets: ['arabic'],
  variable: '--font-cairo',
  weight: ['300', '400', '600', '700']
})

export const metadata: Metadata = {
  title: 'قيس GPT - مخصص لرهف',
  description: 'مساعد AI شخصي من قيس إلى رهف',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={cairo.variable}>{children}</body>
    </html>
  )
}
