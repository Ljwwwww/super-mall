<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.title">
        <a :href="item.link">
        <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/commom/swiper/index'

export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style>

</style>