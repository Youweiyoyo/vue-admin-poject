/**
 *  员工管理路由
 */
import Layout from '@/layout'
export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: {
        title: '员工管理',
        icon: 'people'
      }
    },
    {
      path: 'detail/:id', // 路由传参后面添加 ?表示该参数可传可不传
      component: () => import('@/views/employees/detail'),
      hidden: true, // hidden = true 表示不显示该组件
      meta: {
        title: '员工详情'
      }
    },
    {
      path: 'print/:id',
      component: () => import('@/views/employees/print'),
      hidden: true,
      meta: {
        title: '打印',
        icon: 'people'
      }
    }
  ]
}
