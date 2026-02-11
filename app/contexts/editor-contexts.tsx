"use client"

import { createContext,  useContext, ReactNode, useState } from "react";
import { Editor } from "@tiptap/react"


interface EditorContextType {
    editor: Editor | null;
    hidden: boolean;
    toggleToolbar: () => void
}

const EditorContext = createContext<EditorContextType>({editor: null, hidden: false, toggleToolbar() {}, })

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
    const [hidden, setHidden ] = useState(false);

    const toggleToolbar = () => {
        setHidden(prevHidden => !prevHidden)
    }
    
    return (
        <EditorContext.Provider value={{ editor, hidden, toggleToolbar }}>
            {children}
        </EditorContext.Provider>
    )
}