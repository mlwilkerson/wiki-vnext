<template lang='pug'>
  q-page.admin-login
    .row.q-pa-md.items-center
      .col-auto
        img.admin-icon.animated.fadeInLeft(src='~assets/icons/fluent-bunch-of-keys.svg')
      .col.q-pl-md
        .text-h5.text-primary.animated.fadeInLeft {{ $t('admin.login.title') }}
        .text-subtitle1.text-grey.animated.fadeInLeft.wait-p2s {{ $t('admin.login.subtitle') }}
      .col-auto
        q-btn.q-mr-sm.acrylic-btn(
          icon='las la-question-circle'
          flat
          color='grey'
          href='https://docs.js.wiki/admin/login'
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
        //- Experience
        //- -----------------------
        q-card.shadow-1.q-pb-sm
          q-card-section
            .text-subtitle1 {{$t('admin.login.experience')}}
          q-item(tag='label', v-ripple)
            q-item-section(avatar)
              q-avatar(
                :color='avatarBgColor'
                rounded
                )
                q-icon(
                  :name='`img:` + icons.bg'
                  size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.login.background`)}}
              q-item-label(caption) {{$t(`admin.login.backgroundHint`)}}
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
            q-item-section(avatar)
              q-avatar(
                :color='avatarBgColor'
                rounded
                )
                q-icon(
                  :name='`img:` + icons.bypass'
                  size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.login.bypassScreen`)}}
              q-item-label(caption) {{$t(`admin.login.bypassScreenHint`)}}
            q-item-section(avatar)
              q-toggle(
                v-model='config.authAutoLogin'
                color='primary'
                checked-icon='las la-check'
                unchecked-icon='las la-times'
                :aria-label='$t(`admin.login.bypassScreen`)'
                )
          q-separator.q-my-sm(inset)
          q-item
            q-item-section(avatar)
              q-avatar(
                :color='avatarBgColor'
                rounded
                )
                q-icon(
                  :name='`img:` + icons.redirect'
                  size='sm'
                )
            q-item-section
              q-item-label {{$t(`admin.login.welcomeRedirect`)}}
              q-item-label(caption) {{$t(`admin.login.welcomeRedirectHint`)}}
            q-item-section
              q-input(
                outlined
                v-model='config.welcomeRedirect'
                dense
                :rules=`[
                  val => /^[^<>"]+$/.test(val) || $t('admin.login.welcomeRedirectInvalidChars')
                ]`
                hide-bottom-space
                :aria-label='$t(`admin.login.welcomeRedirect`)'
                )

      .col-12.col-lg-6
        //- -----------------------
        //- Providers
        //- -----------------------
        q-card.shadow-1.q-pb-sm
          q-card-section
            .text-subtitle1 {{$t('admin.login.providers')}}
          q-card-section.admin-login-providers.q-pt-none
            draggable(
              class='q-list rounded-borders'
              :list='providers'
              :animation='150'
              handle='.handle'
              @end='dragStarted = false'
              )
              q-item(
                v-for='item of providers'
                :key='item.id'
                )
                q-item-section(side)
                  q-icon.handle(name='las la-bars')
                q-item-section(side)
                  q-icon(:name='item.icon', color='primary')
                q-item-section
                  q-item-label {{item.label}}
                  q-item-label(caption) {{item.provider}}
                q-item-section(side)
                  q-toggle(
                    v-model='item.isActive'
                    color='primary'
                    checked-icon='las la-check'
                    unchecked-icon='las la-times'
                    label='Visible'
                    :aria-label='item.label'
                  )
          q-item.q-pt-none
            q-item-section
              q-card.bg-info.text-white.rounded-borders(flat)
                q-card-section.items-center(horizontal)
                  q-card-section.col-auto.q-pr-none
                    q-icon(name='las la-info-circle', size='sm')
                  q-card-section.text-caption {{ $t('admin.login.providersVisbleWarning') }}

</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import gql from 'graphql-tag'
import draggable from 'vuedraggable'

export default {
  meta () {
    return {
      title: this.$t('admin.login.title')
    }
  },
  components: {
    draggable
  },
  data () {
    return {
      loading: false,
      config: {
        authAutoLogin: false,
        authHideLocal: false,
        welcomeRedirect: '/'
      },
      providers: [
        { id: 'local', label: 'Local Authentication', provider: 'Username-Password', icon: 'las la-database', isActive: true },
        { id: 'google', label: 'Google', provider: 'Google', icon: 'lab la-google', isActive: false }
      ],
      icons: {
        bg: require('assets/icons/ultraviolet-full-image.svg'),
        bypass: require('assets/icons/ultraviolet-close-pane.svg'),
        redirect: require('assets/icons/ultraviolet-chevron-right.svg')
      }
    }
  },
  computed: {
    avatarBgColor () { return this.$q.dark.isActive ? 'dark-4' : 'blue-1' }
  },
  methods: {
    async save () {
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation (
              $authAutoLogin: Boolean
              $authEnforce2FA: Boolean
            ) {
              site {
                updateConfig(
                  authAutoLogin: $authAutoLogin,
                  authEnforce2FA: $authEnforce2FA
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
            authEnforce2FA: this.config.authEnforce2FA ?? false
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
          }
        }
      `,
      skip: true,
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
.admin-login-providers {
  .q-item {
    border-radius: 5px;

    @at-root .body--light & {
      background-color: $grey-2;
    }
    @at-root .body--dark & {
      background-color: $dark-5;
    }

    & + .q-item {
      margin-top: 8px;
    }
  }

  .handle {
    cursor: ns-resize;
  }
}
</style>
