import vue from 'vue'
import vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1.注册插件
vue.use(vuex)

const state = {
  cartList: []
}

// 2.到处创建对象
export default new vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {}
})