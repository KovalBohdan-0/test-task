import { memo, useCallback } from 'react'

interface ErrorStateProps {
    message: string
    onRetry?: () => void
    showRetry?: boolean
}

function ErrorStateComponent({ message, onRetry, showRetry = true }: ErrorStateProps) {
    const handleRetry = useCallback(() => {
        onRetry?.()
    }, [onRetry])

    return (
        <div className="flex flex-col items-center gap-4 py-4 px-6 bg-red-500/20 backdrop-blur-lg border border-red-500/30 rounded-2xl text-white">
            <div className="flex items-center gap-3">
                <svg
                    className="w-5 h-5 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span className="text-sm">{message}</span>
            </div>

            {showRetry && onRetry && (
                <button
                    onClick={handleRetry}
                    className="px-4 py-2 text-xs font-medium bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
                >
                    Спробувати знову
                </button>
            )}
        </div>
    )
}

export const ErrorState = memo(ErrorStateComponent)

ErrorState.displayName = 'ErrorState'

export default ErrorState
