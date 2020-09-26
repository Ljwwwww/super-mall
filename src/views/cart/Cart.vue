<template>
  <div class="cart">
    <!-- 导航栏 -->
    <nav-bar class="shop-nav"><div slot="center">购物车({{ cartLength }})</div></nav-bar>
    <!-- 商品列表 -->
    <scroll class="cart-scroll" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <!-- 底部汇总 -->
    <bottom-bar class="bottom-bar"></bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/commom/navigationbar/NavBar'
import scroll from 'components/commom/scroll/scroll'

import BottomBar from './childComps/BottomBar'
import CartList from './childComps/CartList'

import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    scroll,
    BottomBar
  },
  computed: {
    ...mapGetters([
      'cartLength'
    ])
  },
  activated () {
    // 一进入购物车就调用refresh方法重新计算可滚动高度
    this.$refs.scroll.refresh()
  }
}
</script>

<style>
  .cart {
    height: 100vh;
  }

  .shop-nav {
    background-color:  #ff8198;
    color: #fff;
    font-weight: 400;
    position: relative;
    z-index: 9;
  }

  .cart-scroll {
    height: calc(100% - 40px - 49px);
    overflow: hidden;
  }
</style>