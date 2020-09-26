<template>
  <div class="cart-list">
    <cart-list-item v-for="(item, index) in cartList" :key="index" :itemInfo='item'></cart-list-item>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import CartListItem from './CartListItem'

  export default {
    name:"CartList", 
    props: {

    },
    data() {
      return {

      };
    },
    computed: {
      ...mapGetters(['cartList'])
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
      scroll,
      CartListItem
    },
  };
</script>

<style scoped>
  /* .cart-scroll {
    height: calc(100% - 40px -49px);
  } */
</style>
