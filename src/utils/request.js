import axios from 'axios'
const request = axios.create({
  baseURl: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
export default request
