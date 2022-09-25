/**
 * 获取验证吗
 */
import request from '@/utils/request'
export const codeAPI = (randomNum) => {
  return request({
    url: `/api/user-service/user/imageCode/${randomNum}`,
    responseType: 'blob'
  })
}

export const loginAPI = (data) => {
  return request({
    url: '/api/user-service/user/login',
    method: 'POST',
    data
  })
}
