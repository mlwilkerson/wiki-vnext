<template lang='pug'>
  q-layout(view='hHh Lpr lff')
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
              q-icon(name='las la-search')
            template(v-slot:append)
              q-icon.cursor-pointer(name='las la-times', @click='search=``', v-if='search.length > 0', :color='$q.dark.isActive ? `blue` : `grey-4`')
          q-btn.q-ml-md(flat, round, dense, icon='las la-tags', color='grey', to='/t')
        q-toolbar(style='height: 64px;', dark)
          q-space
          q-btn.q-ml-md(flat, round, dense, icon='las la-plus', color='blue-4')
          q-btn.q-ml-md(flat, round, dense, icon='las la-tools', color='grey', to='/a')
          q-btn.q-ml-md(flat, round, dense, color='grey')
            q-icon(v-if='!user.picture', name='las la-user-circle')
            q-avatar(v-else)
              img(:src='user.picture')
            q-menu(auto-close)
              q-card(flat, style='width: 300px;', :dark='false')
                q-card-section(align='center')
                  .text-subtitle1.text-grey-7 {{user.name}}
                  .text-caption.text-grey-8 {{user.email}}
                q-separator(:dark='false')
                q-card-actions(align='center')
                  q-btn(flat, label='Profile', icon='las la-user-alt', color='primary', to='/p')
                  q-btn(flat, label='Logout', icon='las la-sign-out-alt', color='red', href='/logout')
    q-drawer(
      v-model='leftDrawerOpen'
      show-if-above
      content-class='bg-primary'
      :width='255'
      )
      .sidebar-actions.flex.items-stretch
        q-btn.q-px-sm.col(
          flat
          dense
          icon='las la-globe'
          color='blue-7'
          text-color='blue-2'
          label='EN'
          size='sm'
          )
        q-separator(vertical)
        q-btn.q-px-sm.col(
          flat
          dense
          icon='las la-sitemap'
          color='blue-7'
          text-color='blue-2'
          label='Browse'
          size='sm'
          )
      q-scroll-area.sidebar-nav(
        :thumb-style='thumbStyle'
        :bar-style='barStyle'
        )
        q-list
          q-item-label.text-white(header, v-for='n in 100', :key='n') Test
    q-page-container
      router-view
      q-page-scroller(
        position='bottom-right'
        :scroll-offset='150'
        :offset='[15, 15]'
        )
        q-btn(
          icon='las la-arrow-up'
          color='primary'
          round
          size='md'
        )
    q-footer.bg-white
      q-bar.bg-grey-3.text-grey-7.justify-center(dense)
        span(style='font-size: 11px;') &copy; Cyberdyne Systems Corp. 2020 | Powered by #[strong Wiki.js]
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
      },
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#FFF',
        width: '5px',
        opacity: 0.5
      },
      barStyle: {
        backgroundColor: '#000',
        width: '9px',
        opacity: 0.1
      }
    }
  }
}
</script>

<style lang="scss">
.sidebar-actions {
  background: linear-gradient(to bottom, rgba(255,255,255,.1) 0%, rgba(0,0,0, .05) 100%);
  border-bottom: 1px solid rgba(0,0,0,.2);
  height: 38px;
}
.sidebar-nav {
  border-top: 1px solid rgba(255,255,255,.15);
  height: calc(100% - 38px);
}
</style>
