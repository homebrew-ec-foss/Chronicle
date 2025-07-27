'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Highlight from '@tiptap/extension-highlight'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Mention from '@tiptap/extension-mention'
import { useEffect, useRef, useState } from 'react'
import { InputRule } from '@tiptap/core'
import { save, load } from '@/utils/DBWrapper'

// !Remainder remove unnessasery imports if replaced
// Dont comment on my spelling i know they are wrong  

export default function Editor({ workspaceId }: { workspaceId: string }) {
  const [initialContent, setInitialContent] = useState<any>(null)
  const [isEmpty, setIsEmpty] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchContent = async () => {
      const content = await load(workspaceId)
      setInitialContent(content || '')
      setIsEmpty(!content || content?.content?.length === 0)
    }
    fetchContent()
  }, [workspaceId])

  // Yoinked this from old code Thank you very much 

  const editor = useEditor({
    extensions: [
      TaskList.configure({
        HTMLAttributes: {
          class: 'not-prose pl-2',
        },
      }),
      TaskItem.configure({
        HTMLAttributes: {
          class: 'flex items-start my-4',
        },
        nested: true,
      }),
      Mention.configure({
        HTMLAttributes: {
          class: 'mention text-blue-500',
        },
      }),
      StarterKit.configure({
        heading: false,
        horizontalRule: false,
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-4 border-white',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc list-outside leading-3 -mt-2',
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class: 'rounded-sm bg-stone-100 p-5 font-mono font-medium text-green-200',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'leading-normal -mb-2 text-blue-300',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal list-outside leading-3 -mt-2',
          },
        },
        strike: {
          HTMLAttributes: {
            class: 'text-gray-400',
          },
        },
        code: {
          HTMLAttributes: {
            class: 'rounded-md bg-stone-200 px-1.5 py-1 font-mono font-medium text-blue-200',
            spellcheck: 'false',
          },
        },
        dropcursor: {
          color: '#DBEAFE',
          width: 4,
        },
        gapcursor: false,
      }),
      HorizontalRule.extend({
        addInputRules() {
          return [
            new InputRule({
              find: /^(?:---|—-|___\s|\*\*\*\s)$/,
              handler: ({ state, range }) => {
                const { tr } = state
                const start = range.from
                const end = range.to
                tr.insert(start - 1, this.type.create()).delete(
                  tr.mapping.map(start),
                  tr.mapping.map(end),
                )
              },
            }),
          ]
        },
      }).configure({
        HTMLAttributes: {
          class: 'horizontal-rule-custom',
        },
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
    ],
    content: initialContent,
    immediatelyRender: false, //ssr bs
    autofocus: true,
    editorProps: {
      attributes: {
        class:
          'outline-none w-full min-h-[500px] text-[#cdd6f4] px-6 py-6 focus:ring-0 bg-transparent',
      },
    },
    onUpdate: ({ editor }) => {
      setIsEmpty(editor.isEmpty)
      save(workspaceId, editor.getJSON())
    },
  }, [initialContent, workspaceId])

  if (!editor) return null

  return (
    <div
      ref={containerRef}
      onClick={() => editor.commands.focus()}
      className="w-full max-w-4xl mx-auto rounded-2xl bg-[#313244] min-h-[500px] cursor-text relative"
    >
      {isEmpty && (
        <div className="absolute top-6 left-6 text-[#6c7086] pointer-events-none select-none">
          Start writing your collaboration i guess idk bro u do you...
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  )
}
