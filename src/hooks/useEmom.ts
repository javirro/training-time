import { useEffect, useState, useRef } from 'react'
import { useAudio } from './useAudio'
import { getStartTime, setStartTime, clearStartTime } from '../lib/localstorage'

export const useEmom = () => {
  const SECONDS_IN_MINUTE = 60
  const TIME_GRANULARITY = 100 // 100ms for smoother updates
  const [duration, setDuration] = useState(10)
  const [currentMinute, setCurrentMinute] = useState(1)
  const [timeInMinute, setTimeInMinute] = useState(SECONDS_IN_MINUTE)
  const [isRunning, setIsRunning] = useState(false)
  const previousSecondRef = useRef<number>(SECONDS_IN_MINUTE)

  const { playSound } = useAudio()
  const handleStart = () => {
    setIsRunning(true)
    setStartTime(Date.now())
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setCurrentMinute(1)
    setTimeInMinute(SECONDS_IN_MINUTE)
    previousSecondRef.current = SECONDS_IN_MINUTE
    clearStartTime()
  }

  const handleUpdateDuration = (newDuration: number) => {
    setDuration(newDuration)
  }

  useEffect(() => {
    let interval: number | undefined
    if (isRunning) {
      interval = window.setInterval(() => {
        const startTime = getStartTime()
        if (startTime) {
          const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000)
          const totalSeconds = duration * SECONDS_IN_MINUTE

          if (elapsedSeconds >= totalSeconds) {
            setIsRunning(false)
            clearStartTime()
            setCurrentMinute(duration)
            setTimeInMinute(0)
            return
          }

          const minute = Math.floor(elapsedSeconds / SECONDS_IN_MINUTE) + 1
          const secondsInCurrentMinute = SECONDS_IN_MINUTE - (elapsedSeconds % SECONDS_IN_MINUTE)

          // Only play sound when the second actually changes
          if (secondsInCurrentMinute !== previousSecondRef.current && secondsInCurrentMinute <= 5 && secondsInCurrentMinute > 0) {
            playSound()
          }

          setCurrentMinute(minute)
          setTimeInMinute(secondsInCurrentMinute)

          previousSecondRef.current = secondsInCurrentMinute
        }
      }, TIME_GRANULARITY)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [duration, isRunning, playSound])

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
