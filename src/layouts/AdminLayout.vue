<template lang='pug'>
  q-layout.admin(view='hHh Lpr lff')
    q-header.bg-header.text-white
      .row.no-wrap
        q-toolbar(style='height: 64px;', dark)
          q-btn(dense, flat, to='/')
            q-avatar(size='34px', square)
              img(src='../assets/logo-wikijs.svg')
          q-toolbar-title.text-h6 Wiki.js
        q-toolbar.gt-sm.justify-center(style='height: 64px;', dark)
          .text-overline.text-uppercase.text-grey Administration Area
        q-toolbar(style='height: 64px;', dark)
          q-space
          q-btn.q-ml-md(flat, dense, icon='las la-arrow-circle-left', label='Exit' color='grey-5', to='/')
          account-menu
    q-drawer(v-model='leftDrawerOpen', show-if-above, content-class='admin-sidebar', bordered)
      q-scroll-area.admin-nav(
        :thumb-style='thumbStyle'
        :bar-style='barStyle'
        )
        q-list.text-grey-8(padding, dense)
          q-item(to='dashboard', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-stream')
            q-item-section {{ $t('admin:dashboard.title') }}
          q-item(to='sites', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-sitemap')
            q-item-section {{ $t('admin:sites.title') }}
          q-separator(spaced, inset)
          q-item-label(header).text-caption.text-grey-6 {{ $t('admin:nav.site') }}
          q-item.q-mb-sm
            q-item-section
              q-select(
                outlined
                dense
                v-model='currentSiteId'
                :options='sites'
                option-value='id'
                option-label='title'
                emit-value
                map-options
              )
          q-item(to='general', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-shapes')
            q-item-section {{ $t('admin:general.title') }}
          q-item(to='locale', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-language')
            q-item-section {{ $t('admin:locale.title') }}
          q-item(to='navigation', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-th-list')
            q-item-section {{ $t('admin:navigation.title') }}
          q-item(to='theme', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-palette')
            q-item-section {{ $t('admin:theme.title') }}
          q-separator(spaced, inset)
          q-item-label(header).text-caption.text-grey-6 {{ $t('admin:nav.users') }}
          q-item(to='groups', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-users')
            q-item-section {{ $t('admin:groups.title') }}
            q-item-section(side)
              q-badge(color='grey', :label='info.groupsTotal')
          q-item(to='users', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-user-friends')
            q-item-section {{ $t('admin:users.title') }}
            q-item-section(side)
              q-badge(color='grey', :label='info.usersTotal')
          q-separator(spaced, inset)
          q-item-label(header).text-caption.text-grey-6 {{ $t('admin:nav.modules') }}
          q-item(to='analytics', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-chart-line')
            q-item-section {{ $t('admin:analytics.title') }}
          q-item(to='auth', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-lock')
            q-item-section {{ $t('admin:auth.title') }}
          q-item(to='comments', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-comment')
            q-item-section {{ $t('admin:comments.title') }}
          q-item(to='editors', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-pen-square')
            q-item-section {{ $t('admin:editors.title') }}
          q-item(to='extensions', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-puzzle-piece')
            q-item-section {{ $t('admin:extensions.title') }}
          q-item(to='rendering', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-cogs')
            q-item-section {{ $t('admin:rendering.title') }}
          q-item(to='search', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-search')
            q-item-section {{ $t('admin:search.title') }}
          q-item(to='storage', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-hdd')
            q-item-section {{ $t('admin:storage.title') }}
          q-separator(spaced, inset)
          q-item-label(header).text-caption.text-grey-6 {{ $t('admin:nav.system') }}
          q-item(to='api', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-dharmachakra')
            q-item-section {{ $t('admin:api.title') }}
          q-item(to='mail', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-mail-bulk')
            q-item-section {{ $t('admin:mail.title') }}
          q-item(to='security', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-shield-alt')
            q-item-section {{ $t('admin:security.title') }}
          q-item(to='ssl', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-key')
            q-item-section {{ $t('admin:ssl.title') }}
          q-item(to='system', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-sliders-h')
            q-item-section {{ $t('admin:system.title') }}
          q-item(to='utilities', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-screwdriver')
            q-item-section {{ $t('admin:utilities.title') }}
          q-item(to='webhooks', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-magic')
            q-item-section {{ $t('admin:webhooks.title') }}
          q-item(to='dev-flags', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-flag-checkered')
            q-item-section {{ $t('admin:dev.flags.title') }}
          q-separator(spaced, inset)
          q-item(to='contribute', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-heart')
            q-item-section {{ $t('admin:contribute.title') }}
    q-page-container.admin-container
      transition(name='fade')
        router-view
    q-footer.admin-footer
      q-bar.bg-grey-3.text-grey-7.justify-center(dense)
        span(style='font-size: 11px;') &copy; Cyberdyne Systems Corp. 2020 | Powered by #[strong Wiki.js]
</template>

<script>
import gql from 'graphql-tag'
import { sync } from 'vuex-pathify'

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
      sites: [],
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
  computed: {
    currentSiteId: sync('admin/currentSiteId')
  },
  apollo: {
    sites: {
      query: gql`
        {
          sites {
            id
            hostname
            isEnabled
            title
          }
        }
      `,
      fetchPolicy: 'network-only',
      watchLoading (isLoading) {
        this.$store.commit(`loading${isLoading ? 'Start' : 'Stop'}`, 'admin-sites-refresh')
      }
    }
  }
}
</script>

<style lang="scss">
.admin-nav {
  height: 100%;
}
.admin-icon {
  height: 64px;
}
.admin-sidebar {
  @at-root .body--light & {
    background-color: #FFF;
  }
  @at-root .body--dark & {
    background-color: $dark-5;
  }
}
.admin-container {
  @at-root .body--light & {
    background-color: $grey-1;
  }
  @at-root .body--dark & {
    background-color: $dark-4;
  }

  .q-card {
    @at-root .body--light & {
      background-color: #FFF;
    }
    @at-root .body--dark & {
      background-color: $dark-3;
    }
  }
}

.admin-footer > .q-bar {
  @at-root .body--light & {
    background-color: #FFF !important;
  }
  @at-root .body--dark & {
    background-color: $dark-6 !important;
  }
}
</style>
