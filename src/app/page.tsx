'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false })

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1e1e2e] text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-[#313244] shadow rounded-lg mt-6 p-6 min-h-[80vh]">
        <Editor />
      </div>
    </main>
  )
}
