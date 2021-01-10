<template lang="pug">
  q-menu(
    auto-close
    anchor='bottom right'
    self='top right'
    )
    q-list(padding)
      q-item(clickable, to='/n')
        q-item-section.items-center(avatar)
          q-icon(color='primary', name='las la-file-alt', size='sm')
        q-item-section.q-pr-sm New Page
      q-item(clickable, to='/n/markdown')
        q-item-section.items-center(avatar)
          q-icon(color='primary', name='lab la-markdown', size='sm')
        q-item-section.q-pr-sm New Markdown Page
      q-item(clickable, to='/n/blog', disabled)
        q-item-section.items-center(avatar)
          q-icon(color='primary', name='las la-blog', size='sm')
        q-item-section.q-pr-sm New Blog Page
      q-item(clickable, to='/n/api', disabled)
        q-item-section.items-center(avatar)
          q-icon(color='primary', name='las la-code-branch', size='sm')
        q-item-section.q-pr-sm New API Documentation
      q-item(clickable, to='/n/redirection', disabled)
        q-item-section.items-center(avatar)
          q-icon(color='primary', name='las la-location-arrow', size='sm')
        q-item-section.q-pr-sm New Redirection
      q-separator.q-my-sm(inset)
      q-item(clickable, to='/f')
        q-item-section.items-center(avatar)
          q-icon(color='primary', name='las la-photo-video', size='sm')
        q-item-section.q-pr-sm Upload Media Asset
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
