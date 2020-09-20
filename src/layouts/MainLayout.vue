<template lang='pug'>
  q-layout(view='hHh lpr lff')
    q-header.bg-black.text-white
      .row.no-wrap
        q-toolbar(style='height: 64px;', dark)
          q-btn(dense, flat, to='/')
            q-avatar(size='34px', square)
              img(src='../assets/logo-wikijs.svg')
          q-toolbar-title.text-h6 Wiki.js
        q-toolbar.gt-sm(style='height: 64px;', dark)
          q-input(
            dark
            v-model='search'
            standout='bg-white text-dark'
            dense
            rounded
            ref='searchField'
            style='width: 100%;'
            label='Search...'
            )
            template(v-slot:prepend)
              q-icon(name='mdi-magnify')
            template(v-slot:append)
              q-icon.cursor-pointer(name='mdi-close', @click='search=``', v-if='search.length > 0', :color='$q.dark.isActive ? `blue` : `grey-4`')
          q-btn.q-ml-md(flat, round, dense, icon='mdi-tag-multiple', color='grey')
        q-toolbar(style='height: 64px;', dark)
          q-space
          q-btn.q-ml-md(flat, round, dense, icon='mdi-web', color='grey')
          q-btn.q-ml-md(flat, round, dense, icon='mdi-file-document-edit-outline', color='grey')
          q-btn.q-ml-md(flat, round, dense, icon='mdi-text-box-plus-outline', color='grey')
          q-btn.q-ml-md(flat, round, dense, icon='mdi-cog', color='grey')
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
                  q-btn(flat, label='Account', icon='mdi-account', color='primary')
                  q-btn(flat, label='Logout', icon='mdi-logout', color='red', @click='')
    q-drawer(v-model='leftDrawerOpen', show-if-above, content-class='bg-primary')
      q-list
        q-item-label.text-white(header) Test
    q-page-container
      router-view
</template>

<script>
export default {
  name: 'MainLayout',
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
