import request from '@/utils/request'

/**
 * 获取组织架构数据
 */
export function getOrganization() {
  return request({
    url: '/company/department'
  })
}

/**
 * 删除组织架构
 */
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

/**
 * 新增部门
 */
export function addDepartments(data) {
  return request({
    method: 'post',
    data, // axios 的 body 参数
    url: '/company/department'
  })
}
/**
 * 获取部门详情
 */
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}
/**
 * 编辑保存
 */
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
