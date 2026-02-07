import { useState, useEffect } from 'react'
import { formatTimeToShow } from '../lib/formatTimeToShow'
import HeaderPageTraining from '../components/HeaderPageTraining'

const AmrapPage = () => {
  const [timeLimit, setTimeLimit] = useState(10)
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [rounds, setRounds] = useState(0)

  useEffect(() => {
    let interval: number | undefined

    if (isRunning && timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
    } else if (timeRemaining === 0) {
      setIsRunning(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeRemaining])

  const handleStart = () => {
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeRemaining(timeLimit * 60)
    setRounds(0)
  }

  const handleRoundComplete = () => {
    setRounds((prev) => prev + 1)
  }

  return (
    <div className="flex min-h-screen flex-col items-center  gap-6 p-4 sm:p-8">
      <HeaderPageTraining />

      {!isRunning && timeRemaining === timeLimit * 60 && (
        <div className="flex flex-col gap-4 items-center">
          <label className="flex flex-col gap-2 text-center">
            <span className="text-sm sm:text-base text-[#d1d9d1]">
              Time Limit (minutes)
            </span>
            <input
              type="number"
              min="1"
              max="60"
              value={timeLimit}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 1
                setTimeLimit(val)
                setTimeRemaining(val * 60)
              }}
              className="px-4 py-3 bg-[#2d342d] text-[#f0f4f0] rounded-lg text-center text-xl w-24 focus:outline-none focus:ring-2 focus:ring-[#4ade80] border border-[#384038]"
            />
          </label>
        </div>
      )}

      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        <div className="text-6xl sm:text-7xl font-bold text-[#4ade80] tabular-nums">
          {formatTimeToShow(timeRemaining)}
        </div>

        <div className="text-4xl sm:text-5xl font-bold text-[#f0f4f0]">
          Rounds: <span className="text-[#4ade80]">{rounds}</span>
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
          <button
            onClick={handleRoundComplete}
            className="px-12 py-6 bg-[#16a34a] text-white rounded-lg hover:bg-[#22c55e] active:scale-95 transition-all text-xl font-bold w-full max-w-xs shadow-lg shadow-green-900/30"
          >
            Round Complete
          </button>
        )}
      </div>
    </div>
  )
}

export default AmrapPage
