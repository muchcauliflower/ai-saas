import { Extension } from "@tiptap/core"
import { Plugin, PluginKey } from "prosemirror-state"
import { Decoration, DecorationSet } from "prosemirror-view"

const typewriterKey = new PluginKey("typewriter")

export const TypewriterExtension = Extension.create({
  name: "typewriter",

  addOptions() {
    return {
      enabled: true,
      speed: 2, // ms per character
    }
  },

  addProseMirrorPlugins() {
    if (!this.options.enabled) return []

    const speed = this.options.speed

    return [
      new Plugin({
        key: typewriterKey,

        state: {
          // Start with empty decoration set
          init() {
            return DecorationSet.empty
          },

          apply(tr, oldDecorations, oldState, newState) {
            // Map existing decorations forward through the transaction
            let decorations = oldDecorations.map(tr.mapping, tr.doc)

            // Only care about transactions that insert text
            if (!tr.docChanged) return decorations

            tr.steps.forEach((step, i) => {
              const map = tr.mapping.maps[i]
              map.forEach((oldStart, oldEnd, newStart, newEnd) => {
                const insertedSize = newEnd - newStart
                if (insertedSize <= 0) return

                // For each inserted character, create a fading decoration
                for (let pos = newStart; pos < newEnd; pos++) {
                  const charOffset = pos - newStart
                  const delay = charOffset * speed

                  decorations = decorations.add(tr.doc, [
                    Decoration.inline(pos, pos + 1, {
                      style: `opacity: 0; animation: typewriterFade 0.15s ease forwards; animation-delay: ${delay}ms`,
                    }),
                  ])
                }
              })
            })

            return decorations
          },
        },

        props: {
          decorations(state) {
            return typewriterKey.getState(state)
          },
        },
      }),
    ]
  },

  // Inject the keyframe into the document
  onCreate() {
    if (document.getElementById("typewriter-styles")) return

    const style = document.createElement("style")
    style.id = "typewriter-styles"
    style.textContent = `
      @keyframes typewriterFade {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
    `
    document.head.appendChild(style)
  },
})