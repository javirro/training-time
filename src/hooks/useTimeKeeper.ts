import { useEffect, useState } from 'react'

export const useTimeKeeper = () => {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const TIME_GRANULARITY = 1000 // 1 second

  useEffect(() => {
    let interval: number | undefined

    if (isRunning) {
      interval = window.setInterval(() => {
        setTime((prev) => prev + 1)
      }, TIME_GRANULARITY)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

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

  return {
    time,
    isRunning,
    handleStart,
    handlePause,
    handleReset
  }
}
