import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home.vue')
const Classify = () => import('views/category/Classify.vue')
const Mine = () => import('views/profile/Mine.vue')
const Shopping = () => import('views/cart/Shopping.vue')
const Detail = () => import('views/detail/Detail.vue')

Vue.use(VueRouter)


export default new VueRouter({
  routes: [
    {
      path: '',
      redirect: '/home',
      meta: true
    },
    {
      path: '/home',
      component: Home,
      meta: true
    },
    {
      path: '/classify',
      component: Classify,
      meta: true
    },
    {
      path: '/mine',
      component: Mine,
      meta: true
    },
    {
      path: '/shopping',
      component: Shopping,
      meta: true
    },
    {
      path: '/detail',
      component: Detail,
      meta: false
    }
  ],
  mode: 'history'
})
