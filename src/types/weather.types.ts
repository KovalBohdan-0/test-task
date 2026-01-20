export interface WeatherData {
  city: string
  country: string
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  description: string
  icon: string
  condition: WeatherCondition
  fromCache: boolean
}

export type WeatherCondition = 'clear' | 'clouds' | 'mist' | 'fog' | 'haze' | 'smoke' | 'dust' | 'sand' | 'ash' | 'rain' | 'drizzle' | 'thunderstorm' | 'squall' | 'snow' | 'tornado'

export type WeatherCategory = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'default'

export interface WeatherState {
  data: WeatherData | null
  isLoading: boolean
  error: WeatherError | null
  category: WeatherCategory
}

export type WeatherError = 
  | 'API_KEY_REQUIRED'
  | 'INVALID_API_KEY'
  | 'CITY_NOT_FOUND'
  | 'REQUEST_CANCELLED'
  | 'NETWORK_ERROR'
  | 'VALIDATION_ERROR'
  | 'UNKNOWN_ERROR'

export interface WeatherApiResponse {
  coord: {
    lon: number
    lat: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level?: number
    grnd_level?: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
    gust?: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type?: number
    id?: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

export interface CachedWeatherData {
  data: WeatherData
  timestamp: number
}
