import {getData} from './mutaions-types'
import axios from 'axios';

export default {
  [getData](state) {
    axios.get("/home/data").then((res) => {
        res = res.data
        if (res.errno === ERR_OK) {
           this.themeList=res.data;
        }
      }).catch((error) => {
        console.warn(error)
      })

  }
}