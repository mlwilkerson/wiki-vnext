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
        :loading='loading'
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
              q-item-label(caption) {{getTargetSubtitle(tgt.contentTypes)}}
            q-item-section(side)
              q-spinner-rings(:color='tgt.isEnabled ? `positive` : `negative`', size='sm')
    .col
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
              v-model='target.contentTypes'
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
              v-model='target.contentTypes'
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
              v-model='target.contentTypes'
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
              v-model='target.contentTypes'
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
              v-model='target.contentTypes'
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
              v-model='target.largeThreshold'
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
        q-item(:tag='target.isAssetStreamingSupported ? `label` : null')
          q-item-section(avatar)
            q-checkbox(
              v-model='target.assetStreaming'
              :color='target.module === `db` || !target.isAssetStreamingSupported ? `grey` : `primary`'
              :aria-label='$t(`admin.storage.contentTypePages`)'
              :disable='target.module === `db` || !target.isAssetStreamingSupported'
              )
          q-item-section
            q-item-label {{$t(`admin.storage.assetStreaming`)}}
            q-item-label(caption) {{$t(`admin.storage.assetStreamingHint`)}}
            q-item-label.text-red(v-if='!target.isAssetStreamingSupported', caption) {{$t(`admin.storage.assetStreamingNotSupported`)}}
        q-item(:tag='target.isAssetDirectAccessSupported ? `label` : null')
          q-item-section(avatar)
            q-checkbox(
              v-model='target.assetDirectAccess'
              :color='!target.isAssetDirectAccessSupported ? `grey` : `primary`'
              :aria-label='$t(`admin.storage.contentTypePages`)'
              :disable='!target.isAssetDirectAccessSupported'
              )
          q-item-section
            q-item-label {{$t(`admin.storage.assetDirectAccess`)}}
            q-item-label(caption) {{$t(`admin.storage.assetDirectAccessHint`)}}
            q-item-label.text-red(v-if='!target.isAssetDirectAccessSupported', caption) {{$t(`admin.storage.assetDirectAccessNotSupported`)}}

      //- -----------------------
      //- Configuration
      //- -----------------------
      q-card.shadow-1.q-pb-sm.q-mt-md
        q-card-section
          .text-subtitle1 {{$t('admin.storage.config')}}
          q-banner.q-mt-md(
            v-if='!target.config || target.config.length < 1'
            rounded
            :class='$q.dark.isActive ? `bg-negative text-white` : `bg-grey-2 text-grey-7`'
            ) {{$t('admin.storage.noConfigOption')}}

      //- -----------------------
      //- Sync
      //- -----------------------
      q-card.shadow-1.q-pb-sm.q-mt-md
        q-card-section
          .text-subtitle1 {{$t('admin.storage.sync')}}
          q-banner.q-mt-md(
            v-if='!target.config || target.config.length < 1'
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
            v-if='!target.config || target.config.length < 1'
            rounded
            :class='$q.dark.isActive ? `bg-negative text-white` : `bg-grey-2 text-grey-7`'
            ) {{$t('admin.storage.noActions')}}

    .col-auto
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

  //-       v-card.mt-3.animated.fadeInUp.wait-p2s
  //-         v-toolbar(flat, :color='$vuetify.theme.dark ? `grey darken-3-l5` : `grey darken-3`', dark, dense)
  //-           .subtitle-1 {{$t('admin.storage.status')}}
  //-           v-spacer
  //-           looping-rhombuses-spinner(
  //-             :animation-duration='5000'
  //-             :rhombus-size='10'
  //-             color='#FFF'
  //-           )
  //-         v-list.py-0(two-line, dense)
  //-           template(v-for='(tgt, n) in status')
  //-             v-list-item(:key='tgt.key')
  //-               template(v-if='tgt.status === `pending`')
  //-                 v-list-item-avatar(color='purple')
  //-                   v-icon(color='white') mdi-clock-outline
  //-                 v-list-item-content
  //-                   v-list-item-title.body-2 {{tgt.title}}
  //-                   v-list-item-subtitle.purple--text.caption {{tgt.status}}
  //-                 v-list-item-action
  //-                   v-progress-circular(indeterminate, :size='20', :width='2', color='purple')
  //-               template(v-else-if='tgt.status === `operational`')
  //-                 v-list-item-avatar(color='green')
  //-                   v-icon(color='white') mdi-check-circle
  //-                 v-list-item-content
  //-                   v-list-item-title.body-2 {{tgt.title}}
  //-                   v-list-item-subtitle.green--text.caption {{$t('admin.storage.lastSync', { time: $options.filters.moment(tgt.lastAttempt, 'from') })}}
  //-               template(v-else)
  //-                 v-list-item-avatar(color='red')
  //-                   v-icon(color='white') mdi-close-circle-outline
  //-                 v-list-item-content
  //-                   v-list-item-title.body-2 {{tgt.title}}
  //-                   v-list-item-subtitle.red--text.caption {{$t('admin.storage.lastSyncAttempt', { time: $options.filters.moment(tgt.lastAttempt, 'from') })}}
  //-                 v-list-item-action
  //-                   v-menu
  //-                     template(v-slot:activator='{ on }')
  //-                       v-btn(icon, v-on='on')
  //-                         v-icon(color='red') mdi-information
  //-                     v-card(width='450')
  //-                       v-toolbar(flat, color='red', dark, dense) {{$t('admin.storage.errorMsg')}}
  //-                       v-card-text {{tgt.message}}

  //-             v-divider(v-if='n < status.length - 1')
  //-           v-list-item(v-if='status.length < 1')
  //-             em {{$t('admin.storage.noTarget')}}

  //-     v-flex(xs12, lg9)
  //-       v-card.wiki-form.animated.fadeInUp.wait-p2s
  //-         v-toolbar(color='primary', dense, flat, dark)
  //-           .subtitle-1 {{target.title}}
  //-           v-spacer
  //-           v-switch(
  //-             dark
  //-             color='blue lighten-5'
  //-             label='Active'
  //-             v-model='target.isEnabled'
  //-             hide-details
  //-             inset
  //-             )
  //-         v-card-info(color='blue')
  //-           div
  //-             div {{target.description}}
  //-             span.caption: a(:href='target.website') {{target.website}}
  //-           v-spacer
  //-           .admin-providerlogo
  //-             img(:src='target.logo', :alt='target.title')
  //-         v-card-text
  //-           v-form
  //-             i18next.body-2(path='admin.storage.targetState', tag='div', v-if='target.isEnabled')
  //-               v-chip(color='green', small, dark, label, place='state') {{$t('admin.storage.targetStateActive')}}
  //-             i18next.body-2(path='admin.storage.targetState', tag='div', v-else)
  //-               v-chip(color='red', small, dark, label, place='state') {{$t('admin.storage.targetStateInactive')}}
  //-             v-divider.mt-3
  //-             .overline.my-5 {{$t('admin.storage.targetConfig')}}
  //-             .body-2.ml-3(v-if='!target.config || target.config.length < 1'): em {{$t('admin.storage.noConfigOption')}}
  //-             template(v-else, v-for='cfg in target.config')
  //-               v-select(
  //-                 v-if='cfg.value.type === "string" && cfg.value.enum'
  //-                 outlined
  //-                 :items='cfg.value.enum'
  //-                 :key='cfg.key'
  //-                 :label='cfg.value.title'
  //-                 v-model='cfg.value.value'
  //-                 prepend-icon='mdi-cog-box'
  //-                 :hint='cfg.value.hint ? cfg.value.hint : ""'
  //-                 persistent-hint
  //-                 :class='cfg.value.hint ? "mb-2" : ""'
  //-               )
  //-               v-switch.mb-3(
  //-                 v-else-if='cfg.value.type === "boolean"'
  //-                 :key='cfg.key'
  //-                 :label='cfg.value.title'
  //-                 v-model='cfg.value.value'
  //-                 color='primary'
  //-                 prepend-icon='mdi-cog-box'
  //-                 :hint='cfg.value.hint ? cfg.value.hint : ""'
  //-                 persistent-hint
  //-                 inset
  //-                 )
  //-               v-textarea(
  //-                 v-else-if='cfg.value.type === "string" && cfg.value.multiline'
  //-                 outlined
  //-                 :key='cfg.key'
  //-                 :label='cfg.value.title'
  //-                 v-model='cfg.value.value'
  //-                 prepend-icon='mdi-cog-box'
  //-                 :hint='cfg.value.hint ? cfg.value.hint : ""'
  //-                 persistent-hint
  //-                 :class='cfg.value.hint ? "mb-2" : ""'
  //-                 )
  //-               v-text-field(
  //-                 v-else
  //-                 outlined
  //-                 :key='cfg.key'
  //-                 :label='cfg.value.title'
  //-                 v-model='cfg.value.value'
  //-                 prepend-icon='mdi-cog-box'
  //-                 :hint='cfg.value.hint ? cfg.value.hint : ""'
  //-                 persistent-hint
  //-                 :class='cfg.value.hint ? "mb-2" : ""'
  //-                 )
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
      target: {
        contentTypes: ['pages'],
        supportedModes: []
      },
      targets: [
        {
          id: '10000000-0000-4000-0000-000000000001',
          module: 'db',
          title: 'Database',
          contentTypes: ['pages', 'images', 'documents', 'others', 'large'],
          largeThreshold: '5MB',
          assetStreaming: true,
          assetDirectAccess: false,
          isAssetStreamingSupported: true,
          isAssetDirectAccessSupported: false,
          isEnabled: true,
          icon: '/_assets/icons/ultraviolet-database.svg',
          banner: '/_assets/storage/database.jpg',
          description: 'The local PostgreSQL database can store any assets. It is however not recommended to store large files directly in the database as this can cause performance issues.',
          vendor: 'Wiki.js',
          website: 'https://js.wiki'
        },
        {
          id: '10000000-0000-4000-0000-000000000002',
          module: 'github',
          title: 'GitHub',
          contentTypes: ['pages', 'images', 'documents', 'others', 'large'],
          largeThreshold: '5MB',
          assetStreaming: false,
          assetDirectAccess: false,
          isAssetStreamingSupported: false,
          isAssetDirectAccessSupported: false,
          isEnabled: true,
          icon: '/_assets/icons/ultraviolet-github.svg',
          banner: '/_assets/storage/github.jpg',
          description: 'Millions of developers and companies build, ship, and maintain their software on GitHub—the largest and most advanced development platform in the world.',
          vendor: 'GitHub, Inc.',
          website: 'https://github.com'
        },
        {
          id: '10000000-0000-4000-0000-000000000003',
          module: 'git',
          title: 'Git',
          contentTypes: ['pages', 'images', 'documents', 'others', 'large'],
          largeThreshold: '5MB',
          assetStreaming: false,
          assetDirectAccess: false,
          isAssetStreamingSupported: false,
          isAssetDirectAccessSupported: false,
          isEnabled: false,
          icon: '/_assets/icons/ultraviolet-git.svg',
          banner: '/_assets/storage/git.jpg',
          description: 'The local PostgreSQL database can store any assets. It is however not recommended to store large files directly in the database as this can cause performance issues.',
          vendor: 'Software Freedom Conservancy, Inc.',
          website: 'https://git-scm.com'
        },
        {
          id: '10000000-0000-4000-0000-000000000004',
          module: 's3',
          title: 'AWS S3',
          contentTypes: ['images', 'documents', 'others', 'large'],
          largeThreshold: '5MB',
          assetStreaming: true,
          assetDirectAccess: true,
          isAssetStreamingSupported: true,
          isAssetDirectAccessSupported: true,
          isEnabled: false,
          icon: '/_assets/icons/ultraviolet-amazon-web-services.svg',
          banner: '/_assets/storage/s3.jpg',
          description: 'Amazon Simple Storage Service (Amazon S3) is an object storage service offering industry-leading scalability, data availability, security, and performance.',
          vendor: 'Amazon.com, Inc.',
          website: 'https://aws.amazon.com'
        },
        {
          id: '10000000-0000-4000-0000-000000000005',
          module: 'azure',
          title: 'Azure Blob Storage',
          contentTypes: ['images', 'documents', 'others', 'large'],
          largeThreshold: '5MB',
          assetStreaming: true,
          assetDirectAccess: true,
          isAssetStreamingSupported: true,
          isAssetDirectAccessSupported: true,
          isEnabled: false,
          icon: '/_assets/icons/ultraviolet-azure.svg',
          banner: '/_assets/storage/azure.jpg',
          description: 'Azure Blob Storage is Microsoft\'s object storage solution for the cloud. Blob storage is optimized for storing massive amounts of unstructured data.',
          vendor: 'Microsoft Corporation',
          website: 'https://azure.microsoft.com'
        },
        {
          id: '10000000-0000-4000-0000-000000000006',
          module: 'gcs',
          title: 'Google Cloud Storage',
          contentTypes: ['images', 'documents', 'others', 'large'],
          largeThreshold: '5MB',
          assetStreaming: true,
          assetDirectAccess: true,
          isAssetStreamingSupported: true,
          isAssetDirectAccessSupported: true,
          isEnabled: false,
          icon: '/_assets/icons/ultraviolet-google.svg',
          banner: '/_assets/storage/gcs.jpg',
          description: 'Google Cloud Storage is an online file storage web service for storing and accessing data on Google Cloud Platform infrastructure.',
          vendor: 'Alphabet Inc.',
          website: 'https://cloud.google.com'
        },
        {
          id: '10000000-0000-4000-0000-000000000007',
          module: 'disk',
          title: 'Local File System',
          contentTypes: ['images', 'documents', 'others', 'large'],
          largeThreshold: '5MB',
          assetStreaming: true,
          assetDirectAccess: false,
          isAssetStreamingSupported: true,
          isAssetDirectAccessSupported: false,
          isEnabled: false,
          icon: '/_assets/icons/ultraviolet-hdd.svg',
          banner: '/_assets/storage/disk.jpg',
          description: 'Store files on the local file system or over network attached storage. Note that you must use replicated storage if using high-availability instances.',
          vendor: 'Wiki.js',
          website: 'https://js.wiki'
        },
        {
          id: '10000000-0000-4000-0000-000000000008',
          module: 'sftp',
          title: 'SFTP',
          contentTypes: ['images', 'documents', 'others', 'large'],
          largeThreshold: '5MB',
          assetStreaming: false,
          assetDirectAccess: false,
          isAssetStreamingSupported: false,
          isAssetDirectAccessSupported: false,
          isEnabled: false,
          icon: '/_assets/icons/ultraviolet-nas.svg',
          banner: '/_assets/storage/ssh.jpg',
          description: 'Store files over a remote connection using the SSH File Transfer Protocol.',
          vendor: 'Wiki.js',
          website: 'https://js.wiki'
        }
      ]
    }
  },
  computed: {
    currentSiteId: get('admin/currentSiteId')
  },
  watch: {
    selectedTarget (newValue, oldValue) {
      this.target = find(this.targets, ['id', newValue]) || {}
    },
    targets (newValue) {
      if (newValue && newValue.length > 0) {
        this.selectedTarget = this.targets[0].id
      }
    }
  },
  mounted () {
    this.selectedTarget = '10000000-0000-4000-0000-000000000001'
  },
  methods: {
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
    getTargetSubtitle (contentTypes) {
      const hasPages = contentTypes.includes('pages')
      const hasAssets = contentTypes.filter(c => c !== 'pages').length > 0
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
    },
    async fetchTargets () {
      this.loading++
      const raw = this.$apollo.query({
        query: gql`{}`,
        variables: {
          siteId: this.currentSiteId
        },
        fetchPolicy: 'network-only'
      })
      if (raw?.data?.storageTargets) {
        this.targets = cloneDeep(raw.data.storage.targets).map(str => ({
          ...str,
          config: _.sortBy(str.config.map(cfg => ({
            ...cfg,
            value: JSON.parse(cfg.value)
          })), [t => t.value.order])
        }))
      }
      this.loading--
    }
  },
  apollo: {
    // status: {
    //   query: gql`{}`,
    //   fetchPolicy: 'network-only',
    //   update: (data) => data.storage.status,
    //   watchLoading (isLoading) {
    //     this.$store.commit(`loading${isLoading ? 'Start' : 'Stop'}`, 'admin-storage-status-refresh')
    //   },
    //   pollInterval: 3000
    // }
  }
}
</script>

<style lang='scss' scoped>

.admin-storage-logo {
  border-radius: 5px;
}

</style>
