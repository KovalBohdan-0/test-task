import { weatherApi } from './axiosInstance'
import { validateWeatherResponse } from '../schemas'
import { WEATHER_CONDITION_MAP, CACHE_CONFIG } from '../constants'
import type { WeatherData, WeatherCategory, CachedWeatherData, WeatherCondition } from '../types'

const normalizeCityName = (city: string): string => {
  return city.toLowerCase().trim().replace(/\s+/g, '_')
}

const getCachedWeather = (city: string): WeatherData | null => {
  const cacheKey = `${CACHE_CONFIG.KEY_PREFIX}${normalizeCityName(city)}`
  const cached = localStorage.getItem(cacheKey)

  if (!cached) return null

  try {
    const { data, timestamp }: CachedWeatherData = JSON.parse(cached)
    const now = Date.now()

    if (now - timestamp < CACHE_CONFIG.DURATION_MS) {
      return { ...data, fromCache: true }
    }

    localStorage.removeItem(cacheKey)
    return null
  } catch {
    localStorage.removeItem(cacheKey)
    return null
  }
}

const setCachedWeather = (city: string, data: WeatherData): void => {
  const cacheKey = `${CACHE_CONFIG.KEY_PREFIX}${normalizeCityName(city)}`
  const cacheData: CachedWeatherData = {
    data,
    timestamp: Date.now(),
  }
  localStorage.setItem(cacheKey, JSON.stringify(cacheData))
}

export const getWeatherCategory = (condition: string): WeatherCategory => {
  const normalizedCondition = condition.toLowerCase()
  return WEATHER_CONDITION_MAP[normalizedCondition] ?? 'default'
}

export const fetchWeather = async (
  city: string, 
  signal?: AbortSignal
): Promise<WeatherData> => {
  const cachedData = getCachedWeather(city)
  if (cachedData) {
    return cachedData
  }

  const response = await weatherApi.get('/weather', {
    params: { q: city },
    signal,
  })

  const validatedData = validateWeatherResponse(response.data)

  const weatherData: WeatherData = {
    city: validatedData.name,
    country: validatedData.sys.country,
    temperature: Math.round(validatedData.main.temp),
    feelsLike: Math.round(validatedData.main.feels_like),
    humidity: validatedData.main.humidity,
    windSpeed: validatedData.wind.speed,
    description: validatedData.weather[0].description,
    icon: validatedData.weather[0].icon,
    condition: validatedData.weather[0].main.toLowerCase() as WeatherCondition,
    fromCache: false,
  }

  setCachedWeather(city, weatherData)

  return weatherData
}

export default { fetchWeather, getWeatherCategory }
