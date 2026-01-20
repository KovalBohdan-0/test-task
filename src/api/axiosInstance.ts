import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { API_CONFIG } from '../constants'

export const weatherApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

weatherApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

    if (!apiKey) {
      return Promise.reject(new Error('API_KEY_REQUIRED'))
    }

    config.params = {
      ...config.params,
      appid: apiKey,
      units: 'metric',
      lang: 'uk',
    }

    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`)
    }

    return config
  },
  (error: AxiosError) => {
    if (import.meta.env.DEV) {
      console.error('[API Request Error]', error.message)
    }
    return Promise.reject(error)
  }
)

weatherApi.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.config.url} - ${response.status}`)
    }
    return response
  },
  (error: AxiosError) => {
    if (import.meta.env.DEV) {
      console.error('[API Response Error]', error.message)
    }

    if (axios.isCancel(error)) {
      return Promise.reject(new Error('REQUEST_CANCELLED'))
    }

    if (error.response) {
      const status = error.response.status

      if (status === 401) {
        return Promise.reject(new Error('INVALID_API_KEY'))
      }
      if (status === 404) {
        return Promise.reject(new Error('CITY_NOT_FOUND'))
      }
    }

    if (error.code === 'ERR_NETWORK' || !error.response) {
      return Promise.reject(new Error('NETWORK_ERROR'))
    }

    return Promise.reject(new Error('UNKNOWN_ERROR'))
  }
)

export default weatherApi
