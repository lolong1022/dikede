import { codeAPI, loginAPI } from '@/api/login'
export default {
  namespaced: true,
  state: {
    code: '',
    token: '',
    message: ''
  },
  // getters: {
  //   isToken(state) {
  //     return !!state.token
  //   }
  // },
  mutations: {
    SET_CODE(state, code) {
      state.code = code
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_MESSAGE(state, message) {
      state.message = message
    }
  },

  actions: {
  // 验证码的接口
    async setCode({ commit }, randomNum) {
      try {
        const code = await codeAPI(randomNum)
        console.log(code.data)
        commit('SET_CODE', code.data)
      } catch (error) {
        new Error(error)
      }
    },
    // 登录请求
    async setLogin(context, loginData) {
      console.log(loginData)
      const { data } = await loginAPI(loginData)
      context.commit('SET_TOKEN', data.token)
      context.commit('SET_MESSAGE', data)
      // console.log(data)
    }
  }
}
