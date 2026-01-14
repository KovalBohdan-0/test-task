import { useState, FormEvent } from 'react'

interface SearchBarProps {
    onSearch: (city: string) => void
    isLoading: boolean
    isSnowy: boolean
}

function SearchBar({ onSearch, isLoading, isSnowy }: SearchBarProps) {
    const [city, setCity] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (city.trim()) {
            onSearch(city.trim())
        }
    }

    const textColor = isSnowy ? 'text-slate-700' : 'text-white'
    const placeholderColor = isSnowy ? 'placeholder:text-slate-500' : 'placeholder:text-white/60'
    const iconColor = isSnowy ? 'text-slate-500' : 'text-white/60'
    const bgClass = isSnowy ? 'bg-white/40 focus:bg-white/60' : 'bg-white/15 focus:bg-white/25'
    const buttonBg = isSnowy ? 'bg-white/50 hover:bg-white/70' : 'bg-white/25 hover:bg-white/35'

    return (
        <form className="flex gap-3 w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex-1 relative flex items-center">
                <svg
                    className={`absolute left-4 w-5 h-5 pointer-events-none ${iconColor}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Введіть назву міста..."
                    disabled={isLoading}
                    className={`w-full py-4 pl-12 pr-4 border-none rounded-2xl backdrop-blur-lg ${textColor} text-base transition-all duration-300 ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-70 disabled:cursor-not-allowed ${bgClass}`}
                />
            </div>
            <button
                type="submit"
                disabled={isLoading || !city.trim()}
                className={`py-4 px-8 border-none rounded-2xl backdrop-blur-lg ${textColor} text-base font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center min-w-[100px] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${buttonBg}`}
            >
                {isLoading ? (
                    <span className={`w-5 h-5 border-2 ${isSnowy ? 'border-slate-400 border-t-slate-700' : 'border-white/30 border-t-white'} rounded-full animate-spin`} />
                ) : (
                    'Пошук'
                )}
            </button>
        </form>
    )
}

export default SearchBar
