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
          .text-overline.text-uppercase.text-grey {{$t('admin.adminArea')}}
        q-toolbar(style='height: 64px;', dark)
          q-space
          q-btn.q-ml-md(flat, dense, icon='las la-times-circle', label='Exit' color='pink', to='/')
          account-menu
    q-drawer(v-model='leftDrawerOpen', show-if-above, content-class='admin-sidebar', bordered)
      q-scroll-area.admin-nav(
        :thumb-style='thumbStyle'
        :bar-style='barStyle'
        )
        q-list.text-white(padding, dense)
          q-item.q-mb-sm
            q-item-section
              q-btn.acrylic-btn(
                flat
                color='pink'
                icon='las la-heart'
                :label='$t(`admin.contribute.title`)'
                no-caps
                href='https://js.wiki/donate'
                target='_blank'
                type='a'
              )
          q-item(to='/a/dashboard', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-tachometer-alt')
            q-item-section {{ $t('admin.dashboard.title') }}
          q-item(to='/a/sites', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-sitemap')
            q-item-section {{ $t('admin.sites.title') }}
          q-item-label.q-mt-sm(header).text-caption.text-blue-grey-4 {{ $t('admin.nav.site') }}
          q-item.q-mb-md
            q-item-section
              q-select(
                dark
                standout
                dense
                v-model='currentSiteId'
                :options='sites'
                option-value='id'
                option-label='title'
                emit-value
                map-options
              )
          q-item(to='/a/general', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-stream')
            q-item-section {{ $t('admin.general.title') }}
          q-item(to='/a/analytics', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-chart-line')
            q-item-section {{ $t('admin.analytics.title') }}
          q-item(to='/a/comments', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-comment')
            q-item-section {{ $t('admin.comments.title') }}
          q-item(to='/a/editors', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-pen-square')
            q-item-section {{ $t('admin.editors.title') }}
          q-item(to='/a/locale', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-language')
            q-item-section {{ $t('admin.locale.title') }}
          q-item(to='/a/login', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-sign-in-alt')
            q-item-section {{ $t('admin.login.title') }}
          q-item(to='/a/navigation', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-th-list')
            q-item-section {{ $t('admin.navigation.title') }}
          q-item(to='/a/rendering', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-cogs')
            q-item-section {{ $t('admin.rendering.title') }}
          q-item(to='/a/storage', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-hdd')
            q-item-section {{ $t('admin.storage.title') }}
          q-item(to='/a/theme', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-palette')
            q-item-section {{ $t('admin.theme.title') }}
          q-item-label.q-mt-sm(header).text-caption.text-blue-grey-4 {{ $t('admin.nav.users') }}
          q-item(to='/a/auth', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-lock')
            q-item-section {{ $t('admin.auth.title') }}
          q-item(to='/a/groups', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-users')
            q-item-section {{ $t('admin.groups.title') }}
            q-item-section(side)
              q-badge(color='grey', :label='info.groupsTotal')
          q-item(to='/a/users', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-user-friends')
            q-item-section {{ $t('admin.users.title') }}
            q-item-section(side)
              q-badge(color='grey', :label='info.usersTotal')
          q-item-label.q-mt-sm(header).text-caption.text-blue-grey-4 {{ $t('admin.nav.system') }}
          q-item(to='/a/api', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-dharmachakra')
            q-item-section {{ $t('admin.api.title') }}
          q-item(to='/a/extensions', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-puzzle-piece')
            q-item-section {{ $t('admin.extensions.title') }}
          q-item(to='/a/mail', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-mail-bulk')
            q-item-section {{ $t('admin.mail.title') }}
          q-item(to='/a/security', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-shield-alt')
            q-item-section {{ $t('admin.security.title') }}
          q-item(to='/a/ssl', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-key')
            q-item-section {{ $t('admin.ssl.title') }}
          q-item(to='/a/system', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-sliders-h')
            q-item-section {{ $t('admin.system.title') }}
          q-item(to='/a/utilities', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-screwdriver')
            q-item-section {{ $t('admin.utilities.title') }}
          q-item(to='/a/webhooks', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-magic')
            q-item-section {{ $t('admin.webhooks.title') }}
          q-item(to='/a/flags', v-ripple, active-class='bg-primary text-white')
            q-item-section(avatar)
              q-icon(name='las la-flag-checkered')
            q-item-section {{ $t('admin.dev.flags.title') }}
    q-page-container.admin-container
      transition(name='fade')
        router-view
    q-footer.admin-footer
      q-bar.justify-center(dense)
        span(style='font-size: 11px;') Powered by #[a(href='https://js.wiki', target='_blank'): strong Wiki.js], an open source project.
</template>

<script>
import { get, sync } from 'vuex-pathify'

export default {
  name: 'AdminLayout',
  meta () {
    return {
      titleTemplate: title => `${title} - ${this.$t('admin.adminArea')} - Wiki.js`
    }
  },
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
  computed: {
    currentSiteId: sync('admin/currentSiteId'),
    sites: get('admin/sites')
  },
  watch: {
    sites (newValue) {
      if (this.currentSiteId === null && newValue.length > 0) {
        this.currentSiteId = newValue[0].id
      }
    }
  },
  async mounted () {
    await this.$store.dispatch('admin/fetchSites')
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
    background-color: $dark-4;
  }
  @at-root .body--dark & {
    background-color: $dark-5;
  }

  .q-item__label--header {
    box-shadow: 0 -1px 0 0 rgba(255,255,255,.15), 0 -2px 0 0 darken($dark-6, 1%);
    padding-top: 16px;
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
    color: $blue-grey-5 !important;

    a {
      color: $blue-grey-9 !important;
      text-decoration: none;
    }
  }
  @at-root .body--dark & {
    background-color: $dark-6 !important;
    color: $blue-grey-5 !important;

    a {
      color: $blue-grey-5 !important;
      text-decoration: none;
    }
  }
}
</style>
