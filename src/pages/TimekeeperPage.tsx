import { useState, useEffect } from 'react'

const TimekeeperPage = () => {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: number | undefined

    if (isRunning) {
      interval = window.setInterval(() => {
        setTime((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }

  const handleStart = () => {
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTime(0)
  }

  return (
    <div className="flex min-h-screen flex-col items-center gap-6 p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#4ade80]">
        TIMEKEEPER
      </h1>
      <p className="text-sm sm:text-base text-[#9ca89c] text-center max-w-md">
        Track the duration of your workout
      </p>

      <div className="flex flex-col items-center gap-8 w-full max-w-md">
        <div className="text-6xl sm:text-7xl md:text-8xl font-bold text-[#4ade80] tabular-nums">
          {formatTime(time)}
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
