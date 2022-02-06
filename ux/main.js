import { createSSRApp } from 'vue'

import {
  ClosePopup,
  Dialog,
  Loading,
  LoadingBar,
  Meta,
  Notify,
  QAvatar,
  QBadge,
  QBanner,
  QBar,
  QBreadcrumbs,
  QBreadcrumbsEl,
  QBtn,
  QBtnGroup,
  QBtnToggle,
  QCard,
  QCardActions,
  QCardSection,
  QCheckbox,
  QChip,
  QCircularProgress,
  QColor,
  QDate,
  QDialog,
  QDrawer,
  QFooter,
  QForm,
  QHeader,
  QIcon,
  QImg,
  QInnerLoading,
  QInput,
  QItem,
  QItemLabel,
  QItemSection,
  QLayout,
  QList,
  QMenu,
  QNoSsr,
  QPage,
  QPageContainer,
  QPageScroller,
  QPagination,
  QRadio,
  QRange,
  QRating,
  QRouteTab,
  QScrollArea,
  QSelect,
  QSeparator,
  QSlider,
  QSpace,
  QSpinner,
  QSpinnerRings,
  QSpinnerTail,
  QTab,
  QTable,
  QTabPanel,
  QTabPanels,
  QTabs,
  QTd,
  QToggle,
  QToolbar,
  QToolbarTitle,
  QTooltip,
  QTree,
  Quasar,
  Ripple
} from 'quasar'
import quasarIconSet from 'quasar/icon-set/mdi-v6'

import VNetworkGraph from 'v-network-graph'
import 'v-network-graph/lib/style.css'

import Router from './router'
import Store from './store'
import I18n from './i18n'
import Apollo from './apollo'
import PageHelpers from './helpers/page'

import BlueprintIcon from './components/BlueprintIcon.vue'

// Import icon libraries
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css'
import '@quasar/extras/line-awesome/line-awesome.css'
import '@quasar/extras/mdi-v6/mdi-v6.css'

// A few examples for animations from Animate.css:
// import @quasar/extras/animate/fadeIn.css
// import @quasar/extras/animate/fadeOut.css

// Import Quasar css
import 'quasar/src/css/index.sass'

// Import App css
import './css/app.scss'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import AppComponent from './App.vue'

export function createApp () {
  const app = createSSRApp(AppComponent)

  // Initialize Quasar

  Notify.registerType('warning', {
    icon: 'las la-exclamation-circle',
    progress: false,
    color: 'orange-8',
    textColor: 'white'
  })

  app.use(Quasar, {
    plugins: {
      Dialog,
      Loading,
      LoadingBar,
      Meta,
      Notify
    },
    iconSet: quasarIconSet,
    config: {
      brand: {
        header: '#000',
        sidebar: '#1976D2'
      },
      loadingBar: {
        color: 'primary',
        size: '1px',
        position: 'top'
      },
      notify: {
        position: 'top',
        progress: true,
        color: 'green',
        icon: 'las la-check',
        actions: [
          {
            icon: 'las la-times',
            color: 'white',
            size: 'sm',
            round: true,
            handler: () => {}
          }
        ]
      }
    }
  })

  // Vuex
  app.use(Store)

  // Vue-Router
  app.use(Router)

  // Vue-i18n
  app.use(I18n)

  // Apollo
  app.use(Apollo)

  //
  app.use(VNetworkGraph)

  // Helpers
  PageHelpers({
    app,
    store: Store
  })

  // Quasar components
  app.component('QAvatar', QAvatar)
  app.component('QBadge', QBadge)
  app.component('QBanner', QBanner)
  app.component('QBar', QBar)
  app.component('QBreadcrumbs', QBreadcrumbs)
  app.component('QBreadcrumbsEl', QBreadcrumbsEl)
  app.component('QBtn', QBtn)
  app.component('QBtnGroup', QBtnGroup)
  app.component('QBtnToggle', QBtnToggle)
  app.component('QCard', QCard)
  app.component('QCardActions', QCardActions)
  app.component('QCardSection', QCardSection)
  app.component('QCheckbox', QCheckbox)
  app.component('QChip', QChip)
  app.component('QCircularProgress', QCircularProgress)
  app.component('QColor', QColor)
  app.component('QDate', QDate)
  app.component('QDialog', QDialog)
  app.component('QDrawer', QDrawer)
  app.component('QForm', QForm)
  app.component('QFooter', QFooter)
  app.component('QHeader', QHeader)
  app.component('QIcon', QIcon)
  app.component('QImg', QImg)
  app.component('QInnerLoading', QInnerLoading)
  app.component('QInput', QInput)
  app.component('QItem', QItem)
  app.component('QItemLabel', QItemLabel)
  app.component('QItemSection', QItemSection)
  app.component('QLayout', QLayout)
  app.component('QList', QList)
  app.component('QMenu', QMenu)
  app.component('QNoSsr', QNoSsr)
  app.component('QPage', QPage)
  app.component('QPageContainer', QPageContainer)
  app.component('QPageScroller', QPageScroller)
  app.component('QPagination', QPagination)
  app.component('QRadio', QRadio)
  app.component('QRange', QRange)
  app.component('QRating', QRating)
  app.component('QRouteTab', QRouteTab)
  app.component('QScrollArea', QScrollArea)
  app.component('QSelect', QSelect)
  app.component('QSeparator', QSeparator)
  app.component('QSlider', QSlider)
  app.component('QSpace', QSpace)
  app.component('QSpinner', QSpinner)
  app.component('QSpinnerRings', QSpinnerRings)
  app.component('QSpinnerTail', QSpinnerTail)
  app.component('QTab', QTab)
  app.component('QTabPanel', QTabPanel)
  app.component('QTabPanels', QTabPanels)
  app.component('QTable', QTable)
  app.component('QTabs', QTabs)
  app.component('QTd', QTd)
  app.component('QToggle', QToggle)
  app.component('QToolbar', QToolbar)
  app.component('QToolbarTitle', QToolbarTitle)
  app.component('QTooltip', QTooltip)
  app.component('QTree', QTree)

  // Quasar Directives
  app.directive('ripple', Ripple)
  app.directive('close-popup', ClosePopup)

  // App Components
  app.component('BlueprintIcon', BlueprintIcon)

  // Mount
  app.mount('#app')

  return {
    app,
    router: Router,
    store: Store
  }
}
