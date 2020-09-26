<template>
    <nav-bar class="detail-nav">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="titles">
        <div v-for="(item, index) in titles" :key="index" class="titles-item" :class="{avtic: index == currentIndex}" @click="detailClick(index)">{{ item }}</div>
      </div>
    </nav-bar>
</template>

<script>
  import NavBar from 'components/commom/navigationbar/NavBar'

  export default {
    name:"DetailNavBar",
    props: {

    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0,
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
      detailClick(index) {
        this.currentIndex = index
        this.$emit('detailClick', index)
      },
      backClick() {
        this.$router.back()
      },
    },
    components: {
      NavBar,
    },
  };
</script>

<style scoped>
  .back img {
    position: relative;
    top: 5px;
  }
  .titles {
    display: flex;
  }
  .titles-item {
    flex: 1;
    font-size: 15px;
  }
  .avtic {
    color: #ff8198;
  }
</style>
