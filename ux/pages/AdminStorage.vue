<template lang='pug'>
q-page.admin-storage
  .row.q-pa-md.items-center
    .col-auto
      img.admin-icon.animated.fadeInLeft(src='/_assets/icons/fluent-ssd.svg')
    .col.q-pl-md
      .text-h5.text-primary.animated.fadeInLeft {{ $t('admin.storage.title') }}
      .text-subtitle1.text-grey.animated.fadeInLeft.wait-p2s {{ $t('admin.storage.subtitle') }}
    .col-auto
      q-spinner-tail.q-mr-md(
        v-show='loading > 0'
        color='accent'
        size='sm'
      )
      q-btn.q-mr-sm.acrylic-btn(
        icon='las la-question-circle'
        flat
        color='grey'
        href='https://docs.js.wiki/admin/storage'
        target='_blank'
        type='a'
        )
      q-btn(
        unelevated
        icon='mdi-check'
        :label='$t(`common.actions.apply`)'
        color='secondary'
        @click='save'
        :loading='loading > 0'
      )
  q-separator(inset)
  .row.q-pa-md.q-col-gutter-md
    .col-auto
      q-card.rounded-borders.bg-dark
        q-list(
          style='min-width: 350px;'
          padding
          dark
          )
          q-item(
            v-for='tgt of targets'
            :key='tgt.key'
            active-class='bg-primary text-white'
            :active='selectedTarget === tgt.id'
            @click='selectedTarget = tgt.id'
            clickable
            )
            q-item-section(side)
              q-icon(
                :name='`img:` + tgt.icon'
              )
            q-item-section
              q-item-label {{tgt.title}}
              q-item-label(caption, :class='!tgt.isEnabled ? `text-grey-7` : `text-positive`') {{getTargetSubtitle(tgt)}}
            q-item-section(side)
              q-spinner-rings(:color='tgt.isEnabled ? `positive` : `negative`', size='sm')
    .col(v-if='target')
      //- -----------------------
      //- Content Types
      //- -----------------------
      q-card.shadow-1.q-pb-sm
        q-card-section
          .text-subtitle1 {{$t('admin.storage.contentTypes')}}
          .text-body2.text-grey {{ $t('admin.storage.contentTypesHint') }}
        q-item(tag='label')
          q-item-section(avatar)
            q-checkbox(
              v-model='target.contentTypes.activeTypes'
              :color='target.module === `db` ? `grey` : `primary`'
              val='pages'
              :aria-label='$t(`admin.storage.contentTypePages`)'
              :disable='target.module === `db`'
              )
          q-item-section
            q-item-label {{$t(`admin.storage.contentTypePages`)}}
            q-item-label(caption) {{$t(`admin.storage.contentTypePagesHint`)}}
        q-item(tag='label')
          q-item-section(avatar)
            q-checkbox(
              v-model='target.contentTypes.activeTypes'
              color='primary'
              val='images'
              :aria-label='$t(`admin.storage.contentTypeImages`)'
              )
          q-item-section
            q-item-label {{$t(`admin.storage.contentTypeImages`)}}
            q-item-label(caption) {{$t(`admin.storage.contentTypeImagesHint`)}}
        q-item(tag='label')
          q-item-section(avatar)
            q-checkbox(
              v-model='target.contentTypes.activeTypes'
              color='primary'
              val='documents'
              :aria-label='$t(`admin.storage.contentTypeDocuments`)'
              )
          q-item-section
            q-item-label {{$t(`admin.storage.contentTypeDocuments`)}}
            q-item-label(caption) {{$t(`admin.storage.contentTypeDocumentsHint`)}}
        q-item(tag='label')
          q-item-section(avatar)
            q-checkbox(
              v-model='target.contentTypes.activeTypes'
              color='primary'
              val='others'
              :aria-label='$t(`admin.storage.contentTypeOthers`)'
              )
          q-item-section
            q-item-label {{$t(`admin.storage.contentTypeOthers`)}}
            q-item-label(caption) {{$t(`admin.storage.contentTypeOthersHint`)}}
        q-item(tag='label')
          q-item-section(avatar)
            q-checkbox(
              v-model='target.contentTypes.activeTypes'
              color='primary'
              val='large'
              :aria-label='$t(`admin.storage.contentTypeLargeFiles`)'
              )
          q-item-section
            q-item-label {{$t(`admin.storage.contentTypeLargeFiles`)}}
            q-item-label(caption) {{$t(`admin.storage.contentTypeLargeFilesHint`)}}
            q-item-label.text-red(v-if='target.module === `db`', caption) {{$t(`admin.storage.contentTypeLargeFilesDBWarn`)}}
          q-item-section(side)
            q-input(
              outlined
              :label='$t(`admin.storage.contentTypeLargeFilesThreshold`)'
              v-model='target.contentTypes.largeThreshold'
              style='min-width: 150px;'
              dense
            )

      //- -----------------------
      //- Content Delivery
      //- -----------------------
      q-card.shadow-1.q-pb-sm.q-mt-md
        q-card-section
          .text-subtitle1 {{$t('admin.storage.assetDelivery')}}
          .text-body2.text-grey {{ $t('admin.storage.assetDeliveryHint') }}
        q-item(:tag='target.assetDelivery.isStreamingSupported ? `label` : null')
          q-item-section(avatar)
            q-checkbox(
              v-model='target.assetDelivery.streaming'
              :color='target.module === `db` || !target.assetDelivery.isStreamingSupported ? `grey` : `primary`'
              :aria-label='$t(`admin.storage.contentTypePages`)'
              :disable='target.module === `db` || !target.assetDelivery.isStreamingSupported'
              )
          q-item-section
            q-item-label {{$t(`admin.storage.assetStreaming`)}}
            q-item-label(caption) {{$t(`admin.storage.assetStreamingHint`)}}
            q-item-label.text-red(v-if='!target.assetDelivery.isStreamingSupported', caption) {{$t(`admin.storage.assetStreamingNotSupported`)}}
        q-item(:tag='target.assetDelivery.isDirectAccessSupported ? `label` : null')
          q-item-section(avatar)
            q-checkbox(
              v-model='target.assetDelivery.directAccess'
              :color='!target.assetDelivery.isDirectAccessSupported ? `grey` : `primary`'
              :aria-label='$t(`admin.storage.contentTypePages`)'
              :disable='!target.assetDelivery.isDirectAccessSupported'
              )
          q-item-section
            q-item-label {{$t(`admin.storage.assetDirectAccess`)}}
            q-item-label(caption) {{$t(`admin.storage.assetDirectAccessHint`)}}
            q-item-label.text-red(v-if='!target.assetDelivery.isDirectAccessSupported', caption) {{$t(`admin.storage.assetDirectAccessNotSupported`)}}

      //- -----------------------
      //- Configuration
      //- -----------------------
      q-card.shadow-1.q-pb-sm.q-mt-md
        q-card-section
          .text-subtitle1 {{$t('admin.storage.config')}}
          q-banner.q-mt-md(
            v-if='!target.config || Object.keys(target.config).length < 1'
            rounded
            :class='$q.dark.isActive ? `bg-negative text-white` : `bg-grey-2 text-grey-7`'
            ) {{$t('admin.storage.noConfigOption')}}
        template(
          v-for='(cfg, cfgKey, idx) in target.config'
          )
          template(
            v-if='configIfCheck(cfg.if)'
            )
            q-separator.q-my-sm(inset, v-if='idx > 0')
            q-item(v-if='cfg.type === `Boolean`', tag='label')
              blueprint-icon(:icon='cfg.icon')
              q-item-section
                q-item-label {{cfg.title}}
                q-item-label(caption) {{cfg.hint}}
              q-item-section(avatar)
                q-toggle(
                  v-model='cfg.value'
                  color='primary'
                  checked-icon='las la-check'
                  unchecked-icon='las la-times'
                  :aria-label='$t(`admin.general.allowComments`)'
                  )
            q-item(v-else)
              blueprint-icon(:icon='cfg.icon')
              q-item-section
                q-item-label {{cfg.title}}
                q-item-label(caption) {{cfg.hint}}
              q-item-section(
                :style='cfg.type === `Number` ? `flex: 0 0 150px;` : ``'
                :class='{ "col-auto": cfg.enum && cfg.enumDisplay === `buttons` }'
                )
                q-btn-toggle(
                  v-if='cfg.enum && cfg.enumDisplay === `buttons`'
                  v-model='cfg.value'
                  push
                  glossy
                  no-caps
                  toggle-color='primary'
                  :options=`cfg.enum`
                )
                q-select(
                  v-else-if='cfg.enum'
                  outlined
                  v-model='cfg.value'
                  :options='cfg.enum'
                  emit-value
                  map-options
                  dense
                  options-dense
                  :aria-label='cfg.title'
                )
                q-input(
                  v-else
                  outlined
                  v-model='cfg.value'
                  dense
                  :type='cfg.multiline ? `textarea` : `input`'
                  :aria-label='cfg.title'
                  )

      //- -----------------------
      //- Sync
      //- -----------------------
      q-card.shadow-1.q-pb-sm.q-mt-md
        q-card-section
          .text-subtitle1 {{$t('admin.storage.sync')}}
          q-banner.q-mt-md(
            v-if='!target.sync || Object.keys(target.sync).length < 1'
            rounded
            :class='$q.dark.isActive ? `bg-negative text-white` : `bg-grey-2 text-grey-7`'
            ) {{$t('admin.storage.noSyncModes')}}

      //- -----------------------
      //- Actions
      //- -----------------------
      q-card.shadow-1.q-pb-sm.q-mt-md
        q-card-section
          .text-subtitle1 {{$t('admin.storage.actions')}}
          q-banner.q-mt-md(
            v-if='!target.actions || target.actions.length < 1'
            rounded
            :class='$q.dark.isActive ? `bg-negative text-white` : `bg-grey-2 text-grey-7`'
            ) {{$t('admin.storage.noActions')}}
          q-banner.q-mt-md(
            v-else-if='!target.isEnabled'
            rounded
            :class='$q.dark.isActive ? `bg-negative text-white` : `bg-grey-2 text-grey-7`'
            ) {{$t('admin.storage.actionsInactiveWarn')}}

        template(
          v-if='target.isEnabled'
          v-for='(act, idx) in target.actions'
          )
          q-separator.q-my-sm(inset, v-if='idx > 0')
          q-item
            blueprint-icon.self-start(:icon='act.icon', :hue-rotate='45')
            q-item-section
              q-item-label {{act.label}}
              q-item-label(caption) {{act.hint}}
              q-item-label.text-red(v-if='act.warn', caption): strong {{act.warn}}
            q-item-section(side)
              q-btn.acrylic-btn(
                flat
                icon='las la-arrow-circle-right'
                color='primary'
                @click=''
                :label='$t(`common.actions.proceed`)'
              )

    .col-auto(v-if='target')
      //- -----------------------
      //- Infobox
      //- -----------------------
      q-card.rounded-borders.q-pb-md(style='width: 350px;')
        q-card-section
          .text-subtitle1 {{target.title}}
          q-img.q-mt-sm.rounded-borders(
            :src='target.banner'
            fit='cover'
          )
          .text-body2.q-mt-md {{target.description}}
        q-separator.q-mb-sm(inset)
        q-item
          q-item-section
            q-item-label.text-grey {{$t(`admin.storage.vendor`)}}
            q-item-label {{target.vendor}}
        q-separator.q-my-sm(inset)
        q-item
          q-item-section
            q-item-label.text-grey {{$t(`admin.storage.vendorWebsite`)}}
            q-item-label: a(:href='target.website', target='_blank', rel='noreferrer') {{target.website}}

      //- -----------------------
      //- Status
      //- -----------------------
      q-card.rounded-borders.q-pb-md.q-mt-md(style='width: 350px;')
        q-card-section
          .text-subtitle1 Status
        q-item(:tag='target.module !== `db` ? `label` : null')
          q-item-section
            q-item-label {{$t(`admin.storage.enabled`)}}
            q-item-label(caption) {{$t(`admin.storage.enabledHint`)}}
            q-item-label.text-red(v-if='target.module === `db`', caption) {{$t(`admin.storage.enabledForced`)}}
          q-item-section(avatar)
            q-toggle(
              v-model='target.isEnabled'
              :disable='target.module === `db`'
              color='primary'
              checked-icon='las la-check'
              unchecked-icon='las la-times'
              :aria-label='$t(`admin.general.allowSearch`)'
              )
        q-separator.q-my-sm(inset)
        q-item
          q-item-section
            q-item-label.text-grey {{$t(`admin.storage.currentState`)}}
            q-item-label.text-positive No issues detected.

      //- -----------------------
      //- Versioning
      //- -----------------------
      q-card.rounded-borders.q-pb-md.q-mt-md(style='width: 350px;')
        q-card-section
          .text-subtitle1 {{$t(`admin.storage.versioning`)}}
          .text-body2.text-grey {{$t(`admin.storage.versioningHint`)}}
        q-item(:tag='target.versioning.isSupported ? `label` : null')
          q-item-section
            q-item-label {{$t(`admin.storage.useVersioning`)}}
            q-item-label(caption) {{$t(`admin.storage.useVersioningHint`)}}
            q-item-label.text-red(v-if='!target.versioning.isSupported', caption) {{$t(`admin.storage.versioningNotSupported`)}}
            q-item-label.text-red(v-if='target.versioning.isForceEnabled', caption) {{$t(`admin.storage.versioningForceEnabled`)}}
          q-item-section(avatar)
            q-toggle(
              v-model='target.versioning.enabled'
              :disable='!target.versioning.isSupported || target.versioning.isForceEnabled'
              color='primary'
              checked-icon='las la-check'
              unchecked-icon='las la-times'
              :aria-label='$t(`admin.storage.useVersioning`)'
              )
  //-             v-divider.mt-3
  //-             .overline.my-5 {{$t('admin.storage.syncDirection')}}
  //-             .body-2.ml-3 {{$t('admin.storage.syncDirectionSubtitle')}}
  //-             .pr-3.pt-3
  //-               v-radio-group.ml-3.py-0(v-model='target.mode')
  //-                 v-radio(
  //-                   :label='$t(`admin.storage.syncDirBi`)'
  //-                   color='primary'
  //-                   value='sync'
  //-                   :disabled='target.supportedModes.indexOf(`sync`) < 0'
  //-                 )
  //-                 v-radio(
  //-                   :label='$t(`admin.storage.syncDirPush`)'
  //-                   color='primary'
  //-                   value='push'
  //-                   :disabled='target.supportedModes.indexOf(`push`) < 0'
  //-                 )
  //-                 v-radio(
  //-                   :label='$t(`admin.storage.syncDirPull`)'
  //-                   color='primary'
  //-                   value='pull'
  //-                   :disabled='target.supportedModes.indexOf(`pull`) < 0'
  //-                 )
  //-             .body-2.ml-3
  //-               strong {{$t('admin.storage.syncDirBi')}} #[em.red--text.text--lighten-2(v-if='target.supportedModes.indexOf(`sync`) < 0') {{$t('admin.storage.unsupported')}}]
  //-               .pb-3 {{$t('admin.storage.syncDirBiHint')}}
  //-               strong {{$t('admin.storage.syncDirPush')}} #[em.red--text.text--lighten-2(v-if='target.supportedModes.indexOf(`push`) < 0') {{$t('admin.storage.unsupported')}}]
  //-               .pb-3 {{$t('admin.storage.syncDirPushHint')}}
  //-               strong {{$t('admin.storage.syncDirPull')}} #[em.red--text.text--lighten-2(v-if='target.supportedModes.indexOf(`pull`) < 0') {{$t('admin.storage.unsupported')}}]
  //-               .pb-3 {{$t('admin.storage.syncDirPullHint')}}

  //-             template(v-if='target.hasSchedule')
  //-               v-divider.mt-3
  //-               .overline.my-5 {{$t('admin.storage.syncSchedule')}}
  //-               .body-2.ml-3 {{$t('admin.storage.syncScheduleHint')}}
  //-               .pa-3
  //-                 duration-picker(v-model='target.syncInterval')
  //-                 i18next.caption.mt-3(path='admin.storage.syncScheduleCurrent', tag='div')
  //-                   strong(place='schedule') {{getDefaultSchedule(target.syncInterval)}}
  //-                 i18next.caption(path='admin.storage.syncScheduleDefault', tag='div')
  //-                   strong(place='schedule') {{getDefaultSchedule(target.syncIntervalDefault)}}

  //-             template(v-if='target.actions && target.actions.length > 0')
  //-               v-divider.mt-3
  //-               .overline.my-5 {{$t('admin.storage.actions')}}
  //-               v-alert(outlined, :value='!target.isEnabled', color='red', icon='mdi-alert')
  //-                 .body-2 {{$t('admin.storage.actionsInactiveWarn')}}
  //-               v-container.pt-0(grid-list-xl, fluid)
  //-                 v-layout(row, wrap, fill-height)
  //-                   v-flex(xs12, lg6, xl4, v-for='act of target.actions', :key='act.handler')
  //-                     v-card.radius-7.grey(flat, :class='$vuetify.theme.dark ? `darken-3-d5` : `lighten-3`', height='100%')
  //-                       v-card-text
  //-                         .subtitle-1(v-html='act.label')
  //-                         .body-2.mt-4(v-html='act.hint')
  //-                         v-btn.mx-0.mt-5(
  //-                           @click='executeAction(target.key, act.handler)'
  //-                           outlined
  //-                           :color='$vuetify.theme.dark ? `blue` : `primary`'
  //-                           :disabled='runningAction || !target.isEnabled'
  //-                           :loading='runningActionHandler === act.handler'
  //-                           ) {{$t('admin.storage.actionRun')}}

</template>

<script>
import find from 'lodash/find'
import cloneDeep from 'lodash/cloneDeep'
import gql from 'graphql-tag'
import { get } from '@requarks/vuex-pathify'
// import { LoopingRhombusesSpinner } from 'epic-spinners'

export default {
  data () {
    return {
      loading: 0,
      runningAction: false,
      runningActionHandler: '',
      selectedTarget: '',
      target: null,
      targets: []
    }
  },
  computed: {
    currentSiteId: get('admin/currentSiteId')
  },
  watch: {
    selectedTarget (newValue, oldValue) {
      this.target = find(this.targets, ['id', newValue]) || null
    },
    targets (newValue) {
      if (newValue && newValue.length > 0) {
        this.selectedTarget = find(this.targets, ['module', 'db'])?.id || null
      }
    }
  },
  methods: {
    configIfCheck (ifs) {
      if (!ifs || ifs.length < 1) { return true }
      return ifs.every(s => this.target.config[s.key]?.value === s.eq)
    },
    async refresh () {
      await this.$apollo.queries.targets.refetch()
      this.$store.commit('showNotification', {
        message: 'List of storage targets has been refreshed.',
        style: 'success',
        icon: 'cached'
      })
    },
    async save () {
      this.$store.commit('loadingStart', 'admin-storage-savetargets')
      await this.$apollo.mutate({
        mutation: gql`{}`,
        variables: {
          targets: this.targets.map(tgt => _.pick(tgt, [
            'isEnabled',
            'key',
            'config',
            'mode',
            'syncInterval'
          ])).map(str => ({ ...str, config: str.config.map(cfg => ({ ...cfg, value: JSON.stringify({ v: cfg.value.value }) })) }))
        }
      })
      this.$store.commit('showNotification', {
        message: 'Storage configuration saved successfully.',
        style: 'success',
        icon: 'check'
      })
      this.$store.commit('loadingStop', 'admin-storage-savetargets')
    },
    getTargetSubtitle (target) {
      if (!target.isEnabled) {
        return this.$t('admin.storage.inactiveTarget')
      }
      const hasPages = target.contentTypes?.activeTypes?.includes('pages')
      const hasAssets = target.contentTypes?.activeTypes?.filter(c => c !== 'pages')?.length > 0
      if (hasPages && hasAssets) {
        return this.$t('admin.storage.pagesAndAssets')
      } else if (hasPages) {
        return this.$t('admin.storage.pagesOnly')
      } else if (hasAssets) {
        return this.$t('admin.storage.assetsOnly')
      } else {
        return this.$t('admin.storage.notConfigured')
      }
    },
    getDefaultSchedule (val) {
      if (!val) { return 'N/A' }
      return '' // moment.duration(val).format('y [years], M [months], d [days], h [hours], m [minutes]')
    },
    async executeAction (targetKey, handler) {
      this.$store.commit('loadingStart', 'admin-storage-executeaction')
      this.runningAction = true
      this.runningActionHandler = handler
      try {
        await this.$apollo.mutate({
          mutation: gql`{}`,
          variables: {
            targetKey,
            handler
          }
        })
        this.$store.commit('showNotification', {
          message: 'Action completed.',
          style: 'success',
          icon: 'check'
        })
      } catch (err) {
        console.warn(err)
      }
      this.runningAction = false
      this.runningActionHandler = ''
      this.$store.commit('loadingStop', 'admin-storage-executeaction')
    }
  },
  apollo: {
    targets: {
      query: gql`
        query getStorageTargets (
          $siteId: UUID!
        ) {
        storageTargets (
          siteId: $siteId
        ) {
          id
          isEnabled
          module
          title
          description
          icon
          banner
          vendor
          website
          contentTypes
          assetDelivery
          versioning
          sync
          status
          config
          actions
        }
      }`,
      variables () {
        return {
          siteId: this.currentSiteId
        }
      },
      skip () {
        return !this.currentSiteId
      },
      fetchPolicy: 'network-only',
      update: (data) => cloneDeep(data.storageTargets)
    }
  }
}
</script>

<style lang='scss' scoped>

.admin-storage-logo {
  border-radius: 5px;
}

</style>
