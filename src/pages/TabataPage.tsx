import { useState, useEffect } from 'react'

const TabataPage = () => {
  const [workTime] = useState(20)
  const [restTime] = useState(10)
  const [totalRounds] = useState(8)
  const [currentRound, setCurrentRound] = useState(1)
  const [timeRemaining, setTimeRemaining] = useState(workTime)
  const [isRunning, setIsRunning] = useState(false)
  const [isWorkPhase, setIsWorkPhase] = useState(true)

  useEffect(() => {
    let interval: number | undefined

    if (isRunning && timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
    } else if (isRunning && timeRemaining === 0) {
      if (isWorkPhase) {
        // Switch to rest phase
        setIsWorkPhase(false)
        setTimeRemaining(restTime)
      } else {
        // Switch to work phase or end
        if (currentRound < totalRounds) {
          setIsWorkPhase(true)
          setCurrentRound((prev) => prev + 1)
          setTimeRemaining(workTime)
        } else {
          // Workout complete
          setIsRunning(false)
        }
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [
    isRunning,
    timeRemaining,
    isWorkPhase,
    currentRound,
    totalRounds,
    workTime,
    restTime,
  ])

  const handleStart = () => {
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setCurrentRound(1)
    setIsWorkPhase(true)
    setTimeRemaining(workTime)
  }

  const isComplete =
    currentRound === totalRounds && !isWorkPhase && timeRemaining === 0

  return (
    <div className="flex min-h-screen flex-col items-center gap-6 p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#4ade80]">
        TABATA
      </h1>
      <p className="text-sm sm:text-base text-[#9ca89c] text-center max-w-md">
        20 seconds work / 10 seconds rest × 8 rounds
      </p>

      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        <div className="text-xl sm:text-2xl font-semibold text-[#d1d9d1]">
          Round: <span className="text-[#4ade80]">{currentRound}</span> /{' '}
          {totalRounds}
        </div>

        <div
          className={`text-7xl sm:text-8xl font-bold tabular-nums transition-colors ${
            isWorkPhase ? 'text-[#4ade80]' : 'text-[#fbbf24]'
          }`}
        >
          {timeRemaining}
        </div>

        <div className="text-2xl sm:text-3xl font-bold">
          {isComplete ? (
            <span className="text-[#22c55e]">Complete! 🎉</span>
          ) : (
            <span className={isWorkPhase ? 'text-[#4ade80]' : 'text-[#fbbf24]'}>
              {isWorkPhase ? 'WORK' : 'REST'}
            </span>
          )}
        </div>

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

      </div>
    </div>
  )
}

export default TabataPage
