import { useState, useEffect } from 'react'

const EmomPage = () => {
  const [duration, setDuration] = useState(10)
  const [currentMinute, setCurrentMinute] = useState(1)
  const [timeInMinute, setTimeInMinute] = useState(60)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: number | undefined

    if (isRunning && timeInMinute > 0) {
      interval = window.setInterval(() => {
        setTimeInMinute((prev) => {
          if (prev === 1) {
            // Move to next minute
            if (currentMinute < duration) {
              setCurrentMinute((m) => m + 1)
              return 60
            } else {
              // Workout complete
              setIsRunning(false)
              return 0
            }
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeInMinute, currentMinute, duration])

  const handleStart = () => {
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setCurrentMinute(1)
    setTimeInMinute(60)
  }

  const isComplete = currentMinute === duration && timeInMinute === 0

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#4ade80]">EMOM</h1>
      <p className="text-sm sm:text-base text-[#9ca89c] text-center max-w-md">
        Every Minute On the Minute - Perform exercises at the start of each minute
      </p>

      {!isRunning && currentMinute === 1 && timeInMinute === 60 && (
        <div className="flex flex-col gap-4 items-center">
          <label className="flex flex-col gap-2 text-center">
            <span className="text-sm sm:text-base text-[#d1d9d1]">Duration (minutes)</span>
            <input
              type="number"
              min="1"
              max="60"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
              className="px-4 py-3 bg-[#2d342d] text-[#f0f4f0] rounded-lg text-center text-xl w-24 focus:outline-none focus:ring-2 focus:ring-[#4ade80] border border-[#384038]"
            />
          </label>
        </div>
      )}

      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        <div className="text-xl sm:text-2xl font-semibold text-[#d1d9d1]">
          Minute: <span className="text-[#4ade80]">{currentMinute}</span> / {duration}
        </div>

        <div className="text-7xl sm:text-8xl font-bold text-[#4ade80] tabular-nums">
          {timeInMinute}
        </div>

        {isComplete && (
          <div className="text-2xl sm:text-3xl font-bold text-[#22c55e]">Complete! 🎉</div>
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

        {/* Progress bar */}
        <div className="w-full bg-[#2d342d] rounded-full h-3 overflow-hidden border border-[#384038]">
          <div
            className="h-full bg-[#4ade80] transition-all duration-1000"
            style={{
              width: `${((currentMinute - 1) / duration) * 100 + ((60 - timeInMinute) / 60 / duration) * 100}%`,
            }}
          />
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
