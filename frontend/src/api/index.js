import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import _isEmpty from 'lodash/isEmpty'

import { getAccessToken, removeAccessToken, setAccessToken } from '../utils/accessToken'
import { getRefreshToken, removeRefreshToken } from '../utils/refreshToken'

const baseURL = process.env.REACT_APP_API_URL

const api = axios.create({
  baseURL,
})

const refreshAuthLogic = (failedRequest) =>
  axios
    .post(`${baseURL}/auth/refresh-token`, null, {
      headers: {
        Authorization: `Bearer ${getRefreshToken()}`,
      },
    })
    .then((tokenRefreshResponse) => {
      const { accessToken } = tokenRefreshResponse.data
      setAccessToken(accessToken)
      failedRequest.response.config.headers.Authorization = `Bearer ${accessToken}`
      return Promise.resolve()
    })
    .catch((error) => {
      return Promise.reject(error)
    })

createAuthRefreshInterceptor(api, refreshAuthLogic, {
  statusCodes: [401, 403],
})

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const authMe = () =>
  api
    .get('user/me')
    .then((response) => response.data)
    .catch((error) => {
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const logoutApi = (refreshToken) =>
  axios
    .post(`${baseURL}/auth/logout`, null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .then((response) => {
      removeAccessToken()
      removeRefreshToken()
      return response.data
    })
    .catch((error) => {
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const refreshToken = () =>
  api
    .post('auth/refresh-token')
    .then((response) => response.data)
    .catch((error) => {
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const login = (credentials) =>
  api
    .post('auth/login', credentials)
    .then((response) => response.data)
    .catch((error) => {
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const register = (credentials) =>
  api
    .post('auth/register', credentials)
    .then((response) => response.data)
    .catch((error) => {
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const getShopFish = () =>
  api
    .get('v1/shop/fish')
    .then((response) => response.data)
    .catch((error) => {
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const getShopConsumables = () =>
  api
    .get('v1/shop/consumables')
    .then((response) => response.data)
    .catch((error) => {
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const buyConsumable = (consumableId) =>
  api
    .post('v1/shop/consumables', {
      consumableId,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const buyFish = (fishId) =>
  api
    .post('v1/shop/fish', {
      fishId,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const sellFish = (fishId) =>
  api
    .delete(`v1/shop/fish/${fishId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const getAquariumStats = () =>
  api
    .get('v1/shop/aquarium-stats')
    .then((response) => response.data)
    .catch((error) => {
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })
