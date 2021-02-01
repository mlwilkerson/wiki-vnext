<template lang='pug'>
  q-page.admin-system
    .row.q-pa-md.items-center
      .col-auto
        img.admin-icon.animated.fadeInLeft(src='~assets/icons/fluent-processor.svg')
      .col.q-pl-md
        .text-h5.text-primary.animated.fadeInLeft {{ $t('admin:system.title') }}
        .text-subtitle1.text-grey.animated.fadeInLeft.wait-p2s {{ $t('admin:system.subtitle') }}
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
            q-item-section(avatar)
              q-avatar(
                icon='las la-vector-square'
                text-color='white'
                rounded
                color='black'
                )
            q-item-section
              q-item-label {{ $t('admin:system.currentVersion') }}
              q-item-label(caption): strong.text-primary {{ info.currentVersion }}
          q-separator(inset)
          q-item
            q-item-section(avatar)
              q-avatar(
                icon='las la-broadcast-tower'
                text-color='white'
                rounded
                color='black'
                )
            q-item-section
              q-item-label {{ $t('admin:system.latestVersion') }}
              q-item-label(caption): strong.text-primary {{ info.latestVersion }}

        //- -----------------------
        //- ENGINES
        //- -----------------------
        q-card.q-mt-md.q-pb-sm.shadow-1
          q-card-section
            .text-subtitle1 Engines
          q-item
            q-item-section(avatar)
              q-avatar(
                icon='lab la-node-js'
                text-color='white'
                rounded
                color='black'
                )
            q-item-section
              q-item-label Node.js
              q-item-label(caption): strong.text-primary {{ info.nodeVersion }}
          q-separator(inset)
          q-item
            q-item-section(avatar)
              q-avatar(
                icon='las la-database'
                text-color='white'
                rounded
                color='black'
                )
            q-item-section
              q-item-label Database
              q-item-label(caption): strong.text-primary {{ info.dbType }} {{dbVersion}}
          q-separator(inset)
          q-item
            q-item-section(avatar)
              q-avatar(
                icon='las la-ethernet'
                text-color='white'
                rounded
                color='black'
                )
            q-item-section
              q-item-label Database Host
              q-item-label(caption): strong.text-primary {{ info.dbHost }}

      .col-6
        //- -----------------------
        //- HOST INFORMATION
        //- -----------------------
        q-card.q-pb-sm.shadow-1
          q-card-section
            .text-subtitle1 {{ $t('admin:system.hostInfo') }}
          q-item
            q-item-section(avatar)
              q-avatar(
                :icon='platformLogo'
                text-color='white'
                rounded
                color='black'
                )
            q-item-section
              q-item-label {{ $t('admin:system.os') }}
              q-item-label(caption): strong.text-primary {{ (info.platform === 'docker') ? 'Docker Container (Linux)' : info.operatingSystem }}
          q-separator(inset)
          q-item
            q-item-section(avatar)
              q-avatar(
                icon='las la-server'
                text-color='white'
                rounded
                color='black'
                )
            q-item-section
              q-item-label {{ $t('admin:system.hostname') }}
              q-item-label(caption): strong.text-primary {{ info.hostname }}
          q-separator(inset)
          q-item
            q-item-section(avatar)
              q-avatar(
                icon='las la-microchip'
                text-color='white'
                rounded
                color='black'
                )
            q-item-section
              q-item-label {{ $t('admin:system.cpuCores') }}
              q-item-label(caption): strong.text-primary {{ info.cpuCores }}
          q-separator(inset)
          q-item
            q-item-section(avatar)
              q-avatar(
                icon='las la-memory'
                text-color='white'
                rounded
                color='black'
                )
            q-item-section
              q-item-label {{ $t('admin:system.totalRAM') }}
              q-item-label(caption): strong.text-primary {{ info.ramTotal }}
          q-separator(inset)
          q-item
            q-item-section(avatar)
              q-avatar(
                icon='las la-terminal'
                text-color='white'
                rounded
                color='black'
                )
            q-item-section
              q-item-label {{ $t('admin:system.workingDirectory') }}
              q-item-label(caption): strong.text-primary {{ info.workingDirectory }}
          q-separator(inset)
          q-item
            q-item-section(avatar)
              q-avatar(
                icon='las la-file-code'
                text-color='white'
                rounded
                color='black'
                )
            q-item-section
              q-item-label {{ $t('admin:system.configFile') }}
              q-item-label(caption): strong.text-primary {{ info.configFile }}

    //-                 v-list-item-action-text {{ $t('admin:system.published') }} {{ info.latestVersionReleaseDate | moment('from') }}
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
import gql from 'graphql-tag'

// import { SelfBuildingSquareSpinner } from 'epic-spinners'

export default {
  components: {
    // SelfBuildingSquareSpinner
  },
  data () {
    return {
      isUpgrading: false,
      isUpgradingStarted: false,
      upgradeProgress: 0,
      info: {}
    }
  },
  computed: {
    dbVersion () {
      return _get(this.info, 'dbVersion', '').replace(/(?:\r\n|\r|\n)/g, ', ')
    },
    platformLogo () {
      switch (this.info.platform) {
        case 'docker':
          return 'lab la-docker'
        case 'darwin':
          return 'lab la-apple'
        case 'linux':
          if (this.info.operatingSystem.indexOf('Ubuntu')) {
            return 'lab la-ubuntu'
          } else {
            return 'lab la-linux'
          }
        case 'win32':
          return 'lab la-windows'
        default:
          return 'las la-question'
      }
    },
    isDbLimited () {
      return this.info.dbType === 'MySQL' && this.dbVersion.indexOf('5.') === 0
    },
    isLatestVersion () {
      return this.info.currentVersion === this.info.latestVersion
    }
  },
  methods: {
    async refresh () {
      await this.$apollo.queries.info.refetch()
      this.$store.commit('showNotification', {
        message: this.$t('admin:system.refreshSuccess'),
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
            mutation {
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
        query {
          system {
            info {
              configFile
              cpuCores
              currentVersion
              dbHost
              dbType
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
        }
      `,
      fetchPolicy: 'network-only',
      update: (data) => data.system.info,
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
