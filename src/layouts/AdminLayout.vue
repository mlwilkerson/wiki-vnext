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
      q-list.text-grey-8(separator, clickable)
        q-item(to='dashboard', v-ripple)
          q-item-section(avatar)
            q-icon(name='las la-campground')
          q-item-section {{ $t('admin:dashboard.title') }}
        q-item(to='general', v-ripple)
          q-item-section(avatar)
            q-icon(name='las la-shapes')
          q-item-section {{ $t('admin:general.title') }}
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
