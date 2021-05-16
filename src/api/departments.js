import request from '@/utils/request'

/**
 * 获取组织架构数据的接口
 */
export function getOrganization() {
  return request({
    url: '/company/department'
  })
}

/**
 * 删除组织架构接口
 */
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

/**
 * 新增部门的接口
 */
export function addDepartments(data) {
  return request({
    method: 'post',
    data, // axios 的 body 参数
    url: '/company/department'
  })
}
