import { useState } from 'react'
import { formatTimeToShow } from '../lib/formatTimeToShow'
import HeaderPageTraining from '../components/HeaderPageTraining'
import { useAmramp } from '../hooks/useAmramp'
import { PauseButton, ResetButton, StartButton } from '../components/Buttons'
import TimeShow from '../components/TimeShow'
import PreStartCountdown from '../components/PreStartCountdown'

const AmrapPage = () => {
  const {
    timeLimit,
    timeRemaining,
    isRunning,
    rounds,
    timeUnit,
    handleStart: startTimer,
    handlePause,
    handleReset,
    handleRoundComplete,
    handleUpdateTimeLimit,
    setTimeUnit
  } = useAmramp()

  const [showCountdown, setShowCountdown] = useState(false)


  const handleStart = () => {
    setShowCountdown(true)
  }

  const handleCountdownComplete = () => {
    setShowCountdown(false)
    startTimer()
  }

  return (
    <div className="flex min-h-screen flex-col items-center  gap-6 p-4 sm:p-8">
      {showCountdown && <PreStartCountdown onComplete={handleCountdownComplete} />}
      <HeaderPageTraining />

      {!isRunning && (
        <div className="flex flex-col gap-4 items-center w-[60%]">
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => setTimeUnit('minutes')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                timeUnit === 'minutes'
                  ? 'bg-[#4ade80] text-[#1a1f1a]'
                  : 'bg-[#2d342d] text-[#9ca89c] hover:bg-[#384038]'
              }`}
            >
              Minutes
            </button>
            <button
              onClick={() => setTimeUnit('seconds')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                timeUnit === 'seconds'
                  ? 'bg-[#4ade80] text-[#1a1f1a]'
                  : 'bg-[#2d342d] text-[#9ca89c] hover:bg-[#384038]'
              }`}
            >
              Seconds
            </button>
          </div>
          <label className="flex flex-col gap-2 text-center">
            <span className="text-base text-[#d1d9d1]">
              Time Limit ({timeUnit})
            </span>
            <input
              type="number"
              min="0"
              max={timeUnit === 'minutes' ? 60 : 3600}
              value={timeLimit}
              onChange={(e) => {
                const newTimeLimit = parseInt(e.target.value) || 0
                handleUpdateTimeLimit(newTimeLimit)
              }}
              className="w-full sm:w-xl px-4 py-3 bg-[#2d342d] text-[#f0f4f0] rounded-lg text-center text-xl  focus:outline-none focus:ring-2 focus:ring-[#4ade80] border border-[#384038]"
            />
          </label>
        </div>
      )}

      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        <TimeShow time={timeUnit === 'seconds' ? timeRemaining.toString() : formatTimeToShow(timeRemaining)} />
        {timeUnit === 'seconds' && (
          <div className="text-sm text-[#9ca89c]">seconds</div>
        )}

        <div className="text-4xl sm:text-5xl font-bold text-[#f0f4f0]">
          Rounds: <span className="text-[#4ade80]">{rounds}</span>
        </div>

        <div className="flex gap-4 flex-wrap justify-center">
          {!isRunning ? (
            <StartButton onClick={handleStart} />
          ) : (
            <PauseButton onClick={handlePause} />
          )}
          <ResetButton onClick={handleReset} />
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
