<template>
  <div id="tab-bar-item" @click="itemclick">  
    <!-- 判断根据变量获取活跃状态显示的图标与颜色 -->
    <div v-if="!isActive"><slot name="item-ico"></slot></div>
    <div v-else><slot name="item-ico-active"></slot></div>
    <div :class="{ active: isActive }"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'tabBarItem',
  props: {
    link: {
      type: String,
      default: 'Home'
    },
    activecolo: {
      type: String,
      default: 'red'
    },
    asb:String
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.link) !== -1
    },
    activestyle() {
      return this.isActive ? {color: this.activecolo} : {}
    }
  },
  methods: {
    itemclick() {
      if (this.link != undefined) {
        this.$router.replace(this.link).catch(() => {})
      }
    }
  }
}
</script>

<style>
  #tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  #tab-bar-item img {
    margin-top: 3px;
    width: 24px;
    /* 去掉图片下面像素 */
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>