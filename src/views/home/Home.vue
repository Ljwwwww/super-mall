<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" @tabClick='tabClick' ref="tabcontrol2" class="tabcontrolNv" v-show="isTabFixesd" />

    <!-- 绑定ref获取组件对象 -->
    <scroll class="content" ref="scroll" :probe-type='3' :pull-up-load='true' @scroll="contentScroll" @pullingUp='loadMore'>
      <!-- 
        -- .once修饰符
        -- 绑定once的监听器只会触发一次，在第一次触发后该监听器会被remove掉
       -->
      <home-swiper :banners= 'banners' @homeSwiperImage.once='homeSwiperImage' />
      <home-recommend-view :recommends= 'recommends' />
      <feature-view />
      <tab-control :titles="['流行', '新款', '精选']" @tabClick='tabClick' ref="tabcontrol1" />
      <goods-list :goods="showGoods" />
    </scroll>

    <!-- 组件不能直接监听方法
      -- 得添加.native修饰符才能实现组件监听
      -- 在我们需要监听一个组件的原生事件时, 必须给对应的事件加上.native修饰符, 才能进行监听.
     -->
    <back-top @click.native="backClick" v-show="positionY" />
  </div>
</template>

<script>

import HomeSwiper from 'views/home/childComps/HomeSwiper'
import HomeRecommendView from 'views/home/childComps/HomeRecommendView'
import FeatureView from 'views/home/childComps/FeatureView'

import NavBar from 'components/commom/navigationbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import scroll from 'components/commom/scroll/scroll'

import {debounce} from 'common/utils'
import {BackTopMixin} from 'common/mixin'

import {getHomeMultidata, getHomeGoods} from 'network/homes/home'

export default {
  name: 'Home',
  components: {
    HomeSwiper, 
    HomeRecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    scroll,
  },
  // 将返回顶部的代码混入封装
  mixins: [BackTopMixin],
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixesd: false,
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created () {
    // 请求多个数据保存到实例对象
    this.getHomeMultidata()

    // 请求商品数据
    this.getHomeGoods('pop')

    this.getHomeGoods('new')

    this.getHomeGoods('sell')
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    // 获取选项栏点击来获取加载对于货品
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1: 
          this.currentType = 'new' 
          break
        case 2: 
          this.currentType = 'sell'
          break
        default:
          break;
      }
      this.$refs.tabcontrol2.currentIndex = index
      this.$refs.tabcontrol1.currentIndex = index
    },
    // 获取scroll实时监听的x, y
    contentScroll(position) {
      //1. 判断BackTop是否显示
      this.listenShoBackTop(position)

      //2. 决定tabCOntrol是否吸顶(position: fixed)
      // 当达到需要吸顶的时候显示隐藏的tab-control
      this.isTabFixesd = ((-position.y) > this.tabOffsetTop) ? true : false
    },
    // 上拉加载更多数据
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    /**
     * 获取tab-control的offsettop元素高度
     * 所有组件都有一个$el属性: 用于获取组件中的元素
     * 通过子组件的图片加载完成在调用此方法, 再通过.once修饰符优化性能多次发送监听一次
     */
    homeSwiperImage() {
      this.tabOffsetTop = this.$refs.tabcontrol1.$el.offsetTop
    },

    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page += 1
      getHomeGoods(type, page).then(res => {
        // ...运算符将数组复制到另一个数组
        this.goods[type].list.push(...res.data.list)

        // 上拉加载更多次
        this.$refs.scroll.finishPullUp()
      })
    }
  },
  mounted() {
    //1. 图片加载完成事件监听
    const refresh = debounce(this.$refs.scroll.refresh,200)
    // 发送一个事件总线
    this.$bus.$on('homeitemImageLoad', () => {
      refresh()
    })
  }

}
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: #ff8198;
    color: aliceblue;
    
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 40px;
    bottom: 49px;
    left: 0;
    right: 0;
  } 

  .tabcontrolNv {
    position: relative;
    z-index: 9;
    top: 40px;
  }
</style> 