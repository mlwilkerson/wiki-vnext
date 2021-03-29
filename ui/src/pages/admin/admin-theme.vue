<template lang='pug'>
  q-page.admin-theme
    .row.q-pa-md.items-center
      .col-auto
        img.admin-icon.animated.fadeInLeft(src='~assets/icons/fluent-paint-roller.svg')
      .col.q-pl-md
        .text-h5.text-primary.animated.fadeInLeft {{ $t('admin:theme.title') }}
        .text-subtitle1.text-grey.animated.fadeInLeft.wait-p2s {{ $t('admin:theme.subtitle') }}
      .col-auto
        q-btn.q-mr-sm.acrylic-btn(
          icon='las la-question-circle'
          flat
          color='grey'
          href='https://docs.requarks.io/theming'
          target='_blank'
          )
        q-btn(
          unelevated
          icon='mdi-check'
          :label='$t(`common:actions.apply`)'
          color='secondary'
          @click='save'
          :loading='loading'
        )
    q-separator(inset)
    .row.q-pa-md.q-col-gutter-md
      .col-6
        //- -----------------------
        //- Theme Options
        //- -----------------------
        q-card.shadow-1.q-pb-sm
          q-card-section
            .text-subtitle1 {{$t('admin:theme.options')}}
          q-item(tag='label', v-ripple)
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-adjust'
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
                  size='sm'
                  )
              q-item-section(avatar)
                q-btn.q-mr-sm(
                  push
                  padding='xs md'
                  rounded
                  no-caps
                  size='sm'
                  :color='cl'
                  )
                  q-icon(name='las la-fill', size='xs', left)
                  span Pick...
                  q-menu
                    q-color(
                      v-model='config[cl + `Color`]'
                    )
          q-separator.q-my-sm(inset)
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-icons'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin:theme.iconset`)}}
              q-item-label(caption) {{$t(`admin:theme.iconsetHint`)}}
            q-item-section
              q-select(
                outlined
                v-model='config.iconset'
                :options='iconsets'
                emit-value
                map-options
                dense
                :aria-label='$t(`admin:theme.iconset`)'
                )
          //- q-separator.q-my-sm(inset)
          //- q-item(tag='label', v-ripple)
          //-   q-item-section.items-center(style='flex: 0 0 40px;')
          //-     q-icon(
          //-       name='las la-swatchbook'
          //-       color='primary'
          //-       size='sm'
          //-       )
          //-   q-item-section
          //-     q-item-label {{$t(`admin:theme.reduceMotion`)}}
          //-     q-item-label(caption) {{$t(`admin:theme.reduceMotionHint`)}}
          //-   q-item-section(avatar)
          //-     q-toggle(
          //-       v-model='config.reduceMotion'
          //-       color='primary'
          //-       checked-icon='las la-check'
          //-       unchecked-icon='las la-times'
          //-       :aria-label='$t(`admin:theme.reduceMotion`)'
          //-       )

        //- -----------------------
        //- Theme Layout
        //- -----------------------
        q-card.shadow-1.q-pb-sm.q-mt-md
          q-card-section
            .text-subtitle1 {{$t('admin:theme.layout')}}
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-ruler-vertical'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin:theme.sidebarPosition`)}}
              q-item-label(caption) {{$t(`admin:theme.sidebarPositionHint`)}}
            q-item-section.col-auto
              q-btn-toggle(
                v-model='config.sidebarPosition'
                push
                glossy
                no-caps
                toggle-color='primary'
                :options=`[
                  { label: 'Left', value: 'left' },
                  { label: 'Right', value: 'right' }
                ]`
              )
          q-separator.q-my-sm(inset)
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-outdent'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin:theme.tocPosition`)}}
              q-item-label(caption) {{$t(`admin:theme.tocPositionHint`)}}
            q-item-section.col-auto
              q-btn-toggle(
                v-model='config.tocPosition'
                push
                glossy
                no-caps
                toggle-color='primary'
                :options=`[
                  { label: 'Left', value: 'left' },
                  { label: 'Right', value: 'right' }
                ]`
              )
          q-separator.q-my-sm(inset)
          q-item(tag='label', v-ripple)
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-share-alt'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin:theme.showSharingMenu`)}}
              q-item-label(caption) {{$t(`admin:theme.showSharingMenuHint`)}}
            q-item-section(avatar)
              q-toggle(
                v-model='config.showSharingMenu'
                color='primary'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :aria-label='$t(`admin:theme.showSharingMenu`)'
                )
          q-separator.q-my-sm(inset)
          q-item(tag='label', v-ripple)
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-print'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin:theme.showPrintBtn`)}}
              q-item-label(caption) {{$t(`admin:theme.showPrintBtnHint`)}}
            q-item-section(avatar)
              q-toggle(
                v-model='config.showPrintBtn'
                color='primary'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :aria-label='$t(`admin:theme.showPrintBtn`)'
                )

      .col-6
        //- -----------------------
        //- Code Injection
        //- -----------------------
        q-card.shadow-1.q-pb-sm
          q-card-section
            .text-subtitle1 {{$t('admin:theme.codeInjection')}}
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-seedling'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin:theme.cssOverride`)}}
              q-item-label(caption) {{$t(`admin:theme.cssOverrideHint`)}}
          q-item
            q-item-section
              q-no-ssr(:placeholder='$t(`common:loading`)')
                codemirror.admin-theme-cm(
                  ref='cmCSS'
                  v-model='config.injectCSS'
                  :options='{ mode: `text/css` }'
                  @ready='onCmReady'
                )
          q-separator.q-my-sm(inset)
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-hat-wizard'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin:theme.headHtmlInjection`)}}
              q-item-label(caption) {{$t(`admin:theme.headHtmlInjectionHint`)}}
          q-item
            q-item-section
              q-no-ssr(:placeholder='$t(`common:loading`)')
                codemirror.admin-theme-cm(
                  ref='cmHead'
                  v-model='config.injectHead'
                  :options='{ mode: `text/html` }'
                  @ready='onCmReady'
                )
          q-separator.q-my-sm(inset)
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-tshirt'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin:theme.bodyHtmlInjection`)}}
              q-item-label(caption) {{$t(`admin:theme.bodyHtmlInjectionHint`)}}
          q-item
            q-item-section
              q-no-ssr(:placeholder='$t(`common:loading`)')
                codemirror.admin-theme-cm(
                  ref='cmBody'
                  v-model='config.injectBody'
                  :options='{ mode: `text/html` }'
                  @ready='onCmReady'
                )
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
        secondaryColor: '#02C39A',
        accentColor: '#f03a47',
        headerColor: '#000',
        sidebarColor: '#1976D2',
        reduceMotion: false,
        sidebarPosition: 'left',
        tocPosition: 'right',
        showSharingMenu: true,
        showPrintBtn: true
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
      this.$refs.cmCSS.codemirror.setOption('theme', newValue ? 'material-ocean' : 'elegant')
      this.$refs.cmHead.codemirror.setOption('theme', newValue ? 'material-ocean' : 'elegant')
      this.$refs.cmBody.codemirror.setOption('theme', newValue ? 'material-ocean' : 'elegant')
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
    onCmReady (cm) {
      cm.setOption('theme', this.$q.dark.isActive ? 'material-ocean' : 'elegant')
      cm.setSize(null, 200)
    },
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
.admin-theme-cm {
  border: 1px solid #CCC;
  border-radius: 5px;
  overflow: hidden;

  > .CodeMirror {
    height: 150px;
  }
}
</style>
