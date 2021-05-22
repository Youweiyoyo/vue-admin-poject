import request from '@/utils/request'

/**
 * 读取角色列表
 */
export function getRoleList(params) {
  request({
    url: '/sys/role',
    params
  })
}
