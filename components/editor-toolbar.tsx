"use client";

import { BoldIcon, ChevronUp, Code, ItalicIcon, LinkIcon, List, ListOrdered } from 'lucide-react'

import { Toolbar, ToolbarGroup, ToolbarSeparator } from '@/components/tiptap-ui-primitive/toolbar'
import { Button } from './ui/button'
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";

import { useParams } from 'next/navigation';

import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

import { useEditorContext } from '@/app/contexts/editor-contexts';

import { toast } from 'sonner';
import { useState } from 'react';
import { motion } from 'motion/react';


export default function EditorToolbar() {
  const { editor, hidden, toggleToolbar } = useEditorContext();

  const params = useParams();
  const update = useMutation(api.documents.update);

  if (!editor) return null;


  const handleSave = async () => {
    const content = editor.getHTML();
    const loadingToast = toast.loading('Saving...');

    try {
      await update({
        id: params.documentId as Id<"documents">,
        content: content,
      });

      toast.success('Document saved!', {
        id: loadingToast,
      });
    } catch (error) {
      toast.error('Failed to save document', {
        id: loadingToast,
      });
      console.error('Save error:', error);
    }
  }

  return (
    <div className='w-full flex items-center justify-center'>
      <div className='mt-5 flex items-center justify-between px-5 w-[55rem]'>
        {/* left */}
        <div className='flex justify-center'>
          {!hidden && (
            <Toolbar 
              variant="floating"
            >
              <>
                <ToolbarGroup>
                  <Button data-style="ghost">
                    <BoldIcon className="tiptap-button-icon" />
                    Bold
                  </Button>
                  <Button data-style="ghost">
                    <ItalicIcon className="tiptap-button-icon" />
                    Italic
                  </Button>
                </ToolbarGroup>

                <ToolbarSeparator />

                <ToolbarGroup>
                  <Button data-style="ghost">
                    <LinkIcon className="tiptap-button-icon" />
                    Link
                  </Button>
                  <Button data-style="ghost">
                    <Code className="tiptap-button-icon" />
                    Code
                  </Button>
                </ToolbarGroup>

                <ToolbarSeparator />

                <ToolbarGroup>
                  <Button data-style="ghost">
                    <List className="tiptap-button-icon" />
                    Bulleted List
                  </Button>
                  <Button data-style="ghost">
                    <ListOrdered className="tiptap-button-icon" />
                    Ordered List
                  </Button>
                </ToolbarGroup>

                <ToolbarSeparator />

                <ToolbarGroup>
                  <Button
                  data-style="primary"
                  onClick={handleSave}>
                    Save
                  </Button>
                </ToolbarGroup>

                <ToolbarSeparator />
              </>
            </Toolbar>
            )}
        </div>
        {/* right */}
        <div>
          <Toolbar variant="floating">
            <ToolbarGroup>
              <Button
              onClick={toggleToolbar}
              role="button"
              data-style="primary"
              >
                <ChevronUp className="tiptap-button-icon" />
              </Button>
            </ToolbarGroup>
          </Toolbar>
        </div>
      </div>
    </div>
  )
}