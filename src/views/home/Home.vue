<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <!-- 绑定ref获取组件对象 -->
    <scroll class="content" ref="scroll" :probe-type='3' :pull-up-load='true' @scroll="contentScroll" @pullingUp='loadMore'>
      <home-swiper :banners= 'banners'></home-swiper>
      <home-recommend-view :recommends= 'recommends' />
      <feature-view />
      <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick='tabClick' />
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
import backTop from 'components/content/backTop/backTop'

import {debounce} from 'common/utils'

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
    backTop
  },
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
      positionY: false,
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
    },
    // 获取better-scroll实例对象
    backClick() {
      /**
       * 获取绑定ref的scroll组件对象
       * 调用组件对象中已经封装好的方法
       */
      this.$refs.scroll.scrollTo(0, 0)
    },
    // 获取scroll实时监听的x, y
    contentScroll(position) {
      // 获取y的位置判断是否大于1000来显示组件
      this.positionY = ((-position.y) > 1000) ? true : false
    },
    // 上拉加载更多数据
    loadMore() {
      console.log('加载')
      this.getHomeGoods(this.currentType)
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
        // 每次网络请求后获取新数据 重新计算元素高度
        // this.staple()
      })
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,200)
    // 发送一个事件总线
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  }

}
</script>

<style scoped>
  #home {
    /* padding-top: 10%; */
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

  .tab-control {
    /* 给选项栏设置下拉固定 */
    position: sticky;
    top: 0px;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 40px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style> 