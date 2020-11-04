<template lang='pug'>
  q-page.admin-system
    .row.q-pa-md.items-center
      .col-auto
        img.admin-icon(src='~assets/icons/fluent-color-wheel.svg')
      .col.q-pl-md
        .text-h5.text-primary.animated.fadeInLeft {{ $t('admin:theme.title') }}
        .text-subtitle1.text-grey.animated.fadeInLeft.wait-p2s {{ $t('admin:theme.subtitle') }}
      .col-auto
        q-btn(
          unelevated
          icon='las la-save'
          :label='$t(`common:actions.apply`)'
          color='positive'
          @click='save'
          :loading='loading'
        )
    q-separator(inset)
    .row.q-pa-md.q-col-gutter-md
      .col-6
        //- -----------------------
        //- WIKI.JS
        //- -----------------------
        q-card.shadow-1.q-pb-sm
          q-card-section
            .text-subtitle1 {{$t('admin:theme.siteTheme')}}
          q-item(tag='label', v-ripple)
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-swatchbook'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin:theme.darkMode`)}}
              q-item-label(caption) {{$t(`admin:theme.darkModeHint`)}}
            q-item-section(avatar)
              q-toggle(
                v-model='config.darkMode'
                color='primary'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :aria-label='$t(`admin:theme.darkMode`)'
                )
              //- .q-field__bottom {{$t(`admin:theme.darkModeHint`)}}
          template(v-for='(cl, idx) of colorKeys')
            q-separator.q-my-sm(inset)
            q-item(:key='cl')
              q-item-section.items-center(style='flex: 0 0 40px;')
                q-icon(
                  name='las la-palette'
                  color='primary'
                  size='sm'
                  )
              q-item-section
                q-item-label {{$t(`admin:theme.` + cl + `Color`)}}
                q-item-label(caption) {{$t(`admin:theme.` + cl + `ColorHint`)}}
              q-item-section(avatar)
                q-btn(
                  flat
                  padding='xs sm'
                  icon='las la-undo-alt'
                  color='grey'
                  )
              q-item-section(avatar)
                q-btn.q-mr-sm(
                  unelevated
                  padding='xs sm'
                  icon='las la-fill'
                  :color='cl'
                  )
                  q-menu
                    q-color(
                      v-model='config[cl + `Color`]'
                    )
          q-separator.q-my-sm(inset)
          q-item
            q-item-section
              q-select(
                outlined
                v-model='config.iconset'
                :options='iconsets'
                emit-value
                map-options
                :label='$t(`admin:theme.iconset`)'
                :hint='$t(`admin:theme.iconsetHint`)'
                :aria-label='$t(`admin:theme.iconset`)'
                )
                template(v-slot:prepend)
                  q-icon(name='las la-icons', color='primary')
  //- v-container(fluid, grid-list-lg)
  //-       v-form.pt-3
  //-         v-layout(row wrap)
  //-           v-flex(lg6 xs12)
  //-             v-card.animated.fadeInUp
  //-               v-toolbar(color='primary', dark, dense, flat)
  //-                 v-toolbar-title.subtitle-1 {{$t('admin:theme.title')}}
  //-               v-card-text
  //-                 v-select(
  //-                   :items='themes'
  //-                   outlined
  //-                   prepend-icon='mdi-palette'
  //-                   v-model='config.theme'
  //-                   :label='$t(`admin:theme.siteTheme`)'
  //-                   persistent-hint
  //-                   :hint='$t(`admin:theme.siteThemeHint`)'
  //-                   )
  //-                   template(slot='item', slot-scope='data')
  //-                     v-list-item-avatar
  //-                       v-icon.blue--text(dark) mdi-image-filter-frames
  //-                     v-list-item-content
  //-                       v-list-item-title(v-html='data.item.text')
  //-                       v-list-item-sub-title(v-html='data.item.author')
  //-                 v-select.mt-3(
  //-                   :items='iconsets'
  //-                   outlined
  //-                   prepend-icon='mdi-paw'
  //-                   v-model='config.iconset'
  //-                   :label='$t(`admin:theme.iconset`)'
  //-                   persistent-hint
  //-                   :hint='$t(`admin:theme.iconsetHint`)'
  //-                   )
  //-                 v-divider.mt-3
  //-                 v-switch(
  //-                   inset
  //-                   v-model='darkMode'
  //-                   :label='$t(`admin:theme.darkMode`)'
  //-                   color='primary'
  //-                   persistent-hint
  //-                   :hint='$t(`admin:theme.darkModeHint`)'
  //-                   )

  //-             v-card.mt-3.animated.fadeInUp.wait-p1s
  //-               v-toolbar(color='primary', dark, dense, flat)
  //-                 v-toolbar-title.subtitle-1 {{$t(`admin:theme.options`)}}
  //-                 v-spacer
  //-                 v-chip(label, color='white', small).primary--text coming soon
  //-               v-card-text
  //-                 v-select(
  //-                   :items='[]'
  //-                   outlined
  //-                   prepend-icon='mdi-border-vertical'
  //-                   v-model='config.iconset'
  //-                   label='Table of Contents Position'
  //-                   persistent-hint
  //-                   hint='Select whether the table of contents is shown on the left, right or not at all.'
  //-                   disabled
  //-                   )

  //-           v-flex(lg6 xs12)
              //- v-card.animated.fadeInUp.wait-p2s
              //-   v-toolbar(color='teal', dark, dense, flat)
              //-     v-toolbar-title.subtitle-1 {{$t('admin:theme.downloadThemes')}}
              //-     v-spacer
              //-     v-chip(label, color='white', small).teal--text coming soon
              //-   v-data-table(
              //-     :headers='headers',
              //-     :items='themes',
              //-     hide-default-footer,
              //-     item-key='value',
              //-     :items-per-page='1000'
              //-   )
              //-     template(v-slot:item='thm')
              //-       td
              //-         strong {{thm.item.text}}
              //-       td
              //-         span {{ thm.item.author }}
              //-       td.text-xs-center
              //-         v-progress-circular(v-if='thm.item.isDownloading', indeterminate, color='blue', size='20', :width='2')
              //-         v-btn(v-else-if='thm.item.isInstalled && thm.item.installDate < thm.item.updatedAt', icon)
              //-           v-icon.blue--text mdi-cached
              //-         v-btn(v-else-if='thm.item.isInstalled', icon)
              //-           v-icon.green--text mdi-check-bold
              //-         v-btn(v-else, icon)
              //-           v-icon.grey--text mdi-cloud-download

              //- v-card.animated.fadeInUp.wait-p2s
              //-   v-toolbar(color='primary', dark, dense, flat)
              //-     v-toolbar-title.subtitle-1 {{$t(`admin:theme.codeInjection`)}}
              //-   v-card-text
              //-     v-textarea.is-monospaced(
              //-       v-model='config.injectCSS'
              //-       :label='$t(`admin:theme.cssOverride`)'
              //-       outlined
              //-       color='primary'
              //-       persistent-hint
              //-       :hint='$t(`admin:theme.cssOverrideHint`)'
              //-       auto-grow
              //-       )
              //-     i18next.caption.pl-2.ml-1(path='admin:theme.cssOverrideWarning', tag='div')
              //-       strong.red--text(place='caution') {{$t('admin:theme.cssOverrideWarningCaution')}}
              //-       code(place='cssClass') .contents
              //-     v-textarea.is-monospaced.mt-3(
              //-       v-model='config.injectHead'
              //-       :label='$t(`admin:theme.headHtmlInjection`)'
              //-       outlined
              //-       color='primary'
              //-       persistent-hint
              //-       :hint='$t(`admin:theme.headHtmlInjectionHint`)'
              //-       auto-grow
              //-       )
              //-     v-textarea.is-monospaced.mt-2(
              //-       v-model='config.injectBody'
              //-       :label='$t(`admin:theme.bodyHtmlInjection`)'
              //-       outlined
              //-       color='primary'
              //-       persistent-hint
              //-       :hint='$t(`admin:theme.bodyHtmlInjectionHint`)'
              //-       auto-grow
              //-       )
</template>

<script>
import gql from 'graphql-tag'
// import { sync } from 'vuex-pathify'
import _get from 'lodash/get'
// import clone from 'lodash/clone'
import { colors } from 'quasar'

export default {
  data () {
    return {
      loading: false,
      iconsets: [
        { label: 'Material Design Icons (default)', value: 'mdi' },
        { label: 'Font Awesome 5', value: 'fa' },
        { label: 'Font Awesome 4', value: 'fa4' }
      ],
      colorKeys: [
        'primary',
        'secondary',
        'accent',
        'header',
        'sidebar'
      ],
      config: {
        darkMode: false,
        iconset: 'mdi',
        injectCSS: '',
        injectHead: '',
        injectBody: '',
        primaryColor: '#1976D2',
        secondaryColor: '#26A69A',
        accentColor: '#9c27b0',
        headerColor: '#000',
        sidebarColor: '#1976D2'
      },
      darkModeInitial: false
    }
  },
  computed: {
    headers () {
      return [
        {
          text: this.$t('admin:theme.downloadName'),
          align: 'left',
          value: 'text'
        },
        {
          text: this.$t('admin:theme.downloadAuthor'),
          align: 'left',
          value: 'author'
        },
        {
          text: this.$t('admin:theme.downloadDownload'),
          align: 'center',
          value: 'value',
          sortable: false,
          width: 100
        }
      ]
    }
  },
  watch: {
    'config.darkMode' (newValue) {
      this.$q.dark.set(newValue)
    },
    'config.primaryColor' (newValue) {
      colors.setBrand('primary', newValue)
    },
    'config.secondaryColor' (newValue) {
      colors.setBrand('secondary', newValue)
    },
    'config.accentColor' (newValue) {
      colors.setBrand('accent', newValue)
    },
    'config.headerColor' (newValue) {
      colors.setBrand('header', newValue)
    },
    'config.sidebarColor' (newValue) {
      colors.setBrand('sidebar', newValue)
    }
  },
  mounted () {
    this.darkModeInitial = this.darkMode
  },
  beforeDestroy () {
    this.darkMode = this.darkModeInitial
    this.$vuetify.theme.dark = this.darkModeInitial
  },
  methods: {
    async save () {
      this.loading = true
      this.$store.commit('loadingStart', 'admin-theme-save')
      try {
        const respRaw = await this.$apollo.mutate({
          mutation: gql`
            mutation(
              $theme: String!
              $iconset: String!
              $darkMode: Boolean!
              $injectCSS: String
              $injectHead: String
              $injectBody: String
              ) {
              theming {
                setConfig(
                  theme: $theme
                  iconset: $iconset
                  darkMode: $darkMode
                  injectCSS: $injectCSS
                  injectHead: $injectHead
                  injectBody: $injectBody
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
            theme: this.config.theme,
            iconset: this.config.iconset,
            darkMode: this.darkMode,
            injectCSS: this.config.injectCSS,
            injectHead: this.config.injectHead,
            injectBody: this.config.injectBody
          }
        })
        const resp = _get(respRaw, 'data.theming.setConfig.responseResult', {})
        if (resp.succeeded) {
          this.darkModeInitial = this.darkMode
          this.$store.commit('showNotification', {
            message: 'Theme settings updated successfully.',
            style: 'success',
            icon: 'check'
          })
        } else {
          throw new Error(resp.message)
        }
      } catch (err) {
        this.$store.commit('pushGraphError', err)
      }
      this.$store.commit('loadingStop', 'admin-theme-save')
      this.loading = false
    }
  }
  // apollo: {
  //   config: {
  //     query: gql`
  //       {
  //         theming {
  //           config {
  //             theme
  //             iconset
  //             darkMode
  //             injectCSS
  //             injectHead
  //             injectBody
  //           }
  //         }
  //       }
  //     `,
  //     fetchPolicy: 'network-only',
  //     update: (data) => clone(data.theming.config),
  //     watchLoading (isLoading) {
  //       this.$store.commit(`loading${isLoading ? 'Start' : 'Stop'}`, 'admin-theme-refresh')
  //     }
  //   }
  // }
}
</script>

<style lang='scss'>
.v-textarea.is-monospaced textarea {
  font-family: 'Roboto Mono', 'Courier New', Courier, monospace;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
}
</style>
