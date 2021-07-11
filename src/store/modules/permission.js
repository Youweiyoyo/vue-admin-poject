// 处理路由的模块
import { constantRoutes, asyncRouters } from '@/router/index' // 引入静态路由
const state = {
  routes: constantRoutes // 当前用户所拥有的路由表
}
const mutation = {
  setRouters(state, NweRouters) {
    state.routes = [...constantRoutes, NweRouters]
  }
}
const action = {
  // menus 为用户所有的菜单权限
  filterRouters(context, menus) {
    const routes = []
    // 筛选出 asyncRouters动态路由中能够和 menus用户拥有的路由权限能够对上的路由
    menus.forEach(key => {
      routes.push(...asyncRouters.filter(item => item.name === key))
    })
    // 得到的routers是用户所有模块中满足条件的动态路由数组
    context.commit('setRouters', routes)
    return routes // return 给 addRouters用
  }
}
export default {
  namespaced: true,
  state,
  mutation,
  action
}
