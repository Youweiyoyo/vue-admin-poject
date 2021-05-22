import request from '@/utils/request'

/**
 * 读取角色列表
 */
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}
/**
 * 读取公司信息
 */
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
/**
 * 删除信息
 */
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
/**
 * 编辑
 */
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}
/**
 * 获取角色详情
 */
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
/**
 * 新增角色
 */
export function addRole(data) {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  })
}
