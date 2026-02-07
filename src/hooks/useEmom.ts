import { useEffect, useState, useRef } from 'react'

export const useEmom = () => {
  const [duration, setDuration] = useState(10)
  const [currentMinute, setCurrentMinute] = useState(1)
  const [timeInMinute, setTimeInMinute] = useState(60)
  const [isRunning, setIsRunning] = useState(false)
  const TIME_GRANULARITY = 1000 // 1 second
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio
  useEffect(() => {
    // Create audio context with a beep sound
    audioRef.current = new Audio()
    audioRef.current.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiQ1PDImSwGJHfH79yNPwoUXLPp7axXFQpGn+Dxv28hBTiQ1PDImSwGJHfH79yNPwoUXLPp7axXFQpGn+Dx'
    audioRef.current.volume = 0.3
  }, [])

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {
        // Ignore errors if user hasn't interacted with page yet
      })
    }
  }
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
          if (prev > 0 && prev <= 5) {
            // Play sound when round finishes
            playSound()
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
  }, [isRunning, timeInMinute, currentMinute, duration])

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
