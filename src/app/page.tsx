'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { initWorkspace } from '@/utils/DBWrapper'
import { v4 as uuidv4 } from 'uuid'

//  Just read the things they nicely name by yours truely 
//  - WIZ

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false })

export default function Home() {
  const [workspaceId, setWorkspaceId] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {

    //crypto didnt want to work so i replaced it for now,idk what to do man new to pure peer to peer
    //leave comments whereever changes are needed/expected

    const load = async () => {
      const id = uuidv4()
      const workspace = await initWorkspace(id)
      setWorkspaceId(workspace.id)
    }

    load()
  }, [])
  return (

    //i didint pull these colors out of thin air
    //they are from catpuccinn 

    <main className="flex min-h-screen bg-[#1e1e2e] text-white">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'
          }`}
      >
        <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        <div className="w-full max-w-5xl mx-auto bg-[#313244] shadow rounded-lg mt-6 p-6 min-h-[80vh]">
          {workspaceId && <Editor workspaceId={workspaceId} />}
        </div>

      </div>
    </main>
  )
}
