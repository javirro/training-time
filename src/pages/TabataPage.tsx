import { useState, useEffect } from 'react'
import HeaderPageTraining from '../components/HeaderPageTraining'
import { PauseButton, ResetButton, StartButton } from '../components/Buttons'

const TabataPage = () => {
  const [workTime, setWorkTime] = useState(20)
  const [restTime, setRestTime] = useState(10)
  const [totalRounds, setTotalRounds] = useState(8)
  const [currentRound, setCurrentRound] = useState(1)
  const [timeRemaining, setTimeRemaining] = useState(workTime)
  const [isRunning, setIsRunning] = useState(false)
  const [isWorkPhase, setIsWorkPhase] = useState(true)

  useEffect(() => {
    let interval: number | undefined

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev > 1) {
            return prev - 1
          }
          // When timer reaches 0, handle phase transitions
          return 0
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeRemaining])

  // Separate effect to handle phase transitions when time reaches 0
  useEffect(() => {
    if (!isRunning || timeRemaining > 0) return

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
  }, [timeRemaining, isRunning, isWorkPhase, currentRound, totalRounds, workTime, restTime])

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
      <HeaderPageTraining />

      {!isRunning && currentRound === 1 && isWorkPhase && timeRemaining === workTime && (
        <div className="flex flex-col gap-4 items-center w-full max-w-md">
          <h3 className="text-lg sm:text-xl font-semibold text-[#d1d9d1] text-center">
            Configure Tabata
          </h3>
          <div className="grid grid-cols-3 gap-4 w-full">
            <label className="flex flex-col gap-2 text-center">
              <span className="text-xs sm:text-sm text-[#9ca89c]">Work (sec)</span>
              <input
                type="number"
                min="5"
                max="120"
                value={workTime}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 5
                  setWorkTime(val)
                  setTimeRemaining(val)
                }}
                className="px-3 py-2 bg-[#2d342d] text-[#f0f4f0] rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#4ade80] border border-[#384038]"
              />
            </label>
            <label className="flex flex-col gap-2 text-center">
              <span className="text-xs sm:text-sm text-[#9ca89c]">Rest (sec)</span>
              <input
                type="number"
                min="5"
                max="120"
                value={restTime}
                onChange={(e) => setRestTime(parseInt(e.target.value) || 5)}
                className="px-3 py-2 bg-[#2d342d] text-[#f0f4f0] rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#4ade80] border border-[#384038]"
              />
            </label>
            <label className="flex flex-col gap-2 text-center">
              <span className="text-xs sm:text-sm text-[#9ca89c]">Rounds</span>
              <input
                type="number"
                min="1"
                max="20"
                value={totalRounds}
                onChange={(e) => setTotalRounds(parseInt(e.target.value) || 1)}
                className="px-3 py-2 bg-[#2d342d] text-[#f0f4f0] rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#4ade80] border border-[#384038]"
              />
            </label>
          </div>
        </div>
      )}

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
            <StartButton onClick={handleStart} />
          ) : (
            <PauseButton onClick={handlePause} />
          )}
          <ResetButton onClick={handleReset} />
        </div>
      </div>
    </div>
  )
}

export default TabataPage
