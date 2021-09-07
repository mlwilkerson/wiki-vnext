<template lang='pug'>
q-item-section(avatar)
  q-avatar(
    :color='avatarBgColor'
    rounded
    )
    q-badge(
      v-if='indicatorDot'
      rounded
      :color='indicatorDot'
      floating
      )
      q-tooltip(v-if='indicatorText') {{indicatorText}}
    q-icon(
      v-if='imgPath'
      :name='`img:` + imgPath'
      size='sm'
    )
</template>

<script>
const iconsContext = require.context('../assets/icons/', false, /\/ultraviolet-[a-zA-Z0-9-]+\.svg$/, 'lazy-once')

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
  },
  watch: {
    icon () {
      this.generatePath()
    }
  },
  mounted () {
    this.generatePath()
  },
  methods: {
    async generatePath () {
      this.imgPath = await iconsContext('./ultraviolet-' + this.icon + '.svg')
    }
  }
}
</script>
