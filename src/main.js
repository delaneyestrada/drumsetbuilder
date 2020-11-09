import Vue from 'vue'
import App from './App.vue'
import store from './store'
import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'
import VueHead from 'vue-head'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import {
  auth
} from './firebase'
import VueGtag from "vue-gtag";

Vue.use(VueGtag, {
  config: {
    id: "G-KCSYBEH5PZ'"
  }
});

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueHead)


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