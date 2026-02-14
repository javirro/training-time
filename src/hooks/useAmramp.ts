import { useEffect, useState, useRef } from 'react'
import { clearStartTime, setStartTime, getStartTime } from '../lib/localstorage'
import { useAudio } from './useAudio'

export const useAmramp = () => {
  const [timeUnit, setTimeUnit] = useState<'minutes' | 'seconds'>('minutes')
  const [timeLimit, setTimeLimit] = useState(10)
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [rounds, setRounds] = useState(0)
  const [initialTimeLimit, setInitialTimeLimit] = useState(timeLimit * 60)
  const TIME_GRANULARITY = 100 // 100ms for smoother updates
  const previousSecondRef = useRef<number>(0)

  const { playSound } = useAudio()

  useEffect(() => {
    function updateRemainingTime() {
      const newTimeLimit = timeUnit === 'minutes' ? timeLimit * 60 : timeLimit
      setTimeRemaining(newTimeLimit)
      setInitialTimeLimit(newTimeLimit)
    }
    updateRemainingTime()
  }, [timeUnit, timeLimit]) // Reset time limit when time unit changes

  useEffect(() => {
    let interval: number | undefined

    if (isRunning) {
      interval = setInterval(() => {
        const startTime = getStartTime()
        if (startTime) {
          const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000)
          const remaining = Math.max(0, initialTimeLimit - elapsedSeconds)

          setTimeRemaining(remaining)

          // Only play sound when the second actually changes
          if (remaining !== previousSecondRef.current && remaining <= 5 && remaining > 0) {
            playSound()
          }
          previousSecondRef.current = remaining

          if (remaining <= 0) {
            setIsRunning(false)
            clearStartTime()
          }
        }
      }, TIME_GRANULARITY)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, initialTimeLimit, playSound])

  const handleStart = () => {
    setIsRunning(true)
    setStartTime(Date.now())
    setInitialTimeLimit(timeRemaining)
  }

  const handlePause = () => {
    setIsRunning(false)
  }
  
  const handleReset = () => {
    clearStartTime()
    setIsRunning(false)
    setTimeRemaining(timeUnit === 'minutes' ? timeLimit * 60 : timeLimit)
    setRounds(0)
    previousSecondRef.current = 0
  }

  const handleRoundComplete = () => {
    setRounds((prev) => prev + 1)
  }

  const handleUpdateTimeLimit = (newLimit: number) => {
    setTimeLimit(newLimit)
    setTimeRemaining(timeUnit === 'minutes' ? newLimit * 60 : newLimit)
  }

  return {
    timeUnit,
    timeLimit,
    timeRemaining,
    isRunning,
    rounds,
    handleStart,
    handlePause,
    handleReset,
    handleRoundComplete,
    handleUpdateTimeLimit,
    setTimeUnit
  }
}
