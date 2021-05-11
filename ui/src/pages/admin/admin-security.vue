<template lang='pug'>
  q-page.admin-mail
    .row.q-pa-md.items-center
      .col-auto
        img.admin-icon.animated.fadeInLeft(src='~assets/icons/fluent-protect.svg')
      .col.q-pl-md
        .text-h5.text-primary.animated.fadeInLeft {{ $t('admin.security.title') }}
        .text-subtitle1.text-grey.animated.fadeInLeft.wait-p2s {{ $t('admin.security.subtitle') }}
      .col-auto
        q-btn.q-mr-sm.acrylic-btn(
          icon='las la-question-circle'
          flat
          color='grey'
          href='https://docs.js.wiki/admin/security'
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
      .col-12.col-lg-6
        //- -----------------------
        //- Security
        //- -----------------------
        q-card.shadow-1.q-pb-sm
          q-card-section
            .text-subtitle1 {{$t('admin.security.title')}}
          q-item.q-pt-none
            q-item-section
              q-card.bg-negative.text-white.rounded-borders(flat)
                q-card-section.items-center(horizontal)
                  q-card-section.col-auto.q-pr-none
                    q-icon(name='las la-exclamation-triangle', size='sm')
                  q-card-section.text-caption {{ $t('admin.security.warn') }}
          q-item(tag='label', v-ripple)
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-shield-alt'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.security.disallowFloc`)}}
              q-item-label(caption) {{$t(`admin.security.disallowFlocHint`)}}
            q-item-section(avatar)
              q-toggle(
                v-model='config.disallowFloc'
                color='primary'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :aria-label='$t(`admin.security.disallowFloc`)'
                )
          q-separator.q-my-sm(inset)
          q-item(tag='label', v-ripple)
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-shield-alt'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.security.disallowIframe`)}}
              q-item-label(caption) {{$t(`admin.security.disallowIframeHint`)}}
            q-item-section(avatar)
              q-toggle(
                v-model='config.disallowIframe'
                color='primary'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :aria-label='$t(`admin.security.disallowIframe`)'
                )
          q-separator.q-my-sm(inset)
          q-item(tag='label', v-ripple)
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-shield-alt'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.security.disallowOpenRedirect`)}}
              q-item-label(caption) {{$t(`admin.security.disallowOpenRedirectHint`)}}
            q-item-section(avatar)
              q-toggle(
                v-model='config.disallowOpenRedirect'
                color='primary'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :aria-label='$t(`admin.security.disallowOpenRedirect`)'
                )
          q-separator.q-my-sm(inset)
          q-item(tag='label', v-ripple)
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-shield-alt'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.security.trustProxy`)}}
              q-item-label(caption) {{$t(`admin.security.trustProxyHint`)}}
            q-item-section(avatar)
              q-toggle(
                v-model='config.trustProxy'
                color='primary'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :aria-label='$t(`admin.security.trustProxy`)'
                )
        //- -----------------------
        //- HSTS
        //- -----------------------
        q-card.shadow-1.q-pb-sm.q-mt-md
          q-card-section
            .text-subtitle1 {{$t('admin.security.hsts')}}
          q-item(tag='label', v-ripple)
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-ethernet'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.security.enforceHsts`)}}
              q-item-label(caption) {{$t(`admin.security.enforceHstsHint`)}}
            q-item-section(avatar)
              q-toggle(
                v-model='config.enforceHsts'
                color='primary'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :aria-label='$t(`admin.security.enforceHsts`)'
                )
          template(v-if='config.enforceHsts')
            q-separator.q-my-sm(inset)
            q-item
              q-item-section.items-center(style='flex: 0 0 40px;')
                q-icon(
                  name='las la-ethernet'
                  color='primary'
                  size='sm'
                  )
              q-item-section
                q-item-label {{$t(`admin.security.hstsDuration`)}}
                q-item-label(caption) {{$t(`admin.security.hstsDurationHint`)}}
              q-item-section(style='flex: 0 0 200px;')
                q-select(
                  outlined
                  v-model='config.hstsDuration'
                  :options='hstsDurations'
                  option-value='value'
                  option-label='text'
                  emit-value
                  map-options
                  dense
                  :aria-label='$t(`admin.security.hstsDuration`)'
                  )

      .col-12.col-lg-6
        //- -----------------------
        //- Uploads
        //- -----------------------
        q-card.shadow-1.q-pb-sm
          q-card-section
            .text-subtitle1 {{$t('admin.security.uploads')}}
          q-item.q-pt-none
            q-item-section
              q-card.bg-info.text-white.rounded-borders(flat)
                q-card-section.items-center(horizontal)
                  q-card-section.col-auto.q-pr-none
                    q-icon(name='las la-info-circle', size='sm')
                  q-card-section.text-caption {{ $t('admin.security.uploadsInfo') }}
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-cloud-upload-alt'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.security.maxUploadSize`)}}
              q-item-label(caption) {{$t(`admin.security.maxUploadSizeHint`)}}
            q-item-section(style='flex: 0 0 200px;')
              q-input(
                outlined
                v-model='config.uploadMaxFileSize'
                dense
                :suffix='$t(`admin.security.maxUploadSizeSuffix`)'
                :aria-label='$t(`admin.security.maxUploadSize`)'
                )
          q-separator.q-my-sm(inset)
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-cloud-upload-alt'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.security.maxUploadBatch`)}}
              q-item-label(caption) {{$t(`admin.security.maxUploadBatchHint`)}}
            q-item-section(style='flex: 0 0 200px;')
              q-input(
                outlined
                v-model='config.uploadMaxFiles'
                dense
                :suffix='$t(`admin.security.maxUploadBatchSuffix`)'
                :aria-label='$t(`admin.security.maxUploadBatch`)'
                )

        //- -----------------------
        //- CORS
        //- -----------------------
        q-card.shadow-1.q-pb-sm.q-mt-md
          q-card-section
            .text-subtitle1 {{$t('admin.security.cors')}}
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-network-wired'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.security.corsMode`)}}
              q-item-label(caption) {{$t(`admin.security.corsModeHint`)}}
            q-item-section
              q-select(
                outlined
                v-model='config.corsMode'
                :options='corsModes'
                option-value='value'
                option-label='text'
                emit-value
                map-options
                dense
                :aria-label='$t(`admin.security.corsMode`)'
                )
          template(v-if='config.corsMode === `HOSTNAMES`')
            q-separator.q-my-sm(inset)
            q-item
              q-item-section.items-center(style='flex: 0 0 40px;')
                q-icon(
                  name='las la-network-wired'
                  color='primary'
                  size='sm'
                  )
              q-item-section
                q-item-label {{$t(`admin.security.corsHostnames`)}}
                q-item-label(caption) {{$t(`admin.security.corsHostnamesHint`)}}
              q-item-section
                q-input(
                  outlined
                  v-model='config.corsConfig'
                  dense
                  type='textarea'
                  :aria-label='$t(`admin.security.corsHostnames`)'
                  )
          template(v-else-if='config.corsMode === `REGEX`')
            q-separator.q-my-sm(inset)
            q-item
              q-item-section.items-center(style='flex: 0 0 40px;')
                q-icon(
                  name='las la-network-wired'
                  color='primary'
                  size='sm'
                  )
              q-item-section
                q-item-label {{$t(`admin.security.corsRegex`)}}
                q-item-label(caption) {{$t(`admin.security.corsRegexHint`)}}
              q-item-section
                q-input(
                  outlined
                  v-model='config.corsConfig'
                  dense
                  :aria-label='$t(`admin.security.corsRegex`)'
                  )

        //- -----------------------
        //- JWT
        //- -----------------------
        q-card.shadow-1.q-pb-sm.q-mt-md
          q-card-section
            .text-subtitle1 {{$t('admin.security.jwt')}}
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-eraser'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.security.jwtAudience`)}}
              q-item-label(caption) {{$t(`admin.security.jwtAudienceHint`)}}
            q-item-section(style='flex: 0 0 250px;')
              q-input(
                outlined
                v-model='config.authJwtAudience'
                dense
                :aria-label='$t(`admin.security.jwtAudience`)'
                )
          q-separator.q-my-sm(inset)
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-eraser'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.security.tokenExpiration`)}}
              q-item-label(caption) {{$t(`admin.security.tokenExpirationHint`)}}
            q-item-section(style='flex: 0 0 140px;')
              q-input(
                outlined
                v-model='config.authJwtExpiration'
                dense
                :aria-label='$t(`admin.security.tokenExpiration`)'
                )
          q-separator.q-my-sm(inset)
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-eraser'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.security.tokenRenewalPeriod`)}}
              q-item-label(caption) {{$t(`admin.security.tokenRenewalPeriodHint`)}}
            q-item-section(style='flex: 0 0 140px;')
              q-input(
                outlined
                v-model='config.authJwtRenewablePeriod'
                dense
                :aria-label='$t(`admin.security.tokenRenewalPeriod`)'
                )

            //-       v-select.mt-5(
            //-         outlined
            //-         label='HSTS Max Age'
            //-         :items='hstsDurations'
            //-         v-model='config.securityHSTSDuration'
            //-         prepend-icon='mdi-subdirectory-arrow-right'
            //-         :disabled='!config.securityHSTS'
            //-         hide-details
            //-         style='max-width: 450px;'
            //-         )
            //-       .pl-11.mt-3
            //-         .caption Defines the duration for which the server should only deliver content through HTTPS.
            //-         .caption It's a good idea to start with small values and make sure that nothing breaks on your wiki before moving to longer values.

</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import toSafeInteger from 'lodash/toSafeInteger'
import gql from 'graphql-tag'

export default {
  meta () {
    return {
      title: this.$t('admin.security.title')
    }
  },
  data () {
    return {
      loading: false,
      config: {
        corsConfig: '',
        corsMode: 'OFF',
        cspDirectives: '',
        disallowFloc: false,
        disallowIframe: false,
        disallowOpenRedirect: false,
        enforceCsp: false,
        enforceHsts: false,
        enforceSameOriginReferrerPolicy: false,
        hstsDuration: 0,
        trustProxy: false,
        authJwtAudience: 'urn:wiki.js',
        authJwtExpiration: '30m',
        authJwtRenewablePeriod: '14d',
        uploadMaxFileSize: 0,
        uploadMaxFiles: 0
      },
      hstsDurations: [
        { value: 300, text: '5 minutes' },
        { value: 86400, text: '1 day' },
        { value: 604800, text: '1 week' },
        { value: 2592000, text: '1 month' },
        { value: 31536000, text: '1 year' },
        { value: 63072000, text: '2 years' }
      ]
    }
  },
  computed: {
    corsModes () {
      return [
        { value: 'OFF', text: 'Off / Same-Origin' },
        { value: 'REFLECT', text: 'Reflect Request Origin' },
        { value: 'HOSTNAMES', text: 'Hostnames Whitelist' },
        { value: 'REGEX', text: 'Regex Pattern Match' }
      ]
    }
  },
  methods: {
    async save () {
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation (
              $authAutoLogin: Boolean
              $authEnforce2FA: Boolean
              $authHideLocal: Boolean
              $authLoginBgUrl: String
              $authJwtAudience: String
              $authJwtExpiration: String
              $authJwtRenewablePeriod: String
              $uploadMaxFileSize: Int
              $uploadMaxFiles: Int
              $securityOpenRedirect: Boolean
              $securityIframe: Boolean
              $securityReferrerPolicy: Boolean
              $securityTrustProxy: Boolean
              $securitySRI: Boolean
              $securityHSTS: Boolean
              $securityHSTSDuration: Int
              $securityCSP: Boolean
              $securityCSPDirectives: String
            ) {
              site {
                updateConfig(
                  authAutoLogin: $authAutoLogin,
                  authEnforce2FA: $authEnforce2FA,
                  authHideLocal: $authHideLocal,
                  authLoginBgUrl: $authLoginBgUrl,
                  authJwtAudience: $authJwtAudience,
                  authJwtExpiration: $authJwtExpiration,
                  authJwtRenewablePeriod: $authJwtRenewablePeriod,
                  uploadMaxFileSize: $uploadMaxFileSize,
                  uploadMaxFiles: $uploadMaxFiles,
                  securityOpenRedirect: $securityOpenRedirect,
                  securityIframe: $securityIframe,
                  securityReferrerPolicy: $securityReferrerPolicy,
                  securityTrustProxy: $securityTrustProxy,
                  securitySRI: $securitySRI,
                  securityHSTS: $securityHSTS,
                  securityHSTSDuration: $securityHSTSDuration,
                  securityCSP: $securityCSP,
                  securityCSPDirectives: $securityCSPDirectives
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
            authAutoLogin: this.config.authAutoLogin ?? false,
            authEnforce2FA: this.config.authEnforce2FA ?? false,
            authHideLocal: this.config.authHideLocal ?? false,
            authLoginBgUrl: this.config.authLoginBgUrl ?? '',
            authJwtAudience: this.config.authJwtAudience ?? '',
            authJwtExpiration: this.config.authJwtExpiration ?? '',
            authJwtRenewablePeriod: this.config.authJwtRenewablePeriod ?? '',
            uploadMaxFileSize: toSafeInteger(this.config.uploadMaxFileSize) ?? 0,
            uploadMaxFiles: toSafeInteger(this.config.uploadMaxFiles) ?? 0,
            securityOpenRedirect: this.config.securityOpenRedirect ?? false,
            securityIframe: this.config.securityIframe ?? false,
            securityReferrerPolicy: this.config.securityReferrerPolicy ?? false,
            securityTrustProxy: this.config.securityTrustProxy ?? false,
            securitySRI: this.config.securitySRI ?? false,
            securityHSTS: this.config.securityHSTS ?? false,
            securityHSTSDuration: this.config.securityHSTSDuration ?? 0,
            securityCSP: this.config.securityCSP ?? false,
            securityCSPDirectives: this.config.securityCSPDirectives ?? ''
          },
          watchLoading (isLoading) {
            this.$store.commit(`loading${isLoading ? 'Start' : 'Stop'}`, 'admin-site-update')
          }
        })
        this.$store.commit('showNotification', {
          style: 'success',
          message: 'Configuration saved successfully.',
          icon: 'check'
        })
      } catch (err) {
        this.$store.commit('pushGraphError', err)
      }
    }
  },
  apollo: {
    config: {
      query: gql`
        {
          systemSecurity {
            authJwtAudience
            authJwtExpiration
            authJwtRenewablePeriod
            corsConfig
            corsMode
            cspDirectives
            disallowFloc
            disallowIframe
            disallowOpenRedirect
            enforceCsp
            enforceHsts
            enforceSameOriginReferrerPolicy
            hstsDuration
            trustProxy
            uploadMaxFileSize
            uploadMaxFiles
          }
        }
      `,
      fetchPolicy: 'network-only',
      update: (data) => cloneDeep(data.systemSecurity),
      watchLoading (isLoading) {
        this.$store.commit(`loading${isLoading ? 'Start' : 'Stop'}`, 'admin-security-refresh')
      }
    }
  }
}
</script>

<style lang='scss'>

</style>
