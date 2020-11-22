<template lang='pug'>
  q-page.admin-locale
    .row.q-pa-md.items-center
      .col-auto
        img.admin-icon.animated.fadeInLeft(src='~assets/icons/fluent-change-theme.svg')
      .col.q-pl-md
        .text-h5.text-primary.animated.fadeInLeft {{ $t('admin:sites.title') }}
        .text-subtitle1.text-grey.animated.fadeInLeft.wait-p2s {{ $t('admin:sites.subtitle') }}
      .col-auto
        q-btn.q-mr-sm(
          icon='las la-question-circle'
          flat
          color='grey'
          href='https://docs.requarks.io/sites'
          target='_blank'
          )
        q-btn(
          unelevated
          icon='las la-plus'
          :label='$t(`admin:sites.new`)'
          color='primary'
          )
          q-menu
            q-card(flat, style='min-width: 350px;')
              q-card-section
                .text-subtitle1 {{$t(`admin:sites.new`)}}
    q-separator(inset)
    .row.q-pa-md.q-col-gutter-md
      .col-12
        q-card.shadow-1
          q-card-section
            .text-subtitle1 {{$t('admin:sites.title')}}
          q-card-section.q-pa-none
            q-table.no-border-radius(
              :data='sites'
              :columns='headers'
              row-name='code'
              flat
              hide-bottom
              :rows-per-page-options='[0]'
              :loading='loading'
              )
              template(v-slot:body-cell-name='props')
                q-td(:props='props')
                  strong {{props.value}}
              template(v-slot:body-cell-isActive='props')
                q-td(:props='props')
                  q-toggle(
                    v-model='props.row.isActive'
                    color='primary'
                    checked-icon='las la-check'
                    unchecked-icon='las la-times'
                    :aria-label='$t(`admin:sites.isActive`)'
                    )
              template(v-slot:body-cell-remove='props')
                q-td(:props='props')
                  q-btn(
                    flat
                    round
                    dense
                    @click='deleteSite(props.row)'
                    icon='las la-trash'
                    color='accent'
                    )
</template>

<script>
import gql from 'graphql-tag'
import _get from 'lodash/get'

export default {
  data () {
    return {
      loading: false,
      sites: [
        {
          id: 1,
          name: 'Default',
          hostname: '*',
          isActive: true
        },
        {
          id: 2,
          name: 'Second Wiki',
          hostname: 'wiki.example.com',
          isActive: false
        }
      ]
    }
  },
  computed: {
    headers () {
      return [
        {
          label: this.$t('common:field.id'),
          align: 'left',
          field: 'id',
          name: 'ID',
          sortable: true,
          style: 'width: 50px'
        },
        {
          label: this.$t('common:field.name'),
          align: 'left',
          field: 'name',
          name: 'name',
          sortable: true
        },
        {
          label: this.$t('admin:sites.hostname'),
          align: 'left',
          field: 'hostname',
          name: 'hostname',
          sortable: true
        },
        {
          label: this.$t('admin:sites.isActive'),
          align: 'center',
          field: 'isActive',
          name: 'isActive',
          sortable: false,
          style: 'width: 10px'
        },
        {
          label: this.$t('admin:sites.delete'),
          align: 'center',
          field: 'remove',
          name: 'remove',
          sortable: false,
          style: 'width: 100px'
        }
      ]
    }
  },
  methods: {
    async deleteSite (st) {
      const respRaw = await this.$apollo.mutate({
        mutation: gql`
          mutation($locale: String!) {
            localization {
              downloadLocale(locale: $locale) {
                responseResult {
                  succeeded
                  errorCode
                  slug
                  message
                }
              }
            }
          }
        `,
        variables: {
          locale: st.id
        }
      })
      const resp = _get(respRaw, 'data.localization.downloadLocale.responseResult', {})
      if (resp.succeeded) {
        this.$q.notify({
          type: 'positive',
          message: this.$t('admin:sites.deleteSuccess')
        })
      } else {
        this.$q.notify({
          type: 'negative',
          message: resp.message
        })
      }
    },
    async save () {
      this.loading = true
      const respRaw = await this.$apollo.mutate({
        mutation: gql`
          mutation (
            $locale: String!
            $autoUpdate: Boolean!
            $namespacing: Boolean!
            $namespaces: [String]!
            ) {
            localization {
              updateLocale(
                locale: $locale
                autoUpdate: $autoUpdate
                namespacing: $namespacing
                namespaces: $namespaces
                ) {
                responseResult {
                  succeeded
                  errorCode
                  slug
                  message
                }
              }
            }
          }
        `,
        variables: {
          locale: this.selectedLocale,
          autoUpdate: this.autoUpdate,
          namespacing: this.namespacing,
          namespaces: this.namespaces
        }
      })
      const resp = _get(respRaw, 'data.localization.updateLocale.responseResult', {})
      if (resp.succeeded) {
        // Change UI language
        this.$i18n.locale = this.selectedLocale

        this.$q.notify({
          type: 'positive',
          message: 'Locale settings updated successfully.'
        })

        setTimeout(() => {
          window.location.reload(true)
        }, 1000)
      } else {
        this.$q.notify({
          type: 'negative',
          message: resp.message
        })
      }
      this.loading = false
    }
  }
  // apollo: {
  //   locales: {
  //     query: gql`
  //       sites {

  //       }
  //     `,
  //     fetchPolicy: 'network-only',
  //     update: (data) => data.localization.locales.map(lc => ({ ...lc, isDownloading: false })),
  //     watchLoading (isLoading) {
  //       this.$store.commit(`loading${isLoading ? 'Start' : 'Stop'}`, 'admin-locale-refresh')
  //     }
  //   }
  // }
}
</script>
