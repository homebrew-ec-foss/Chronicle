/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import { InputRule } from '@tiptap/core';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Mention from '@tiptap/extension-mention';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { WebrtcProvider } from 'y-webrtc';
import * as Y from 'yjs';

const ydoc = new Y.Doc();
const provider = new WebrtcProvider('Chronicle R-1', ydoc, {
  signaling: ['https://x40xwmfn-4444.inc1.devtunnels.ms/'],
});

const TiptapExtensions = [
  Document,
  Paragraph,
  Text,
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
    history: false,
  }),
  HorizontalRule.extend({
    addInputRules() {
      return [
        new InputRule({
          find: /^(?:---|—-|_\s|\\\*\s)$/,
          handler: ({ state, range }) => {
            const attributes = {};
            const { tr } = state;
            const start = range.from;
            const end = range.to;
            tr.insert(start - 1, this.type.create(attributes)).delete(
              tr.mapping.map(start),
              tr.mapping.map(end),
            );
          },
        }),
      ];
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
];

const Editor = ({ fileContent }) => {
  const [markdownContent, setMarkdownContent] = useState('');

  const editor = useEditor({
    extensions: [
      ...TiptapExtensions,
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider: provider,
        user: {
          name: 'Anonymous',
          color: '#0F0F',
        },
      }),
    ],
    content: '<h1>Hello Chronicle!</h1><h2>A real-time markdown editor</h2>',
    onUpdate: ({ editor }) => {
      setMarkdownContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && fileContent) {
      editor.commands.setContent(fileContent);
    }
  }, [fileContent, editor]);

  return (
    <div className="markdown-editor tiptap">
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;