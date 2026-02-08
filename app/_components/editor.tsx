"use client"

import { EditorContent } from '@tiptap/react'
import { Id } from '@/convex/_generated/dataModel';
import { useEditorContext } from '@/app/contexts/editor-contexts';
import { Button } from '@/components/ui/button';

interface EditorProps {
    documentId: Id<"documents">;
}

export default function Editor({
    documentId,
}: EditorProps) {
    const { editor, toggleToolbar } = useEditorContext(); // Use editor from context
    
    if (!editor) return null
    
    return (
        <div className="rounded-md pl-13.5">
            <EditorContent editor={editor} />
        </div>
    )
}