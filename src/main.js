import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import Paginate from 'vuejs-paginate'

Vue.component('paginate', Paginate)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
