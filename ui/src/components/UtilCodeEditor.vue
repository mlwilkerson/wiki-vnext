<template lang="pug">
.util-code-editor(
  ref='editor'
  )
</template>

<script>
import { keymap, EditorView } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { history, historyKeymap } from '@codemirror/history'
import { defaultKeymap, indentWithTab } from '@codemirror/commands'
import { lineNumbers } from '@codemirror/gutter'
import { defaultHighlightStyle } from '@codemirror/highlight'

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: 'plaintext'
    },
    minHeight: {
      type: Number,
      default: 150
    }
  },
  data () {
    return {
      editor: null
    }
  },
  async mounted () {
    let langModule = null
    switch (this.language) {
      case 'css': {
        langModule = (await import('@codemirror/lang-css')).css
        break
      }
      case 'html': {
        langModule = (await import('@codemirror/lang-html')).html
        break
      }
      case 'javascript': {
        langModule = (await import('@codemirror/lang-javascript')).javascript
        break
      }
      case 'json': {
        langModule = (await import('@codemirror/lang-json')).json
        break
      }
      case 'markdown': {
        langModule = (await import('@codemirror/lang-markdown')).markdown
        break
      }
    }
    this.editor = new EditorView({
      state: EditorState.create({
        extensions: [
          history(),
          keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
          lineNumbers(),
          EditorView.theme({
            '.cm-content, .cm-gutter': { minHeight: `${this.minHeight}px` }
          }),
          ...langModule && [langModule()],
          defaultHighlightStyle
        ]
      }),
      parent: this.$refs.editor
    })
  },
  beforeUnmount () {
    if (this.editor) {
      this.editor.destroy()
    }
  }
}
</script>

<style lang="scss">
.util-code-editor {
  min-height: 100px;
}
</style>
