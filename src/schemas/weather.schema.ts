import { z } from 'zod'

export const CoordinatesSchema = z.object({
  lon: z.number(),
  lat: z.number(),
})

export const WeatherInfoSchema = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
})

export const MainWeatherSchema = z.object({
  temp: z.number(),
  feels_like: z.number(),
  temp_min: z.number(),
  temp_max: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  sea_level: z.number().optional(),
  grnd_level: z.number().optional(),
})

export const WindSchema = z.object({
  speed: z.number(),
  deg: z.number(),
  gust: z.number().optional(),
})

export const CloudsSchema = z.object({
  all: z.number(),
})

export const SysSchema = z.object({
  type: z.number().optional(),
  id: z.number().optional(),
  country: z.string(),
  sunrise: z.number(),
  sunset: z.number(),
})

export const WeatherApiResponseSchema = z.object({
  coord: CoordinatesSchema,
  weather: z.array(WeatherInfoSchema).min(1),
  base: z.string(),
  main: MainWeatherSchema,
  visibility: z.number(),
  wind: WindSchema,
  clouds: CloudsSchema,
  dt: z.number(),
  sys: SysSchema,
  timezone: z.number(),
  id: z.number(),
  name: z.string(),
  cod: z.number(),
})

export type ValidatedWeatherApiResponse = z.infer<typeof WeatherApiResponseSchema>

export const validateWeatherResponse = (data: unknown): ValidatedWeatherApiResponse => {
  return WeatherApiResponseSchema.parse(data)
}

export const safeValidateWeatherResponse = (data: unknown) => {
  return WeatherApiResponseSchema.safeParse(data)
}
