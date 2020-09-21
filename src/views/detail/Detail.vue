<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav-bar"></detail-nav-bar>
    <scroll class="detail-scroll" ref="scroll">
      <detail-swiper :image='topImage'></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :detailInfo='detailInfo' @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo='goodsparam'></detail-param-info>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from 'views/detail/childComps/DetailNavBar'
  import DetailSwiper from 'views/detail/childComps/DetailSwiper'
  import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo'
  import DetailShopInfo from 'views/detail/childComps/DetailShopInfo'
  import DetailGoodsInfo from 'views/detail/childComps/DetailGoodsInfo'
  import DetailParamInfo from 'views/detail/childComps/DetailParamInfo'

  import scroll from 'components/commom/scroll/scroll'

  import {getDetailData, Goods, Shop, GoodsParam} from 'network/detail/detail'

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
        commentInfo: {}
      };
    },
    computed: {

    },
    created() {
      // 延迟1秒从新计算滚动高度
      // setTimeout(() => {
      //   this.$refs.scroll.refresh()
      // }, 1000);
    },
    mounted() {
      this.iid = this.$route.query.iid
      this.getDetailData(this.iid)
    },
    watch: {

    },
    methods: {
      // 商品详细加载完成重新计算滚动高度
      imageLoad() {
        this.$refs.scroll.refresh()
      },

      /**
       * 网络请求相关方法
       */
      getDetailData(iid) {
        getDetailData(iid).then(res => {
          console.log(res)
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
        })
      },
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      scroll,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo
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
    height: calc(100% - 40px);
  }
</style>
