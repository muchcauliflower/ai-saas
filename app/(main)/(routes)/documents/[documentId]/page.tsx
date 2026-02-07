"use client";

import Editor from "@/app/_components/editor";
import { Cover } from "@/components/cover";
import { Toolbar } from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";
import { useEditorContext } from "@/app/contexts/editor-contexts";

interface DocumentIdPageProps {
  params: Promise<{
    documentId: Id<"documents">;
  }>;
}

const DocumentIdPage = ({
  params
}: DocumentIdPageProps) => {
  const { documentId } = React.use(params);
  const { editor } = useEditorContext();

  const document = useQuery(api.documents.getById, {
    documentId
  });

  // Sync document content to editor when it loads or changes
  React.useEffect(() => {
    if (!editor || editor.isDestroyed) return;

    if (!document?.content) {
      editor.commands.setContent("<p>Start Typing...</p>");
      return;
    }

    const currentContent = editor.getHTML();
    
    if (document?.content && editor && !editor.isDestroyed) {
      const currentContent = editor.getHTML();
      // Only update if content is different to avoid cursor jumping
      if (currentContent !== document.content) {
        editor.commands.setContent(document.content);
      }
    }
  }, [document?.content, editor]);
  
  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  };

  if (document === null) {
    return <div>Not found</div>
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage}/>
      <div className="md:max-w-3xl lg:max-w-4xl mx-4.5">
        <Toolbar initialData={document} />
      </div>
      <div className="p-3">
        <div className="pb-40">
          <Editor documentId={documentId} />
        </div>
      </div>
    </div>
  );
};

export default DocumentIdPage;