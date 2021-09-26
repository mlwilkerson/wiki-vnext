<template lang='pug'>
q-page.admin-system
  .row.q-pa-md.items-center
    .col-auto
      img.admin-icon.animated.fadeInLeft(src='~assets/icons/fluent-processor.svg')
    .col.q-pl-md
      .text-h5.text-primary.animated.fadeInLeft {{ $t('admin.system.title') }}
      .text-subtitle1.text-grey.animated.fadeInLeft.wait-p2s {{ $t('admin.system.subtitle') }}
    .col-auto
      q-btn(
        outline
        icon='las la-clipboard'
        label='Copy System Info'
        color='primary'
      )
  q-separator(inset)
  .row.q-pa-md.q-col-gutter-md
    .col-6
      //- -----------------------
      //- WIKI.JS
      //- -----------------------
      q-card.q-pb-sm.shadow-1
        q-card-section
          .text-subtitle1 Wiki.js
        q-item
          blueprint-icon(icon='breakable')
          q-item-section
            q-item-label {{ $t('admin.system.currentVersion') }}
            q-item-label(caption) {{$t('admin.system.currentVersionHint')}}
          q-item-section
            q-item-label(caption): strong.text-primary.font-robotomono {{ info.currentVersion }}
        q-separator(inset)
        q-item
          blueprint-icon(icon='cloud-checked')
          q-item-section
            q-item-label {{ $t('admin.system.latestVersion') }}
            q-item-label(caption) {{$t('admin.system.latestVersionHint')}}
          q-item-section
            q-item-label(caption): strong.text-primary.font-robotomono {{ info.latestVersion }}

      //- -----------------------
      //- CLIENT
      //- -----------------------
      q-no-ssr
        q-card.q-mt-md.q-pb-sm.shadow-1
          q-card-section
            .text-subtitle1 {{$t('admin.system.client')}}
          q-item
            blueprint-icon(icon='navigation-toolbar-top')
            q-item-section
              q-item-label {{$t('admin.system.browser')}}
              q-item-label(caption) {{$t('admin.system.browserHint')}}
            q-item-section
              q-item-label(caption): strong.text-primary.font-robotomono {{ clientBrowser }}
          q-separator(inset)
          q-item
            blueprint-icon(icon='computer')
            q-item-section
              q-item-label {{$t('admin.system.clientPlatform')}}
              q-item-label(caption) {{$t('admin.system.clientPlatformHint')}}
            q-item-section
              q-item-label(caption): strong.text-primary.font-robotomono {{ clientPlatform }}
          q-separator(inset)
          q-item
            blueprint-icon(icon='translation')
            q-item-section
              q-item-label {{$t('admin.system.clientLanguage')}}
              q-item-label(caption) {{$t('admin.system.clientLanguageHint')}}
            q-item-section
              q-item-label(caption): strong.text-primary.font-robotomono {{ clientLanguage }}
          q-separator(inset)
          q-item
            blueprint-icon(icon='cookies')
            q-item-section
              q-item-label {{$t('admin.system.clientCookies')}}
              q-item-label(caption) {{$t('admin.system.clientCookiesHint')}}
            q-item-section
              q-item-label(caption): strong.text-primary.font-robotomono {{ clientCookies }}
          q-separator(inset)
          q-item
            blueprint-icon(icon='widescreen')
            q-item-section
              q-item-label {{$t('admin.system.clientViewport')}}
              q-item-label(caption) {{$t('admin.system.clientViewportHint')}}
            q-item-section
              q-item-label(caption): strong.text-primary.font-robotomono {{ clientViewport }}

    .col-6
      //- -----------------------
      //- ENGINES
      //- -----------------------
      q-card.q-pb-sm.shadow-1
        q-card-section
          .text-subtitle1 {{$t('admin.system.engines')}}
        q-item
          blueprint-icon(icon='nodejs')
          q-item-section
            q-item-label Node.js
            q-item-label(caption) {{$t('admin.system.nodejsHint')}}
          q-item-section
            q-item-label(caption): strong.text-primary.font-robotomono {{ info.nodeVersion }}
        q-separator(inset)
        q-item
          blueprint-icon(icon='postgresql')
          q-item-section
            q-item-label {{$t('admin.system.database')}}
            q-item-label(caption) {{$t('admin.system.databaseHint')}}
          q-item-section
            q-item-label(caption): strong.text-primary.font-robotomono PostgreSQL {{dbVersion}}
        q-separator(inset)
        q-item
          blueprint-icon(icon='database')
          q-item-section
            q-item-label {{$t('admin.system.databaseHost')}}
            q-item-label(caption) {{$t('admin.system.databaseHostHint')}}
          q-item-section
            q-item-label(caption): strong.text-primary.font-robotomono {{ info.dbHost }}

      //- -----------------------
      //- HOST INFORMATION
      //- -----------------------
      q-card.q-mt-md.q-pb-sm.shadow-1
        q-card-section
          .text-subtitle1 {{ $t('admin.system.hostInfo') }}
        q-item
          blueprint-icon(:icon='platformLogo')
          q-item-section
            q-item-label {{ $t('admin.system.os') }}
            q-item-label(caption) {{$t('admin.system.osHint')}}
          q-item-section
            q-item-label(caption): strong.text-primary.font-robotomono {{ (info.platform === 'docker') ? 'Docker Container (Linux)' : info.operatingSystem }}
        q-separator(inset)
        q-item
          blueprint-icon(icon='server')
          q-item-section
            q-item-label {{ $t('admin.system.hostname') }}
            q-item-label(caption) {{$t('admin.system.hostnameHint')}}
          q-item-section
            q-item-label(caption): strong.text-primary.font-robotomono {{ info.hostname }}
        q-separator(inset)
        q-item
          blueprint-icon(icon='processor')
          q-item-section
            q-item-label {{ $t('admin.system.cpuCores') }}
            q-item-label(caption) {{$t('admin.system.cpuCoresHint')}}
          q-item-section
            q-item-label(caption): strong.text-primary.font-robotomono {{ info.cpuCores }}
        q-separator(inset)
        q-item
          blueprint-icon(icon='memory-slot')
          q-item-section
            q-item-label {{ $t('admin.system.totalRAM') }}
            q-item-label(caption) {{$t('admin.system.totalRAMHint')}}
          q-item-section
            q-item-label(caption): strong.text-primary.font-robotomono {{ info.ramTotal }}
        q-separator(inset)
        q-item
          blueprint-icon(icon='program')
          q-item-section
            q-item-label {{ $t('admin.system.workingDirectory') }}
            q-item-label(caption) {{$t('admin.system.workingDirectoryHint')}}
          q-item-section
            q-item-label(caption): strong.text-primary.font-robotomono {{ info.workingDirectory }}
        q-separator(inset)
        q-item
          blueprint-icon(icon='automation')
          q-item-section
            q-item-label {{ $t('admin.system.configFile') }}
            q-item-label(caption) {{$t('admin.system.configFileHint')}}
          q-item-section
            q-item-label(caption): strong.text-primary.font-robotomono {{ info.configFile }}

  //-                 v-list-item-action-text {{ $t('admin.system.published') }} {{ info.latestVersionReleaseDate | moment('from') }}
  //-           v-card-actions(v-if='info.upgradeCapable && !isLatestVersion && info.platform === `docker`', :class='$vuetify.theme.dark ? `grey darken-3-d5` : `indigo lighten-5`')
  //-             .caption.indigo--text.pl-3(:class='$vuetify.theme.dark ? `text--lighten-4` : ``') Wiki.js can perform the upgrade to the latest version for you.
  //-             v-spacer
  //-             v-btn.px-3(
  //-               color='indigo'
  //-               dark
  //-               @click='performUpgrade'
  //-               )
  //-               v-icon(left) mdi-upload
  //-               span Perform Upgrade

  //- v-dialog(
  //-   v-model='isUpgrading'
  //-   persistent
  //-   width='450'
  //-   )
  //-   v-card.blue.darken-5(dark)
  //-     v-card-text.text-center.pa-10
  //-       self-building-square-spinner(
  //-         :animation-duration='4000'
  //-         :size='40'
  //-         color='#FFF'
  //-         style='margin: 0 auto;'
  //-         )
  //-       .body-2.mt-5.blue--text.text--lighten-4 Your Wiki.js container is being upgraded...
  //-       .caption.blue--text.text--lighten-2 Please wait
  //-       v-progress-linear.mt-5(
  //-         color='blue lighten-2'
  //-         :value='upgradeProgress'
  //-         :buffer-value='upgradeProgress'
  //-         rounded
  //-         :stream='isUpgradingStarted'
  //-         query
  //-         :indeterminate='!isUpgradingStarted'
  //-       )
</template>

<script>
import _get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import gql from 'graphql-tag'

// import { SelfBuildingSquareSpinner } from 'epic-spinners'

export default {
  components: {
    // SelfBuildingSquareSpinner
  },
  meta () {
    return {
      title: this.$t('admin.system.title')
    }
  },
  data () {
    return {
      isUpgrading: false,
      isUpgradingStarted: false,
      upgradeProgress: 0,
      info: {
        platform: ''
      }
    }
  },
  computed: {
    dbVersion () {
      return _get(this.info, 'dbVersion', '').replace(/(?:\r\n|\r|\n)/g, ', ')
    },
    platformLogo () {
      switch (this.info.platform) {
        case 'docker':
          return 'docker-container'
        case 'darwin':
          return 'apple-logo'
        case 'linux':
          if (this.info.operatingSystem.indexOf('Ubuntu') >= 0) {
            return 'ubuntu'
          } else {
            return 'linux'
          }
        case 'win32':
          return 'windows8'
        default:
          return 'washing-machine'
      }
    },
    isDbLimited () {
      return this.info.dbType === 'MySQL' && this.dbVersion.indexOf('5.') === 0
    },
    isLatestVersion () {
      return this.info.currentVersion === this.info.latestVersion
    },
    clientBrowser () {
      return process.env.CLIENT ? navigator.userAgent : ''
    },
    clientPlatform () {
      return process.env.CLIENT ? navigator.platform : ''
    },
    clientLanguage () {
      return process.env.CLIENT ? navigator.language : ''
    },
    clientCookies () {
      return process.env.CLIENT ? navigator.cookieEnabled : ''
    },
    clientViewport () {
      return process.env.CLIENT ? `${document.documentElement.clientWidth}x${document.documentElement.clientHeight}` : ''
    }
  },
  methods: {
    async refresh () {
      await this.$apollo.queries.info.refetch()
      this.$store.commit('showNotification', {
        message: this.$t('admin.system.refreshSuccess'),
        style: 'success',
        icon: 'cached'
      })
    },
    async performUpgrade () {
      this.isUpgrading = true
      this.isUpgradingStarted = false
      this.upgradeProgress = 0
      this.$store.commit('loadingStart', 'admin-system-upgrade')
      try {
        const respRaw = await this.$apollo.mutate({
          mutation: gql`
            mutation performUpdate {
              system {
                performUpgrade {
                  responseResult {
                    succeeded
                    errorCode
                    slug
                    message
                  }
                }
              }
            }
          `
        })
        const resp = _get(respRaw, 'data.system.performUpgrade.responseResult', {})
        if (resp.succeeded) {
          this.isUpgradingStarted = true
          const progressInterval = setInterval(() => {
            this.upgradeProgress += 0.83
          }, 500)
          setTimeout(() => {
            clearInterval(progressInterval)
            window.location.reload(true)
          }, 60000)
        } else {
          throw new Error(resp.message)
        }
      } catch (err) {
        this.$store.commit('pushGraphError', err)
        this.$store.commit('loadingStop', 'admin-system-upgrade')
        this.isUpgrading = false
      }
    }
  },
  apollo: {
    info: {
      query: gql`
        query getSystemInfo {
          systemInfo {
            configFile
            cpuCores
            currentVersion
            dbHost
            dbVersion
            hostname
            latestVersion
            latestVersionReleaseDate
            nodeVersion
            operatingSystem
            platform
            ramTotal
            upgradeCapable
            workingDirectory
          }
        }
      `,
      prefetch: false,
      fetchPolicy: 'network-only',
      update: (data) => cloneDeep(data.systemInfo),
      watchLoading (isLoading) {
        this.$store.commit(`loading${isLoading ? 'Start' : 'Stop'}`, 'admin-system-refresh')
      }
    }
  }
}
</script>

<style lang='scss'>
.admin-system {
  .v-list-item-title, .v-list-item__subtitle {
    user-select: text;
  }
}
</style>
