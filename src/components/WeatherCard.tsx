import { WeatherData } from '../services/weatherService'

interface WeatherCardProps {
    weather: WeatherData
    isSnowy: boolean
}

function WeatherCard({ weather, isSnowy }: WeatherCardProps) {
    const getWeatherIcon = (iconCode: string) => {
        return `https://openweathermap.org/img/wn/${iconCode}@4x.png`
    }

    const textColor = isSnowy ? 'text-slate-800' : 'text-white'
    const subTextColor = isSnowy ? 'text-slate-600' : 'text-white/70'
    const iconColor = isSnowy ? 'text-slate-700' : 'text-white'
    const bgClass = isSnowy ? 'bg-white/40 border-white/40' : 'bg-white/15 border-white/20'
    const dividerColor = isSnowy ? 'border-slate-300' : 'border-white/15'
    const badgeBg = isSnowy ? 'bg-white/60 text-slate-700' : 'bg-white/20 text-white/80'
    const detailIconBg = isSnowy ? 'bg-white/50' : 'bg-white/15'

    return (
        <div className={`relative ${bgClass} backdrop-blur-xl rounded-[32px] p-8 w-full max-w-md shadow-lg border`}>
            {weather.fromCache && (
                <div className={`absolute top-4 right-4 flex items-center gap-1.5 py-1.5 px-3 ${badgeBg} rounded-full text-xs`}>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 8v4l3 3" />
                        <circle cx="12" cy="12" r="10" />
                    </svg>
                    З кешу
                </div>
            )}

            <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                    <h2 className={`text-3xl font-bold ${textColor} drop-shadow-sm`}>{weather.city}</h2>
                    <span className={`text-base ${subTextColor} mt-1`}>{weather.country}</span>
                </div>
                <img
                    src={getWeatherIcon(weather.icon)}
                    alt={weather.description}
                    className="w-24 h-24 -mt-5 -mr-5 drop-shadow-md"
                />
            </div>

            <div className="flex flex-col items-center my-6 text-center">
                <span className={`text-8xl font-extralight ${textColor} leading-none drop-shadow-md`}>
                    {weather.temperature}°
                </span>
                <span className={`text-xl ${textColor} capitalize mt-2`}>{weather.description}</span>
                <span className={`text-sm ${subTextColor} mt-2`}>Відчувається як {weather.feelsLike}°</span>
            </div>

            <div className={`flex justify-around pt-6 border-t ${dividerColor}`}>
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 flex items-center justify-center ${detailIconBg} rounded-xl`}>
                        <svg className={`w-5 h-5 ${iconColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className={`text-lg font-semibold ${textColor}`}>{weather.humidity}%</span>
                        <span className={`text-xs ${subTextColor}`}>Вологість</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 flex items-center justify-center ${detailIconBg} rounded-xl`}>
                        <svg className={`w-5 h-5 ${iconColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className={`text-lg font-semibold ${textColor}`}>{weather.windSpeed} м/с</span>
                        <span className={`text-xs ${subTextColor}`}>Вітер</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherCard
