// 导入存储本地的方法
import { getToken, setToken, removeToken } from '@/utils/auth'
// 导入 user 的登录请求方法
import { login } from '@/api/user'
const state = {
  // 1.初始化的时候，从本地存储去拿去token
  token: getToken()
}
const mutations = {
  // 2.定义修改 token 的方法
  setToken(state, token) {
    // 将token赋值给vuex中的token，只是修改vuex中的token
    state.token = token
    // 将拿到的 token 存储到本地
    setToken(token)
  },
  // 3.定义删除 token 的方法
  removeToken(state) {
    state.token = null
    removeToken()
  }
}
// 逻辑：在登录的时候通过dispath来触发action中的login方法，在login方法中通过context.commit触发mutation 中的 setToken 方法将获取到的token存储到vuex中，当vuex中的token发生变化时，同步更新token存入缓存中，完成逻辑
const actions = {
  // 定义登录的方法
  async login(context, data) {
    // 调用请求登录的 API
    const result = await login(data)
    context.commit('setToken', result)
  }
}
export default {
  // 开启命名空间
  namespaced: true,
  state,
  mutations,
  actions
}
