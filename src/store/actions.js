import {getData} from './mutaions-types'

export default {
  // actions定义异步操作
  // context: 上下文
  GetData(context, payload) {
      return new Promise((roseolve,reject) => {
        setTimeout(() => {
          context.commit(getData)
          roseolve()
        }, 1000);
      })
  }
}