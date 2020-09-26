<template>
  <div class="bottom-menu">
    <check-button class="select-all" @checkBtnClick="checkBtnClick" :value="isSelectAll"></check-button>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去计算({{checkLength}})</span>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'

  import {mapGetters} from 'vuex'

	export default {
		name: "BottomBar",
    components: {
		  CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      // 商品合计
		  totalPrice() {
        const cartList = this.cartList;
        return cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.newPrice
        }, 0).toFixed(2)
      },
      // 判断是否全选
      isSelectAll: function () {
        /**
         * 方法一: 性能较差
         * 先判断购物车中的所有商品有没有不被选中的也就是checked为false
         * 获取不被选中的长度, 如果有不被选中的数据(checked为false)获取到的数组长度会 > 1 长度取反为false (-1...任何负值取反为false)
         * 如果全部被选中 !item.checked的长度为0 取反就为true
         */
        // return !(this.cartList.filter(item => !item.checked).length);

        // 方法二: 找到一个元素就停止之后操作(性能较高)
        // 使用三目运算符判断数据为空的时候不全选
        return this.cartList.length == 0 ? false : !this.cartList.find(item => !item.checked)
      },
      // 获取选中商品数量
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      }
    },
    methods: {
      checkBtnClick: function () {
        // 1.判断是否有未选中的按钮
        let isSelectAll = this.cartList.find(item => !item.checked);

        // 2.有未选中的内容, 则全部选中
        if (isSelectAll) {
          this.cartList.forEach(item => {
            this.$store.commit('settleupon', true)
          });
        } else {
          this.cartList.forEach(item => {
            this.$store.commit('settleupon', false)
          });
        }
      }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
