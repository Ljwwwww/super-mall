<template>
  <div id="app">
    <!-- exclude排除不需要缓存 -->
    <keep-alive exclude="Detail">
      <router-view class="router-view" />
    </keep-alive>
    <main-tab-bar class="tab-bar" />
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  },
}
</script>

<style scoped>
  @import url('assets/css/base.css');
</style>
