import { useEffect, useState } from 'react'
import { getStartTime, setStartTime, clearStartTime } from '../lib/localstorage'

export const useTimeKeeper = () => {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const TIME_GRANULARITY = 100 // 100ms for smoother updates

  useEffect(() => {
    let interval: number | undefined

    if (isRunning) {
      interval = window.setInterval(() => {
        const startTime = getStartTime()
        if (startTime) {
          const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000)
          setTime(elapsedSeconds)
        }
      }, TIME_GRANULARITY)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

  const handleStart = () => {
    setIsRunning(true)
    setStartTime(Date.now())
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTime(0)
    clearStartTime()
  }

  return {
    time,
    isRunning,
    handleStart,
    handlePause,
    handleReset
  }
}
