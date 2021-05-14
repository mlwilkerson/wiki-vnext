<template lang='pug'>
  q-page.admin-extensions
    .row.q-pa-md.items-center
      .col-auto
        img.admin-icon.animated.fadeInLeft(src='~assets/icons/fluent-module.svg')
      .col.q-pl-md
        .text-h5.text-primary.animated.fadeInLeft {{ $t('admin.extensions.title') }}
        .text-subtitle1.text-grey.animated.fadeInLeft.wait-p2s {{ $t('admin.extensions.subtitle') }}
      .col-auto
        q-btn.acrylic-btn(
          icon='las la-question-circle'
          flat
          color='grey'
          href='https://docs.js.wiki/admin/extensions'
          target='_blank'
          type='a'
          )
    q-separator(inset)
    .row.q-pa-md.q-col-gutter-md
      .col-12
        q-card.shadow-1
          q-list(separator)
            q-item(
              v-for='(ext, idx) of extensions'
              :key='`ext-` + ext.key'
              )
              blueprint-icon(icon='module')
              q-item-section
                q-item-label {{ext.title}}
                q-item-label(caption) {{ext.description}}
              q-item-section(side)
                q-btn(
                  :label='ext.isInstalled ? `Installed` : `Install`'
                  color='primary'
                  unelevated
                  :disabled='ext.isInstalled'
                  v-if='ext.isCompatible'
                )
                q-chip(v-else, square, dense, color='red', outline) not compatible

</template>

<script>
import gql from 'graphql-tag'

export default {
  meta () {
    return {
      title: this.$t('admin.extensions.title')
    }
  },
  data () {
    return {
      loading: false,
      extensions: []
    }
  },
  methods: {
    async save () {
    }
  },
  apollo: {
    extensions: {
      query: gql`
        {
          systemExtensions {
            key
            title
            description
            isInstalled
            isCompatible
          }
        }
      `,
      prefetch: false,
      fetchPolicy: 'network-only',
      update: (data) => data.systemExtensions,
      watchLoading (isLoading) {
        this.$store.commit(`loading${isLoading ? 'Start' : 'Stop'}`, 'admin-extensions-refresh')
      }
    }
  }
}
</script>

<style lang='scss'>
.admin-extensions {
  .q-expansion-item__content .q-card {
    @at-root .body--light & {
      background-color: $grey-1;
    }
    @at-root .body--dark & {
      background-color: $dark-3;
    }
  }
}
</style>
