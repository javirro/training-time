import { useState, useEffect } from 'react'
import HeaderPageTraining from '../components/HeaderPageTraining'
import { PauseButton, ResetButton, StartButton } from '../components/Buttons'
import { useAudio } from '../hooks/useAudio'
import PreStartCountdown from '../components/PreStartCountdown'

const TabataPage = () => {
  const [workTime, setWorkTime] = useState(20)
  const [restTime, setRestTime] = useState(10)
  const [totalRounds, setTotalRounds] = useState(8)
  const [currentRound, setCurrentRound] = useState(1)
  const [timeRemaining, setTimeRemaining] = useState(workTime)
  const [isRunning, setIsRunning] = useState(false)
  const [isWorkPhase, setIsWorkPhase] = useState(true)
  const [showCountdown, setShowCountdown] = useState(false)

  const { playSound } = useAudio()

  useEffect(() => {
    let interval: number | undefined

    if (isRunning) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev > 1) {
            if (prev <= 6) playSound() // Play sound when time is about to run out
            return prev - 1
          }

          // Timer reached 0, handle phase transitions
          if (isWorkPhase) {
            // Work phase finished, switch to rest phase
            playSound()
            setIsWorkPhase(false)
            return restTime
          } else {
            // Rest phase finished
            playSound()
            if (currentRound < totalRounds) {
              // Move to next round
              setIsWorkPhase(true)
              setCurrentRound((r) => r + 1)
              return workTime
            } else {
              // Workout complete
              setIsRunning(false)
              return 0
            }
          }
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, isWorkPhase, currentRound, totalRounds, workTime, restTime, playSound])

  const handleStart = () => {
    setShowCountdown(true)
  }

  const handleCountdownComplete = () => {
    setShowCountdown(false)
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

  const isComplete = currentRound === totalRounds && !isWorkPhase && timeRemaining === 0

  const disabled = workTime === 0 || restTime === 0 || totalRounds === 0
  return (
    <div className="flex min-h-screen flex-col items-center gap-6 p-4 sm:p-8">
      {showCountdown && <PreStartCountdown onComplete={handleCountdownComplete} />}
      <HeaderPageTraining />

      {!isRunning && currentRound === 1 && isWorkPhase && timeRemaining === workTime && (
        <div className="flex flex-col gap-4 items-center w-full max-w-md">
          <h3 className="text-lg sm:text-xl font-semibold text-[#d1d9d1] text-center">Configure Tabata</h3>
          <div className="grid grid-cols-3 gap-4 w-full">
            <label className="flex flex-col gap-2 text-center">
              <span className="text-xs sm:text-sm text-[#9ca89c]">Work (sec)</span>
              <input
                type="number"
                min="0"
                max="120"
                value={workTime}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0
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
                min="0"
                max="120"
                value={restTime}
                onChange={(e) => setRestTime(parseInt(e.target.value) || 0)}
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
                onChange={(e) => setTotalRounds(parseInt(e.target.value) || 0)}
                className="px-3 py-2 bg-[#2d342d] text-[#f0f4f0] rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#4ade80] border border-[#384038]"
              />
            </label>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        <div className="text-xl sm:text-2xl font-semibold text-[#d1d9d1]">
          Round: <span className="text-[#4ade80]">{currentRound}</span> / {totalRounds}
        </div>

        <div className={`text-9xl font-bold tabular-nums transition-colors ${isWorkPhase ? 'text-[#4ade80]' : 'text-[#fbbf24]'}`}>{timeRemaining}</div>

        <div className="text-2xl sm:text-3xl font-bold">
          {isComplete ? (
            <span className="text-[#22c55e]">Complete! 🎉</span>
          ) : (
            <span className={isWorkPhase ? 'text-[#4ade80]' : 'text-[#fbbf24]'}>{isWorkPhase ? 'WORK' : 'REST'}</span>
          )}
        </div>

        <div className="flex gap-4 flex-wrap justify-center">
          {!isRunning ? <StartButton onClick={handleStart} disabled={disabled} /> : <PauseButton onClick={handlePause} />}
          <ResetButton onClick={handleReset} />
        </div>
      </div>
    </div>
  )
}

export default TabataPage
