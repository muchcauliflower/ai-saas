"use client";

import { BoldIcon, ChevronUp, Code, ItalicIcon, LinkIcon, List, ListOrdered } from 'lucide-react'

import { Toolbar, ToolbarGroup, ToolbarSeparator } from '@/components/tiptap-ui-primitive/toolbar'
import { Button } from './ui/button'
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/tiptap-ui-primitive/dropdown-menu'

import { useParams } from 'next/navigation';

import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

import { useEditorContext } from '@/app/contexts/editor-contexts';

import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';


export default function FloatingToolBar() {
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
      <div className={`relative flex items-center justify-between w-full h-[6rem] rounded-xl`}>
        {/* left */}
        <div className='relative z-0'>
          <AnimatePresence>
            {!hidden && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <Toolbar 
                  variant="floating"
                >
                  <>
                    {/* Dropdown menu for header */}
                    <ToolbarGroup>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button data-style="ghost">Headings</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                        align="start"
                        className="w-[var(--radix-dropdown-menu-trigger-width)] p-0 pt-3"
                        >
                          <DropdownMenuGroup className='flex flex-col gap-y-3'>
                            <DropdownMenuItem asChild>
                              <Button data-style="ghost" onClick={() => console.log('Item 1')}>
                                Heading 1
                              </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Button data-style="ghost" onClick={() => console.log('Item 2')}>
                                Heading 2
                              </Button>
                            </DropdownMenuItem>
                                                      <DropdownMenuItem asChild>
                              <Button data-style="ghost" onClick={() => console.log('Item 3')}>
                                Heading 3
                              </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Button data-style="ghost" onClick={() => console.log('Item 4')}>
                                Heading 4
                              </Button>
                            </DropdownMenuItem>
                                                      <DropdownMenuItem asChild>
                              <Button data-style="ghost" onClick={() => console.log('Item 5')}>
                                Heading 5
                              </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Button data-style="ghost" onClick={() => console.log('Item 6')}>
                                Heading 6
                              </Button>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </ToolbarGroup>

                    <ToolbarSeparator />

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
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                    </ToolbarGroup>
                  </>
                </Toolbar>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* right */}
        <motion.div
          className="relative z-10"
          animate={{ 
            opacity: hidden ? 0.0009 : 1,
            x: hidden ? -375 : -10
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
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
        </motion.div>
      </div>
    </div>
  )
}