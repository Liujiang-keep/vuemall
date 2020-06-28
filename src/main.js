import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import Toast from "@/components/common/toast";

import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false

Vue.prototype.$bus=new Vue()

Vue.use(Toast)
Vue.use(VueLazyload)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
