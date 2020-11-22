<template lang='pug'>
  q-page.admin-theme
    .row.q-pa-md.items-center
      .col-auto
        img.admin-icon.animated.fadeInLeft(src='~assets/icons/fluent-web.svg')
      .col.q-pl-md
        .text-h5.text-primary.animated.fadeInLeft {{ $t('admin:general.title') }}
        .text-subtitle1.text-grey.animated.fadeInLeft.wait-p2s {{ $t('admin:general.subtitle') }}
      .col-auto
        q-btn.q-mr-sm(
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
      .col-7
        //- -----------------------
        //- Site Info
        //- -----------------------
        q-card.shadow-1.q-pb-sm
          q-card-section
            .text-subtitle1 {{$t('admin:general.siteInfo')}}
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-asterisk'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin:general.siteTitle`)}}
              q-item-label(caption) {{$t(`admin:general.siteTitleHint`)}}
            q-item-section
              q-input(
                outlined
                v-model='config.title'
                dense
                :rules=`[
                  val => /^[^<>"]+$/.test(val) || $t('admin:general.siteTitleInvalidChars')
                ]`
                hide-bottom-space
                :aria-label='$t(`admin:general.siteTitle`)'
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
              q-item-label {{$t(`admin:general.siteDescription`)}}
              q-item-label(caption) {{$t(`admin:general.siteDescriptionHint`)}}
            q-item-section
              q-input(
                outlined
                v-model='config.description'
                dense
                :aria-label='$t(`admin:general.siteDescription`)'
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
              q-item-label {{$t(`admin:general.siteHostname`)}}
              q-item-label(caption) {{$t(`admin:general.siteHostnameHint`)}}
            q-item-section
              q-input(
                outlined
                v-model='config.host'
                dense
                :rules=`[
                  val => /^(([a-z0-9.-]+)|([*]{1}))$/.test(val) || $t('admin:general.siteHostnameInvalid')
                ]`
                hide-bottom-space
                :aria-label='$t(`admin:general.siteHostname`)'
                )

        //- -----------------------
        //- Footer / Copyright
        //- -----------------------
        q-card.shadow-1.q-pb-sm.q-mt-md
          q-card-section
            .text-subtitle1 {{$t('admin:general.footerCopyright')}}
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-landmark'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin:general.companyName`)}}
              q-item-label(caption) {{$t(`admin:general.companyNameHint`)}}
            q-item-section
              q-input(
                outlined
                v-model='config.company'
                dense
                :aria-label='$t(`admin:general.companyName`)'
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
              q-item-label {{$t(`admin:general.contentLicense`)}}
              q-item-label(caption) {{$t(`admin:general.contentLicenseHint`)}}
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
                :aria-label='$t(`admin:general.contentLicense`)'
                )

        //- -----------------------
        //- SEO
        //- -----------------------
        q-card.shadow-1.q-pb-sm.q-mt-md
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
              q-item-label {{$t(`admin:general.searchAllowIndexing`)}}
              q-item-label(caption) {{$t(`admin:general.searchAllowIndexingHint`)}}
            q-item-section(avatar)
              q-toggle(
                v-model='searchAllowIndexing'
                color='primary'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :aria-label='$t(`admin:general.searchAllowIndexing`)'
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
              q-item-label {{$t(`admin:general.searchAllowFollow`)}}
              q-item-label(caption) {{$t(`admin:general.searchAllowFollowHint`)}}
            q-item-section(avatar)
              q-toggle(
                v-model='searchAllowFollow'
                color='primary'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :aria-label='$t(`admin:general.searchAllowFollow`)'
                )

        //- -----------------------
        //- FEATURES
        //- -----------------------
        q-card.shadow-1.q-pb-sm.q-mt-md
          q-card-section
            .text-subtitle1 {{$t('admin:general.features')}}
          q-item(tag='label', v-ripple)
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-comments'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin:general.allowComments`)}}
              q-item-label(caption) {{$t(`admin:general.allowCommentsHint`)}}
            q-item-section(avatar)
              q-toggle(
                v-model='config.featurePageComments'
                color='primary'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :aria-label='$t(`admin:general.allowComments`)'
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
              q-item-label {{$t(`admin:general.allowRatings`)}}
              q-item-label(caption) {{$t(`admin:general.allowRatingsHint`)}}
            q-item-section.col-auto
              q-btn-toggle(
                v-model='config.featurePageRatings'
                push
                glossy
                no-caps
                toggle-color='primary'
                :options=`[
                  { label: $t('admin:general.ratingsOff'), value: 'off' },
                  { label: $t('admin:general.ratingsThumbs'), value: 'thumbs' },
                  { label: $t('admin:general.ratingsStars'), value: 'stars' }
                ]`
              )

      .col-5
        //- -----------------------
        //- Logo
        //- -----------------------
        q-card.shadow-1.q-pb-sm
          q-card-section
            .text-subtitle1 {{$t('admin:general.logo')}}
          q-item(tag='label', v-ripple)
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-feather'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin:general.displaySiteTitle`)}}
              q-item-label(caption) {{$t(`admin:general.displaySiteTitleHint`)}}
            q-item-section(avatar)
              q-toggle(
                v-model='config.featurePageComments'
                color='primary'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :aria-label='$t(`admin:general.displaySiteTitle`)'
                )
          q-separator.q-my-sm(inset)

  //-                 .overline.grey--text.pa-4 {{$t('admin:general.logo')}}
  //-                 .pt-2.pb-7.pl-10.pr-3
  //-                   .d-flex.align-center
  //-                     v-avatar(size='100', tile)
  //-                       v-img(
  //-                         :src='config.logoUrl'
  //-                         lazy-src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNcWQ8AAdcBKrJda2oAAAAASUVORK5CYII='
  //-                         aspect-ratio='1'
  //-                         )
  //-                     .ml-4(style='flex: 1 1 auto;')
  //-                       v-text-field(
  //-                         outlined
  //-                         :label='$t(`admin:general.logoUrl`)'
  //-                         v-model='config.logoUrl'
  //-                         :hint='$t(`admin:general.logoUrlHint`)'
  //-                         persistent-hint
  //-                         append-icon='mdi-folder-image'
  //-                         @click:append='browseLogo'
  //-                         @keyup.enter='refreshLogo'
  //-                       )

  //-           v-flex(lg6 xs12)
  //-             v-card.animated.fadeInUp.wait-p4s
  //-               v-toolbar(color='indigo', dark, dense, flat)
  //-                 v-toolbar-title.subtitle-1 Features
  //-               v-card-text
  //-                 //- v-switch(
  //-                 //-   inset
  //-                 //-   label='Asset Image Optimization'
  //-                 //-   color='indigo'
  //-                 //-   v-model='config.featureTinyPNG'
  //-                 //-   persistent-hint
  //-                 //-   hint='Image optimization tool to reduce filesize and bandwidth costs.'
  //-                 //-   disabled
  //-                 //-   )
  //-                 //- v-text-field.mt-3(
  //-                 //-   outlined
  //-                 //-   label='TinyPNG API Key'
  //-                 //-   :counter='255'
  //-                 //-   v-model='config.description'
  //-                 //-   prepend-icon='mdi-subdirectory-arrow-right'
  //-                 //-   hint='Get your API key at https://tinypng.com/developers'
  //-                 //-   persistent-hint
  //-                 //-   disabled
  //-                 //-   )

</template>

<script>
import { sync } from 'vuex-pathify'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import uniq from 'lodash/uniq'
import without from 'lodash/without'

export default {
  data () {
    return {
      loading: false,
      config: {
        host: '',
        title: '',
        description: '',
        robots: [],
        company: '',
        contentLicense: '',
        featurePageComments: true,
        featurePageRatings: 'off'
      }
    }
  },
  computed: {
    siteTitle: sync('site/title'),
    logoUrl: sync('site/logoUrl'),
    company: sync('site/company'),
    contentLicense: sync('site/contentLicense'),
    contentLicenses () {
      return [
        { value: '', text: this.$t('common:license.none') },
        { value: 'alr', text: this.$t('common:license.alr') },
        { value: 'cc0', text: this.$t('common:license.cc0') },
        { value: 'ccby', text: this.$t('common:license.ccby') },
        { value: 'ccbysa', text: this.$t('common:license.ccbysa') },
        { value: 'ccbynd', text: this.$t('common:license.ccbynd') },
        { value: 'ccbync', text: this.$t('common:license.ccbync') },
        { value: 'ccbyncsa', text: this.$t('common:license.ccbyncsa') },
        { value: 'ccbyncnd', text: this.$t('common:license.ccbyncnd') }
      ]
    },
    searchAllowIndexing: {
      get () { return !this.config.robots.includes('noindex') },
      set (val) {
        this.config.robots = val ? uniq([...without(this.config.robots, 'noindex'), 'index']) : uniq([...without(this.config.robots, 'index'), 'noindex'])
      }
    },
    searchAllowFollow: {
      get () { return !this.config.robots.includes('nofollow') },
      set (val) {
        this.config.robots = val ? uniq([...without(this.config.robots, 'nofollow'), 'follow']) : uniq([...without(this.config.robots, 'follow'), 'nofollow'])
      }
    }
  },
  methods: {
    async save () {
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation (
              $host: String!
              $title: String!
              $description: String!
              $robots: [String]!
              $analyticsService: String!
              $analyticsId: String!
              $company: String!
              $contentLicense: String!
              $logoUrl: String!
              $featurePageRatings: Boolean!
              $featurePageComments: Boolean!
              $featurePersonalWikis: Boolean!
            ) {
              site {
                updateConfig(
                  host: $host,
                  title: $title,
                  description: $description,
                  robots: $robots,
                  analyticsService: $analyticsService,
                  analyticsId: $analyticsId,
                  company: $company,
                  contentLicense: $contentLicense
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
            host: _get(this.config, 'host', ''),
            title: _get(this.config, 'title', ''),
            description: _get(this.config, 'description', ''),
            robots: _get(this.config, 'robots', []),
            company: _get(this.config, 'company', ''),
            contentLicense: _get(this.config, 'contentLicense', '')
          },
          watchLoading (isLoading) {
            this.$store.commit(`loading${isLoading ? 'Start' : 'Stop'}`, 'admin-site-update')
          }
        })
        this.$store.commit('showNotification', {
          style: 'success',
          message: this.$t('admin:general.saveSuccess'),
          icon: 'check'
        })
        this.siteTitle = this.config.title
        this.company = this.config.company
        this.contentLicense = this.config.contentLicense
        this.logoUrl = this.config.logoUrl
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
        {
          site {
            config {
              host
              title
              description
              robots
              company
              contentLicense
              featurePageRatings
              featurePageComments
            }
          }
        }
      `,
      fetchPolicy: 'network-only',
      update: (data) => cloneDeep(data.site.config),
      watchLoading (isLoading) {
        this.$store.commit(`loading${isLoading ? 'Start' : 'Stop'}`, 'admin-site-refresh')
      }
    }
  }
}
</script>

<style lang='scss'>

</style>
