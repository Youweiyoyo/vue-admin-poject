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
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 打开进度条
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断有无用户id
      if (!store.getters.userId) {
        const { roles } = await store.dispatch('user/getUserInfo')
        const routes = await store.dispatch(
          'permission/filterRouters',
          roles.menus
        )
        router.addRoutes([
          ...routes,
          { path: '*', redirect: '/404', hidden: true }
        ])
        next(to.path)
      } else {
        next()
      }
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
