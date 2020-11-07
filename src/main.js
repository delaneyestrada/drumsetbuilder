import Vue from 'vue'
import App from './App.vue'
import store from './store'
import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import {
  auth
} from './firebase'



Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
  mounted: () => document.dispatchEvent(new Event("x-app-rendered")),
    }).$mount('#app')
  }
})