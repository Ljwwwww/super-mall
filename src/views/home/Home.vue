<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <home-swiper :banners= 'banners'></home-swiper>
    <home-recommend-view :recommends= 'recommends' />
  </div>
</template>

<script>
import NavBar from 'components/commom/navigationbar/NavBar'
import HomeSwiper from 'views/home/childComps/HomeSwiper'
import HomeRecommendView from 'views/home/childComps/HomeRecommendView'
import {getHomeMultidata} from 'network/homes/home'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView
  },
  data () {
    return {
      banners: [],
      recommends: []
    }
  },
  created () {
    // 请求多个数据保存到实例对象
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  }
}
</script>

<style>
  .home-nav {
    background-color: #ff8198;
    color: aliceblue;
  }
</style> 