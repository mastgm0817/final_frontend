import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Provider from './Provider'
import React, {ReactNode} from "react";
import PrimarySearchAppBar from '../pages/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '러부스트❤️‍🔥',
  description: '커플/부부를 위한 데이트 코스 추천 웹',
}

interface IProps {
  children: ReactNode;
}

export default function RootLayout({ children } : IProps) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Provider>
          <PrimarySearchAppBar/>
          {children}
        </Provider>
      </body>
    </html>
  )
}
