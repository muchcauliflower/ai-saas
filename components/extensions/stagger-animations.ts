import { Extension } from "@tiptap/core"
import { Plugin } from "prosemirror-state"
import { Decoration, DecorationSet } from "prosemirror-view"

export const StaggerExtension = Extension.create({
  name: "stagger",

  addOptions() {
    return {
      enabled: true,
    }
  },

  addProseMirrorPlugins() {
    if (!this.options.enabled) return []

    return [
      new Plugin({
        props: {
          decorations: (state) => {
            const { doc } = state
            const decorations: any[] = []
            let index = 0

            doc.descendants((node, pos) => {
              if (node.isBlock) {
                const delay = index * 60
                index++

                decorations.push(
                  Decoration.node(pos, pos + node.nodeSize, {
                    class: "stagger-node",
                    style: `--delay:${delay}ms`,
                  })
                )
              }
            })

            return DecorationSet.create(doc, decorations)
          },
        },
      }),
    ]
  },
})
