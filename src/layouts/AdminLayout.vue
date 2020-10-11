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
          q-btn.q-ml-md(flat, dense, icon='mdi-exit-run', label='Exit' color='grey-5', to='/')
          q-separator(vertical)
          q-btn.q-ml-md(flat, round, dense, color='grey')
            q-icon(v-if='!user.picture', name='mdi-account-circle')
            q-avatar(v-else)
              img(:src='user.picture')
            q-menu(auto-close)
              q-card(flat, style='width: 300px;', :dark='false')
                q-card-section(align='center')
                  .text-subtitle1.text-grey-7 {{user.name}}
                  .text-caption.text-grey-8 {{user.email}}
                q-separator(:dark='false')
                q-card-actions(align='center')
                  q-btn(flat, label='Profile', icon='mdi-account', color='primary', to='/p')
                  q-btn(flat, label='Logout', icon='mdi-logout', color='red', href='/logout')
    q-drawer(v-model='leftDrawerOpen', show-if-above, content-class='bg-white')
      q-list.text-grey-8
        q-item(to='dashboard', clickable, v-ripple)
          q-item-section(avatar)
            q-icon(name='mdi-view-dashboard-variant')
          q-item-section {{ $t('admin:dashboard.title') }}
        q-separator
        q-item(to='general', clickable, v-ripple)
          q-item-section(avatar)
            q-icon(name='mdi-widgets')
          q-item-section {{ $t('admin:general.title') }}
    q-page-container
      router-view
</template>

<script>
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
      }
    }
  }
}
</script>
