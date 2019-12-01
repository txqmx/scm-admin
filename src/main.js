import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import ElementUI from 'element-ui'
import McElement from './components/scm-element/index'
import 'styles/theme/index.css'
import 'styles/main.scss'
import 'styles/reset.scss'

Vue.use(ElementUI)
Vue.use(McElement)

Vue.prototype.$message = ElementUI.Message

Vue.config.productionTip = false

store.dispatch('getUserInfo')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
