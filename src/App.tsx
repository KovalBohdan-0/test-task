import { useState } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import { fetchWeather, getWeatherCategory, WeatherData } from './services/weatherService'
import './index.css'

const backgroundClasses: Record<string, string> = {
    default: 'bg-gradient-to-br from-sky-400 via-blue-500 to-blue-700',
    sunny: 'bg-gradient-to-br from-amber-300 via-orange-400 to-rose-500',
    cloudy: 'bg-gradient-to-br from-slate-400 via-slate-500 to-slate-700',
    rainy: 'bg-gradient-to-br from-slate-700 via-blue-600 to-slate-800',
    snowy: 'bg-gradient-to-br from-slate-100 via-blue-200 to-blue-300'
}

function App() {
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [weatherCategory, setWeatherCategory] = useState('default')

    const handleSearch = async (city: string) => {
        setError(null)
        setIsLoading(true)

        try {
            const data = await fetchWeather(city)
            setWeather(data)
            setWeatherCategory(getWeatherCategory(data.condition))
        } catch (err) {
            const message = err instanceof Error ? err.message : 'UNKNOWN'
            if (message === 'API_KEY_REQUIRED') {
                setError('API ключ не налаштований. Перевірте файл .env')
            } else if (message === 'INVALID_API_KEY') {
                setError('Невірний API ключ. Перевірте файл .env')
            } else if (message === 'CITY_NOT_FOUND') {
                setError('Місто не знайдено. Перевірте назву та спробуйте знову.')
            } else {
                setError('Помилка при отриманні даних. Спробуйте пізніше.')
            }
            setWeather(null)
        } finally {
            setIsLoading(false)
        }
    }

    const isSnowy = weatherCategory === 'snowy'

    return (
        <div className={`min-h-screen flex items-center justify-center p-10 relative overflow-hidden transition-all duration-1000 ${backgroundClasses[weatherCategory]}`}>
            <main className="flex flex-col items-center gap-8 w-full max-w-lg relative z-10">
                <header className="text-center">
                    <h1 className={`text-4xl font-bold flex items-center justify-center gap-3 drop-shadow-lg ${isSnowy ? 'text-slate-800' : 'text-white'}`}>
                        <span className="text-5xl">☁️</span>
                        Прогноз Погоди
                    </h1>
                    <p className={`mt-2 ${isSnowy ? 'text-slate-600' : 'text-white/80'}`}>
                        Дізнайтесь погоду у вашому місті
                    </p>
                </header>

                <SearchBar onSearch={handleSearch} isLoading={isLoading} isSnowy={isSnowy} />

                {error && (
                    <div className="flex items-center gap-3 py-4 px-6 bg-red-500/20 backdrop-blur-lg border border-red-500/30 rounded-2xl text-white text-sm">
                        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {error}
                    </div>
                )}

                {weather && <WeatherCard weather={weather} isSnowy={isSnowy} />}

                {!weather && !error && !isLoading && (
                    <div className="text-center p-10">
                        <div className="text-6xl mb-4">{isSnowy ? '❄️' : '🌤️'}</div>
                        <p className={isSnowy ? 'text-slate-600' : 'text-white/70'}>
                            Введіть назву міста, щоб побачити прогноз погоди
                        </p>
                    </div>
                )}
            </main>
        </div>
    )
}

export default App