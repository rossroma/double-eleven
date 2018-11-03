import Vue from 'vue'
import Resource from 'vue-resource'
Vue.use(Resource)

// 默认请求路径
const path = process.env.NODE_ENV === 'production' ? '/' : 'http://127.0.0.1/'

// get请求
const get = function (url, cb) {
  Vue.http.get(path + url)
    .then((response) => {
      if (response.status === 200) {
        cb(response.body)
      } else {
        console.log(response.status)
      }
    })
}

let bus = new Vue()
bus.get = get
export default bus
