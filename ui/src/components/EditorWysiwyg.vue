<template lang="pug">
  .quill-container
    .quill-toolbar(ref='toolbar')
      span.ql-formats
        select.ql-font
        select.ql-header
          option(value='1')
          option(value='2')
          option(value='3')
          option(value='4')
          option(value='5')
          option(value='6')
          option(selected)
      span.ql-formats
        button.ql-bold
        button.ql-italic
        button.ql-underline
        button.ql-strike
      span.ql-formats
        select.ql-color
        select.ql-background
      span.ql-formats
        button.ql-script(value='sub')
        button.ql-script(value='super')
      span.ql-formats
        button.ql-table(@click='insertTable')
        button.ql-blockquote
        button.ql-code-block
      span.ql-formats
        button.ql-list(value='ordered')
        button.ql-list(value='bullet')
        button.ql-indent(value='-1')
        button.ql-indent(value='+1')
      span.ql-formats
        button.ql-direction(value='rtl')
        select.ql-align
      span.ql-formats
        button.ql-link
        button.ql-image
        button.ql-video
        button.ql-formula
      span.ql-formats
        button.ql-clean
    q-scroll-area(
      :thumb-style='thumbStyle'
      :bar-style='barStyle'
      style='height: 100%;'
      )
      .quill-editor(ref='editor')
</template>

<script>
import Quill from 'quill'
import BlotFormatter from 'quill-blot-formatter'
import * as QuillTableUI from 'quill-table-ui'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill-table-ui/dist/index.css'

Quill.register('modules/blotFormatter', BlotFormatter)
Quill.register({
  'modules/tableUI': QuillTableUI.default
}, true)

export default {
  data () {
    return {
      ql: null,
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#000',
        width: '5px',
        opacity: 0.15
      },
      barStyle: {
        backgroundColor: '#FAFAFA',
        width: '9px',
        opacity: 1
      }
    }
  },
  mounted () {
    if (process.env.CLIENT) {
      this.init()
    }
  },
  beforeDestroy () {
    this.ql = null
  },
  methods: {
    init () {
      this.ql = new Quill(this.$refs.editor, {
        bounds: this.$refs.editor,
        theme: 'snow',
        placeholder: 'Enter content here...',
        modules: {
          blotFormatter: {},
          // syntax: true,
          table: true,
          tableUI: true,
          toolbar: {
            container: this.$refs.toolbar
          }
        }
      })
      this.ql.setContents([
        { insert: this.$store.get('page/render') }
      ], 'api')
      this.ql.on('text-change', () => {
        const delta = this.ql.getContents()
        const converter = new QuillDeltaToHtmlConverter(delta.ops, {})
        this.$store.set('page/render', converter.convert())
      })
    },
    insertTable () {
      this.ql.getModule('table').insertTable(3, 3)
    }
  }
}
</script>

<style lang="scss">
.quill-container {
  height: calc(100% - 41px);

  .ql-toolbar.ql-snow {
    border: none;
    border-bottom: 1px solid $grey-4;
  }

  .ql-container.ql-snow {
    border: none;
  }

  .ql-editor {
    min-height: 75vh;
  }

  .ql-tooltip {
    z-index: 2500;
  }
  .ql-table-menu {
    margin-left: 7px;
  }
  .ql-table-toggle {
    margin-left: -13px;
    border-color: $blue;
    border-radius: 5px;
    fill: $blue;
  }
}
</style>
