<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav-bar" @detailClick='detailClick' ref="nav"></detail-nav-bar>
    <scroll class="detail-scroll" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :image='topImage'></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :detailInfo='detailInfo' @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo='goodsparam' ref="param"></detail-param-info>
      <detail-comment-info :comment-info='commentInfo' ref="comment"></detail-comment-info>
      <goods-list :goods='recommendList' ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart='addToCart' />
    <back-top @click.native="backClick" v-show="positionY" />
  </div>
</template>

<script>
  import DetailNavBar from 'views/detail/childComps/DetailNavBar'
  import DetailSwiper from 'views/detail/childComps/DetailSwiper'
  import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo'
  import DetailShopInfo from 'views/detail/childComps/DetailShopInfo'
  import DetailGoodsInfo from 'views/detail/childComps/DetailGoodsInfo'
  import DetailParamInfo from 'views/detail/childComps/DetailParamInfo'
  import DetailCommentInfo from 'views/detail/childComps/DetailCommentInfo'
  import DetailBottomBar from 'views/detail/childComps/DetailBottomBar'

  import GoodsList from 'components/content/goods/GoodsList'

  import scroll from 'components/commom/scroll/scroll'

  import {debounce} from 'common/utils'
  import {BackTopMixin} from 'common/mixin'

  import {getDetailData, getRecommend, Goods, Shop, GoodsParam} from 'network/detail/detail'
  
  import { mapActions } from 'vuex'

  import Vue from 'vue';
  // 注册Toast 消息提示
  import { Toast } from 'vant';
  Vue.use(Toast);

  export default {
    name: 'Detail',
    props: {

    },
    data() {
      return {
        iid: null,
        topImage: null,
        goods: {},
        shop: {},
        detailImages: {},
        detailInfo: {},
        goodsparam: {},
        commentInfo: {},
        recommendList: [],
        // 商品 参数 评论 推荐组件的各个Y值存储
        themeTopYs:[0, 0, 0, 0],
        getThemeTopY: null,
        currentIndex: 0,
      };
    },
    // 将返回顶部的代码混入封装
    mixins: [BackTopMixin],
    computed: {

    },
    created() {
      this.iid = this.$route.query.iid
      this.getDetailData(this.iid)

      this.getRecommend()

      // 获取参数 评论 推荐组建的各个Y值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []

        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // 给数据最后一个添加js能表示最大值
        this.themeTopYs.push(Number.MAX_VALUE)
      },200)
    },
    mounted() {
      // 发送一个事件总线(刷新滚动高度)
      // 防抖动
      const refresh = debounce(this.$refs.scroll.refresh,200)
      this.$bus.$on('detailitemImageLoad', () => {
        refresh()
      })

    },
    watch: {

    },
    methods: {
      // vuex actions映射
      ...mapActions(['addCart']),
      // NavBar点击事件
      detailClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index])
      },
      // 商品详细加载完成重新计算滚动高度
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      // 获取scrolld的实时监听滚动位置
      contentScroll(position) {
        //1. 判断BackTop是否显示
        this.listenShoBackTop(position)
        
        // 获取y值
        const positoinY = -position.y

        /**
         * positionY与主题中的值进行对比
         * Number.MAX_VALUE 获取js中能表示最大的值
         */
        for(let i = 0; i < this.themeTopYs.length - 1; i++) {
          // 第一种方法: 普通判断
          // if(this.currentIndex != i && (
          // (i < this.themeTopYs.length-1 && positoinY >= this.themeTopYs[parseInt(i)] && positoinY < this.themeTopYs[parseInt(i) + 1]) 
          // || 
          // (i == this.themeTopYs.length-1 && positoinY >= this.themeTopYs[parseInt(i)]))) {
          //   this.currentIndex = i
          //   // 拿到Nav组件并且传值过去
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }

          // 第二种方法: 给数组最后加上一个js可表示最大值进行判断
          if(this.currentIndex != i && (positoinY > this.themeTopYs[i] && positoinY < this.themeTopYs[i + 1])) {
            this.currentIndex = i
            // 拿到Nav组件并且传值过去
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      },
      // 加入购物车事件
      addToCart() {
        // 1.创建对象
        const obj = {}
        // 2.对象信息
        obj.iid = this.iid;
        obj.imgURL = this.topImage[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc;
        obj.newPrice = this.goods.realPrice;
        // 当要加入购物车的数据不为空再进行下一步
        if (obj != null) {
          this.addCart(obj).then(res => {
            this.toToast(res)
          })
        }else {
          this.toToast('添加失败')
        }
      },
      // 创建Toast消息提示框
      toToast(txt) {
        this.$toast({
          message: txt,
          position: 'center'
        });
      },

      /**
       * 网络请求相关方法
       */
      getDetailData(iid) {
        getDetailData(iid).then(res => {
          const data = res.result
          // 获取轮播图数据
          this.topImage = data.itemInfo.topImages
          // 获取商品详细信息抽离
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
          // 获取商家信息
          this.shop = new Shop(data.shopInfo)
          // 获取商品信息
          this.detailInfo = data.detailInfo
          // 获取参数信息
          this.goodsparam = new GoodsParam(data.itemParams.info, data.itemParams.rule)
          // 获取评论信息(判断是否有评论)
          if (data.rate.cRate != 0) {
            this.commentInfo = data.rate.list[0]
          }

          // 组件渲染完成回调函数
          // this.$nextTick(() => {
          //   // 根据最新的数据, 对应的DOM是已经被渲染出来
          //   // 但是图片依然没有加载完成(目前获取到的offsetTop不包含其中的图片)
          //   // offsetTop值不对的时候, 都是因为图片加载问题(网络问题)
          //   this.themeTopYs = []

          //   this.themeTopYs.push(0)
          //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
          //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          //   console.log(this.themeTopYs)
          // })
        })
      },
      getRecommend() {
        getRecommend().then(res => {
          this.recommendList = res.data.list
        })
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      scroll,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
    },
  };
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    /* 设置100%视图高度 */
    height: 100vh;
  }

  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .detail-scroll {
    height: calc(100% - 40px - 49px);
    width: 100%;
  }
</style>
