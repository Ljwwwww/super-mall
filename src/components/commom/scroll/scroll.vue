<template>
  <div class="wrapper" ref="wrapper">
    <div class="content" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScrool from 'better-scroll'

export default {
  name: 'scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default:false
    }
  },
  data () {
    return {
      scroll: null,
      message: '啊哈哈哈'
    }
  },
  mounted () {
    // 如果不能使用滚动先换成pc端再换成移动端
    // 创建better-scroll对象
    this.scroll = new BScrool(this.$refs.wrapper, {
      probeType: this.probeType,  //  设置监听滚动, 动态设置是否实时监听
      pullUpLoad: this.pullUpLoad,  //  上拉加载开启, 动态设置是否需要上拉加载
      click: true,  // 在scroll组件启用click事件
      mouseWheel: true,  // 开启鼠标滚轮
    })
    
    // 监听获取滚动事件
    if (this.probeType == 2 || this.probeType == 3) {
      this.scroll.on('scroll', (position) => {
        // 将监听的x, y位置传到父组件
        this.$emit('scroll',position)
      })
    }
    
    // 监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    /**
     * 封装scrollTo方法 以便父组件使用时直接$refs调用方法即可
     * ( .scrollTo(参数1, 参数2, 参数3) )参数的1,2移动到指定的x, y位置,参数3设置移动事件(毫秒)
     */
    scrollTo(x, y, time=1200) {
      this.scroll.scrollTo(x, y, time)
    },

    finishPullUp() {
      this.scroll.finishPullUp()
    },

    refresh() {
      // 判断scroll对象是否初始化完成 预防其他组件加载完成调用refresh方法的时候是个null
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style scoped>
</style>