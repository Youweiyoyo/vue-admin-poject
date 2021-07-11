const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // 建立访问token的快捷方式
  avatar: state => state.user.avatar,
  name: state => state.user.userInfo.username, // 建立用户名称的映射
  userId: state => state.user.userInfo.userId, // 建立获取用户id的映射
  staffPhoto: state => state.user.userInfo.staffPhoto, // 建立头像的映射
  companyId: state => state.user.userInfo.companyId, // 建立companyId映射
  routes: state => state.permission.routes // 建立 routes路由规则的映射
}
export default getters
