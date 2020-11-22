<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted () {
    this.$nextTick(() => {
      document.querySelector('.init-loading').remove()
    })
  }
}
</script>
