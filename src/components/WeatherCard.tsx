import { memo } from 'react'
import { useThemeStyles } from '../context'
import { getWeatherIconUrl } from '../constants'
import type { WeatherData } from '../types'

interface WeatherCardProps {
    weather: WeatherData
}

function WeatherCardComponent({ weather }: WeatherCardProps) {
    const {
        textColor,
        subTextColor,
        iconColor,
        bgClass,
        dividerColor,
        badgeBg,
        detailIconBg,
    } = useThemeStyles()

    const iconUrl = getWeatherIconUrl(weather.icon)

    return (
        <div
            className={`relative ${bgClass} backdrop-blur-xl rounded-[32px] p-8 w-full max-w-md shadow-lg border`}
        >
            {weather.fromCache && (
                <div
                    className={`absolute top-4 right-4 flex items-center gap-1.5 py-1.5 px-3 ${badgeBg} rounded-full text-xs`}
                >
                    <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                    >
                        <path d="M12 8v4l3 3" />
                        <circle cx="12" cy="12" r="10" />
                    </svg>
                    З кешу
                </div>
            )}

            <header className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                    <h2 className={`text-3xl font-bold ${textColor} drop-shadow-sm`}>
                        {weather.city}
                    </h2>
                    <span className={`text-base ${subTextColor} mt-1`}>{weather.country}</span>
                </div>
                <img
                    src={iconUrl}
                    alt={weather.description}
                    className="w-24 h-24 -mt-5 -mr-5 drop-shadow-md"
                    loading="lazy"
                />
            </header>

            <div className="flex flex-col items-center my-6 text-center">
                <span className={`text-8xl font-extralight ${textColor} leading-none drop-shadow-md`}>
                    {weather.temperature}°
                </span>
                <span className={`text-xl ${textColor} capitalize mt-2`}>
                    {weather.description}
                </span>
                <span className={`text-sm ${subTextColor} mt-2`}>
                    Відчувається як {weather.feelsLike}°
                </span>
            </div>

            <footer className={`flex justify-around pt-6 border-t ${dividerColor}`}>
                <WeatherDetail
                    icon={
                        <svg className={`w-5 h-5 ${iconColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                        </svg>
                    }
                    value={`${weather.humidity}%`}
                    label="Вологість"
                    textColor={textColor}
                    subTextColor={subTextColor}
                    detailIconBg={detailIconBg}
                />

                <WeatherDetail
                    icon={
                        <svg className={`w-5 h-5 ${iconColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
                        </svg>
                    }
                    value={`${weather.windSpeed} м/с`}
                    label="Вітер"
                    textColor={textColor}
                    subTextColor={subTextColor}
                    detailIconBg={detailIconBg}
                />
            </footer>
        </div>
    )
}

interface WeatherDetailProps {
    icon: React.ReactNode
    value: string
    label: string
    textColor: string
    subTextColor: string
    detailIconBg: string
}

const WeatherDetail = memo(function WeatherDetail({
    icon,
    value,
    label,
    textColor,
    subTextColor,
    detailIconBg,
}: WeatherDetailProps) {
    return (
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 flex items-center justify-center ${detailIconBg} rounded-xl`}>
                {icon}
            </div>
            <div className="flex flex-col">
                <span className={`text-lg font-semibold ${textColor}`}>{value}</span>
                <span className={`text-xs ${subTextColor}`}>{label}</span>
            </div>
        </div>
    )
})

export const WeatherCard = memo(WeatherCardComponent)

WeatherCard.displayName = 'WeatherCard'

export default WeatherCard
