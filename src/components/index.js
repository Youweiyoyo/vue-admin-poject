/**
 * 自定义组件的全局注册
 */
import pageTools from './PageTools'
export default {
  // Vue 是Vue的实例对象
  install(Vue) {
    // 组件注册
    Vue.component('pageTools', pageTools)
  }
}
