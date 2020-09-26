import backTop from 'components/content/backTop/backTop'

// 创建返回顶部的混入封装 
export const BackTopMixin = {
  components: {
    backTop
  },
  data () {
    return {
      positionY: false
    }
  },
  methods: {
    /**
     * 获取绑定ref的scroll组件对象
     * 调用组件对象中已经封装好的方法
     * 返回顶部
     */
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },

    // 是否显示返回顶部组件
    listenShoBackTop(position) {
      this.positionY = ((-position.y) > 1000) ? true : false
    }
  }
}