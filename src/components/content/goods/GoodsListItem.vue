<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    /**
     * 每张图片加载完成调用此方
     * 当每次图片加载完成调用事件总线获取 scroll对象的refresh()方法从新计算滚动高度
     * 根据路由路径判断刷新
     */
    imageLoad() {
      if (this.$route.path.indexOf('/home') != -1) {
        this.$bus.$emit('homeitemImageLoad')
      }else if(this.$route.path.indexOf('/detail') != -1) {
        this.$bus.$emit('detailitemImageLoad')
      }
    },

    /**
     * 商品页面跳转事件
     * 利用query跳转页面并且携带参数
     */
    itemClick() {
      const iid = this.goodsItem.iid
      this.$router.push({
        path: '/detail',
        query: {iid}
      })
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  }
}
</script>

<style scoped>
  .goods-item {
    padding-bottom: 36px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>