<template lang="pug">
  q-card(flat, style='min-width: 350px;')
    q-card-section.card-header
      q-icon(name='las la-plus', left)
      span {{$t(`admin:sites.new`)}}
    q-card-section
      q-form.q-gutter-md
        q-input(
          outlined
          v-model='siteName'
          dense
          :rules=`[
            val => val.length > 0 || $t('admin:sites.nameMissing'),
            val => /^[^<>"]+$/.test(val) || $t('admin:sites.nameInvalidChars')
          ]`
          hide-bottom-space
          :label='$t(`common:field.name`)'
          :aria-label='$t(`common:field.name`)'
          )
        q-input(
          outlined
          v-model='siteHostname'
          dense
          :rules=`[
            val => val.length > 0 || $t('admin:sites.hostnameMissing'),
            val => /^(\\*)|([a-z0-9\-.]+)$/.test(val) || $t('admin:sites.hostnameInvalidChars')
          ]`
          hide-bottom-space
          :label='$t(`admin:sites.hostname`)'
          :aria-label='$t(`admin:sites.hostname`)'
          )
    q-card-actions.card-actions
      q-space
      q-btn.acrylic-btn(
        v-close-popup
        flat
        :label='$t(`common:actions.cancel`)'
        color='grey'
        padding='xs md'
        )
      q-btn(
        unelevated
        :label='$t(`common:actions.create`)'
        color='primary'
        padding='xs md'
        )
</template>

<script>
export default {
  data () {
    return {
      siteName: '',
      siteHostname: 'wiki.example.com'
    }
  }
}
</script>
