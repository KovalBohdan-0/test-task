import { SearchBar, WeatherCard, EmptyState, ErrorState, LoadingState } from './components'
import { ThemeProvider } from './context'
import { useWeather } from './hooks'
import { BACKGROUND_GRADIENTS } from './constants'
import './index.css'

function App() {
    const {
        weather,
        isLoading,
        isFetching,
        errorMessage,
        category,
        search,
        refetch,
    } = useWeather()



    const showLoading = isLoading || isFetching
    const showError = !!errorMessage && !showLoading
    const showWeather = !!weather && !showLoading && !showError
    const showEmpty = !weather && !showLoading && !showError

    const backgroundClass = BACKGROUND_GRADIENTS[category]

    return (
        <ThemeProvider category={category}>
            <div
                className={`min-h-screen flex items-center justify-center p-10 relative overflow-hidden transition-all duration-1000 ${backgroundClass}`}
            >
                <main className="flex flex-col items-center gap-8 w-full max-w-lg relative z-10">
                    <Header category={category} />

                    <SearchBar onSearch={search} isLoading={showLoading} />

                    {showError && (
                        <ErrorState
                            message={errorMessage!}
                            onRetry={refetch}
                            showRetry={true}
                        />
                    )}

                    {showLoading && <LoadingState message="Шукаємо погоду..." />}

                    {showWeather && <WeatherCard weather={weather!} />}

                    {showEmpty && <EmptyState />}
                </main>
            </div>
        </ThemeProvider>
    )
}

import { memo } from 'react'
import type { WeatherCategory } from './types'

interface HeaderProps {
    category: WeatherCategory
}

const Header = memo(function Header({ category }: HeaderProps) {
    const isSnowy = category === 'snowy'
    const textColor = isSnowy ? 'text-slate-800' : 'text-white'
    const subTextColor = isSnowy ? 'text-slate-600' : 'text-white/80'

    return (
        <header className="text-center">
            <h1
                className={`text-4xl font-bold flex items-center justify-center gap-3 drop-shadow-lg ${textColor}`}
            >
                <span className="text-5xl" aria-hidden="true">
                    ☁️
                </span>
                Прогноз Погоди
            </h1>
            <p className={`mt-2 ${subTextColor}`}>
                Дізнайтесь погоду у вашому місті
            </p>
        </header>
    )
})

export default App