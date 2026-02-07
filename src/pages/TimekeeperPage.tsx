import { PauseButton, ResetButton, StartButton } from '../components/Buttons'
import HeaderPageTraining from '../components/HeaderPageTraining'
import TimeShow from '../components/TimeShow'
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
        <TimeShow time={formatTimeToShow(time)} />

        <div className="flex gap-4 flex-wrap justify-center">
          {!isRunning ? (
            <StartButton onClick={handleStart} />
          ) : (
            <PauseButton onClick={handlePause} />
          )}
          <ResetButton onClick={handleReset} />
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
