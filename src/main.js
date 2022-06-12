import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import i18n from './plugins/i18n'
import './index.css'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3005'

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
Vue.use(VueAxios, axios)

