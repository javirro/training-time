import HeaderPageTraining from '../components/HeaderPageTraining'
import { useEmom } from '../hooks/useEmom'

const EmomPage = () => {
  const {
    duration,
    currentMinute,
    timeInMinute,
    isRunning,
    handleStart,
    handlePause,
    handleReset,
    handleUpdateDuration,
  } = useEmom()

  const isComplete = currentMinute === duration && timeInMinute === 0

  return (
    <div className="flex min-h-screen flex-col items-center  gap-6 p-4 sm:p-8">
      <HeaderPageTraining />

      {!isRunning && currentMinute === 1 && timeInMinute === 60 && (
        <div className="flex flex-col gap-4 items-center">
          <label className="flex flex-col gap-2 text-center">
            <span className="text-sm sm:text-base text-[#d1d9d1]">
              Duration (minutes)
            </span>
            <input
              type="number"
              min="1"
              max="60"
              step="1"
              value={duration}
              onChange={(e) =>
                handleUpdateDuration(parseInt(e.target.value) || 1)
              }
              className="px-4 py-3 bg-[#2d342d] text-[#f0f4f0] rounded-lg text-center text-xl w-24 focus:outline-none focus:ring-2 focus:ring-[#4ade80] border border-[#384038]"
            />
          </label>
        </div>
      )}

      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        <div className="text-xl sm:text-2xl font-semibold text-[#d1d9d1]">
          Minute: <span className="text-[#4ade80]">{currentMinute}</span> /{' '}
          {duration}
        </div>

        <div className="text-7xl sm:text-8xl font-bold text-[#4ade80] tabular-nums">
          {timeInMinute}
        </div>

        {isComplete && (
          <div className="text-2xl sm:text-3xl font-bold text-[#22c55e]">
            Complete! 🎉
          </div>
        )}

        <div className="flex gap-4 flex-wrap justify-center">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="px-8 py-4 bg-[#22c55e] text-white rounded-lg hover:bg-[#4ade80] active:scale-95 transition-all text-lg font-semibold min-w-[120px] shadow-lg shadow-green-900/20"
            >
              {isComplete ? 'Restart' : 'Start'}
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="px-8 py-4 bg-[#fbbf24] text-[#1a1f1a] rounded-lg hover:bg-[#fcd34d] active:scale-95 transition-all text-lg font-semibold min-w-[120px] shadow-lg"
            >
              Pause
            </button>
          )}
          <button
            onClick={handleReset}
            className="px-8 py-4 bg-[#384038] text-[#f0f4f0] rounded-lg hover:bg-[#434d43] active:scale-95 transition-all text-lg font-semibold min-w-[120px]"
          >
            Reset
          </button>
        </div>

        {timeInMinute <= 5 && isRunning && (
          <div className="text-lg sm:text-xl text-[#fbbf24] font-semibold animate-pulse">
            Next minute starts in {timeInMinute}...
          </div>
        )}
      </div>
    </div>
  )
}

export default EmomPage
