import { useCallback, useEffect, useRef } from 'react'

export const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio
  useEffect(() => {
    // Create audio context with a beep sound
    audioRef.current = new Audio()
    audioRef.current.src =
      'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiQ1PDImSwGJHfH79yNPwoUXLPp7axXFQpGn+Dxv28hBTiQ1PDImSwGJHfH79yNPwoUXLPp7axXFQpGn+Dx'
    audioRef.current.volume = 0.6
  }, [])

  const playSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {
        // Ignore errors if user hasn't interacted with page yet
      })
    }
  }, [audioRef])

  return { playSound }
}
