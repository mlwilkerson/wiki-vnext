<template lang='pug'>
q-page.admin-locale
  .row.q-pa-md.items-center
    .col-auto
      img.admin-icon.animated.fadeInLeft(src='~assets/icons/fluent-language.svg')
    .col.q-pl-md
      .text-h5.text-primary.animated.fadeInLeft {{ $t('admin.locale.title') }}
      .text-subtitle1.text-grey.animated.fadeInLeft.wait-p2s {{ $t('admin.locale.subtitle') }}
    .col-auto
      q-btn.q-mr-sm.acrylic-btn(
        icon='las la-question-circle'
        flat
        color='grey'
        href='https://docs.requarks.io/admin/locale'
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
  .row.q-pa-md.q-col-gutter-md
    .col-6
      //- -----------------------
      //- Locale Options
      //- -----------------------
      q-card.shadow-1.q-pb-sm
        q-card-section
          .text-subtitle1 {{$t('admin.locale.settings')}}
        q-item
          blueprint-icon(icon='translation')
          q-item-section
            q-item-label {{namespacing ? $t(`admin.locale.base.labelWithNS`) : $t(`admin.locale.base.label`)}}
            q-item-label(caption) {{$t(`admin.locale.base.hint`)}}
          q-item-section
            q-select(
              outlined
              v-model='selectedLocale'
              :options='installedLocales'
              option-value='code'
              option-label='name'
              emit-value
              map-options
              dense
              :aria-label='$t(`admin.locale.base.label`)'
              )
        q-separator.q-my-sm(inset)
        q-item(tag='label', v-ripple)
          blueprint-icon(icon='renew')
          q-item-section
            q-item-label {{$t(`admin.locale.autoUpdate.label`)}}
            q-item-label(caption) {{namespacing ? $t(`admin.locale.autoUpdate.hintWithNS`) : $t(`admin.locale.autoUpdate.hint`)}}
          q-item-section(avatar)
            q-toggle(
              v-model='autoUpdate'
              color='primary'
              checked-icon='las la-check'
              unchecked-icon='las la-times'
              :aria-label='$t(`admin.locale.autoUpdate.label`)'
              )

      //- -----------------------
      //- Namespacing
      //- -----------------------
      q-card.shadow-1.q-pb-sm.q-mt-md
        q-card-section
          .text-subtitle1 {{$t('admin.locale.namespacing')}}
        q-item(tag='label', v-ripple)
          blueprint-icon(icon='unit')
          q-item-section
            q-item-label {{$t(`admin.locale.namespaces.label`)}}
            q-item-label(caption) {{$t(`admin.locale.namespaces.hint`)}}
          q-item-section(avatar)
            q-toggle(
              v-model='namespacing'
              color='primary'
              checked-icon='las la-check'
              unchecked-icon='las la-times'
              :aria-label='$t(`admin.locale.namespaces.label`)'
              )
        q-item
          q-item-section
            q-card.bg-warning.text-white.rounded-borders(flat)
              q-card-section.items-center(horizontal)
                q-card-section.col-auto.q-pr-none
                  q-icon(name='las la-exclamation-circle', size='sm')
                q-card-section
                  span {{ $t('admin.locale.namespacingPrefixWarning.title', { langCode: selectedLocale }) }}
                  .text-caption.text-yellow-1 {{ $t('admin.locale.namespacingPrefixWarning.subtitle') }}
        q-separator.q-my-sm(inset)
        q-item
          blueprint-icon(icon='test-passed')
          q-item-section
            q-item-label {{$t(`admin.locale.activeNamespaces.label`)}}
            q-item-label(caption) {{$t(`admin.locale.activeNamespaces.hint`)}}
          q-item-section
            q-select(
              outlined
              :disable='!namespacing'
              v-model='namespaces'
              :options='installedLocales'
              multiple
              use-chips
              option-value='code'
              option-label='name'
              emit-value
              map-options
              dense
              :aria-label='$t(`admin.locale.activeNamespaces.label`)'
              )

    .col-6
      //- -----------------------
      //- Download Locales
      //- -----------------------
      q-card.shadow-1
        q-card-section
          .text-subtitle1 {{$t('admin.locale.downloadTitle')}}
        q-card-section.q-pa-none
          q-table.no-border-radius(
            :data='locales'
            :columns='headers'
            row-name='code'
            flat
            hide-bottom
            :rows-per-page-options='[0]'
            :loading='loading'
            )
            template(v-slot:body-cell-code='props')
              q-td(:props='props')
                q-chip(
                  square
                  color='teal'
                  text-color='white'
                  dense
                  ): span.text-caption {{props.value}}
            template(v-slot:body-cell-name='props')
              q-td(:props='props')
                strong {{props.value}}
            template(v-slot:body-cell-isRTL='props')
              q-td(:props='props')
                q-icon(
                  v-if='props.value'
                  name='las la-check'
                  color='brown'
                  size='xs'
                  )
            template(v-slot:body-cell-availability='props')
              q-td(:props='props')
                q-circular-progress(
                  size='md'
                  show-value
                  :value='props.value'
                  :thickness='0.1'
                  :color='props.value <= 33 ? `negative` : (props.value <= 66) ? `warning` : `positive`'
                ) {{ props.value }}%
            template(v-slot:body-cell-isInstalled='props')
              q-td(:props='props')
                q-spinner(
                  v-if='props.row.isDownloading'
                  color='primary'
                  size='20px'
                  :thickness='2'
                  )
                q-btn(
                  v-else-if='props.value && props.row.installDate < props.row.updatedAt'
                  flat
                  round
                  dense
                  @click='download(props.row)'
                  icon='las la-redo-alt'
                  color='accent'
                  )
                q-btn(
                  v-else-if='props.value'
                  flat
                  round
                  dense
                  @click='download(props.row)'
                  icon='las la-check-circle'
                  color='positive'
                  )
                q-btn(
                  v-else
                  flat
                  round
                  dense
                  @click='download(props.row)'
                  icon='las la-cloud-download-alt'
                  color='primary'
                  )
//-             v-card.wiki-form.mt-3.animated.fadeInUp.wait-p5s
//-               v-toolbar(color='teal', dark, dense, flat)
//-                 v-toolbar-title.subtitle-1 {{ $t('admin.locale.sideload') }}
//-                 v-spacer
//-                 v-chip(label, color='white', small).teal--text coming soon
//-               v-card-text
//-                 div {{ $t('admin.locale.sideloadHelp') }}
//-                 v-btn.ml-0.mt-3(color='teal', disabled) {{ $t('common.actions.browse') }}
</template>

<script>
import gql from 'graphql-tag'
import filter from 'lodash/filter'
import _get from 'lodash/get'

const fetchLocaleGql = gql`
  query getLocales {
    localization {
      locales {
        availability
        code
        createdAt
        isInstalled
        installDate
        isRTL
        name
        nativeName
        updatedAt
      }
      config {
        locale
        autoUpdate
        namespacing
        namespaces
      }
    }
  }
`

export default {
  meta () {
    return {
      title: this.$t('admin.locale.title')
    }
  },
  data () {
    return {
      loading: false,
      locales: [],
      selectedLocale: 'en',
      autoUpdate: false,
      namespacing: false,
      namespaces: []
    }
  },
  computed: {
    installedLocales () {
      return filter(this.locales, ['isInstalled', true])
    },
    headers () {
      return [
        {
          label: this.$t('admin.locale.code'),
          align: 'left',
          field: 'code',
          name: 'code',
          sortable: true,
          style: 'width: 90px'
        },
        {
          label: this.$t('admin.locale.name'),
          align: 'left',
          field: 'name',
          name: 'name',
          sortable: true
        },
        {
          label: this.$t('admin.locale.nativeName'),
          align: 'left',
          field: 'nativeName',
          name: 'nativeName',
          sortable: true
        },
        {
          label: this.$t('admin.locale.rtl'),
          align: 'center',
          field: 'isRTL',
          name: 'isRTL',
          sortable: false,
          style: 'width: 10px'
        },
        {
          label: this.$t('admin.locale.availability'),
          align: 'center',
          field: 'availability',
          name: 'availability',
          sortable: false,
          style: 'width: 120px'
        },
        {
          label: this.$t('admin.locale.download'),
          align: 'center',
          field: 'isInstalled',
          name: 'isInstalled',
          sortable: false,
          style: 'width: 100px'
        }
      ]
    }
  },
  methods: {
    async download (lc) {
      lc.isDownloading = true
      const respRaw = await this.$apollo.mutate({
        mutation: gql`
          mutation downloadLocale ($locale: String!) {
            localization {
              downloadLocale (locale: $locale) {
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
          locale: lc.code
        }
      })
      const resp = _get(respRaw, 'data.localization.downloadLocale.responseResult', {})
      if (resp.succeeded) {
        lc.isDownloading = false
        lc.isInstalled = true
        lc.updatedAt = new Date().toISOString()
        lc.installDate = lc.updatedAt
        this.$store.commit('showNotification', {
          message: `Locale ${lc.name} has been installed successfully.`,
          style: 'success',
          icon: 'get_app'
        })
      } else {
        this.$q.notify({
          type: 'negative',
          message: resp.message
        })
      }
      this.isDownloading = false
    },
    async save () {
      this.loading = true
      const respRaw = await this.$apollo.mutate({
        mutation: gql`
          mutation saveLocaleSettings (
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
    locales: {
      query: fetchLocaleGql,
      fetchPolicy: 'network-only',
      update: (data) => data.localization.locales.map(lc => ({ ...lc, isDownloading: false })),
      watchLoading (isLoading) {
        this.$store.commit(`loading${isLoading ? 'Start' : 'Stop'}`, 'admin-locale-refresh')
      }
    },
    selectedLocale: {
      query: fetchLocaleGql,
      update: (data) => data.localization.config.locale
    },
    autoUpdate: {
      query: fetchLocaleGql,
      update: (data) => data.localization.config.autoUpdate
    },
    namespacing: {
      query: fetchLocaleGql,
      update: (data) => data.localization.config.namespacing
    },
    namespaces: {
      query: fetchLocaleGql,
      update: (data) => data.localization.config.namespaces
    }
  }
}
</script>
