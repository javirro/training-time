import { useState } from 'react'
import { PauseButton, ResetButton, StartButton } from '../components/Buttons'
import HeaderPageTraining from '../components/HeaderPageTraining'
import TimeShow from '../components/TimeShow'
import { useEmom } from '../hooks/useEmom'
import PreStartCountdown from '../components/PreStartCountdown'

const EmomPage = () => {
  const {
    duration,
    currentMinute,
    timeInMinute,
    isRunning,
    handleStart: startTimer,
    handlePause,
    handleReset,
    handleUpdateDuration,
  } = useEmom()

  const [showCountdown, setShowCountdown] = useState(false)

  const handleStart = () => {
    setShowCountdown(true)
  }

  const handleCountdownComplete = () => {
    setShowCountdown(false)
    startTimer()
  }

  const isComplete = currentMinute === duration && timeInMinute === 0

  return (
    <div className="flex min-h-screen flex-col items-center  gap-6 p-4 sm:p-8">
      {showCountdown && <PreStartCountdown onComplete={handleCountdownComplete} />}
      <HeaderPageTraining />

      {!isRunning && currentMinute === 1 && timeInMinute === 60 && (
        <div className="flex flex-col gap-4 items-center w-[60%]">
          <label className="flex flex-col gap-2 text-center">
            <span className="text-base text-[#d1d9d1]">
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
              className="w-full sm:w-xl px-4 py-3 bg-[#2d342d] text-[#f0f4f0] rounded-lg text-center text-xl  focus:outline-none focus:ring-2 focus:ring-[#4ade80] border border-[#384038]"
            />
          </label>
        </div>
      )}

      <div className="flex flex-col items-center gap-8 w-full max-w-md">
        <div className="text-4xl  font-semibold text-[#d1d9d1]">
          Minute: <span className="text-[#4ade80]">{currentMinute}</span> /{' '}
          {duration}
        </div>

        <TimeShow time={timeInMinute.toString()} />

        {isComplete && (
          <div className="text-2xl sm:text-3xl font-bold text-[#22c55e]">
            Complete! 🎉
          </div>
        )}

        <div className="flex gap-4 flex-wrap justify-center">
          {!isRunning ? (
            <StartButton onClick={handleStart} />
          ) : (
            <PauseButton onClick={handlePause} />
          )}

          <ResetButton onClick={handleReset} />
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
