import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useRef, useMemo, useState } from 'react'
import { fetchWeather, getWeatherCategory } from '../api'
import { QUERY_CONFIG, ERROR_MESSAGES } from '../constants'
import type { WeatherData, WeatherCategory, WeatherError } from '../types'

export const weatherQueryKeys = {
  all: ['weather'] as const,
  city: (city: string) => [...weatherQueryKeys.all, city.toLowerCase().trim()] as const,
}

interface UseWeatherOptions {
  enabled?: boolean
  onSuccess?: (data: WeatherData) => void
  onError?: (error: WeatherError) => void
}

interface UseWeatherReturn {
  weather: WeatherData | null
  isLoading: boolean
  isFetching: boolean
  error: WeatherError | null
  errorMessage: string | null
  category: WeatherCategory
  search: (city: string) => void
  cancelRequest: () => void
  refetch: () => void
  clearWeather: () => void
}

export function useWeather(options: UseWeatherOptions = {}): UseWeatherReturn {
  const { enabled = true, onSuccess, onError } = options

  const [currentCity, setCurrentCity] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const queryClient = useQueryClient()

  const {
    data: weather,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: weatherQueryKeys.city(currentCity ?? ''),
    queryFn: async ({ signal }) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      abortControllerRef.current = new AbortController()

      const combinedSignal = signal

      try {
        const data = await fetchWeather(currentCity!, combinedSignal)
        onSuccess?.(data)
        return data
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message as WeatherError : 'UNKNOWN_ERROR'
        onError?.(errorMessage)
        throw err
      }
    },
    enabled: enabled && !!currentCity,
    staleTime: QUERY_CONFIG.STALE_TIME,
    gcTime: QUERY_CONFIG.GC_TIME,
    retry: (failureCount, error) => {
      const message = error instanceof Error ? error.message : ''
      if (['CITY_NOT_FOUND', 'API_KEY_REQUIRED', 'INVALID_API_KEY', 'REQUEST_CANCELLED'].includes(message)) {
        return false
      }
      return failureCount < QUERY_CONFIG.RETRY
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

  const category = useMemo<WeatherCategory>(() => {
    if (!weather) return 'default'
    return getWeatherCategory(weather.condition)
  }, [weather])

  const weatherError = useMemo<WeatherError | null>(() => {
    if (!error) return null
    const message = error instanceof Error ? error.message : 'UNKNOWN_ERROR'
    return message as WeatherError
  }, [error])

  const errorMessage = useMemo<string | null>(() => {
    if (!weatherError) return null
    return ERROR_MESSAGES[weatherError] ?? ERROR_MESSAGES.UNKNOWN_ERROR
  }, [weatherError])

  const search = useCallback((city: string) => {
    const trimmedCity = city.trim()
    if (!trimmedCity) return

    setCurrentCity(trimmedCity)
  }, [])

  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
  }, [])

  const clearWeather = useCallback(() => {
    setCurrentCity(null)
    queryClient.removeQueries({ queryKey: weatherQueryKeys.all })
  }, [queryClient])

  return {
    weather: weather ?? null,
    isLoading,
    isFetching,
    error: weatherError,
    errorMessage,
    category,
    search,
    cancelRequest,
    refetch,
    clearWeather,
  }
}

export default useWeather
