<template>
  <div id="app">
    <router-view class="router-view" />
    <main-tab-bar class="tab-bar" />
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  },methods: {
    buttondata() {
      this.$store.dispatch('GetData')
    }
  }
}
</script>

<style scoped>
  @import url('assets/css/base.css');
</style>
