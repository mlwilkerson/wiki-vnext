<template lang='pug'>
q-item-section(avatar)
  q-avatar.blueprint-icon(
    :color='avatarBgColor'
    rounded
    :style='hueRotate !== 0 ? `filter: hue-rotate(` + hueRotate + `deg)` : ``'
    )
    q-badge(
      v-if='indicatorDot'
      rounded
      :color='indicatorDot'
      floating
      )
      q-tooltip(v-if='indicatorText') {{indicatorText}}
    q-icon(
      :name='`img:/_assets/icons/ultraviolet-` + icon + `.svg`'
      size='sm'
    )
</template>

<script>
export default {
  name: 'BlueprintIcon',
  props: {
    icon: {
      type: String,
      default: ''
    },
    dark: {
      type: Boolean,
      default: false
    },
    indicator: {
      type: String,
      default: null
    },
    indicatorText: {
      type: String,
      default: null
    },
    hueRotate: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      imgPath: null
    }
  },
  computed: {
    avatarBgColor () { return this.$q.dark.isActive || this.dark ? 'dark-4' : 'blue-1' },
    indicatorDot () {
      if (this.indicator === null) { return null }
      return (this.indicator === '') ? 'pink' : this.indicator
    }
  }
}
</script>
