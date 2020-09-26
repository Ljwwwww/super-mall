import axios from 'axios';

export default {
  
  addCounter(state, payload) {
    payload.count++
  },
  addToCart(state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  },
  settleupon(state, payload) {
    state.cartList.forEach(item => {
      item.checked = payload
    })
  }
}