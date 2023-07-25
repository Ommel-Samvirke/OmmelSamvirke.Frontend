import './globals.scss'
import type { Metadata } from 'next'
import React from 'react';

import { inter } from './fonts'

export const metadata: Metadata = {
  title: 'Ommel Samvirke',
  description: 'Samarbejde mellem foreningerne i Ommel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
