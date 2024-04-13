import { isDevelopment } from 'redux/constants'

const COOKIE_DOMAIN = 'localhost'

const COOKIE_SUFFIX = isDevelopment ? '' : `; domain=${COOKIE_DOMAIN}; secure`

export const getCookie = (key) => {
  const match = document.cookie.match(new RegExp(`(^| )${key}=([^;]+)`))

  if (match) {
    return match[2]
  }

  return null
}

export const setCookie = (key, value, maxAge = 3600, sameSite = 'strict') => {
  document.cookie = `${key}=${value}; max-age=${maxAge}; path=/; SameSite=${sameSite}${COOKIE_SUFFIX}`
}

export const deleteCookie = (key) => {
  document.cookie = `${key}=; max-age=0; path=/; SameSite=strict`
  document.cookie = `${key}=; max-age=0; path=/; SameSite=strict${COOKIE_SUFFIX}`
}
