'use client'

import { useState } from 'react'
import { Settings, Menu, X } from 'lucide-react'
import useUsername from '@/utils/SettingsButton'

// !Remainder don't add deprecated/useless imports :)
// Have i mentioned that i dont like JS/TS

export default function Navbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { username, updateUsername } = useUsername()
  const [isOpen, setIsOpen] = useState(false)
  const [tempName, setTempName] = useState(username)

  return (
    //  Yeah most of ts is copied right from other websites and a bit from GPT generation 
    // you know a bit of this a bit of that 
    <>
      <div className="sticky top-0 z-50 flex items-center justify-between p-4 border-b border-white/10 bg-[#0e0e1a]">
        <div className="flex items-center gap-4">
          <button onClick={onToggleSidebar} className="text-white hover:text-purple-300">
            <Menu size={20} />
          </button>
          <h1 className="text-lg font-semibold text-purple-300">Chronicle</h1>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-white/70 hover:text-white transition"
        >
          <Settings size={18} />
          <span>{username}</span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-[#1a1a2e] p-6 rounded-xl shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-medium text-white mb-4">Change Username</h2>
            <input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="w-full p-2 rounded bg-[#2a2a3d] text-white outline-none"
              placeholder="Enter new username"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateUsername(tempName.trim() || username)
                  setIsOpen(false)
                }}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
