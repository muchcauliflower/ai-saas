"use client";

import { Navigation } from "@/app/_components/navigation";
import { Spinner } from "@/components/spinner";
import { SearchCommand } from "@/components/ui/search-command";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { EditorProvider } from "@/app/contexts/editor-contexts";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from '@tiptap/extension-link';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline',
        },
      }),
    ],
    content: '<p>Start typing...</p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none focus:outline-none min-h-auto p-4',
        spellcheck: 'false',
      }
    }
  });

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <EditorProvider editor={editor}>
      <div className="h-full dark:bg-[#1F1F1F] flex">
        <SearchCommand />
        <Navigation />
        <main className="flex-1 h-full overflow-y-auto">{children}</main>
      </div>
    </EditorProvider>
  );
};

export default MainLayout;