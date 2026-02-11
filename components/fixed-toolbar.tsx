"use client";

import { BoldIcon, Code, ItalicIcon, LinkIcon, List, ListOrdered } from "lucide-react";
import { Button } from "./ui/button";
import { Scrollbar } from 'react-scrollbars-custom';

import { useEditorContext } from "@/app/contexts/editor-contexts";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./tiptap-ui-primitive/dropdown-menu/dropdown-menu";
import { Toolbar, ToolbarGroup, ToolbarSeparator } from "./tiptap-ui-primitive/toolbar/toolbar";

import { useParams } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

export const FixedToolbar = () =>{
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
      
    return(
        <div className="w-full">
            <Toolbar className="flex justify-center">
                <ToolbarGroup>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="clear">Headings</Button>
                        </DropdownMenuTrigger>
                    <DropdownMenuContent
                    align="start"
                    className="w-[calc(var(--radix-dropdown-menu-trigger-width)+20px)] p-0 pt-6"
                    >
                        <Scrollbar
                        style={{ height: 90 }}
                        >
                            <DropdownMenuGroup className='flex flex-col gap-y-3 pr-[8px]'>
                                <DropdownMenuItem asChild>
                                    <Button onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}>
                                    Heading 1
                                    </Button>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                                    Heading 2
                                    </Button>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Button onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}>
                                    Heading 3
                                    </Button>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </Scrollbar>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </ToolbarGroup>

                <ToolbarSeparator />

                <ToolbarGroup>
                    <Button onClick={() => editor.chain().focus().toggleBold().run()} className="btn-clear" variant="clear">
                        <BoldIcon className="tiptap-button-icon" />
                        Bold
                    </Button>
                    <Button className="btn-clear" variant="clear">
                        <ItalicIcon className="tiptap-button-icon" />
                        Italic
                    </Button>
                </ToolbarGroup>

                <ToolbarSeparator />

                <ToolbarGroup>
                    <Button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className="btn-clear" variant="clear"
                    >
                        <Code className="tiptap-button-icon" />
                        Code Block
                    </Button>
                    <Button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className="btn-clear" variant="clear"
                    >
                        <Code className="tiptap-button-icon" />
                        Code
                    </Button>
                </ToolbarGroup>

                <ToolbarSeparator />

                <ToolbarGroup>
                    <Button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className="btn-clear"
                    variant="clear"
                    >
                        <List className="tiptap-button-icon" />
                        Bulleted List
                    </Button>
                    <Button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className="btn-clear"
                    variant="clear"
                    >
                        <ListOrdered className="tiptap-button-icon" />
                        Ordered List
                        </Button>
                </ToolbarGroup>

                <ToolbarSeparator />

                <ToolbarGroup>
                    <Button
                    className="btn-clear"
                    variant="clear"
                    onClick={handleSave}
                    >
                    Save
                    </Button>
                </ToolbarGroup>
            </Toolbar>
        </div>
    )
}