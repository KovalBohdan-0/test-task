import type { WeatherCategory } from '../types'

export const API_CONFIG = {
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const

export const CACHE_CONFIG = {
  DURATION_MS: 10 * 60 * 1000,
  KEY_PREFIX: 'weather_cache_',
} as const

export const QUERY_CONFIG = {
  STALE_TIME: 5 * 60 * 1000,
  GC_TIME: 10 * 60 * 1000,
  RETRY: 2,
} as const

export const WEATHER_CONDITION_MAP: Record<string, WeatherCategory> = {
  clear: 'sunny',
  clouds: 'cloudy',
  mist: 'cloudy',
  fog: 'cloudy',
  haze: 'cloudy',
  smoke: 'cloudy',
  dust: 'cloudy',
  sand: 'cloudy',
  ash: 'cloudy',
  rain: 'rainy',
  drizzle: 'rainy',
  thunderstorm: 'rainy',
  squall: 'rainy',
  snow: 'snowy',
  tornado: 'rainy',
} as const

export const BACKGROUND_GRADIENTS: Record<WeatherCategory, string> = {
  default: 'bg-gradient-to-br from-sky-400 via-blue-500 to-blue-700',
  sunny: 'bg-gradient-to-br from-amber-300 via-orange-400 to-rose-500',
  cloudy: 'bg-gradient-to-br from-slate-400 via-slate-500 to-slate-700',
  rainy: 'bg-gradient-to-br from-slate-700 via-blue-600 to-slate-800',
  snowy: 'bg-gradient-to-br from-slate-100 via-blue-200 to-blue-300',
} as const

export const ERROR_MESSAGES = {
  API_KEY_REQUIRED: 'API ключ не налаштований. Перевірте файл .env',
  INVALID_API_KEY: 'Невірний API ключ. Перевірте файл .env',
  CITY_NOT_FOUND: 'Місто не знайдено. Перевірте назву та спробуйте знову.',
  REQUEST_CANCELLED: 'Запит було скасовано.',
  NETWORK_ERROR: 'Помилка мережі. Перевірте підключення до інтернету.',
  VALIDATION_ERROR: 'Помилка обробки даних від сервера.',
  UNKNOWN_ERROR: 'Помилка при отриманні даних. Спробуйте пізніше.',
} as const

export const WEATHER_ICON_BASE_URL = 'https://openweathermap.org/img/wn'

export const getWeatherIconUrl = (iconCode: string, size: '1x' | '2x' | '4x' = '4x'): string => {
  return `${WEATHER_ICON_BASE_URL}/${iconCode}@${size}.png`
}
