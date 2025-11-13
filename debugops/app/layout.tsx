import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DebugOps.dev - DevOps, Programming & Security Error Solutions',
  description: 'Comprehensive database of real-world DevOps, programming, and cybersecurity errors with practical solutions',
  keywords: ['DevOps', 'Docker', 'Kubernetes', 'Python', 'C++', 'Cybersecurity', 'Error Solutions'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
      
        
        {children}
      
    
  )
}