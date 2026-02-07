import HeaderPageTraining from '../components/HeaderPageTraining'
import { useTimeKeeper } from '../hooks/useTimeKeeper'
import { formatTimeToShow } from '../lib/formatTimeToShow'

const TimekeeperPage = () => {
  const {
    time,
    isRunning,
    handleStart,
    handlePause,
    handleReset,
  } = useTimeKeeper()

  return (
    <div className="flex min-h-screen flex-col items-center gap-6 p-4 sm:p-8 bg-[#1a1f1a]">
      <HeaderPageTraining />

      <div className="flex flex-col items-center gap-8 w-full max-w-md">
        <div className="text-6xl sm:text-7xl md:text-8xl font-bold text-[#4ade80] tabular-nums">
          {formatTimeToShow(time)}
        </div>

        <div className="flex gap-4 flex-wrap justify-center">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="px-8 py-4 bg-[#22c55e] text-white rounded-lg hover:bg-[#4ade80] active:scale-95 transition-all text-lg font-semibold min-w-[120px] shadow-lg shadow-green-900/20"
            >
              Start
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

        {isRunning && (
          <div className="text-sm sm:text-base text-[#9ca89c] animate-pulse">
            Timer running...
          </div>
        )}
      </div>
    </div>
  )
}

export default TimekeeperPage
