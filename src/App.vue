<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
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

  @at-root .body--light & {
    background-color: #EEE;
    background-image: radial-gradient(at bottom right, #FFF, #EEE);
    color: $dark-3;
    border-bottom: 1px solid #FFF;
    box-shadow: 0 1px 0 0 #DDD;
  }
  @at-root .body--dark & {
    background-color: $dark-3;
    background-image: radial-gradient(at bottom right, $dark-3, $dark-5);
    color: #FFF;
    border-bottom: 1px solid $dark-3;
    box-shadow: 0 1px 0 0 $dark-6;
  }
}

.card-actions {
  @at-root .body--light & {
    background-color: #FAFAFA;
    background-image: linear-gradient(to bottom, #FFF, #FAFAFA);
    color: $dark-3;
    border-top: 1px solid #EEE;
  }
  @at-root .body--dark & {
    background-color: $dark-3;
    background-image: linear-gradient(to top, lighten($dark-5, 3%), $dark-5);
    border-top: 1px solid $dark-3;
    box-shadow: 0 -1px 0 0 #000;
  }
}
</style>
