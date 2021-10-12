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
  q-drawer.admin-sidebar(v-model='leftDrawerOpen', show-if-above, bordered)
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
            q-icon(:name='`img:` + icons.dashboard')
          q-item-section {{ $t('admin.dashboard.title') }}
        q-item(to='/a/sites', v-ripple, active-class='bg-primary text-white')
          q-item-section(avatar)
            q-icon(:name='`img:` + icons.sites')
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
            q-icon(:name='`img:` + icons.general')
          q-item-section {{ $t('admin.general.title') }}
        q-item(to='/a/analytics', v-ripple, active-class='bg-primary text-white')
          q-item-section(avatar)
            q-icon(:name='`img:` + icons.analytics')
          q-item-section {{ $t('admin.analytics.title') }}
        q-item(to='/a/comments', v-ripple, active-class='bg-primary text-white')
          q-item-section(avatar)
            q-icon(:name='`img:` + icons.comments')
          q-item-section {{ $t('admin.comments.title') }}
        q-item(to='/a/editors', v-ripple, active-class='bg-primary text-white')
          q-item-section(avatar)
            q-icon(:name='`img:` + icons.editors')
          q-item-section {{ $t('admin.editors.title') }}
        q-item(to='/a/locale', v-ripple, active-class='bg-primary text-white')
          q-item-section(avatar)
            q-icon(:name='`img:` + icons.locale')
          q-item-section {{ $t('admin.locale.title') }}
        q-item(to='/a/login', v-ripple, active-class='bg-primary text-white')
          q-item-section(avatar)
            q-icon(:name='`img:` + icons.login')
          q-item-section {{ $t('admin.login.title') }}
        q-item(to='/a/navigation', v-ripple, active-class='bg-primary text-white')
          q-item-section(avatar)
            q-icon(:name='`img:` + icons.navigation')
          q-item-section {{ $t('admin.navigation.title') }}
        q-item(to='/a/rendering', v-ripple, active-class='bg-primary text-white')
          q-item-section(avatar)
            q-icon(:name='`img:` + icons.rendering')
          q-item-section {{ $t('admin.rendering.title') }}
        q-item(to='/a/storage', v-ripple, active-class='bg-primary text-white')
          q-item-section(avatar)
            q-icon(:name='`img:` + icons.storage')
          q-item-section {{ $t('admin.storage.title') }}
        q-item(to='/a/theme', v-ripple, active-class='bg-primary text-white')
          q-item-section(avatar)
            q-icon(:name='`img:` + icons.theme')
          q-item-section {{ $t('admin.theme.title') }}
        q-item-label.q-mt-sm(header).text-caption.text-blue-grey-4 {{ $t('admin.nav.users') }}
        q-item(to='/a/auth', v-ripple, active-class='bg-primary text-white')
          q-item-section(avatar)
            q-icon(:name='`img:` + icons.auth')
          q-item-section {{ $t('admin.auth.title') }}
        q-item(to='/a/groups', v-ripple, active-class='bg-primary text-white')
          q-item-section(avatar)
            q-icon(:name='`img:` + icons.groups')
          q-item-section {{ $t('admin.groups.title') }}
          q-item-section(side)
            q-badge(color='dark-3', :label='info.groupsTotal')
        q-item(to='/a/users', v-ripple, active-class='bg-primary text-white')
          q-item-section(avatar)
            q-icon(:name='`img:` + icons.users')
          q-item-section {{ $t('admin.users.title') }}
          q-item-section(side)
            q-badge(color='dark-3', :label='info.usersTotal')
        q-item-label.q-mt-sm(header).text-caption.text-blue-grey-4 {{ $t('admin.nav.system') }}
        q-item(to='/a/api', v-ripple, active-class='bg-primary text-white')
          q-item-section(avatar)
            q-icon(:name='`img:` + icons.api')
          q-item-section {{ $t('admin.api.title') }}
        q-item(to='/a/extensions', v-ripple, active-class='bg-primary text-white')
          q-item-section(avatar)
            q-icon(:name='`img:` + icons.extensions')
          q-item-section {{ $t('admin.extensions.title') }}
        q-item(to='/a/mail', v-ripple, active-class='bg-primary text-white')
          q-item-section(avatar)
            q-icon(:name='`img:` + icons.mail')
          q-item-section {{ $t('admin.mail.title') }}
        q-item(to='/a/security', v-ripple, active-class='bg-primary text-white')
          q-item-section(avatar)
            q-icon(:name='`img:` + icons.security')
          q-item-section {{ $t('admin.security.title') }}
        q-item(to='/a/ssl', v-ripple, active-class='bg-primary text-white')
          q-item-section(avatar)
            q-icon(:name='`img:` + icons.ssl')
          q-item-section {{ $t('admin.ssl.title') }}
        q-item(to='/a/system', v-ripple, active-class='bg-primary text-white')
          q-item-section(avatar)
            q-icon(:name='`img:` + icons.system')
          q-item-section {{ $t('admin.system.title') }}
        q-item(to='/a/utilities', v-ripple, active-class='bg-primary text-white')
          q-item-section(avatar)
            q-icon(:name='`img:` + icons.utilities')
          q-item-section {{ $t('admin.utilities.title') }}
        q-item(to='/a/webhooks', v-ripple, active-class='bg-primary text-white')
          q-item-section(avatar)
            q-icon(:name='`img:` + icons.webhooks')
          q-item-section {{ $t('admin.webhooks.title') }}
        q-item(to='/a/flags', v-ripple, active-class='bg-primary text-white')
          q-item-section(avatar)
            q-icon(:name='`img:` + icons.flags')
          q-item-section {{ $t('admin.dev.flags.title') }}
  q-page-container.admin-container
    router-view(v-slot='{ Component }')
      transition(name='fade')
        component(:is='Component')
  q-dialog.admin-overlay(
    v-model='overlayIsShown'
    persistent
    full-width
    full-height
    no-shake
    transition-show='jump-up'
    transition-hide='jump-down'
    )
    component(:is='overlay')
  q-footer.admin-footer
    q-bar.justify-center(dense)
      span(style='font-size: 11px;') Powered by #[a(href='https://js.wiki', target='_blank'): strong Wiki.js], an open source project.
</template>

<script>
import { get, sync } from '@requarks/vuex-pathify'
import { createMetaMixin } from 'quasar'

export default {
  name: 'AdminLayout',
  mixins: [
    createMetaMixin(function () {
      return {
        titleTemplate: title => `${title} - ${this.$t('admin.adminArea')} - Wiki.js`
      }
    })
  ],
  data () {
    return {
      leftDrawerOpen: true,
      overlayIsShown: false,
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
      },
      icons: {
        dashboard: require('../assets/icons/fluent-apps-tab.svg'),
        sites: require('../assets/icons/fluent-change-theme.svg'),
        general: require('../assets/icons/fluent-web.svg'),
        analytics: require('../assets/icons/fluent-bar-chart.svg'),
        comments: require('../assets/icons/fluent-comments.svg'),
        editors: require('../assets/icons/fluent-cashbook.svg'),
        locale: require('../assets/icons/fluent-language.svg'),
        login: require('../assets/icons/fluent-bunch-of-keys.svg'),
        navigation: require('../assets/icons/fluent-tree-structure.svg'),
        rendering: require('../assets/icons/fluent-rich-text-converter.svg'),
        storage: require('../assets/icons/fluent-ssd.svg'),
        theme: require('../assets/icons/fluent-paint-roller.svg'),
        auth: require('../assets/icons/fluent-security-lock.svg'),
        groups: require('../assets/icons/fluent-people.svg'),
        users: require('../assets/icons/fluent-account.svg'),
        api: require('../assets/icons/fluent-rest-api.svg'),
        extensions: require('../assets/icons/fluent-module.svg'),
        mail: require('../assets/icons/fluent-message-settings.svg'),
        security: require('../assets/icons/fluent-protect.svg'),
        ssl: require('../assets/icons/fluent-security-ssl.svg'),
        system: require('../assets/icons/fluent-processor.svg'),
        utilities: require('../assets/icons/fluent-swiss-army-knife.svg'),
        webhooks: require('../assets/icons/fluent-lightning-bolt.svg'),
        flags: require('../assets/icons/fluent-windsock.svg')
      }
    }
  },
  computed: {
    currentSiteId: sync('admin/currentSiteId'),
    overlay: get('admin/overlay'),
    sites: get('admin/sites')
  },
  watch: {
    sites (newValue) {
      if (this.currentSiteId === null && newValue.length > 0) {
        this.currentSiteId = newValue[0].id
      }
    },
    overlay (newValue) {
      this.overlayIsShown = !!newValue
    }
  },
  async mounted () {
    await this.$store.dispatch('admin/fetchSites')
  }
}
</script>

<style lang="scss">
// $

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

.admin-overlay {
  > .q-dialog__backdrop {
    background-color: rgba(0,0,0,.75);
  }
  > .q-dialog__inner {
    padding: 24px 64px;

    @media (max-width: $breakpoint-sm-max) {
      padding: 0;
    }

    > .q-layout-container {
      @at-root .body--light & {
        background-image: linear-gradient(to bottom, $dark-5 10px, $grey-2 11px, $grey-4);
      }
      @at-root .body--dark & {
        background-image: linear-gradient(to bottom, $dark-5 10px, $dark-5 11px, $dark-4);
      }
      border-radius: 6px;
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
