import {getData} from './mutaions-types'

export default {
  // 添加购物车
  addCart(context, payload) {
    // 添加购物车的时候返回Promise在组件内进行往后操作
    return new Promise((resolve, reject) => {
      // 查找之前数组是否有该商品
      const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if(oldProduct) {
        // 如果有该商品了就通过mutations方法给数量加一
        context.commit('addCounter',oldProduct)
        resolve('商品数量加+1')
      }else {
        // 没有该商品就通过mutations方法添加新数组
        payload.count = 1
        context.commit('addToCart',payload)
        resolve('添加了新的商品')
      }
    })
  }
}