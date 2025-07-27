'use client'

//  Plain Alphabet 'X' didn't look good soooooo hehe
import { X } from 'lucide-react'

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  //this is mostly just random tweaking and yoinking code from random websites sorry lol
  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#1e1e2e] border-r border-[#313244] shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex justify-between items-center p-4 text-white text-xl font-semibold border-b border-[#45475a]">
          Workspaces
          <button onClick={onClose} className="text-white p-1 rounded hover:bg-[#45475a]">
            <X size={20} />
          </button>
        </div>

        <ul className="p-4 space-y-2 text-white">
          <li className="cursor-pointer p-2 rounded hover:bg-[#313244]">
            Untitled 1
          </li>
          <li className="cursor-pointer p-2 rounded hover:bg-[#313244]">
            Untitled 2
          </li>
        </ul>
      </aside>
    </>
  )
}
