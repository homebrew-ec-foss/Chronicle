'use client'

import { Settings } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-[#313244] bg-[#1e1e2e]">
      <h1 className="text-lg font-semibold text-[#cba6f7]">Chronicle</h1>
      <button className="flex items-center gap-2 text-sm hover:text-[#89b4fa] transition">
        <Settings className="w-5 h-5" />
        Username
      </button>
    </header>
  )
}
