export interface WeatherData {
  city: string
  country: string
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  description: string
  icon: string
  condition: string
  fromCache: boolean
}

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
const CACHE_DURATION = 10 * 60 * 1000

export const getApiKey = (): string => {
  return import.meta.env.VITE_OPENWEATHER_API_KEY
}

const normalizeCityName = (city: string): string => {
  return city.toLowerCase().trim().replace(/\s+/g, '_')
}

const getCachedWeather = (city: string): WeatherData | null => {
  const cacheKey = `weather_cache_${normalizeCityName(city)}`
  const cached = localStorage.getItem(cacheKey)

  if (!cached) return null

  try {
    const { data, timestamp } = JSON.parse(cached)
    const now = Date.now()

    if (now - timestamp < CACHE_DURATION) {
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
  const cacheKey = `weather_cache_${normalizeCityName(city)}`
  const cacheData = {
    data,
    timestamp: Date.now()
  }
  localStorage.setItem(cacheKey, JSON.stringify(cacheData))
}

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const apiKey = getApiKey()

  if (!apiKey) {
    throw new Error('API_KEY_REQUIRED')
  }

  const cachedData = getCachedWeather(city)
  if (cachedData) {
    return cachedData
  }

  const url = `${API_BASE_URL}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=uk`
  const response = await fetch(url)

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('INVALID_API_KEY')
    }
    if (response.status === 404) {
      throw new Error('CITY_NOT_FOUND')
    }
    throw new Error('API_ERROR')
  }

  const data = await response.json()

  const weatherData: WeatherData = {
    city: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    condition: data.weather[0].main.toLowerCase(),
    fromCache: false
  }

  setCachedWeather(city, weatherData)

  return weatherData
}

export const getWeatherCategory = (condition: string): string => {
  const sunny = ['clear']
  const cloudy = ['clouds', 'mist', 'fog', 'haze', 'smoke', 'dust', 'sand', 'ash']
  const rainy = ['rain', 'drizzle', 'thunderstorm', 'squall']
  const snowy = ['snow']

  if (sunny.includes(condition)) return 'sunny'
  if (rainy.includes(condition)) return 'rainy'
  if (snowy.includes(condition)) return 'snowy'
  if (cloudy.includes(condition)) return 'cloudy'

  return 'default'
}
