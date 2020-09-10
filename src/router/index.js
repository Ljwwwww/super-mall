import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home.vue')
const Classify = () => import('views/category/Classify.vue')
const Mine = () => import('views/profile/Mine.vue')
const Shopping = () => import('views/cart/Shopping.vue')

Vue.use(VueRouter)


export default new VueRouter({
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/classify',
      component: Classify
    },
    {
      path: '/mine',
      component: Mine
    },
    {
      path: '/shopping',
      component: Shopping
    }
  ],
  mode: 'history'
})
