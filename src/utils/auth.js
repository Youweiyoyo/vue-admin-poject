import Cookies from 'js-cookie'

const TokenKey = 'iHRM_token'
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
