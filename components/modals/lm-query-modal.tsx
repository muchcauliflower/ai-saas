"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, Loader2 } from "lucide-react";

import { uselmQuery } from "@/hooks/use-lm-query";
import { useEditorContext } from "@/app/contexts/editor-contexts";
import { toast } from "sonner";
import Editor from "@/app/_components/editor";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import { StaggerExtension } from "../extensions/stagger-animations";

// for AI's response
const AnswerView = ({ answer }: {answer: string}) => {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [StarterKit, Markdown, StaggerExtension],
        content: answer || "",
        editable: false,
        editorProps: {
            attributes: {
                class: "prose prose-invert max-w-none text-sm focus:outline-none",
            },
        },
    });

    useEffect(() => {
        if (editor && answer) {
        editor.commands.setContent(answer);
        }
    }, [answer, editor]);

    if (!editor) return null;
    
    return <EditorContent editor={editor} />
}

export const LmModal = () => {
    const [seconds, setSeconds] = useState<number>(0);
    const [responseTime, setResponseTime] = useState<number | null>(null);

    const { editor } = useEditorContext();
    const lmQuery = uselmQuery();

    const [answer, setAnswer] = useState<string>("");
    const [query, setQuery] = useState<string>("");
    const [loading, setLoading] = useState(false);

    // Debug logging
    useEffect(() => {
        console.log("=== MODAL: isOpen ===", lmQuery.isOpen);
        console.log("=== MODAL: editor ===", !!editor);
    }, [lmQuery.isOpen, editor]);

    // Clear answer when modal opens
    useEffect(() => {
        if (lmQuery.isOpen) {
            setAnswer("");
            setQuery("");
        }
    }, [lmQuery.isOpen]);


    // Timer
    useEffect(() => {
        let timer: number; // <- browser interval ID is a number

        if (loading) {
            setSeconds(0); // reset
            timer = window.setInterval(() => setSeconds(prev => prev + 1), 1000);
        }

        return () => clearInterval(timer); // works, timer is a number
        }, [loading]);


    const handleQuery = async (event: React.FormEvent) => {
        event.preventDefault();
        
        // console.log("=== SUBMIT CLICKED ===");
        // console.log("Query:", query);
        // console.log("Editor available:", !!editor);
        
        if (!query.trim() || loading) return;

        setLoading(true);
        setAnswer("");
        setResponseTime(null);

        const startTime = performance.now();

        try {
            // Get current editor content (allow empty if no editor)
            const editorText = editor?.getText()?.trim() || "";
            
            // console.log("Sending query with context length:", editorText.length);
            
            // Send query WITH context in one request
            const queryPayload = { 
                question: query,
                context: editorText
            };

            const queryRes = await fetch("http://localhost:8000/api/query-input/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(queryPayload),
            });

            if (!queryRes.ok) throw new Error("Failed to query");

            const queryData = await queryRes.json();
            console.log("Answer received:", queryData.answer);
            setAnswer(queryData.answer);
            setResponseTime(parseFloat(((performance.now() - startTime) / 1000).toFixed(1)));
            
            setQuery("");
        } catch (err) {
            console.error("Query error:", err);
            toast.error("Something went wrong. Please try again");
        } finally {
            setLoading(false);
        }
    };

    // Debug: Log when this component renders
    console.log("LmModal rendering, isOpen:", lmQuery.isOpen);

    if (!lmQuery.isOpen) return null;

    return (
        <div className="fixed top-20 right-6 z-50">
            <form onSubmit={handleQuery}>
                <div className="w-96 rounded-xl shadow-2xl bg-[#1f1f1f] border p-4">
                    <h2 className="font-semibold mb-2">Ask AI</h2>
                    <div className="flex w-full border justify-between rounded-md p-2">
                        <input
                            className="w-full bg-transparent outline-none"
                            placeholder="Ask a question..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            disabled={loading}
                            autoFocus
                        />
                        <button 
                            type="submit"
                            disabled={loading || !query.trim()}
                            className="disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <ChevronRight />
                            )}
                        </button>
                    </div>
                    {!editor && (
                        <p className="text-xs text-gray-400 mt-2">
                            💡 No editor context - asking without notebook content
                        </p>
                    )}
                    {loading && (
                        <p className="text-sm text-gray-400 mt-2">Processing your query... {seconds}s</p>
                    )}
                    {answer && !loading && (
                        <div className="mt-4 p-3 bg-[#2a2a2a] rounded-md max-h-96 overflow-y-auto">
                            <AnswerView answer={answer} />
                            <p className="text-xs text-gray-400 mt-2">Answer Generated in {responseTime} seconds.</p>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};