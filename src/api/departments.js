import request from '@/utils/request'

/**
 * 获取组织架构数据的接口
 */
export function getOrganization() {
  return request({
    url: '/company/department'
  })
}
