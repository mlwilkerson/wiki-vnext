<template lang="pug">
.util-code-editor(
  ref='editor'
  )
</template>

<script>
import { keymap, EditorView } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { history, historyKeymap } from '@codemirror/history'
import { defaultKeymap } from '@codemirror/commands'
import { lineNumbers } from '@codemirror/gutter'

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: 'plaintext'
    }
  },
  data () {
    return {
      editor: null
    }
  },
  mounted () {
    this.editor = new EditorView({
      state: EditorState.create({
        extensions: [
          history(),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          lineNumbers()
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
  min-height: 200px;
}
</style>
