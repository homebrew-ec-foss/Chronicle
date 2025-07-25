'use client'

import { useState } from 'react'
import { Settings } from 'lucide-react'
import useUsername from '@/components/SettingsButton'
import { Dialog } from '@headlessui/react'

export default function Navbar() {
  const { username, updateUsername } = useUsername()
  const [isOpen, setIsOpen] = useState(false)
  const [tempName, setTempName] = useState(username)
 
  return (
    <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0e0e1a]">
      <h1 className="text-lg font-semibold text-purple-300">Chronicle</h1>
      <button onClick={() => setIsOpen(true)} className="flex items-center gap-2 text-white/70 hover:text-white transition">
        <Settings size={18} />
        <span>{username}</span>
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-[#1a1a2e] p-6 rounded-xl shadow-xl w-full max-w-md">
            <Dialog.Title className="text-lg font-medium text-white">Change Username</Dialog.Title>
            <input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="w-full mt-4 p-2 rounded bg-[#2a2a3d] text-white outline-none"
              placeholder="Enter new username"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">Cancel</button>
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
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
