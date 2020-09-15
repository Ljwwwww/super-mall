<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  naem: 'backTop',
}
</script>

<style scoped>
  .back-top {
      position: fixed;
      z-index: 9px;
      bottom: 52px;
      right: 3px;
  }

  .back-top img {
    height: 67px;
  }
</style>