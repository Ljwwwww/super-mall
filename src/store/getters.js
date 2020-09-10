export default {
    // 数据经过变化之后使用的数据在getters定义
    powerConunter(state) {
        return state.counter * state.counter
      },
      more20stu(state) {
        return state.students.filter(a => a.age > 20)
      },
      more20stuleg(state, getters) {
        return getters.more20stu.length
      },
      moreAgestu(state) {
        // return function(age) {
        //   return state.students.filter(s => s.age > age)
        // }
        return age => {
          return state.students.filter(s => s.age > age)
        }
    }
}