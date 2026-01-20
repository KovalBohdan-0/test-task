import { memo } from 'react'
import { useThemeStyles } from '../../context'

interface LoadingStateProps {
    message?: string
}

function LoadingStateComponent({ message = 'Завантаження...' }: LoadingStateProps) {
    const { textColor, isSnowy } = useThemeStyles()

    return (
        <div className="text-center p-10">
            <div className="relative inline-block">
                <div
                    className={`w-16 h-16 rounded-full border-4 ${isSnowy ? 'border-slate-300' : 'border-white/20'
                        }`}
                />
                <div
                    className={`absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent ${isSnowy ? 'border-t-slate-700' : 'border-t-white'
                        } animate-spin`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl animate-pulse">☁️</span>
                </div>
            </div>
            <p className={`mt-6 ${textColor} font-medium`}>{message}</p>
        </div>
    )
}

export const LoadingState = memo(LoadingStateComponent)

LoadingState.displayName = 'LoadingState'

export default LoadingState
