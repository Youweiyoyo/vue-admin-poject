import request from '@/utils/request'

/**
 * 封装登录请求模块
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
/**
 * 根据用户id，获取用户详情
 */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function logout() {}
