<template lang="pug">
  .wysiwyg-container
    .wysiwyg-toolbar(v-if='editor')
      template(v-for='menuItem of menuBar')
        q-separator.q-mx-xs(
          v-if='menuItem.type === `divider`'
          vertical
          )
        q-btn(
          v-else
          flat
          :icon='menuItem.icon'
          padding='xs'
          :color='menuItem.isActive && menuItem.isActive() ? `primary` : `grey-10`'
          @click='menuItem.action'
          :aria-label='menuItem.title'
          )
    q-scroll-area(
      :thumb-style='thumbStyle'
      :bar-style='barStyle'
      style='height: 100%;'
      )
      editor-content(:editor='editor')
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import Dropcursor from '@tiptap/extension-dropcursor'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import TextAlign from '@tiptap/extension-text-align'
import Typography from '@tiptap/extension-typography'
import * as Y from 'yjs'
import { IndexeddbPersistence } from 'y-indexeddb'
// import { WebsocketProvider } from 'y-websocket'

export default {
  components: {
    EditorContent
  },
  data () {
    return {
      editor: null,
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
      },
      menuBar: [
        {
          icon: 'mdi-format-bold',
          title: 'Bold',
          action: () => this.editor.chain().focus().toggleBold().run(),
          isActive: () => this.editor.isActive('bold')
        },
        {
          icon: 'mdi-format-italic',
          title: 'Italic',
          action: () => this.editor.chain().focus().toggleItalic().run(),
          isActive: () => this.editor.isActive('italic')
        },
        {
          icon: 'mdi-format-strikethrough',
          title: 'Strike',
          action: () => this.editor.chain().focus().toggleStrike().run(),
          isActive: () => this.editor.isActive('strike')
        },
        {
          icon: 'mdi-code-tags',
          title: 'Code',
          action: () => this.editor.chain().focus().toggleCode().run(),
          isActive: () => this.editor.isActive('code')
        },
        {
          icon: 'mdi-marker',
          title: 'Highlight',
          action: () => this.editor.chain().focus().toggleHighlight().run(),
          isActive: () => this.editor.isActive('highlight')
        },
        {
          type: 'divider'
        },
        {
          icon: 'mdi-format-header-1',
          title: 'Heading 1',
          action: () => this.editor.chain().focus().toggleHeading({ level: 1 }).run(),
          isActive: () => this.editor.isActive('heading', { level: 1 })
        },
        {
          icon: 'mdi-format-header-2',
          title: 'Heading 2',
          action: () => this.editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: () => this.editor.isActive('heading', { level: 2 })
        },
        {
          icon: 'mdi-format-paragraph',
          title: 'Paragraph',
          action: () => this.editor.chain().focus().setParagraph().run(),
          isActive: () => this.editor.isActive('paragraph')
        },
        {
          icon: 'mdi-format-list-bulleted',
          title: 'Bullet List',
          action: () => this.editor.chain().focus().toggleBulletList().run(),
          isActive: () => this.editor.isActive('bulletList')
        },
        {
          icon: 'mdi-format-list-numbered',
          title: 'Ordered List',
          action: () => this.editor.chain().focus().toggleOrderedList().run(),
          isActive: () => this.editor.isActive('orderedList')
        },
        {
          icon: 'mdi-format-list-checkbox',
          title: 'Task List',
          action: () => this.editor.chain().focus().toggleTaskList().run(),
          isActive: () => this.editor.isActive('taskList')
        },
        {
          icon: 'mdi-code-json',
          title: 'Code Block',
          action: () => this.editor.chain().focus().toggleCodeBlock().run(),
          isActive: () => this.editor.isActive('codeBlock')
        },
        {
          type: 'divider'
        },
        {
          icon: 'mdi-format-quote-close',
          title: 'Blockquote',
          action: () => this.editor.chain().focus().toggleBlockquote().run(),
          isActive: () => this.editor.isActive('blockquote')
        },
        {
          icon: 'mdi-minus',
          title: 'Horizontal Rule',
          action: () => this.editor.chain().focus().setHorizontalRule().run()
        },
        {
          type: 'divider'
        },
        {
          icon: 'mdi-format-page-break',
          title: 'Hard Break',
          action: () => this.editor.chain().focus().setHardBreak().run()
        },
        {
          icon: 'mdi-format-clear',
          title: 'Clear Format',
          action: () => this.editor.chain()
            .focus()
            .clearNodes()
            .unsetAllMarks()
            .run()
        },
        {
          type: 'divider'
        },
        {
          icon: 'mdi-undo-variant',
          title: 'Undo',
          action: () => this.editor.chain().focus().undo().run()
        },
        {
          icon: 'mdi-redo-variant',
          title: 'Redo',
          action: () => this.editor.chain().focus().redo().run()
        }
      ]
    }
  },
  mounted () {
    if (process.env.CLIENT) {
      this.init()
    }
  },
  beforeDestroy () {
    this.editor.destroy()
  },
  methods: {
    init () {
      const ydoc = new Y.Doc()

      /* eslint-disable no-unused-vars */
      const dbProvider = new IndexeddbPersistence('example-document', ydoc)
      // const wsProvider = new WebsocketProvider('ws://127.0.0.1:1234', 'example-document', ydoc)
      /* eslint-enable no-unused-vars */

      this.editor = new Editor({
        // content: this.$store.get('page/render'),
        extensions: [
          StarterKit.configure({
            history: false
          }),
          Collaboration.configure({
            document: ydoc
          }),
          Dropcursor,
          Highlight,
          Image,
          Table.configure({
            resizable: true
          }),
          TableRow,
          TableHeader,
          TableCell,
          TaskList,
          TaskItem,
          TextAlign,
          Typography
        ],
        onUpdate: () => {
          this.$store.set('page/render', this.editor.getHTML())
        }
      })
      // this.ql = new Quill(this.$refs.editor, {
      //   bounds: this.$refs.editor,
      //   theme: 'snow',
      //   placeholder: 'Enter content here...',
      //   modules: {
      //     blotFormatter: {},
      //     // syntax: true,
      //     table: true,
      //     tableUI: true,
      //     toolbar: {
      //       container: this.$refs.toolbar
      //     }
      //   }
      // })
      // this.ql.setContents([
      //   { insert: this.$store.get('page/render') }
      // ], 'api')
      // this.ql.on('text-change', () => {
      //   const delta = this.ql.getContents()
      //   const converter = new QuillDeltaToHtmlConverter(delta.ops, {})
      //   this.$store.set('page/render', converter.convert())
      // })
    },
    insertTable () {
      // this.ql.getModule('table').insertTable(3, 3)
    }
  }
}
</script>

<style lang="scss">
.wysiwyg-container {
  height: calc(100% - 41px);

  .wysiwyg-toolbar {
    border: none;
    border-bottom: 1px solid $grey-4;
    display: flex;
    align-items: center;
    padding: 4px;
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
