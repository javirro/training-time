import { useEffect, useState } from 'react'

export const useAmramp = () => {
  const [timeLimit, setTimeLimit] = useState(10)
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [rounds, setRounds] = useState(0)
  const TIME_GRANULARITY = 1000 // 1 second

  useEffect(() => {
    let interval: number | undefined

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        // If time runs out, stop the timer and reset remaining time to 0, otherwise just decrease it by 1 second
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      }, TIME_GRANULARITY)
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

  const handleUpdateTimeLimit = (newLimit: number) => {
    setTimeLimit(newLimit)
    setTimeRemaining(newLimit * 60)
  }

  return {
    timeLimit,
    timeRemaining,
    isRunning,
    rounds,
    handleStart,
    handlePause,
    handleReset,
    handleRoundComplete,
    handleUpdateTimeLimit
  }
}
