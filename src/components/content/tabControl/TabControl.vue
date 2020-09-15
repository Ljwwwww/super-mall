<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles"
         :key="index" class="tab-control-item" 
         :class="{active: index === currentIndex}"
         @click="itemclick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  naem: 'TabControl',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },data () {
      return {
        currentIndex: 0
      }
  },methods: {
    itemclick(index) {
      this.currentIndex = index
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style>
  .tab-control {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active{
    color: #ff5777;
  }

  .active span {
    border-bottom: 2px solid #ff5777;
  }
</style>