// 1.导入路由
import router from '@/router'
// 2.引入 vuex 中的 store 实例
import store from '@/store'
// 3.导入进度条插件&样式
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式
// 4 设置路由白名单
const whiteList = ['/login', '/404']
// 放置路由前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start() // 打开进度条
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done() // 关闭进度条
})
// 路由后置守卫
router.afterEach(() => {
  NProgress.done()
})
