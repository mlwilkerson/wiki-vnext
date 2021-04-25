<template lang='pug'>
  q-page.admin-general
    .row.q-pa-md.items-center
      .col-auto
        img.admin-icon.animated.fadeInLeft(src='~assets/icons/fluent-web.svg')
      .col.q-pl-md
        .text-h5.text-primary.animated.fadeInLeft {{ $t('admin.general.title') }}
        .text-subtitle1.text-grey.animated.fadeInLeft.wait-p2s {{ $t('admin.general.subtitle') }}
      .col-auto
        q-btn.q-mr-sm.acrylic-btn(
          icon='las la-question-circle'
          flat
          color='grey'
          href='https://docs.js.wiki/admin/general'
          target='_blank'
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
      .col-12.col-lg-7
        //- -----------------------
        //- Site Info
        //- -----------------------
        q-card.shadow-1.q-pb-sm
          q-card-section
            .text-subtitle1 {{$t('admin.general.siteInfo')}}
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-asterisk'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.general.siteTitle`)}}
              q-item-label(caption) {{$t(`admin.general.siteTitleHint`)}}
            q-item-section
              q-input(
                outlined
                v-model='config.title'
                dense
                :rules=`[
                  val => /^[^<>"]+$/.test(val) || $t('admin.general.siteTitleInvalidChars')
                ]`
                hide-bottom-space
                :aria-label='$t(`admin.general.siteTitle`)'
                )
          q-separator.q-my-sm(inset)
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-pen-nib'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.general.siteDescription`)}}
              q-item-label(caption) {{$t(`admin.general.siteDescriptionHint`)}}
            q-item-section
              q-input(
                outlined
                v-model='config.description'
                dense
                :aria-label='$t(`admin.general.siteDescription`)'
                )
          q-separator.q-my-sm(inset)
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-globe'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.general.siteHostname`)}}
              q-item-label(caption) {{$t(`admin.general.siteHostnameHint`)}}
            q-item-section
              q-input(
                outlined
                v-model='config.hostname'
                dense
                :rules=`[
                  val => /^(([a-z0-9.-]+)|([*]{1}))$/.test(val) || $t('admin.general.siteHostnameInvalid')
                ]`
                hide-bottom-space
                :aria-label='$t(`admin.general.siteHostname`)'
                )

        //- -----------------------
        //- Footer / Copyright
        //- -----------------------
        q-card.shadow-1.q-pb-sm.q-mt-md
          q-card-section
            .text-subtitle1 {{$t('admin.general.footerCopyright')}}
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-landmark'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.general.companyName`)}}
              q-item-label(caption) {{$t(`admin.general.companyNameHint`)}}
            q-item-section
              q-input(
                outlined
                v-model='config.company'
                dense
                :aria-label='$t(`admin.general.companyName`)'
                )
          q-separator.q-my-sm(inset)
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-copyright'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.general.contentLicense`)}}
              q-item-label(caption) {{$t(`admin.general.contentLicenseHint`)}}
            q-item-section
              q-select(
                outlined
                v-model='config.contentLicense'
                :options='contentLicenses'
                option-value='value'
                option-label='text'
                emit-value
                map-options
                dense
                :aria-label='$t(`admin.general.contentLicense`)'
                )

        //- -----------------------
        //- FEATURES
        //- -----------------------
        q-card.shadow-1.q-pb-sm.q-mt-md
          q-card-section
            .text-subtitle1 {{$t('admin.general.features')}}
          q-item(tag='label', v-ripple)
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-comments'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.general.allowComments`)}}
              q-item-label(caption) {{$t(`admin.general.allowCommentsHint`)}}
            q-item-section(avatar)
              q-toggle(
                v-model='config.features.comments'
                color='primary'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :aria-label='$t(`admin.general.allowComments`)'
                )
          q-separator.q-my-sm(inset)
          q-item(tag='label', v-ripple)
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-pen-fancy'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.general.allowContributions`)}}
              q-item-label(caption) {{$t(`admin.general.allowContributionsHint`)}}
            q-item-section(avatar)
              q-toggle(
                v-model='config.features.contributions'
                color='primary'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :aria-label='$t(`admin.general.allowContributions`)'
                )
          q-separator.q-my-sm(inset)
          q-item(tag='label', v-ripple)
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-user-tie'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.general.allowProfile`)}}
              q-item-label(caption) {{$t(`admin.general.allowProfileHint`)}}
            q-item-section(avatar)
              q-toggle(
                v-model='config.features.profile'
                color='primary'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :aria-label='$t(`admin.general.allowProfile`)'
                )
          q-separator.q-my-sm(inset)
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-star-half-alt'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.general.allowRatings`)}}
              q-item-label(caption) {{$t(`admin.general.allowRatingsHint`)}}
            q-item-section.col-auto
              q-btn-toggle(
                v-model='config.features.ratingsMode'
                push
                glossy
                no-caps
                toggle-color='primary'
                :options=`[
                  { label: $t('admin.general.ratingsOff'), value: 'off' },
                  { label: $t('admin.general.ratingsThumbs'), value: 'thumbs' },
                  { label: $t('admin.general.ratingsStars'), value: 'stars' }
                ]`
              )
          q-separator.q-my-sm(inset)
          q-item(tag='label', v-ripple)
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-search'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.general.allowSearch`)}}
              q-item-label(caption) {{$t(`admin.general.allowSearchHint`)}}
            q-item-section(avatar)
              q-toggle(
                v-model='config.features.search'
                color='primary'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :aria-label='$t(`admin.general.allowSearch`)'
                )

      .col-12.col-lg-5
        //- -----------------------
        //- Logo
        //- -----------------------
        q-card.shadow-1.q-pb-sm
          q-card-section
            .text-subtitle1 {{$t('admin.general.logo')}}
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-paw'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.general.logoUpl`)}}
              q-item-label(caption) {{$t(`admin.general.logoUplHint`)}}
            q-item-section.col-auto
              q-btn(
                label='Upload'
                unelevated
                icon='las la-upload'
                color='primary'
                text-color='white'
              )
          q-separator.q-my-sm(inset)
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-paw'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.general.favicon`)}}
              q-item-label(caption) {{$t(`admin.general.faviconHint`)}}
            q-item-section.col-auto
              q-btn(
                label='Upload'
                unelevated
                icon='las la-upload'
                color='primary'
                text-color='white'
              )
          q-separator.q-my-sm(inset)
          q-item(tag='label', v-ripple)
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-feather'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.general.displaySiteTitle`)}}
              q-item-label(caption) {{$t(`admin.general.displaySiteTitleHint`)}}
            q-item-section(avatar)
              q-toggle(
                v-model='config.logoText'
                color='primary'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :aria-label='$t(`admin.general.displaySiteTitle`)'
                )

        //- -----------------------
        //- Defaults
        //- -----------------------
        q-card.shadow-1.q-pb-sm.q-mt-md(v-if='config.defaults')
          q-card-section
            .text-subtitle1 {{$t('admin.general.defaults')}}
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-map-marked-alt'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.general.defaultTimezone`)}}
              q-item-label(caption) {{$t(`admin.general.defaultTimezoneHint`)}}
            q-item-section
              q-select(
                outlined
                v-model='config.defaults.timezone'
                :options='timezones'
                option-value='value'
                option-label='text'
                emit-value
                map-options
                dense
                options-dense
                :aria-label='$t(`admin.general.defaultTimezone`)'
                )
          q-separator.q-my-sm(inset)
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-calendar'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.general.defaultDateFormat`)}}
              q-item-label(caption) {{$t(`admin.general.defaultDateFormatHint`)}}
            q-item-section
              q-select(
                outlined
                v-model='config.defaults.dateFormat'
                emit-value
                map-options
                dense
                :aria-label='$t(`admin.general.defaultDateFormat`)'
                :options=`[
                  { label: $t('profile:localeDefault'), value: '' },
                  { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
                  { label: 'DD.MM.YYYY', value: 'DD.MM.YYYY' },
                  { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
                  { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
                  { label: 'YYYY/MM/DD', value: 'YYYY/MM/DD' }
                ]`
                )
          q-separator.q-my-sm(inset)
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-clock'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.general.defaultTimeFormat`)}}
              q-item-label(caption) {{$t(`admin.general.defaultTimeFormatHint`)}}
            q-item-section.col-auto
              q-btn-toggle(
                v-model='config.defaults.timeFormat'
                push
                glossy
                no-caps
                toggle-color='primary'
                :options=`[
                  { label: $t('admin.general.defaultTimeFormat12h'), value: '12h' },
                  { label: $t('admin.general.defaultTimeFormat24h'), value: '24h' }
                ]`
              )

        //- -----------------------
        //- SEO
        //- -----------------------
        q-card.shadow-1.q-pb-sm.q-mt-md(v-if='config.robots')
          q-card-section
            .text-subtitle1 SEO
          q-item(tag='label', v-ripple)
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-robot'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.general.searchAllowIndexing`)}}
              q-item-label(caption) {{$t(`admin.general.searchAllowIndexingHint`)}}
            q-item-section(avatar)
              q-toggle(
                v-model='config.robots.index'
                color='primary'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :aria-label='$t(`admin.general.searchAllowIndexing`)'
                )
          q-separator.q-my-sm(inset)
          q-item(tag='label', v-ripple)
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-hand-point-right'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.general.searchAllowFollow`)}}
              q-item-label(caption) {{$t(`admin.general.searchAllowFollowHint`)}}
            q-item-section(avatar)
              q-toggle(
                v-model='config.robots.follow'
                color='primary'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :aria-label='$t(`admin.general.searchAllowFollow`)'
                )

</template>

<script>
import { get } from 'vuex-pathify'
import gql from 'graphql-tag'
import cloneDeep from 'lodash/cloneDeep'

export default {
  meta () {
    return {
      title: this.$t('admin.general.title')
    }
  },
  data () {
    return {
      loading: false,
      config: {
        hostname: '',
        title: '',
        description: '',
        company: '',
        contentLicense: '',
        logoText: false,
        ratings: {
          index: false,
          follow: false
        },
        features: {
          ratings: false,
          ratingsMode: 'off',
          comments: false,
          contributions: false,
          profile: false
        },
        defaults: {
          timezone: '',
          dateFormat: '',
          timeFormat: ''
        }
      }
    }
  },
  computed: {
    currentSiteId: get('admin/currentSiteId'),
    contentLicenses () {
      return [
        { value: '', text: this.$t('common.license.none') },
        { value: 'alr', text: this.$t('common.license.alr') },
        { value: 'cc0', text: this.$t('common.license.cc0') },
        { value: 'ccby', text: this.$t('common.license.ccby') },
        { value: 'ccbysa', text: this.$t('common.license.ccbysa') },
        { value: 'ccbynd', text: this.$t('common.license.ccbynd') },
        { value: 'ccbync', text: this.$t('common.license.ccbync') },
        { value: 'ccbyncsa', text: this.$t('common.license.ccbyncsa') },
        { value: 'ccbyncnd', text: this.$t('common.license.ccbyncnd') }
      ]
    },
    timezones: get('data/timezones')
  },
  methods: {
    async save () {
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation (
              $id: UUID!
              $patch: SiteUpdateInput!
            ) {
              updateSite (
                id: $id
                patch: $patch
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
            id: this.currentSiteId,
            patch: {
              hostname: this.config.host ?? '',
              title: this.config.title ?? '',
              description: this.config.description ?? '',
              company: this.config.company ?? '',
              contentLicense: this.config.contentLicense ?? '',
              robots: {
                index: this.config.robots?.index ?? false,
                follow: this.config.robots?.follow ?? false
              },
              features: {
                comments: this.config.features?.comments ?? false,
                ratings: (this.config.features?.ratings || 'off') !== 'off',
                ratingsMode: this.config.features?.ratingsMode ?? 'off',
                contributions: this.config.features?.contributions ?? false,
                profile: this.config.features?.profile ?? false,
                search: this.config.features?.search ?? false
              },
              defaults: {
                timezone: this.config.defaults?.timezone ?? 'America/Toronto',
                dateFormat: this.config.defaults?.dateFormat ?? 'YYYY-MM-DD',
                timeFormat: this.config.defaults?.timeFormat ?? '12h'
              }
            }
          },
          watchLoading (isLoading) {
            this.$store.commit(`loading${isLoading ? 'Start' : 'Stop'}`, 'admin-site-update')
          }
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('admin.general.saveSuccess')
        })
        if (this.currentSiteId === this.$store.get('site/id')) {
          this.$store.set('site/title', this.config.title)
          this.$store.set('site/description', this.config.description)
          this.$store.set('site/company', this.config.company)
          this.$store.set('site/contentLicense', this.config.contentLicense)
        }
      } catch (err) {
        this.$store.commit('pushGraphError', err)
      }
    },
    refreshLogo () {
      this.$forceUpdate()
    }
  },
  apollo: {
    config: {
      query: gql`
        query (
          $id: UUID!
        ) {
          siteById(
            id: $id
          ) {
            hostname
            isEnabled
            title
            description
            company
            contentLicense
            logoText
            robots {
              index
              follow
            }
            features {
              comments
              ratings
              ratingsMode
              contributions
              profile
              search
            }
            defaults {
              timezone
              dateFormat
              timeFormat
            }
          }
        }
      `,
      variables () {
        return {
          id: this.currentSiteId
        }
      },
      skip () {
        return !this.currentSiteId
      },
      fetchPolicy: 'network-only',
      update: (data) => cloneDeep(data.siteById),
      watchLoading (isLoading) {
        this.$store.commit(`loading${isLoading ? 'Start' : 'Stop'}`, 'admin-site-refresh')
      }
    }
  }
}
</script>

<style lang='scss'>

</style>
