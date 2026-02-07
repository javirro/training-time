import { useEffect, useState } from 'react'
import { useAudio } from './useAudio'

export const useEmom = () => {
  const SECONDS_IN_MINUTE = 60
  const TIME_GRANULARITY = 1000 // 1 second
  const [duration, setDuration] = useState(10)
  const [currentMinute, setCurrentMinute] = useState(1)
  const [timeInMinute, setTimeInMinute] = useState(SECONDS_IN_MINUTE)
  const [isRunning, setIsRunning] = useState(false)

  const { playSound } = useAudio()
  const handleStart = () => {
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setCurrentMinute(1)
    setTimeInMinute(SECONDS_IN_MINUTE)
  }

  const handleUpdateDuration = (newDuration: number) => {
    setDuration(newDuration)
  }

  useEffect(() => {
    let interval: number | undefined
    if (isRunning) {
      interval = window.setInterval(() => {
        if (timeInMinute <= 5) {
          playSound()
        }
        if (timeInMinute > 0) {
          setTimeInMinute((prev) => prev - 1)
        }
        if (timeInMinute === 0) {
          if (currentMinute < duration) {
            setCurrentMinute((m) => m + 1)
            setTimeInMinute(SECONDS_IN_MINUTE)
          } else {
            setIsRunning(false)
          }
        }
      }, TIME_GRANULARITY)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [duration, isRunning, timeInMinute, currentMinute, playSound])



  return {
    duration,
    currentMinute,
    timeInMinute,
    isRunning,
    handleStart,
    handlePause,
    handleReset,
    handleUpdateDuration
  }
}
