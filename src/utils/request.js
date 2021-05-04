import { Message } from 'element-ui'
import { getTimeStamp } from './auth'
// 导入store对象
import store from '@/store'
// 1.导入axios
import axios from 'axios'
import { Date } from 'core-js'
import router from '@/router'
// 2.创建新的axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 设置超时时间
const Timeout = 3600 // 单位毫秒
// 3.创建请求拦截器
service.interceptors.request.use(
  // config 是请求配置信息
  config => {
    // 注入token
    if (store.getters.token) {
      if (IsTimeOut()) {
        store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject(new Error('登录超时,请重新登录'))
      }
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 4.创建响应拦截器
service.interceptors.response.use(
  // 成功,解构数据
  response => {
    const { success, message, data } = response.data
    // 如果成功
    if (success) {
      // 返回错误对象
      return data
      // 如果失败
    } else {
      Message.error(message) // 业务发生错误，在页面提示错误消息
      return Promise.reject(new Error(message)) // return 出错误，让其进入catch
    }
  },
  error => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 1002
    ) {
      store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message) // 在页面提示错误消息
    }
    return Promise.reject(error) // 让其进入catch，返回错误信息
  }
)
/**
 * 定义超时时间函数
 */
function IsTimeOut() {
  const currentTime = Date.now() // 当前时间
  const timeStamp = getTimeStamp() // 缓存中的时间
  return (currentTime - timeStamp) / 1000 > Timeout
}
// 5.导出service
export default service
