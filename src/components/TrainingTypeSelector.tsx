import { useNavigate } from 'react-router-dom'
import { TRAINING_TYPES, trainingDescriptions } from '../constants'

const TrainingTypeSelector = () => {
  const navigate = useNavigate()

  const handleSelect = (type: string) => {
    navigate(`/train/${type.toLowerCase()}`)
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full px-4">
        {TRAINING_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => handleSelect(type)}
            className="flex flex-col items-center gap-3 p-6  text-white rounded-lg hover:bg-[#4ade80] active:scale-95 transition-all duration-200 min-h-30 sm:min-h-35 touch-manipulation shadow-lg shadow-green-900/40"
          >
            <span className="text-lg sm:text-xl font-bold">{type}</span>
            <p className="text-xs sm:text-sm text-white/90 text-center leading-relaxed">
              {trainingDescriptions[type]}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TrainingTypeSelector
