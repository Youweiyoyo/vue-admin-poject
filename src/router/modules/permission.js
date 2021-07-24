// 权限管理路由
import Layout from '@/layout'
export default {
  path: '/permission',
  component: Layout, // 之所以是layout组件是因为我们的每一个页面都要用到layout
  name: 'permissions',
  children: [
    {
      /**
       * 当你的访问地址 是 /permission的时候 layout组件会显示 此时 你的二级路由的默认组件  也会显示
       */
      path: '', // 这里的路径为空，当页面跳转到 permission 页面时显示 permission组件
      name: 'permissions',
      component: () => import('@/views/permission'), // 路由懒加载
      /**
       * meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
       */
      meta: {
        title: '权限管理',
        icon: 'lock'
      }
    }
  ]
}
