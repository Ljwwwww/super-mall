<template>
  <div id="app">
    <!-- <button @click="buttondata">123</button> -->
    <router-view />
    <main-tab-bar />
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

<style>
  @import url('assets/css/base.css');
</style>
