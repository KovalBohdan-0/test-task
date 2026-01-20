import { memo } from 'react'
import { useThemeStyles } from '../../context'

interface EmptyStateProps {
    title?: string
    description?: string
    icon?: string
}

function EmptyStateComponent({
    title,
    description = 'Введіть назву міста, щоб побачити прогноз погоди',
    icon,
}: EmptyStateProps) {
    const { textColor, subTextColor, isSnowy } = useThemeStyles()

    const defaultIcon = isSnowy ? '❄️' : '🌤️'

    return (
        <div className="text-center p-10">
            <div className="text-7xl mb-6">{icon ?? defaultIcon}</div>
            {title && <h3 className={`text-xl font-semibold ${textColor} mb-2`}>{title}</h3>}
            <p className={`${subTextColor} max-w-xs mx-auto`}>{description}</p>
        </div>
    )
}

export const EmptyState = memo(EmptyStateComponent)

EmptyState.displayName = 'EmptyState'

export default EmptyState
