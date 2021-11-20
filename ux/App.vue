<template>
  <router-view />
</template>
<script>
export default {
  name: 'App',
  created () {
    this.$store.dispatch('site/loadSite', window.location.hostname)
  },
  mounted () {
    // this.$q.dark.set(true)
    this.$nextTick(() => {
      document.querySelector('.init-loading').remove()
    })
  }
}
</script>

<style lang="scss">
.card-header {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: .9rem;
  background-color: $dark-3;
  background-image: radial-gradient(at bottom right, $dark-3, $dark-5);
  color: #FFF;

  @at-root .body--light & {
    border-bottom: 1px solid $dark-3;
    box-shadow: 0 1px 0 0 $dark-6;
  }
  @at-root .body--dark & {
    border-bottom: 1px solid #000;
    box-shadow: 0 1px 0 0 lighten($dark-3, 2%);
  }
}

.card-actions {
  @at-root .body--light & {
    background-color: #FAFAFA;
    background-image: linear-gradient(to bottom, #FCFCFC, #F0F0F0);
    color: $dark-3;
    border-top: 1px solid #EEE;
    box-shadow: inset 0 1px 0 0 #FFF;
  }
  @at-root .body--dark & {
    background-color: $dark-3;
    background-image: radial-gradient(at top left, $dark-3, $dark-5);
    border-top: 1px solid #000;
    box-shadow: 0 -1px 0 0 lighten($dark-3, 2%);
  }
}
</style>
