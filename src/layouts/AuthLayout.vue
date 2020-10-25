<template lang='pug'>
  q-layout(view='hHh lpr lff')
    .auth(:style='`background-image: url(` + bgUrl + `);`')
      .auth-sd
        q-page-container
          router-view
</template>

<script>

export default {
  name: 'AuthLayout',
  data () {
    return {
      bgUrl: 'https://docs.requarks.io/_assets/img/splash/1.jpg'
    }
  }
}
</script>

<style lang="scss">
  .auth {
    background-color: mc('grey', '900');
    background-size: cover;
    background-position: center center;
    width: 100%;
    height: 100%;

    &-sd {
      background-color: rgba(255,255,255,.8);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-left: 1px solid rgba(255,255,255,.85);
      border-right: 1px solid rgba(255,255,255,.85);
      width: 450px;
      height: 100%;
      margin-left: 5vw;

      @at-root .no-backdropfilter & {
        background-color: rgba(255,255,255,.95);
      }

      @media (max-width: $breakpoint-md-max) {
        margin-left: 0;
        width: 100%;
      }
    }
  }
</style>
