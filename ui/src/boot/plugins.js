import { Notify } from 'quasar'

export default () => {
  // -> Override Notify presets
  Notify.registerType('warning', {
    icon: 'las la-exclamation-circle',
    progress: false,
    color: 'orange-8',
    textColor: 'white'
  })
}
