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
      .col-12.col-lg-7
        q-card.shadow-1
          q-list(bordered, separator)
            q-expansion-item(
              v-for='(ext, idx) of extensions', :key='`ext-` + ext.key'
              :default-opened='idx < 1'
              group='admext'
              accordeon
              icon='las la-cube'
              :label='ext.title'
              :caption='ext.isInstalled ? `Installed` : ``'
              )
              q-card
                q-card-section
                  .body-2 {{ext.description}}
                  .body-2.q-mt-sm
                    strong.mr-2 This extension is
                    q-chip.mr-2(v-if='ext.isCompatible', square, outline, dense, color='green') compatible
                    q-chip.mr-2(v-else, square, dense, color='red') not compatible
                    strong with your host.
                  .flex.justify-end
                    q-btn(
                      :label='ext.isInstalled ? `Installed` : `Install`'
                      color='primary'
                      unelevated
                      :disabled='ext.isInstalled'
                    )
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
