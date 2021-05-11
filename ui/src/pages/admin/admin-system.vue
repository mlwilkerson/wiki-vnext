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
            q-item-section(avatar)
              q-avatar(
                :color='avatarBgColor'
                rounded
                )
                q-icon(
                  :name='`img:` + icons.currentVersion'
                  size='sm'
                )
            q-item-section
              q-item-label {{ $t('admin.system.currentVersion') }}
              q-item-label(caption) {{$t('admin.system.currentVersionHint')}}
            q-item-section
              q-item-label(caption): strong.text-primary.font-robotomono {{ info.currentVersion }}
          q-separator(inset)
          q-item
            q-item-section(avatar)
              q-avatar(
                :color='avatarBgColor'
                rounded
                )
                q-icon(
                  :name='`img:` + icons.latestVersion'
                  size='sm'
                )
            q-item-section
              q-item-label {{ $t('admin.system.latestVersion') }}
              q-item-label(caption) {{$t('admin.system.latestVersionHint')}}
            q-item-section
              q-item-label(caption): strong.text-primary.font-robotomono {{ info.latestVersion }}

        //- -----------------------
        //- ENGINES
        //- -----------------------
        q-card.q-mt-md.q-pb-sm.shadow-1
          q-card-section
            .text-subtitle1 Engines
          q-item
            q-item-section(avatar)
              q-avatar(
                :color='avatarBgColor'
                rounded
                )
                q-icon(
                  :name='`img:` + icons.nodejs'
                  size='sm'
                )
            q-item-section
              q-item-label Node.js
              q-item-label(caption) {{$t('admin.system.nodejsHint')}}
            q-item-section
              q-item-label(caption): strong.text-primary.font-robotomono {{ info.nodeVersion }}
          q-separator(inset)
          q-item
            q-item-section(avatar)
              q-avatar(
                :color='avatarBgColor'
                rounded
                )
                q-icon(
                  :name='`img:` + icons.postgresql'
                  size='sm'
                )
            q-item-section
              q-item-label {{$t('admin.system.database')}}
              q-item-label(caption) {{$t('admin.system.databaseHint')}}
            q-item-section
              q-item-label(caption): strong.text-primary.font-robotomono PostgreSQL {{dbVersion}}
          q-separator(inset)
          q-item
            q-item-section(avatar)
              q-avatar(
                :color='avatarBgColor'
                rounded
                )
                q-icon(
                  :name='`img:` + icons.database'
                  size='sm'
                )
            q-item-section
              q-item-label {{$t('admin.system.databaseHost')}}
              q-item-label(caption) {{$t('admin.system.databaseHostHint')}}
            q-item-section
              q-item-label(caption): strong.text-primary.font-robotomono {{ info.dbHost }}

      .col-6
        //- -----------------------
        //- HOST INFORMATION
        //- -----------------------
        q-card.q-pb-sm.shadow-1
          q-card-section
            .text-subtitle1 {{ $t('admin.system.hostInfo') }}
          q-item
            q-item-section(avatar)
              q-avatar(
                :color='avatarBgColor'
                rounded
                )
                q-icon(
                  :name='`img:` + platformLogo'
                  size='sm'
                )
            q-item-section
              q-item-label {{ $t('admin.system.os') }}
              q-item-label(caption) The OS Wiki.js is running on.
            q-item-section
              q-item-label(caption): strong.text-primary.font-robotomono {{ (info.platform === 'docker') ? 'Docker Container (Linux)' : info.operatingSystem }}
          q-separator(inset)
          q-item
            q-item-section(avatar)
              q-avatar(
                :color='avatarBgColor'
                rounded
                )
                q-icon(
                  :name='`img:` + icons.hostname'
                  size='sm'
                )
            q-item-section
              q-item-label {{ $t('admin.system.hostname') }}
              q-item-label(caption) The hostname of the server / container.
            q-item-section
              q-item-label(caption): strong.text-primary.font-robotomono {{ info.hostname }}
          q-separator(inset)
          q-item
            q-item-section(avatar)
              q-avatar(
                :color='avatarBgColor'
                rounded
                )
                q-icon(
                  :name='`img:` + icons.cpu'
                  size='sm'
                )
            q-item-section
              q-item-label {{ $t('admin.system.cpuCores') }}
              q-item-label(caption) The number of CPU cores available to Wiki.js.
            q-item-section
              q-item-label(caption): strong.text-primary.font-robotomono {{ info.cpuCores }}
          q-separator(inset)
          q-item
            q-item-section(avatar)
              q-avatar(
                :color='avatarBgColor'
                rounded
                )
                q-icon(
                  :name='`img:` + icons.ram'
                  size='sm'
                )
            q-item-section
              q-item-label {{ $t('admin.system.totalRAM') }}
              q-item-label(caption) The total amount of RAM available to Wiki.js.
            q-item-section
              q-item-label(caption): strong.text-primary.font-robotomono {{ info.ramTotal }}
          q-separator(inset)
          q-item
            q-item-section(avatar)
              q-avatar(
                :color='avatarBgColor'
                rounded
                )
                q-icon(
                  :name='`img:` + icons.workingDir'
                  size='sm'
                )
            q-item-section
              q-item-label {{ $t('admin.system.workingDirectory') }}
              q-item-label(caption) The directory path where Wiki.js is currently running from.
            q-item-section
              q-item-label(caption): strong.text-primary.font-robotomono {{ info.workingDirectory }}
          q-separator(inset)
          q-item
            q-item-section(avatar)
              q-avatar(
                :color='avatarBgColor'
                rounded
                )
                q-icon(
                  :name='`img:` + icons.configFile'
                  size='sm'
                )
            q-item-section
              q-item-label {{ $t('admin.system.configFile') }}
              q-item-label(caption) The path to the Wiki.js configuration file.
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
      info: {},
      icons: {
        apple: require('assets/icons/ultraviolet-apple-logo.svg'),
        configFile: require('assets/icons/ultraviolet-automation.svg'),
        cpu: require('assets/icons/ultraviolet-processor.svg'),
        currentVersion: require('assets/icons/ultraviolet-breakable.svg'),
        database: require('assets/icons/ultraviolet-database.svg'),
        docker: require('assets/icons/ultraviolet-docker-container.svg'),
        hostname: require('assets/icons/ultraviolet-server.svg'),
        latestVersion: require('assets/icons/ultraviolet-cloud-checked.svg'),
        linux: require('assets/icons/ultraviolet-linux.svg'),
        nodejs: require('assets/icons/color-nodejs.svg'),
        postgresql: require('assets/icons/color-postgresql.svg'),
        ram: require('assets/icons/ultraviolet-memory-slot.svg'),
        ubuntu: require('assets/icons/ultraviolet-ubuntu.svg'),
        workingDir: require('assets/icons/ultraviolet-program.svg'),
        windows: require('assets/icons/ultraviolet-windows8.svg'),
        washingMachine: require('assets/icons/ultraviolet-washing-machine.svg')
      }
    }
  },
  computed: {
    avatarBgColor () { return this.$q.dark.isActive ? 'dark-4' : 'blue-1' },
    dbVersion () {
      return _get(this.info, 'dbVersion', '').replace(/(?:\r\n|\r|\n)/g, ', ')
    },
    platformLogo () {
      switch (this.info.platform) {
        case 'docker':
          return this.icons.docker
        case 'darwin':
          return this.icons.apple
        case 'linux':
          if (this.info.operatingSystem.indexOf('Ubuntu') >= 0) {
            return this.icons.ubuntu
          } else {
            return this.icons.linux
          }
        case 'win32':
          return this.icons.windows
        default:
          return this.icons.washingMachine
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
      fetchPolicy: 'network-only',
      update: (data) => data.systemInfo,
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
