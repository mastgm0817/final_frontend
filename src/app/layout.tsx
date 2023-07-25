import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ResponsiveAppBar from './nav_bar/nav.client'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '러부스트❤️‍🔥',
  description: '커플/부부를 위한 데이트 코스 추천 웹',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ResponsiveAppBar />
        {children}
      </body>
    </html>
  )
}
