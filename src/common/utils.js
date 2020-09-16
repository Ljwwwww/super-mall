/**
 * 防抖动
 *
 * @export
 * @param {*} func
 * @param {*} delay
 * @return {*} 
 */
export function  debounce(func, delay) {
    let timer = null
    return function(...args) {
      if(timer) clearTimeout(timer)
      timer = setTimeout(() => {
        // 通过 apply() 方法，您能够编写用于不同对象的方法。
        func.apply(this, args)
      }, delay);
    }
  }