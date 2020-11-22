import VueCodemirror from 'vue-codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/css/css.js'
import 'codemirror/mode/htmlmixed/htmlmixed.js'
import 'codemirror/mode/markdown/markdown.js'

export default ({ Vue }) => {
  Vue.use(VueCodemirror, {
    options: {
      theme: 'elegant',
      tabSize: 2,
      mode: 'text/html',
      lineNumbers: true,
      line: true
    }
  })
}
