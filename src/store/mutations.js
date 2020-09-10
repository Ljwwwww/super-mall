import {getData} from './mutaions-types'
import axios from 'axios';

export default {
    [getData](state) {
        axios.get('http://118.89.241.180/img/2.jpg', { responseType: 'blob'})
        let reader = new FileReader()
        reader.onload = (e) => {
           this.pic = e.target.result
         }
        reader.readAsDataURL(res)
        console.log(reader.readAsDataURL(res))
    }
}