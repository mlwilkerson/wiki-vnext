<template lang="pug">
  q-card.page-properties-dialog(style='max-width: 450px;')
    q-toolbar.bg-primary.text-white.flex
      .text-subtitle2 {{$t('editor:pageData.title')}}
      q-space
      q-btn(
        icon='las la-times'
        dense
        flat
        v-close-popup
      )
    q-scroll-area(
      :thumb-style='thumbStyle'
      :bar-style='barStyle'
      style='height: calc(100% - 50px);'
      )
      q-card-section
        .text-overline {{$t('editor:pageData.template')}}
        q-form.q-gutter-sm
          q-select(
            v-model='tmpl'
            :aria-label='$t(`editor:pageData.template`)'
            :options='templates'
            outlined
            dense
          )
      q-card-section.alt-card
        .text-overline {{$t('editor:pageData.data')}}
      q-no-ssr(:placeholder='$t(`common:loading`)')
        codemirror.admin-theme-cm(
          ref='cmData'
          v-model='content'
          :options='{ mode: `text/yaml` }'
        )
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  data () {
    return {
      tmpl: 'custom',
      templates: [],
      content: ''
    }
  },
  computed: {
    thumbStyle: get('site/thumbStyle'),
    barStyle: get('site/barStyle')
  },
  methods: {

  }
}
</script>
