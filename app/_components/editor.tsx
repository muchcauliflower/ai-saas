"use client"

import { useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';

export default function Editor() {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: '<p>Hello world </p>',
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base lg:prose-lg max-w-none focus:outline-none min-h-[200px] p-4',
                spellcheck: 'false',
            }
        }
    })

    if (!editor) return null
    return (
        <div className="rounded-md pl-13.5">
            <EditorContent editor={editor} />
        </div>
    )
}