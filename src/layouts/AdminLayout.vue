<template lang='pug'>
  q-layout(view='hHh lpr lff')
    q-header.bg-black.text-white
      .row.no-wrap
        q-toolbar(style='height: 64px;', dark)
          q-btn(dense, flat, to='/')
            q-avatar(size='34px', square)
              img(src='../assets/logo-wikijs.svg')
          q-toolbar-title.text-h6 Wiki.js
        q-toolbar.gt-sm.justify-center(style='height: 64px;', dark)
          .text-overline.text-uppercase Administration
        q-toolbar(style='height: 64px;', dark)
          q-space
          q-btn.q-ml-md(flat, dense, icon='las la-arrow-circle-left', label='Exit' color='grey-5', to='/')
          account-menu
    q-drawer(v-model='leftDrawerOpen', show-if-above, content-class='bg-white', bordered)
      q-scroll-area.admin-nav(
        :thumb-style='thumbStyle'
        :bar-style='barStyle'
        )
        q-list.text-grey-9(padding)
          q-item(to='dashboard', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-stream')
            q-item-section {{ $t('admin:dashboard.title') }}
          q-separator(spaced, inset)
          q-item-label(header).text-caption.text-grey-6 {{ $t('admin:nav.site') }}
          q-item(to='general', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-shapes')
            q-item-section {{ $t('admin:general.title') }}
          q-item(to='locale', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-language')
            q-item-section {{ $t('admin:locale.title') }}
          q-item(to='navigation', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-th-list')
            q-item-section {{ $t('admin:navigation.title') }}
          q-item(to='theme', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-swatchbook')
            q-item-section {{ $t('admin:theme.title') }}
          q-separator(spaced, inset)
          q-item-label(header).text-caption.text-grey-6 {{ $t('admin:nav.users') }}
          q-item(to='groups', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-users')
            q-item-section {{ $t('admin:groups.title') }}
            q-item-section(side)
              q-badge(color='grey', :label='info.groupsTotal')
          q-item(to='users', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-user-friends')
            q-item-section {{ $t('admin:users.title') }}
            q-item-section(side)
              q-badge(color='grey', :label='info.usersTotal')
          q-separator(spaced, inset)
          q-item-label(header).text-caption.text-grey-6 {{ $t('admin:nav.modules') }}
          q-item(to='analytics', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-chart-line')
            q-item-section {{ $t('admin:analytics.title') }}
          q-item(to='auth', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-lock')
            q-item-section {{ $t('admin:auth.title') }}
          q-item(to='comments', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-comment')
            q-item-section {{ $t('admin:comments.title') }}
          q-item(to='editor', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-pen-square')
            q-item-section {{ $t('admin:editor.title') }}
          q-item(to='extensions', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-puzzle-piece')
            q-item-section {{ $t('admin:extensions.title') }}
          q-item(to='rendering', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-cogs')
            q-item-section {{ $t('admin:rendering.title') }}
          q-item(to='search', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-search')
            q-item-section {{ $t('admin:search.title') }}
          q-item(to='storage', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-hdd')
            q-item-section {{ $t('admin:storage.title') }}
          q-separator(spaced, inset)
          q-item-label(header).text-caption.text-grey-6 {{ $t('admin:nav.system') }}
          q-item(to='api', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-dharmachakra')
            q-item-section {{ $t('admin:api.title') }}
          q-item(to='mail', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-mail-bulk')
            q-item-section {{ $t('admin:mail.title') }}
          q-item(to='security', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-shield-alt')
            q-item-section {{ $t('admin:security.title') }}
          q-item(to='ssl', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-key')
            q-item-section {{ $t('admin:ssl.title') }}
          q-item(to='system', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-sliders-h')
            q-item-section {{ $t('admin:system.title') }}
          q-item(to='utilities', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-screwdriver')
            q-item-section {{ $t('admin:utilities.title') }}
          q-item(to='webhooks', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-magic')
            q-item-section {{ $t('admin:webhooks.title') }}
          q-item(to='dev-flags', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-flag-checkered')
            q-item-section {{ $t('admin:dev.flags.title') }}
          q-separator(spaced, inset)
          q-item(to='contribute', v-ripple)
            q-item-section(avatar)
              q-icon(name='las la-heart')
            q-item-section {{ $t('admin:contribute.title') }}
    q-page-container
      router-view
</template>

<script>
import adminStore from '../store/admin'

export default {
  name: 'AdminLayout',
  data () {
    return {
      leftDrawerOpen: true,
      search: '',
      user: {
        name: 'John Doe',
        email: 'test@example.com',
        picture: null
      },
      info: {
        groupsTotal: 99,
        usersTotal: 999
      },
      thumbStyle: {
        right: '1px',
        borderRadius: '5px',
        backgroundColor: '#666',
        width: '5px',
        opacity: 0.5
      },
      barStyle: {
        width: '7px'
      }
    }
  },
  preFetch ({ store }) {
    store.registerModule('admin', adminStore)
  },
  mounted () {
    this.$store.registerModule('admin', adminStore, { preserveState: true })
  },
  destroyed () {
    this.$store.unregisterModule('admin')
  }
}
</script>

<style lang="scss">
.admin-nav {
  height: 100%;
}
</style>
