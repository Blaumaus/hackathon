import _isEmpty from 'lodash/isEmpty'
import { TOKEN } from '../constants'
import { getCookie, setCookie, deleteCookie } from './cookie'

const STORE_AUTH_TOKEN_FOR = 8467200

export const getAccessToken = () => {
  let accessToken = getCookie(TOKEN)

  if (_isEmpty(accessToken)) {
    accessToken = sessionStorage.getItem(TOKEN)
  }

  return accessToken
}

export const setAccessToken = (token, temporary = false) => {
  if (temporary) {
    sessionStorage.setItem(TOKEN, token)
    return
  }

  setCookie(TOKEN, token, STORE_AUTH_TOKEN_FOR)
}

export const removeAccessToken = () => {
  deleteCookie(TOKEN)
  sessionStorage.removeItem(TOKEN)
}
