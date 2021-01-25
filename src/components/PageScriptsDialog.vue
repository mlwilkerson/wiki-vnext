<template lang="pug">
  q-card.page-scripts-dialog(style='width: 860px; max-width: 90vw;')
    q-toolbar.bg-primary.text-white
      .text-subtitle2 {{$t('editor:pageScripts.title')}} - {{$t('editor:props.' + mode)}}
      q-space
      q-chip(
        square
        style='background-color: rgba(0,0,0,.1)'
        text-color='white'
        )
        .text-caption {{this.languageLabel}}
    div(style='min-height: 450px;')
      q-no-ssr(:placeholder='$t(`common:loading`)')
        codemirror(
          v-if='showEditor'
          ref='editor'
          v-model='content'
          :options='{ mode: language }'
          @ready='onCmReady'
        )
    q-card-actions.card-actions
      q-space
      q-btn.acrylic-btn(
        icon='las la-times'
        :label='$t(`common:actions.discard`)'
        color='grey-7'
        padding='xs md'
        v-close-popup
        flat
      )
      q-btn(
        icon='las la-check'
        :label='$t(`common:actions.save`)'
        unelevated
        color='primary'
        padding='xs md'
        @click='persist'
        v-close-popup
      )
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'css'
    }
  },
  data () {
    return {
      content: '',
      showEditor: false
    }
  },
  computed: {
    language () {
      switch (this.mode) {
        case 'jsLoad':
        case 'jsUnload':
          return 'text/javascript'
        case 'styles':
          return 'text/css'
        default:
          return 'text/plain'
      }
    },
    languageLabel () {
      switch (this.language) {
        case 'text/javascript':
          return 'Javascript'
        case 'text/css':
          return 'CSS'
        default:
          return 'Plain Text'
      }
    },
    contentStoreKey () {
      return 'script' + this.mode.charAt(0).toUpperCase() + this.mode.slice(1)
    }
  },
  mounted () {
    this.content = this.$store.get(`page/${this.contentStoreKey}`)
    this.$nextTick(() => {
      setTimeout(() => {
        this.showEditor = true
      }, 250)
    })
  },
  methods: {
    persist () {
      this.$store.set(`page/${this.contentStoreKey}`, this.content)
    },
    onCmReady (cm) {
      cm.setOption('theme', this.$q.dark.isActive ? 'material-ocean' : 'elegant')
      cm.setSize(null, 450)
      setTimeout(() => {
        cm.focus()
      })
    }
  }
}
</script>

<style lang="scss">

</style>
