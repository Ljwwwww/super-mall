<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <p>首页</p>
  </div>
</template>

<script>
import NavBar from 'components/commom/navigationbar/NavBar'

export default {
  name: 'Home',
  data () {
    return {
      pic: 'String'
    }
  },
  components: {
    NavBar
  },
  methods: {
    
  }
}
</script>

<style>
  .home-nav {
    background-color: #ff8198;
    color: aliceblue;
  }
</style> 