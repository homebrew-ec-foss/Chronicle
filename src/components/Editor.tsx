'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'

export default function Editor() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    immediatelyRender:false,
    autofocus: true,
    editorProps: {
      attributes: {
        class:
          'prose prose-md max-w-none w-full h-full focus:outline-none text-gray-800',
      },
    },
  }, [isMounted])

  if (!editor) return null

  return (
    <div className="w-full h-full p-2 rounded focus:outline-none">
      <EditorContent editor={editor} />
    </div>
  )
}
