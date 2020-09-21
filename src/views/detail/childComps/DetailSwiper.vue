<template>
  <div class="detailSwiper">
    <swiper class="detailSwiper-img">
      <swiper-item v-for="(item, index) in image" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/commom/swiper/index'

  export default {
    name:"DetailSwiper",
    props: {
      image: {}
    },
    data() {
      return {

      };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {

    },
    components: {
      Swiper,
      SwiperItem
    },
  };
</script>

<style scoped>
  .detailSwiper-img {
    height: 300px;
    overflow: hidden;
  }
</style>
