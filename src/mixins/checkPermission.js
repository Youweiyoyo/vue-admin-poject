import store from '@/store'
export default {
  methods: {
    // 检查权限 key 为需要检查的权限
    checkPermission(key) {
      // 去用户的信息里面找,如果 points 中如果有 key 就证明用户有该按钮的权限
      const { userInfo } = store.state.user
      if (userInfo.roles && userInfo.roles.points) {
        return userInfo.roles.points.some(item => item === key)
      }
      return false
    }
  }
}
