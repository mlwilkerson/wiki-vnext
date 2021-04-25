<template lang='pug'>
  q-page.admin-flags
    .row.q-pa-md.items-center
      .col-auto
        img.admin-icon.animated.fadeInLeft(src='~assets/icons/fluent-cashbook.svg')
      .col.q-pl-md
        .text-h5.text-primary.animated.fadeInLeft {{ $t('admin.editors.title') }}
        .text-subtitle1.text-grey.animated.fadeInLeft.wait-p2s {{ $t('admin.editors.subtitle') }}
      .col-auto
        q-btn.q-mr-sm.acrylic-btn(
          icon='las la-question-circle'
          flat
          color='grey'
          href='https://docs.requarks.io/editors'
          target='_blank'
          )
        q-btn(
          unelevated
          icon='mdi-check'
          :label='$t(`common.actions.apply`)'
          color='secondary'
          @click='save'
          :loading='loading'
        )
    q-separator(inset)
    .q-pa-md.q-gutter-md
      q-card.shadow-1(v-for='editor of editors', :key='editor.id')
        q-card-section(:class='$q.dark.isActive ? `bg-dark-6` : `bg-blue-grey-1`')
          .flex.items-center
            q-img.q-mr-sm(
              :src='editor.icon'
              :alt='editor.label'
              width='32px'
              )
            .text-body1: strong {{editor.label}}
            q-space
            q-chip(
              v-if='editor.disabled'
              color='pink'
              outline
              square
              dense
              style='font-size: 10px; font-weight: 500;'
            ) COMING SOON
        q-card-section
          q-list(separator)
            q-item(
              v-for='mode of editor.modes'
              :key='mode.id'
              tag='label'
              )
              q-item-section(side)
                q-radio(
                  v-model='config[editor.id].mode'
                  :val='mode.id'
                  color='primary'
                )
              q-item-section
                q-item-label: strong {{mode.label}}
                q-item-label(
                  v-if='mode.description'
                  caption
                  ).flex.items-center
                  span {{mode.description}}
                  q-chip.q-ml-sm(
                    v-if='mode.default'
                    color='positive'
                    outline
                    square
                    dense
                    style='font-size: 10px; font-weight: 500;'
                  ) DEFAULT
              q-item-section(
                v-if='mode.config'
                side
                )
                q-btn(
                  icon='las la-cog'
                  label='Configuration'
                  :color='$q.dark.isActive ? `blue-grey-3` : `blue-grey-8`'
                  outline
                  no-caps
                  padding='xs md'
                )
            q-item(
              tag='label'
              v-ripple
              )
              q-item-section(side)
                q-radio(
                  v-model='config[editor.id].mode'
                  val='off'
                  color='negative'
                  :disabled='editor.disabled'
                )
              q-item-section
                q-item-label: strong Disabled
                q-item-label(caption) Hide this option from users. Existing pages can still be edited using the default editor.
</template>

<script>
export default {
  meta () {
    return {
      title: this.$t('admin.editors.title')
    }
  },
  data () {
    return {
      loading: false,
      config: {
        wysiwyg: {
          mode: 'quill'
        },
        markdown: {
          mode: 'codemirror'
        },
        blog: {
          mode: 'off'
        },
        api: {
          mode: 'off'
        },
        redirection: {
          mode: 'default'
        }
      },
      editors: [
        {
          id: 'wysiwyg',
          label: 'WYSIWYG / Visual Editor',
          icon: require('assets/icons/fluent-open-file-under-cursor.svg'),
          modes: [
            {
              id: 'quill',
              label: 'Quill',
              description: 'Recommended visual editor.',
              default: true
            },
            {
              id: 'ckeditor',
              label: 'CKEditor 5 Enterprise',
              description: 'CKEditor with paid add-ons enabled. REQUIRES a valid subscription with add-ons XYZ.',
              config: [
                {}
              ]
            }
          ]
        },
        {
          id: 'markdown',
          label: 'Markdown Editor',
          icon: require('assets/icons/fluent-markdown.svg'),
          modes: [
            {
              id: 'codemirror',
              label: 'CodeMirror',
              description: 'Recommended markdown editor. Includes real-time preview and code completion features.',
              default: true,
              config: [
                {}
              ]
            },
            {
              id: 'monaco',
              label: 'Monaco',
              description: 'Code editor used in Visual Studio Code. Uses more browser resources and isn\'t compatible with non-desktop browsers.',
              config: [
                {}
              ]
            }
          ]
        },
        {
          id: 'blog',
          label: 'Blog Editor',
          icon: require('assets/icons/color-blog.svg'),
          disabled: true,
          modes: []
        },
        {
          id: 'api',
          label: 'API Docs Editor',
          icon: require('assets/icons/fluent-api.svg'),
          disabled: true,
          modes: []
        },
        {
          id: 'redirection',
          label: 'Redirection',
          icon: require('assets/icons/fluent-advance.svg'),
          modes: [
            {
              id: 'default',
              label: 'Default',
              description: 'Default editor to create redirection to other pages / external links.',
              default: true
            }
          ]
        }
      ]
    }
  },
  methods: {
    save () {},
    refresh () {}
  }
}
</script>

<style lang='scss'>

</style>
