import { useState, memo, FormEvent } from 'react'
import { useThemeStyles } from '../context'

interface SearchBarProps {
    onSearch: (city: string) => void
    isLoading: boolean
}

function SearchBarComponent({ onSearch, isLoading }: SearchBarProps) {
    const [city, setCity] = useState('')
    const { textColor, placeholderColor, iconColor, buttonBg, isSnowy } = useThemeStyles()

    const bgClass = isSnowy ? 'bg-white/40 focus:bg-white/60' : 'bg-white/15 focus:bg-white/25'

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const trimmedCity = city.trim()
        if (trimmedCity) {
            onSearch(trimmedCity)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value)
    }

    return (
        <form className="flex gap-3 w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex-1 relative flex items-center">
                <svg
                    className={`absolute left-4 w-5 h-5 pointer-events-none ${iconColor}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                </svg>

                <input
                    type="text"
                    value={city}
                    onChange={handleInputChange}
                    placeholder="Введіть назву міста..."
                    disabled={isLoading}
                    aria-label="Назва міста"
                    className={`
            w-full py-4 pl-12 pr-4 border-none rounded-2xl backdrop-blur-lg
            ${textColor} text-base transition-all duration-300
            ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-white/30
            disabled:opacity-70 disabled:cursor-not-allowed ${bgClass}
          `}
                />
            </div>

            <button
                type="submit"
                disabled={isLoading || !city.trim()}
                aria-label={isLoading ? 'Завантаження...' : 'Пошук'}
                className={`
          py-4 px-8 border-none rounded-2xl backdrop-blur-lg
          ${textColor} text-base font-semibold cursor-pointer
          transition-all duration-300 flex items-center justify-center min-w-[100px]
          hover:-translate-y-0.5 active:translate-y-0
          disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
          ${buttonBg}
        `}
            >
                {isLoading ? (
                    <span
                        className={`w-5 h-5 border-2 ${isSnowy ? 'border-slate-400 border-t-slate-700' : 'border-white/30 border-t-white'
                            } rounded-full animate-spin`}
                        aria-hidden="true"
                    />
                ) : (
                    'Пошук'
                )}
            </button>
        </form>
    )
}

export const SearchBar = memo(SearchBarComponent)

SearchBar.displayName = 'SearchBar'

export default SearchBar
