const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // 建立访问token的快捷方式
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters
