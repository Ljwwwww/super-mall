import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import fastClick from 'fastclick'

Vue.config.productionTip = false

// 创建事件总线
Vue.prototype.$bus = new Vue()

// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 解决移动端300延迟
fastClick.attach(document.body)

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
