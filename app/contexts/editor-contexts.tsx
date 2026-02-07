"use client"

import { createContext,  useContext, ReactNode } from "react";
import { Editor } from "@tiptap/react"

interface EditorContextType {
    editor: Editor | null;
}

const EditorContext = createContext<EditorContextType>({editor: null})

export const useEditorContext = () => {
    const context = useContext(EditorContext)
    if (!context) {
        throw new Error ('useEditorContext must be usd within EditorProvider')
    }
    return context
}

interface EditorProviderProps {
    children: ReactNode;
    editor: Editor | null;
}

export const EditorProvider = ({ children, editor }: EditorProviderProps) => {
    return (
        <EditorContext.Provider value={{ editor }}>
            {children}
        </EditorContext.Provider>
    )
}