import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import axios from "axios"
import VueApexCharts from 'vue-apexcharts'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
Vue.component('apexchart', VueApexCharts)
import 'vue-event-calendar/dist/style.css' //^1.1.10, CSS has been extracted as one file, so you can easily update it.
import vueEventCalendar from 'vue-event-calendar'
Vue.use(vueEventCalendar, {locale: 'en'})
Vue.config.productionTip = false


Vue.prototype.$eventHub = new Vue()
//luam tookenul din localStorege
Vue.prototype.$http=axios
const token=localStorage.getItem("token")
if(token){
Vue.prototype.$http.defaults.headers.common['Authorization']=token
}

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
