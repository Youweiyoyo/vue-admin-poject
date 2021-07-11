import Vue from 'vue'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import components from '@/components'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 引入 vue-print-nb 打印组件
import Print from 'vue-print-nb'

// 引入全局mixins
import checkPermission from '@/mixins/checkPermission'

// 导入创建的所有自定义指令，*代表全部，赋值给 directives
import * as directives from '@/directives'
// 循环遍历所有属性
Object.keys(directives).forEach(key => {
  // 注册自定义指令
  Vue.directive(key, directives[key])
})
// 引入过滤器
import * as filters from '@/filters'
// 循环注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(VXETable)
// 注册自定义组件
Vue.use(components)
Vue.use(Print)
Vue.mixin(checkPermission)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
