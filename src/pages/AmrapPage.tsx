import { formatTimeToShow } from '../lib/formatTimeToShow'
import HeaderPageTraining from '../components/HeaderPageTraining'
import { useAmramp } from '../hooks/useAmramp'
import { PauseButton, ResetButton, StartButton } from '../components/Buttons'
import TimeShow from '../components/TimeShow'

const AmrapPage = () => {
  const {
    timeLimit,
    timeRemaining,
    isRunning,
    rounds,
    handleStart,
    handlePause,
    handleReset,
    handleRoundComplete,
    handleUpdateTimeLimit,
  } = useAmramp()

  return (
    <div className="flex min-h-screen flex-col items-center  gap-6 p-4 sm:p-8">
      <HeaderPageTraining />

      {!isRunning && timeRemaining === timeLimit * 60 && (
        <div className="flex flex-col gap-4 items-center w-[60%]">
          <label className="flex flex-col gap-2 text-center">
            <span className="text-base text-[#d1d9d1]">
              Time Limit (minutes)
            </span>
            <input
              type="number"
              min="1"
              max="60"
              value={timeLimit}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 1
                handleUpdateTimeLimit(val)
              }}
              className="w-full sm:w-xl px-4 py-3 bg-[#2d342d] text-[#f0f4f0] rounded-lg text-center text-xl  focus:outline-none focus:ring-2 focus:ring-[#4ade80] border border-[#384038]"
            />
          </label>
        </div>
      )}

      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        <TimeShow time={formatTimeToShow(timeRemaining)} />

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
