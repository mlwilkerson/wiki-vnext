<template lang="pug">
q-layout(view='hHh lpR fFf', container)
  q-header.card-header.q-px-md.q-py-sm
    q-icon(:name='`img:` + icons.group', left, size='md')
    div
      span {{$t(`admin.groups.edit`)}}
      .text-caption {{group.name}}
    q-space
    q-btn.q-mr-sm(
      push
      glossy
      color='white'
      text-color='grey-7'
      :label='$t(`common.actions.close`)'
      icon='las la-times'
      @click='close'
    )
    q-btn(
      push
      glossy
      color='positive'
      text-color='white'
      :label='$t(`common.actions.save`)'
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
      .row.q-pa-md.q-col-gutter-md
        .col-12.col-lg-8
          q-card.shadow-1.q-pb-sm
            q-card-section
              .text-subtitle1 {{$t('admin.groups.general')}}
            q-item
              blueprint-icon(icon='team')
              q-item-section
                q-item-label {{$t(`admin.groups.name`)}}
                q-item-label(caption) {{$t(`admin.groups.nameHint`)}}
              q-item-section
                q-input(
                  outlined
                  v-model='group.name'
                  dense
                  :rules=`[
                    val => /^[^<>"]+$/.test(val) || $t('admin.groups.nameInvalidChars')
                  ]`
                  hide-bottom-space
                  :aria-label='$t(`admin.groups.name`)'
                  )

          q-card.shadow-1.q-pb-sm.q-mt-md
            q-card-section
              .text-subtitle1 {{$t('admin.groups.authBehaviors')}}
            q-item
              blueprint-icon(icon='double-right')
              q-item-section
                q-item-label {{$t(`admin.groups.redirectOnLogin`)}}
                q-item-label(caption) {{$t(`admin.groups.redirectOnLoginHint`)}}
              q-item-section
                q-input(
                  outlined
                  v-model='group.redirectOnLogin'
                  dense
                  :aria-label='$t(`admin.groups.redirectOnLogin`)'
                  )
            q-separator.q-my-sm(inset)
            q-item
              blueprint-icon(icon='chevron-right')
              q-item-section
                q-item-label {{$t(`admin.groups.redirectOnFirstLogin`)}}
                q-item-label(caption) {{$t(`admin.groups.redirectOnFirstLoginHint`)}}
              q-item-section
                q-input(
                  outlined
                  v-model='group.redirectOnFirstLogin'
                  dense
                  :aria-label='$t(`admin.groups.redirectOnLogin`)'
                  )
            q-separator.q-my-sm(inset)
            q-item
              blueprint-icon(icon='exit')
              q-item-section
                q-item-label {{$t(`admin.groups.redirectOnLogout`)}}
                q-item-label(caption) {{$t(`admin.groups.redirectOnLogoutHint`)}}
              q-item-section
                q-input(
                  outlined
                  v-model='group.redirectOnLogout'
                  dense
                  :aria-label='$t(`admin.groups.redirectOnLogout`)'
                  )

        .col-12.col-lg-4
          q-card.shadow-1.q-pb-sm
            q-card-section
              .text-subtitle1 {{$t('admin.groups.info')}}

    q-page(v-else-if='$route.params.section === `rules`')
    q-page(v-else-if='$route.params.section === `permissions`')
    q-page(v-else-if='$route.params.section === `users`')
</template>

<script>
import gql from 'graphql-tag'

export default {
  data () {
    return {
      sections: [
        { key: 'overview', text: 'Overview', icon: 'las la-users' },
        { key: 'rules', text: 'Rules', icon: 'las la-file-invoice' },
        { key: 'permissions', text: 'Permissions', icon: 'las la-list-alt' },
        { key: 'users', text: 'Users', icon: 'las la-user' }
      ],
      group: {},
      users: [],
      isLoading: false,
      icons: {
        group: require('../assets/icons/fluent-people.svg')
      }
    }
  },
  computed: {

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
    }
  }
}
</script>
