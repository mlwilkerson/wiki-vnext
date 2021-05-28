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
          href='https://docs.requarks.io/admin/editors'
          target='_blank'
          type='a'
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
        .flex.items-center.q-pa-sm(:class='$q.dark.isActive ? `bg-dark-6` : `bg-dark-6 text-white`')
          blueprint-icon(:icon='editor.icon', dark)
          .text-body2: strong {{$t(`admin.editors.` + editor.id + `Name`)}}
          q-space
          q-chip.text-uppercase(
            v-if='editor.disabled'
            color='pink'
            outline
            square
            dense
            style='font-size: 10px; font-weight: 500;'
          ) {{$t('admin.editors.comingSoon')}}
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
                q-item-label: strong {{$t(`admin.editors.` + mode.id + `Name`)}}
                q-item-label.flex.items-center(caption)
                  span {{$t(`admin.editors.` + mode.id + `Description`)}}
                  q-chip.q-ml-sm.text-uppercase(
                    v-if='mode.default'
                    color='positive'
                    outline
                    square
                    dense
                    style='font-size: 10px; font-weight: 500;'
                  ) {{$t('admin.editors.default')}}
              q-item-section(
                v-if='mode.config'
                side
                )
                q-btn(
                  icon='las la-cog'
                  :label='$t(`admin.editors.configuration`)'
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
                q-item-label: strong {{$t('admin.editors.disabled')}}
                q-item-label(caption) {{$t('admin.editors.disabledHint')}}
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
        visual: {
          mode: 'tiptap'
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
          mode: 'redirdefault'
        }
      },
      editors: [
        {
          id: 'visual',
          icon: 'google-presentation',
          modes: [
            {
              id: 'tiptap',
              default: true
            }
            // {
            //   id: 'ckeditor',
            //   config: [
            //     {}
            //   ]
            // }
          ]
        },
        {
          id: 'markdown',
          icon: 'markdown',
          modes: [
            {
              id: 'codemirror',
              default: true,
              config: [
                {}
              ]
            }
            // {
            //   id: 'monaco',
            //   label: 'Monaco',
            //   description: 'Code editor used in Visual Studio Code. Uses more browser resources and isn\'t compatible with non-desktop browsers.',
            //   config: [
            //     {}
            //   ]
            // }
          ]
        },
        {
          id: 'blog',
          icon: 'typewriter-with-paper',
          disabled: true,
          modes: []
        },
        {
          id: 'api',
          icon: 'api',
          disabled: true,
          modes: []
        },
        {
          id: 'redirection',
          icon: 'advance',
          modes: [
            {
              id: 'redirdefault',
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
