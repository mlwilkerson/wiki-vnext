<template lang='pug'>
  q-layout(view='hHh Lpr lff')
    q-header.bg-header.text-white.site-header(
      height-hint='64'
      )
      .row.no-wrap
        q-toolbar(
          style='height: 64px;'
          dark
          )
          q-btn(
            dense
            flat
            to='/'
            )
            q-avatar(
              size='34px'
              square
              )
              img(src='../assets/logo-wikijs.svg')
          q-toolbar-title.text-h6.font-poppins Wiki.js
        q-toolbar.gt-sm(
          style='height: 64px;'
          dark
          )
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
              q-icon.cursor-pointer(
                name='las la-times'
                @click='search=``'
                v-if='search.length > 0'
                :color='$q.dark.isActive ? `blue` : `grey-4`'
                )
          q-btn.q-ml-md(
            flat
            round
            dense
            icon='las la-tags'
            color='grey'
            to='/t'
            )
        q-toolbar(
          style='height: 64px;'
          dark
          )
          q-space
          q-btn.q-ml-md(
            flat
            round
            dense
            icon='las la-plus-circle'
            color='blue-4'
            aria-label='Create New Page'
            )
            q-tooltip Create New Page
            new-menu
          q-btn.q-ml-md(
            flat
            round
            dense
            icon='las la-tools'
            color='secondary'
            to='/a'
            aria-label='Administration'
            )
            q-tooltip Administration
          account-menu
    q-drawer(
      v-model='leftDrawerOpen'
      show-if-above
      content-class='bg-sidebar'
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
          aria-label='EN'
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
          aria-label='Browse'
          size='sm'
          )
      q-scroll-area.sidebar-nav(
        :thumb-style='thumbStyle'
        :bar-style='barStyle'
        )
        q-list(
          clickable
          dense
          dark
          )
          q-item-label.text-blue-2.text-caption(header) Getting Started
          q-item(to='/install')
            q-item-section(avatar)
              q-icon(name='las la-dog', color='white')
            q-item-section Requirements
          q-item(to='/install')
            q-item-section(avatar)
              q-icon(name='las la-cat', color='white')
            q-item-section Installation
          q-separator.q-my-sm
          q-item(to='/install')
            q-item-section(avatar)
              q-icon(name='las la-cat', color='white')
            q-item-section Installation
      q-bar.bg-blue-9.text-white(dense)
        q-btn.col(
          icon='las la-dharmachakra'
          label='History'
          flat
        )
        q-separator(vertical)
        q-btn.col(
          icon='las la-bookmark'
          label='Bookmarks'
          flat
        )
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
    q-footer
      q-bar.justify-center(dense)
        span(style='font-size: 11px;') &copy; Cyberdyne Systems Corp. 2020 | Powered by #[strong Wiki.js]
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: true,
      search: '',
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
  height: calc(100% - 38px - 24px);
}

body.body--dark {
  background-color: $dark-6;
}

.q-footer {
  .q-bar {
    @at-root .body--light & {
      background-color: $grey-3;
      color: $grey-7;
    }
    @at-root .body--dark & {
      background-color: $dark-4;
      color: rgba(255,255,255,.3);
    }
  }
}
</style>
