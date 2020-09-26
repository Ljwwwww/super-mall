import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home.vue')
const Classify = () => import('views/category/Classify.vue')
const Mine = () => import('views/profile/Mine.vue')
const Cart = () => import('views/cart/Cart.vue')
const Detail = () => import('views/detail/Detail.vue')

Vue.use(VueRouter)


export default new VueRouter({
  routes: [
    {
      path: '',
      redirect: '/home',
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/classify',
      component: Classify,
    },
    {
      path: '/mine',
      component: Mine,
    },
    {
      path: '/cart',
      component: Cart,
    },
    {
      path: '/detail',
      component: Detail,
    }
  ],
  mode: 'history'
})
