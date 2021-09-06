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
      q-card.shadow-1
        q-list(separator)
          q-item(v-for='editor of editors', :key='editor.id')
            blueprint-icon(:icon='editor.icon')
            q-item-section
              q-item-label: strong {{$t(`admin.editors.` + editor.id + `Name`)}}
              q-item-label.flex.items-center(caption)
                span {{$t(`admin.editors.` + editor.id + `Description`)}}
            template(v-if='editor.config')
              q-item-section(
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
              q-separator.q-ml-md(vertical)
            q-item-section(side)
              q-toggle.q-pr-sm(
                v-model='editor.isActive'
                :color='editor.isDisabled ? `grey` : `primary`'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :label='$t(`admin.sites.isActive`)'
                :aria-label='$t(`admin.sites.isActive`)'
                :disabled='editor.isDisabled'
                )
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
      editors: [
        {
          id: 'wysiwyg',
          icon: 'google-presentation',
          isActive: true
        },
        {
          id: 'markdown',
          icon: 'markdown',
          config: {},
          isActive: true
        },
        {
          id: 'channel',
          icon: 'chat',
          isActive: true
        },
        {
          id: 'blog',
          icon: 'typewriter-with-paper',
          isActive: true,
          isDisabled: true
        },
        {
          id: 'api',
          icon: 'api',
          isActive: true,
          isDisabled: true
        },
        {
          id: 'redirect',
          icon: 'advance',
          isActive: true
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
