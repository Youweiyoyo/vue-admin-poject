import Cookies from 'js-cookie'

const TokenKey = 'iHRM_token'
const TimeKey = 'iHRM_time'
/**
 * 拿取token
 */
export function getToken() {
  return Cookies.get(TokenKey)
}
/**
 * 存入token
 */
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
/**
 * 删除token
 */
export function removeToken() {
  return Cookies.remove(TokenKey)
}
/**
 * 获取时间戳
 */
export function getTimeStamp() {
  return Cookies.get(TimeKey)
}
/**
 * 设置时间戳
 */
export function setTimeStamp() {
  return Cookies.set(TimeKey, Date.now())
}
