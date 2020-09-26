<template>
  <tab-bar>
    <tab-bar-item link='home' activecolo='yellow'>
    <!-- dom里面使用别名需要加 ~ -->
    <img slot="item-ico" src="~assets/img/tabbar/1.png" alt="">
    <img slot="item-ico-active" src="~assets/img/tabbar/1.1.png" alt="">
    <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item link='classify' activecolo="deeppink"> 
    <img slot="item-ico" src="~assets/img/tabbar/2.png" alt="">
    <img slot="item-ico-active" src="~assets/img/tabbar/2.1.png" alt="">
    <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item link='cart' activecolo='#f391a9'>
    <img slot="item-ico" src="~assets/img/tabbar/3.png" alt="">
    <img slot="item-ico-active" src="~assets/img/tabbar/3.1.png" alt="">
    <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item link='mine'>
    <img slot="item-ico" src="~assets/img/tabbar/4.png" alt="">
    <img slot="item-ico-active" src="~assets/img/tabbar/4.1.png" alt="">
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