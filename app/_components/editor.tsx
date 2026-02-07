"use client"

import { useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';

export default function Editor() {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: '<h1>Prose is what gives the Markdown features in the content</h1><p>This is a paragraph with some text.</p><ul><li>Item 1</li><li>Item 2</li></ul>',
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none focus:outline-none min-h-auto p-4',
                spellcheck: 'false',
            }
        }
    })

    if (!editor) return null
    
    return (
        <div className=" border rounded-md pl-13.5">
            <EditorContent editor={editor} />
        </div>
    )
}