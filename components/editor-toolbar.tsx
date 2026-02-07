import { Toolbar, ToolbarGroup, ToolbarSeparator } from '@/components/tiptap-ui-primitive/toolbar'
import { Button } from './ui/button'
import { BoldIcon, ChevronUp, Code, ItalicIcon, LinkIcon, List, ListOrdered } from 'lucide-react'
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";


export default function EditorToolbar() {
  return (
    <div className='flex justify-center w-full'>
      <Toolbar 
        variant="floating"
        className='h-16 w-full'
      >
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
          <Button data-style="primary">Save</Button>
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <Button data-style="primary">
            <ChevronUp className="tiptap-button-icon" />
          </Button>
        </ToolbarGroup>

      </Toolbar>
    </div>
  )
}