<template lang='pug'>
  q-page.admin-webhooks
    .row.q-pa-md.items-center
      .col-auto
        img.admin-icon.animated.fadeInLeft(src='~assets/icons/fluent-fantasy.svg')
      .col.q-pl-md
        .text-h5.text-primary.animated.fadeInLeft {{ $t('admin.webhooks.title') }}
        .text-subtitle1.text-grey.animated.fadeInLeft.wait-p2s {{ $t('admin.webhooks.subtitle') }}
      .col-auto
        q-btn.q-mr-sm.acrylic-btn(
          icon='las la-question-circle'
          flat
          color='grey'
          href='https://docs.js.wiki/admin/webhooks'
          target='_blank'
          type='a'
          )
        q-btn(
          unelevated
          icon='las la-plus'
          :label='$t(`admin.webhooks.new`)'
          color='primary'
          @click='createHook'
          )
    q-separator(inset)
    .row.q-pa-md.q-col-gutter-md
      .col-12(v-if='hooks.length < 1')
        q-card.rounded-borders(
          flat
          :class='$q.dark.isActive ? `bg-dark-5 text-white` : `bg-grey-3 text-dark`'
          )
          q-card-section.items-center(horizontal)
            q-card-section.col-auto.q-pr-none
              q-icon(name='las la-info-circle', size='sm')
            q-card-section.text-caption {{ $t('admin.webhooks.none') }}

</template>

<script>
export default {
  meta () {
    return {
      title: this.$t('admin.webhooks.title')
    }
  },
  data () {
    return {
      hooks: []
    }
  },
  methods: {
    createHook () {

    }
  }
}
</script>

<style lang='scss'>

</style>
