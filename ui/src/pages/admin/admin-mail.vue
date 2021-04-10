<template lang='pug'>
  q-page.admin-mail
    .row.q-pa-md.items-center
      .col-auto
        img.admin-icon.animated.fadeInLeft(src='~assets/icons/fluent-message-settings.svg')
      .col.q-pl-md
        .text-h5.text-primary.animated.fadeInLeft {{ $t('admin:mail.title') }}
        .text-subtitle1.text-grey.animated.fadeInLeft.wait-p2s {{ $t('admin:mail.subtitle') }}
      .col-auto
        q-btn.q-mr-sm.acrylic-btn(
          icon='las la-question-circle'
          flat
          color='grey'
          href='https://docs.js.wiki/mail'
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
      .col-12.col-lg-7
        //- -----------------------
        //- Configuration
        //- -----------------------
        q-card.shadow-1.q-pb-sm
          q-card-section
            .text-subtitle1 {{$t('admin:mail.configuration')}}
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-id-card'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin:mail.senderName`)}}
              q-item-label(caption) {{$t(`admin:general.senderNameHint`)}}
            q-item-section
              q-input(
                outlined
                v-model='config.senderName'
                dense
                :rules=`[
                  val => /^[^<>"]+$/.test(val) || $t('admin:general.senderNameInvalidChars')
                ]`
                hide-bottom-space
                :aria-label='$t(`admin:general.senderName`)'
                )
          q-separator.q-my-sm(inset)
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-envelope'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin:mail.senderEmail`)}}
              q-item-label(caption) {{$t(`admin:general.senderEmailHint`)}}
            q-item-section
              q-input(
                outlined
                v-model='config.senderEmail'
                dense
                :aria-label='$t(`admin:mail.senderEmail`)'
                )
        //- -----------------------
        //- SMTP
        //- -----------------------
        q-card.shadow-1.q-pb-sm.q-mt-md
          q-card-section
            .text-subtitle1 {{$t('admin:mail.smtp')}}
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-globe'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin:mail.smtpHost`)}}
              q-item-label(caption) {{$t(`admin:general.smtpHostHint`)}}
            q-item-section
              q-input(
                outlined
                v-model='config.host'
                dense
                :rules=`[
                  val => /^[^<>"]+$/.test(val) || $t('admin:general.siteTitleInvalidChars')
                ]`
                hide-bottom-space
                :aria-label='$t(`admin:general.smtpHost`)'
                )
          q-separator.q-my-sm(inset)
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-plug'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin:mail.smtpPort`)}}
              q-item-label(caption) {{$t(`admin:mail.smtpPortHint`)}}
            q-item-section
              q-input(
                outlined
                v-model='config.port'
                dense
                :aria-label='$t(`admin:mail.smtpPort`)'
                )
          q-separator.q-my-sm(inset)
          q-item(tag='label', v-ripple)
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-lock'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin:mail.smtpTLS`)}}
              q-item-label(caption) {{$t(`admin:mail.smtpTLSHint`)}}
            q-item-section(avatar)
              q-toggle(
                v-model='config.secure'
                color='primary'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :aria-label='$t(`admin:mail.smtpTLS`)'
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
              q-item-label {{$t(`admin:mail.smtpVerifySSL`)}}
              q-item-label(caption) {{$t(`admin:mail.smtpVerifySSLHint`)}}
            q-item-section(avatar)
              q-toggle(
                v-model='config.verifySSL'
                color='primary'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :aria-label='$t(`admin:mail.smtpVerifySSL`)'
                )
          q-separator.q-my-sm(inset)
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-id-badge'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin:mail.smtpUser`)}}
              q-item-label(caption) {{$t(`admin:mail.smtpUserHint`)}}
            q-item-section
              q-input(
                outlined
                v-model='config.user'
                dense
                :aria-label='$t(`admin:mail.smtpUser`)'
                )
          q-separator.q-my-sm(inset)
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-key'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin:mail.smtpPwd`)}}
              q-item-label(caption) {{$t(`admin:mail.smtpPwdHint`)}}
            q-item-section
              q-input(
                outlined
                v-model='config.pass'
                dense
                :aria-label='$t(`admin:mail.smtpPwd`)'
                )
        //- -----------------------
        //- DKIM
        //- -----------------------
        q-card.shadow-1.q-pb-sm.q-mt-md
          q-card-section
            .text-subtitle1 {{$t('admin:mail.dkim')}}
          q-item
            q-item-section
              q-card.bg-info.text-white.rounded-borders(flat)
                q-card-section.items-center(horizontal)
                  q-card-section.col-auto.q-pr-none
                    q-icon(name='las la-info-circle', size='md')
                  q-card-section
                    span {{ $t('admin:mail.dkimHint') }}
          q-item(tag='label', v-ripple)
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-bolt'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin:mail.dkimUse`)}}
              q-item-label(caption) {{$t(`admin:mail.dkimUseHint`)}}
            q-item-section(avatar)
              q-toggle(
                v-model='config.useDKIM'
                color='primary'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :aria-label='$t(`admin:mail.dkimUse`)'
                )
          template(v-if='config.useDKIM')
            q-separator.q-my-sm(inset)
            q-item
              q-item-section.items-center(style='flex: 0 0 40px;')
                q-icon(
                  name='las la-globe'
                  color='primary'
                  size='sm'
                  )
              q-item-section
                q-item-label {{$t(`admin:mail.dkimDomainName`)}}
                q-item-label(caption) {{$t(`admin:mail.dkimDomainNameHint`)}}
              q-item-section
                q-input(
                  outlined
                  v-model='config.dkimDomainName'
                  dense
                  :aria-label='$t(`admin:mail.dkimDomainName`)'
                  )
            q-separator.q-my-sm(inset)
            q-item
              q-item-section.items-center(style='flex: 0 0 40px;')
                q-icon(
                  name='las la-key'
                  color='primary'
                  size='sm'
                  )
              q-item-section
                q-item-label {{$t(`admin:mail.dkimKeySelector`)}}
                q-item-label(caption) {{$t(`admin:mail.dkimKeySelectorHint`)}}
              q-item-section
                q-input(
                  outlined
                  v-model='config.dkimKeySelector'
                  dense
                  :aria-label='$t(`admin:mail.dkimKeySelector`)'
                  )
            q-separator.q-my-sm(inset)
            q-item
              q-item-section.items-center(style='flex: 0 0 40px;')
                q-icon(
                  name='las la-key'
                  color='primary'
                  size='sm'
                  )
              q-item-section
                q-item-label {{$t(`admin:mail.dkimPrivateKey`)}}
                q-item-label(caption) {{$t(`admin:mail.dkimPrivateKeyHint`)}}
              q-item-section
                q-input(
                  outlined
                  v-model='config.dkimPrivateKey'
                  dense
                  :aria-label='$t(`admin:mail.dkimPrivateKey`)'
                  type='textarea'
                  )

      .col-12.col-lg-5
        //- -----------------------
        //- SMTP TEST
        //- -----------------------
        q-card.shadow-1.q-pb-sm
          q-card-section
            .text-subtitle1 {{$t('admin:mail.test')}}
          q-item
            q-item-section.items-center(style='flex: 0 0 40px;')
              q-icon(
                name='las la-at'
                color='primary'
                size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin:mail.testRecipient`)}}
              q-item-label(caption) {{$t(`admin:mail.testRecipientHint`)}}
            q-item-section
              q-input(
                outlined
                v-model='testEmail'
                dense
                :aria-label='$t(`admin:mail.testRecipient`)'
                )
          .flex.justify-end.q-pr-md.q-py-sm
            q-btn(
              push
              glossy
              color='primary'
              icon='las la-paper-plane'
              :label='$t(`admin:mail.testSend`)'
              @click='sendTest'
              :loading='testLoading'
            )

  //-                   span {{ $t('admin:mail.dkimHint') }}

</template>

<script>
import toSafeInteger from 'lodash/toSafeInteger'
import _get from 'lodash/get'
// import cloneDeep from 'lodash/cloneDeep'
import gql from 'graphql-tag'
// import mailConfigQuery from 'gql/admin/mail/mail-query-config.gql'
// import mailUpdateConfigMutation from 'gql/admin/mail/mail-mutation-save-config.gql'
// import mailTestMutation from 'gql/admin/mail/mail-mutation-sendtest.gql'

export default {
  data () {
    return {
      config: {
        senderName: '',
        senderEmail: '',
        host: '',
        port: 0,
        secure: false,
        verifySSL: false,
        user: '',
        pass: '',
        useDKIM: false,
        dkimDomainName: '',
        dkimKeySelector: '',
        dkimPrivateKey: ''
      },
      testEmail: '',
      testLoading: false,
      loading: false
    }
  },
  methods: {
    async save () {
      try {
        await this.$apollo.mutate({
          mutation: gql`{ test }`,
          variables: {
            senderName: this.config.senderName || '',
            senderEmail: this.config.senderEmail || '',
            host: this.config.host || '',
            port: toSafeInteger(this.config.port) || 0,
            secure: this.config.secure || false,
            verifySSL: this.config.verifySSL || false,
            user: this.config.user || '',
            pass: this.config.pass || '',
            useDKIM: this.config.useDKIM || false,
            dkimDomainName: this.config.dkimDomainName || '',
            dkimKeySelector: this.config.dkimKeySelector || '',
            dkimPrivateKey: this.config.dkimPrivateKey || ''
          },
          watchLoading (isLoading) {
            this.$store.commit(`loading${isLoading ? 'Start' : 'Stop'}`, 'admin-mail-update')
          }
        })
        this.$store.commit('showNotification', {
          style: 'success',
          message: this.$t('admin:mail.saveSuccess'),
          icon: 'check'
        })
      } catch (err) {
        this.$store.commit('pushGraphError', err)
      }
    },
    async sendTest () {
      try {
        const resp = await this.$apollo.mutate({
          mutation: gql`{ test }`,
          variables: {
            recipientEmail: this.testEmail
          },
          watchLoading (isLoading) {
            this.$store.commit(`loading${isLoading ? 'Start' : 'Stop'}`, 'admin-mail-test')
          }
        })
        if (!_get(resp, 'data.mail.sendTest.responseResult.succeeded', false)) {
          throw new Error(_get(resp, 'data.mail.sendTest.responseResult.message', 'An unexpected error occurred.'))
        }

        this.testEmail = ''
        this.$store.commit('showNotification', {
          style: 'success',
          message: this.$t('admin:mail.sendTestSuccess'),
          icon: 'check'
        })
      } catch (err) {
        this.$store.commit('pushGraphError', err)
      }
    }
  }
  // apollo: {
  //   config: {
  //     query: gql`{ test }`,
  //     fetchPolicy: 'network-only',
  //     update: (data) => cloneDeep(data.mail.config),
  //     watchLoading (isLoading) {
  //       this.$store.commit(`loading${isLoading ? 'Start' : 'Stop'}`, 'admin-mail-refresh')
  //     }
  //   }
  // }
}
</script>

<style lang='scss'>

</style>
