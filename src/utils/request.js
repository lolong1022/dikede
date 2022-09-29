// import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
const request = axios.create({
  baseURl: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 响应拦截器
request.interceptors.response.use(
  response => {
    if (response.data.size) {
      return response.data
    }
    if (response.data.success) {
      return response.data
    }
    Message.error(response.data.msg)
    return Promise.reject(response.data)
  },
  error => {
    Message.error(error.message)

    throw Promise.reject(error)
  }
)

export default request
