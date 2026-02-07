import { useEffect, useState } from 'react'
import { useAudio } from './useAudio'

export const useEmom = () => {
  const [duration, setDuration] = useState(10)
  const [currentMinute, setCurrentMinute] = useState(1)
  const [timeInMinute, setTimeInMinute] = useState(60)
  const [isRunning, setIsRunning] = useState(false)
  const TIME_GRANULARITY = 1000 // 1 second

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
    setTimeInMinute(60)
  }

  const handleUpdateDuration = (newDuration: number) => {
    setDuration(newDuration)
  }

  useEffect(() => {
    let interval: number | undefined

    if (isRunning && timeInMinute > 0) {
      interval = window.setInterval(() => {
        setTimeInMinute((prev) => {
          if (prev >= 0 && prev < 6) {
            playSound()
          }
          if (prev === 1) {
            // Play sound when round finishes
            // Move to next minute
            if (currentMinute < duration) {
              setCurrentMinute((m) => m + 1)
              return 60
            } else {
              // Workout complete
              setIsRunning(false)
              return 0
            }
          }
          return prev - 1
        })
      }, TIME_GRANULARITY)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeInMinute, currentMinute, duration, playSound])

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
