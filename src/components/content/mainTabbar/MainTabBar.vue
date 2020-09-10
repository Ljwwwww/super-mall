<template>
  <tab-bar>
    <tab-bar-item link='Home' activecolo='yellow'>
    <!-- dom里面使用别名需要加 ~ -->
    <img slot="item-ico" src="~assets/img/tabbar/首页.png" alt="">
    <img slot="item-ico-active" src="~assets/img/tabbar/首页1.png" alt="">
    <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item link='Classify' activecolo="deeppink"> 
    <img slot="item-ico" src="~assets/img/tabbar/分类.png" alt="">
    <img slot="item-ico-active" src="~assets/img/tabbar/分类1.png" alt="">
    <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item link='Shopping' activecolo='#f391a9'>
    <img slot="item-ico" src="~assets/img/tabbar/购物车.png" alt="">
    <img slot="item-ico-active" src="~assets/img/tabbar/购物车1.png" alt="">
    <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item link='Mine'>
    <img slot="item-ico" src="~assets/img/tabbar/我的.png" alt="">
    <img slot="item-ico-active" src="~assets/img/tabbar/我的1.png" alt="">
    <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from 'components/commom/tabber//tabBar'
import TabBarItem from 'components/commom/tabber/tabBarItem'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>