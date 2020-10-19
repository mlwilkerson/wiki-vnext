<template lang='pug'>
  q-page.column
    .page-breadcrumbs.q-py-sm.q-px-md.row
      .col
        q-breadcrumbs(
          active-color='grey-7'
          separator-color='grey'
          )
          template(v-slot:separator)
            q-icon(
              name='las la-angle-right'
            )
          q-breadcrumbs-el(icon='las la-home', to='/', aria-label='Home')
            q-tooltip Home
          q-breadcrumbs-el(icon='las la-file-alt', label='Installation', aria-label='Installation' to='/install')
          q-breadcrumbs-el(icon='las la-file-alt', label='Ubuntu', aria-label='Ubuntu', to='/install/ubuntu')
      .col-auto.flex.items-center.justify-end
        .text-caption.text-grey-6 Last modified on #[strong September 5th, 2020]
    .page-header.row
      .col-auto.q-pl-md.flex.items-center
        q-icon(
          name='lab la-galactic-republic'
          size='64px'
          color='primary'
        )
      .col.q-pa-md.font-poppins
        .text-h4.text-grey-9 Ubuntu
        .text-subtitle2.text-grey-7 How to install Wiki.js on Ubuntu 18.04 / 20.04
      .col-auto.q-pa-md.flex.items-center.justify-end
        q-btn.q-mr-md(
          flat
          dense
          icon='las la-bookmark'
          color='grey'
          aria-label='Bookmark Page'
          )
          q-tooltip Bookmark Page
        q-btn.q-mr-md(
          flat
          dense
          icon='las la-share-alt'
          color='grey'
          aria-label='Share'
          )
          q-tooltip Share
          social-sharing-menu
        q-btn.q-mr-md(
          flat
          dense
          icon='las la-print'
          color='grey'
          aria-label='Print'
          )
          q-tooltip Print
        q-btn(
          outline
          icon='las la-edit'
          color='deep-orange-9'
          label='Edit'
          aria-label='Edit'
          no-caps
        )
    .page-container.row.no-wrap.items-stretch(style='flex: 1 1 100%;')
      .col(style='order: 1;')
        q-scroll-area(
          :thumb-style='thumbStyle'
          :bar-style='barStyle'
          style='height: 100%;'
          )
          .q-pa-md
            div(style='height:500px;') Test
            div(style='height:500px;') Test
            div(style='height:500px;') Test
            div(style='height:500px;') Test
            div(style='height:500px;') Test
            div(style='height:500px;') Test

      .page-sidebar.bg-grey-2(style='order: 2;')
        .q-pa-md.flex.items-center
          q-icon.q-mr-sm(name='las la-stream', color='grey')
          .text-caption.text-grey-7 Contents
      .page-actions.bg-grey-3.column.items-stretch.order-last
        q-btn.q-py-sm(
          flat
          icon='las la-pen-nib'
          color='deep-orange-9'
          aria-label='Page Properties'
          )
          q-tooltip(anchor='center left' self='center right') Page Properties
        q-separator(inset)
        q-btn.q-py-sm(
          flat
          icon='las la-history'
          color='grey'
          aria-label='Page History'
          )
          q-tooltip(anchor='center left' self='center right') Page History
        q-btn.q-py-sm(
          flat
          icon='las la-code'
          color='grey'
          aria-label='Page Source'
          )
          q-tooltip(anchor='center left' self='center right') Page Source
        q-space
        q-btn.q-py-sm(
          flat
          icon='las la-copy'
          color='grey'
          aria-label='Duplicate Page'
          )
          q-tooltip(anchor='center left' self='center right') Duplicate Page
        q-btn.q-py-sm(
          flat
          icon='las la-share'
          color='grey'
          aria-label='Rename / Move Page'
          )
          q-tooltip(anchor='center left' self='center right') Rename / Move Page
        q-btn.q-py-sm(
          flat
          icon='las la-trash'
          color='grey'
          aria-label='Delete Page'
          )
          q-tooltip(anchor='center left' self='center right') Delete Page
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#000',
        width: '5px',
        opacity: 0.15
      },
      barStyle: {
        backgroundColor: '#FAFAFA',
        width: '9px',
        opacity: 1
      }
    }
  }
}
</script>

<style lang="scss">
.page-breadcrumbs {
  background: linear-gradient(to bottom, $grey-1 0%, $grey-3 100%);
  border-bottom: 1px solid $grey-4;
}
.page-header {
  background: linear-gradient(to bottom, $grey-2 0%, $grey-1 100%);
  border-bottom: 1px solid $grey-4;
  border-top: 1px solid #FFF;
}
.page-container {
  border-top: 1px solid #FFF;
}
.page-sidebar {
  flex: 0 0 300px;
}
.page-actions {
  flex: 0 0 56px;
}
</style>
