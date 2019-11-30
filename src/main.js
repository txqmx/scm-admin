import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import ElementUI from 'element-ui'
import 'styles/theme/index.css'
import 'styles/main.scss'
import 'styles/reset.scss'

Vue.use(ElementUI)

Vue.prototype.$message = ElementUI.Message

Vue.config.productionTip = false

// store.dispatch('getMenus')
// store.dispatch('getLoadAllCity')
// store.dispatch('getClass1List')
store.dispatch('getUserInfo')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
