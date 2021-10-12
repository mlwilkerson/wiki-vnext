<template lang="pug">
q-layout(view='hHh lpR fFf', container)
  q-header.card-header.q-px-md.q-py-sm
    q-icon(:name='`img:` + icons.user', left, size='md')
    div
      span {{$t(`admin.users.edit`)}}
      .text-caption john.doe@example.com
    q-space
    q-btn.q-mr-sm(
      push
      glossy
      color='white'
      text-color='grey-7'
      label='Close'
      icon='las la-times'
      @click='close'
    )
    q-btn(
      push
      glossy
      color='positive'
      text-color='white'
      label='Save'
      icon='las la-check'
    )
  q-drawer.bg-dark-6(:model-value='true', :width='250', dark, v-show='!isLoading')
    q-list(padding)
      q-item(
        v-for='sc of sections'
        :key='`section-` + sc.key'
        clickable
        :to='{ params: { section: sc.key } }'
        active-class='bg-primary text-white'
        :disabled='sc.disabled'
        )
        q-item-section(side)
          q-icon(:name='sc.icon', color='white')
        q-item-section {{sc.text}}
  q-page-container
    q-page(v-if='isLoading')
    q-page(v-if='$route.params.section === `overview`')
      .row.q-pa-md.q-col-gutter-md
        .col-12.col-lg-8
          q-card.shadow-1.q-pb-sm
            q-card-section
              .text-subtitle1 {{$t('admin.users.profile')}}
            q-item
              blueprint-icon(icon='contact')
              q-item-section
                q-item-label {{$t(`admin.users.name`)}}
                q-item-label(caption) {{$t(`admin.users.nameHint`)}}
              q-item-section
                q-input(
                  outlined
                  v-model='user.name'
                  dense
                  :rules=`[
                    val => /^[^<>"]+$/.test(val) || $t('admin.users.nameInvalidChars')
                  ]`
                  hide-bottom-space
                  :aria-label='$t(`admin.users.name`)'
                  )
            q-separator.q-my-sm(inset)
            q-item
              blueprint-icon(icon='envelope')
              q-item-section
                q-item-label {{$t(`admin.users.email`)}}
                q-item-label(caption) {{$t(`admin.users.emailHint`)}}
              q-item-section
                q-input(
                  outlined
                  v-model='user.email'
                  dense
                  :aria-label='$t(`admin.users.email`)'
                  )
            q-separator.q-my-sm(inset)
            q-item
              blueprint-icon(icon='address')
              q-item-section
                q-item-label {{$t(`admin.users.location`)}}
                q-item-label(caption) {{$t(`admin.users.locationHint`)}}
              q-item-section
                q-input(
                  outlined
                  v-model='user.location'
                  dense
                  :aria-label='$t(`admin.users.location`)'
                  )
            q-separator.q-my-sm(inset)
            q-item
              blueprint-icon(icon='new-job')
              q-item-section
                q-item-label {{$t(`admin.users.jobTitle`)}}
                q-item-label(caption) {{$t(`admin.users.jobTitleHint`)}}
              q-item-section
                q-input(
                  outlined
                  v-model='user.jobTitle'
                  dense
                  :aria-label='$t(`admin.users.jobTitle`)'
                  )

          q-card.shadow-1.q-pb-sm.q-mt-md
            q-card-section
              .text-subtitle1 {{$t('admin.users.preferences')}}
            q-item
              blueprint-icon(icon='timezone')
              q-item-section
                q-item-label {{$t(`admin.users.timezone`)}}
                q-item-label(caption) {{$t(`admin.users.timezoneHint`)}}
              q-item-section
                q-select(
                  outlined
                  v-model='user.timezone'
                  :options='timezones'
                  option-value='value'
                  option-label='text'
                  emit-value
                  map-options
                  dense
                  options-dense
                  :aria-label='$t(`admin.users.timezone`)'
                )
            q-separator.q-my-sm(inset)
            q-item
              blueprint-icon(icon='calendar')
              q-item-section
                q-item-label {{$t(`admin.users.dateFormat`)}}
                q-item-label(caption) {{$t(`admin.users.dateFormatHint`)}}
              q-item-section
                q-select(
                  outlined
                  v-model='user.dateFormat'
                  emit-value
                  map-options
                  dense
                  :aria-label='$t(`admin.users.dateFormat`)'
                  :options=`[
                    { label: $t('profile.localeDefault'), value: '' },
                    { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
                    { label: 'DD.MM.YYYY', value: 'DD.MM.YYYY' },
                    { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
                    { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
                    { label: 'YYYY/MM/DD', value: 'YYYY/MM/DD' }
                  ]`
                )
            q-separator.q-my-sm(inset)
            q-item
              blueprint-icon(icon='clock')
              q-item-section
                q-item-label {{$t(`admin.users.timeFormat`)}}
                q-item-label(caption) {{$t(`admin.users.timeFormatHint`)}}
              q-item-section.col-auto
                q-btn-toggle(
                  v-model='user.timeFormat'
                  push
                  glossy
                  no-caps
                  toggle-color='primary'
                  :options=`[
                    { label: $t('profile.timeFormat12h'), value: '12h' },
                    { label: $t('profile.timeFormat24h'), value: '24h' }
                  ]`
                )
            q-separator.q-my-sm(inset)
            q-item(tag='label', v-ripple)
              blueprint-icon(icon='light-on')
              q-item-section
                q-item-label {{$t(`admin.users.darkMode`)}}
                q-item-label(caption) {{$t(`admin.users.darkModeHint`)}}
              q-item-section(avatar)
                q-toggle(
                  v-model='user.darkMode'
                  color='primary'
                  checked-icon='las la-check'
                  unchecked-icon='las la-times'
                  :aria-label='$t(`admin.users.darkMode`)'
                )

        .col-12.col-lg-4
          q-card.shadow-1.q-pb-sm
            q-card-section
              .text-subtitle1 {{$t('admin.users.info')}}
</template>

<script>
import gql from 'graphql-tag'
import sampleSize from 'lodash/sampleSize'
import { get } from '@requarks/vuex-pathify'
import zxcvbn from 'zxcvbn'

export default {
  data () {
    return {
      sections: [
        { key: 'overview', text: 'Overview', icon: 'las la-user' },
        { key: 'activity', text: 'Activity', icon: 'las la-chart-area' },
        { key: 'auth', text: 'Authentication', icon: 'las la-key' },
        { key: 'groups', text: 'Groups', icon: 'las la-users' },
        { key: 'operations', text: 'Operations', icon: 'las la-tools' }
      ],
      user: {},
      groups: [],
      isLoadingGroups: false,
      isLoading: false,
      icons: {
        user: require('../assets/icons/fluent-account.svg')
      }
    }
  },
  computed: {
    timezones: get('data/timezones'),
    passwordStrength () {
      if (this.userPassword.length < 8) {
        return {
          color: 'negative',
          label: this.$t('admin.users.pwdStrengthWeak')
        }
      } else {
        switch (zxcvbn(this.userPassword).score) {
          case 1:
            return {
              color: 'deep-orange-7',
              label: this.$t('admin.users.pwdStrengthPoor')
            }
          case 2:
            return {
              color: 'purple-7',
              label: this.$t('admin.users.pwdStrengthMedium')
            }
          case 3:
            return {
              color: 'blue-7',
              label: this.$t('admin.users.pwdStrengthGood')
            }
          case 4:
            return {
              color: 'green-7',
              label: this.$t('admin.users.pwdStrengthStrong')
            }
          default:
            return {
              color: 'negative',
              label: this.$t('admin.users.pwdStrengthWeak')
            }
        }
      }
    },
    selectedGroupName () {
      return this.groups.filter(g => g.id === this.userGroups[0])[0]?.name
    }
  },
  watch: {
    $route: 'checkRoute'
  },
  mounted () {
    this.checkRoute()
  },
  methods: {
    close () {
      this.$store.set('admin/overlay', '')
    },
    checkRoute () {
      if (!this.$route.params.section) {
        this.$router.replace({ params: { section: 'overview' } })
      }
    },
    randomizePassword () {
      const pwdChars = 'abcdefghkmnpqrstuvwxyzABCDEFHJKLMNPQRSTUVWXYZ23456789_*=?#!()+'
      this.userPassword = sampleSize(pwdChars, 16).join('')
    },
    async create () {
      this.isLoading = true
      try {
        const isFormValid = await this.$refs.createUserForm.validate(true)
        if (!isFormValid) {
          throw new Error(this.$t('admin.users.createInvalidData'))
        }
        const resp = await this.$apollo.mutate({
          mutation: gql`
            mutation createsdfsdfsdUser (
              $name: String!
              $email: String!
              $password: String!
              $groups: [UUID]!
              $mustChangePassword: Boolean!
              $sendWelcomeEmail: Boolean!
              ) {
              createUser (
                name: $name
                email: $email
                password: $password
                groups: $groups
                mustChangePassword: $mustChangePassword
                sendWelcomeEmail: $sendWelcomeEmail
                ) {
                status {
                  succeeded
                  message
                }
              }
            }
          `,
          variables: {
            name: this.userName,
            email: this.userEmail,
            password: this.userPassword,
            groups: this.userGroups,
            mustChangePassword: this.userMustChangePassword,
            sendWelcomeEmail: this.userSendWelcomeEmail
          }
        })
        if (resp?.data?.createUser?.status?.succeeded) {
          this.$q.notify({
            type: 'positive',
            message: this.$t('admin.users.createSuccess')
          })
          if (this.keepOpened) {
            this.userName = ''
            this.userEmail = ''
            this.userPassword = ''
            this.$refs.iptName.focus()
          } else {
            this.$emit('ok')
            this.hide()
          }
        } else {
          throw new Error(resp?.data?.createUser?.status?.message || 'An unexpected error occured.')
        }
      } catch (err) {
        this.$q.notify({
          type: 'negative',
          message: err.message
        })
      }
      this.isLoading = false
    }
  },
  apollo: {
    groups: {
      query: gql`
        query getGroupsForCresdfsdfateUser {
          groups {
            id
            name
          }
        }
      `,
      update (data) {
        return data?.groups?.filter(g => g.id !== '10000000-0000-4000-0000-000000000001') ?? []
      },
      watchLoading (isLoading) {
        this.isLoadingGroups = isLoading
      }
    }
  }
}
</script>
