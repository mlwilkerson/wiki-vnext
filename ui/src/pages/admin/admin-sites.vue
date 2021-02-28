<template lang='pug'>
  q-page.admin-locale
    .row.q-pa-md.items-center
      .col-auto
        img.admin-icon.animated.fadeInLeft(src='~assets/icons/fluent-change-theme.svg')
      .col.q-pl-md
        .text-h5.text-primary.animated.fadeInLeft {{ $t('admin:sites.title') }}
        .text-subtitle1.text-grey.animated.fadeInLeft.wait-p2s {{ $t('admin:sites.subtitle') }}
      .col-auto
        q-btn.q-mr-sm.acrylic-btn(
          icon='las la-question-circle'
          flat
          color='grey'
          type='a'
          href='https://docs.js.wiki/sites'
          target='_blank'
          )
        q-btn(
          unelevated
          icon='las la-plus'
          :label='$t(`admin:sites.new`)'
          color='primary'
          )
          q-menu(
            content-class='shadow-20'
          )
            site-create-dialog
    q-separator(inset)
    .row.q-pa-md.q-col-gutter-md
      .col-12
        q-card.shadow-1
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
              template(v-slot:body-cell-id='props')
                q-td(:props='props')
                  q-btn.acrylic-btn(
                    size='sm'
                    padding='xs'
                    icon='las la-clipboard'
                    flat
                    color='brown'
                    @click='copyID(props.value)'
                    )
                    q-tooltip(
                      anchor='center left'
                      self='center right'
                    ) {{$t('common:clipboard.uuid')}}
              template(v-slot:body-cell-title='props')
                q-td(:props='props')
                  strong {{props.value}}
              template(v-slot:body-cell-hostname='props')
                q-td(:props='props')
                  span.font-robotomono(v-if='props.value !== `*`') {{props.value}}
                  q-chip.q-mx-none(
                    v-else
                    square
                    color='indigo-7'
                    text-color='white'
                    size='sm'
                    )
                    q-avatar(
                      icon='las la-asterisk'
                      color='indigo-5'
                      text-color='white'
                      )
                    span catch-all
              template(v-slot:body-cell-isEnabled='props')
                q-td(:props='props')
                  q-toggle(
                    v-model='props.row.isEnabled'
                    color='primary'
                    checked-icon='las la-check'
                    unchecked-icon='las la-times'
                    :aria-label='$t(`admin:sites.isActive`)'
                    )
              template(v-slot:body-cell-edit='props')
                q-td(:props='props')
                  q-btn.acrylic-btn(
                    flat
                    dense
                    @click='editSite(props.row)'
                    icon='las la-pen'
                    color='indigo'
                    )
              template(v-slot:body-cell-remove='props')
                q-td(:props='props')
                  q-btn.acrylic-btn(
                    flat
                    dense
                    @click='deleteSite(props.row)'
                    icon='las la-trash'
                    color='accent'
                    )
</template>

<script>
import gql from 'graphql-tag'
import _get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'

import { copyToClipboard } from 'quasar'

export default {
  data () {
    return {
      loading: false,
      sites: []
    }
  },
  computed: {
    headers () {
      return [
        {
          label: this.$t('common:field.id'),
          align: 'center',
          field: 'id',
          name: 'id',
          sortable: false,
          style: 'width: 50px'
        },
        {
          label: this.$t('common:field.name'),
          align: 'left',
          field: 'title',
          name: 'title',
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
          field: 'isEnabled',
          name: 'isEnabled',
          sortable: false,
          style: 'width: 10px'
        },
        {
          label: this.$t('admin:sites.edit'),
          align: 'center',
          field: 'edit',
          name: 'edit',
          sortable: false,
          style: 'width: 100px'
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
    copyID (uid) {
      copyToClipboard(uid).then(() => {
        this.$q.notify({
          type: 'positive',
          message: this.$t('common:clipboard.success')
        })
      }).catch(() => {
        this.$q.notify({
          type: 'negative',
          message: this.$t('common:clipboard.failure')
        })
      })
    },
    editSite (st) {
      this.$store.set('admin/currentSiteId', st.id)
      this.$router.push('/a/general')
    },
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
  },
  apollo: {
    sites: {
      query: gql`
        {
          sites {
            id
            hostname
            isEnabled
            title
          }
        }
      `,
      fetchPolicy: 'network-only',
      update: r => cloneDeep(r.sites),
      watchLoading (isLoading) {
        this.$store.commit(`loading${isLoading ? 'Start' : 'Stop'}`, 'admin-sites-refresh')
      }
    }
  }
}
</script>
