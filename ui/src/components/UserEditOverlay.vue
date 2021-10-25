<template lang="pug">
q-layout(view='hHh lpR fFf', container)
  q-header.card-header.q-px-md.q-py-sm
    q-icon(:name='`img:` + icons.user', left, size='md')
    div
      span {{$t(`admin.users.edit`)}}
      .text-caption {{user.name}}
    q-space
    q-btn.q-mr-sm(
      push
      glossy
      color='white'
      text-color='grey-7'
      :label='$t(`common.actions.close`)'
      :aria-label='$t(`common.actions.close`)'
      icon='las la-times'
      @click='close'
    )
    q-btn(
      push
      glossy
      color='positive'
      text-color='white'
      :label='$t(`common.actions.save`)'
      :aria-label='$t(`common.actions.save`)'
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
    q-page(v-else-if='$route.params.section === `overview`')
      .q-pa-md
        .row.q-col-gutter-md
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
              template(v-if='user.meta')
                q-separator.q-my-sm(inset)
                q-item
                  blueprint-icon(icon='address')
                  q-item-section
                    q-item-label {{$t(`admin.users.location`)}}
                    q-item-label(caption) {{$t(`admin.users.locationHint`)}}
                  q-item-section
                    q-input(
                      outlined
                      v-model='user.meta.location'
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
                      v-model='user.meta.jobTitle'
                      dense
                      :aria-label='$t(`admin.users.jobTitle`)'
                      )

            q-card.shadow-1.q-pb-sm.q-mt-md(v-if='user.meta')
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
                    v-model='user.prefs.timezone'
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
                    v-model='user.prefs.dateFormat'
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
                    v-model='user.prefs.timeFormat'
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
                    v-model='user.prefs.darkMode'
                    color='primary'
                    checked-icon='las la-check'
                    unchecked-icon='las la-times'
                    :aria-label='$t(`admin.users.darkMode`)'
                  )

          .col-12.col-lg-4
            q-card.shadow-1.q-pb-sm
              q-card-section
                .text-subtitle1 {{$t('admin.users.info')}}
              q-item
                blueprint-icon(icon='person', :hue-rotate='45')
                q-item-section
                  q-item-label {{$t(`admin.users.id`)}}
                  q-item-label: strong {{userId}}
              q-separator.q-my-sm(inset)
              q-item
                blueprint-icon(icon='calendar-plus', :hue-rotate='45')
                q-item-section
                  q-item-label {{$t(`admin.users.joined`)}}
                  q-item-label: strong {{humanizeDate(user.createdAt)}}
              q-separator.q-my-sm(inset)
              q-item
                blueprint-icon(icon='summertime', :hue-rotate='45')
                q-item-section
                  q-item-label {{$t(`admin.users.lastUpdated`)}}
                  q-item-label: strong {{humanizeDate(user.updatedAt)}}
              q-separator.q-my-sm(inset)
              q-item
                blueprint-icon(icon='enter', :hue-rotate='45')
                q-item-section
                  q-item-label {{$t(`admin.users.lastLoginAt`)}}
                  q-item-label: strong {{humanizeDate(user.lastLoginAt)}}

    q-page(v-else-if='$route.params.section === `activity`')
      span ---
    q-page(v-else-if='$route.params.section === `auth`')
      .q-pa-md
        .row.q-col-gutter-md
          .col-12.col-lg-8
            q-card.shadow-1.q-pb-sm
              q-card-section
                .text-subtitle1 {{$t('admin.users.auth')}}
              q-item
    q-page(v-else-if='$route.params.section === `groups`')
      .q-pa-md
        .row.q-col-gutter-md
          .col-12.col-lg-8
            q-card.shadow-1.q-py-sm
              q-item
                blueprint-icon(icon='join')
                q-item-section
                  q-select(
                    outlined
                    :options='groups'
                    v-model='groupToAdd'
                    map-options
                    emit-value
                    option-value='id'
                    option-label='name'
                    options-dense
                    dense
                    hide-bottom-space
                    :label='$t(`admin.users.groups`)'
                    :aria-label='$t(`admin.users.groups`)'
                    :loading='isLoadingGroups'
                    )
                q-item-section(side)
                  q-btn(
                    unelevated
                    icon='las la-plus'
                    :label='$t(`admin.users.assignGroup`)'
                    color='primary'
                  )
            q-card.shadow-1.q-pb-sm.q-mt-md
              q-card-section
                .text-subtitle1 {{$t('admin.users.groups')}}
              template(
                v-for='(grp, idx) of user.groups'
                :key='grp.id'
                )
                q-separator.q-my-sm(inset, v-if='idx > 0')
                q-item
                  blueprint-icon(icon='team', :hue-rotate='-45')
                  q-item-section
                    q-item-label {{grp.name}}
                  q-item-section(side)
                    q-btn.acrylic-btn(
                      flat
                      icon='las la-trash'
                      color='accent'
                    )
    q-page(v-else-if='$route.params.section === `operations`')
      .q-pa-md
        .row.q-col-gutter-md
          .col-12.col-lg-8
            q-card.shadow-1.q-pb-sm
              q-card-section
                .text-subtitle1 {{$t('admin.users.operations')}}
              q-item
</template>

<script>
import gql from 'graphql-tag'
import sampleSize from 'lodash/sampleSize'
import cloneDeep from 'lodash/cloneDeep'
import { get } from '@requarks/vuex-pathify'
import zxcvbn from 'zxcvbn'
import { DateTime } from 'luxon'

export default {
  data () {
    return {
      sections: [
        { key: 'overview', text: this.$t('admin.users.overview'), icon: 'las la-user' },
        { key: 'activity', text: this.$t('admin.users.activity'), icon: 'las la-chart-area' },
        { key: 'auth', text: this.$t('admin.users.auth'), icon: 'las la-key' },
        { key: 'groups', text: this.$t('admin.users.groups'), icon: 'las la-users' },
        { key: 'operations', text: this.$t('admin.users.operations'), icon: 'las la-tools' }
      ],
      user: {
        meta: {},
        prefs: {},
        groups: []
      },
      groups: [],
      groupToAdd: null,
      isLoadingGroups: false,
      isLoading: false,
      icons: {
        user: require('../assets/icons/fluent-account.svg')
      }
    }
  },
  computed: {
    timezones: get('data/timezones'),
    userId: get('admin/overlayOpts@id'),
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
    this.fetchUser()
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
    humanizeDate (val) {
      if (!val) { return '---' }
      return DateTime.fromISO(val).toLocaleString(DateTime.DATETIME_FULL)
    },
    async fetchUser () {
      this.isLoading = true
      try {
        const resp = await this.$apollo.query({
          query: gql`
            query adminFetchUser (
              $id: UUID!
              ) {
              userById(
                id: $id
              ) {
                id
                email
                name
                meta
                prefs
                lastLoginAt
                createdAt
                updatedAt
                groups {
                  id
                  name
                }
              }
            }
          `,
          variables: {
            id: this.userId
          },
          fetchPolicy: 'network-only'
        })
        if (resp?.data?.userById) {
          this.user = cloneDeep(resp.data.userById)
        } else {
          throw new Error('An unexpected error occured while fetching user details.')
        }
      } catch (err) {
        this.$q.notify({
          type: 'negative',
          message: err.message
        })
      }
      this.isLoading = false
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
