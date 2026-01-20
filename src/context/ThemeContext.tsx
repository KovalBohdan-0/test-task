import { createContext, useContext, useMemo, ReactNode, useCallback } from 'react'
import type { WeatherCategory } from '../types'
import { BACKGROUND_GRADIENTS } from '../constants'

export interface ThemeStyles {
    textColor: string
    subTextColor: string
    iconColor: string
    bgClass: string
    dividerColor: string
    badgeBg: string
    detailIconBg: string
    placeholderColor: string
    buttonBg: string
    backgroundGradient: string
    isSnowy: boolean
}

interface ThemeContextValue {
    category: WeatherCategory
    styles: ThemeStyles
    getStylesForCategory: (category: WeatherCategory) => ThemeStyles
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const generateStyles = (category: WeatherCategory): ThemeStyles => {
    const isSnowy = category === 'snowy'

    return {
        textColor: isSnowy ? 'text-slate-800' : 'text-white',
        subTextColor: isSnowy ? 'text-slate-600' : 'text-white/70',
        iconColor: isSnowy ? 'text-slate-700' : 'text-white',
        bgClass: isSnowy ? 'bg-white/40 border-white/40' : 'bg-white/15 border-white/20',
        dividerColor: isSnowy ? 'border-slate-300' : 'border-white/15',
        badgeBg: isSnowy ? 'bg-white/60 text-slate-700' : 'bg-white/20 text-white/80',
        detailIconBg: isSnowy ? 'bg-white/50' : 'bg-white/15',
        placeholderColor: isSnowy ? 'placeholder:text-slate-500' : 'placeholder:text-white/60',
        buttonBg: isSnowy ? 'bg-white/50 hover:bg-white/70' : 'bg-white/25 hover:bg-white/35',
        backgroundGradient: BACKGROUND_GRADIENTS[category],
        isSnowy,
    }
}

interface ThemeProviderProps {
    category: WeatherCategory
    children: ReactNode
}

export function ThemeProvider({ category, children }: ThemeProviderProps) {
    const styles = useMemo(() => generateStyles(category), [category])

    const getStylesForCategory = useCallback((cat: WeatherCategory): ThemeStyles => {
        return generateStyles(cat)
    }, [])

    const value = useMemo<ThemeContextValue>(
        () => ({
            category,
            styles,
            getStylesForCategory,
        }),
        [category, styles, getStylesForCategory]
    )

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }

    return context
}

export function useThemeStyles(): ThemeStyles {
    const { styles } = useTheme()
    return styles
}

export default ThemeContext
