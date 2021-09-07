<template lang="pug">
.util-code-editor(
  ref='editor'
  )
</template>

<script>
import * as monaco from 'monaco-editor'

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
    monaco.editor.defineTheme('wiki', {
      base: this.$q.dark.isActive ? 'vs-dark' : 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': this.$q.dark.isActive ? this.$store.get('colors/dark6') : '#FFF',
        'editorGutter.background': this.$q.dark.isActive ? this.$store.get('colors/dark3') : '#EEE'
      }
    })

    this.editor = monaco.editor.create(this.$refs.editor, {
      value: this.value,
      language: this.language,
      cursorBlinking: 'smooth',
      theme: 'wiki',
      tabSize: 2,
      links: false,
      minimap: {
        enabled: false
      },
      padding: {
        top: 10,
        bottom: 10
      }
    })
    this.editor.focus()
  },
  beforeUnmount () {
    if (this.editor) {
      this.editor.dispose()
    }
  }
}
</script>

<style lang="scss">
.util-code-editor {
  min-height: 200px;
}
</style>
