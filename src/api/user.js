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

export function getInfo(token) {}

export function logout() {}
