import { useEffect, useState } from 'react'

interface PreStartCountdownProps {
  onComplete: () => void
}

const PreStartCountdown = ({ onComplete }: PreStartCountdownProps) => {
  const [count, setCount] = useState(5)

  useEffect(() => {
    if (count === 0) {
      onComplete()
      return
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [count, onComplete])

  const getColorClass = () => {
    if (count <= 2) return 'text-[#ef4444]' // Red
    if (count <= 3) return 'text-[#fbbf24]' // Yellow
    return 'text-[#4ade80]' // Green
  }

  const getMessage = () => {
    if (count === 0) return 'GO!'
    return count
  }

  return (
    <div className="fixed inset-0 bg-[#1a1f1a]/95 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#d1d9d1]">
          Get Ready!
        </h2>

        <div className="relative">
          {/* Outer pulse ring */}
          <div
            className={`absolute inset-0 rounded-full ${getColorClass()} opacity-20 animate-ping`}
            style={{ animationDuration: '1s' }}
          />

          {/* Middle ring */}
          <div
            className={`absolute inset-0 rounded-full border-8 ${getColorClass()} opacity-40 scale-110 animate-pulse`}
          />

          {/* Main countdown circle */}
          <div
            className={`
            relative
            w-48 h-48 sm:w-64 sm:h-64
            rounded-full
            border-8 ${getColorClass()}
            bg-[#2d342d]/50
            flex items-center justify-center
            transition-all duration-300
            ${count === 0 ? 'scale-110' : 'animate-bounce'}
          `}
            style={{ animationDuration: count === 0 ? '0s' : '1s' }}
          >
            <span
              className={`
              text-8xl sm:text-9xl
              font-bold
              ${getColorClass()}
              transition-all duration-300
              ${count === 0 ? 'scale-125' : ''}
            `}
            >
              {getMessage()}
            </span>
          </div>
        </div>

        <p className="text-lg sm:text-xl text-[#9ca89c] animate-pulse">
          Your training starts in {count} second{count !== 1 ? 's' : ''}...
        </p>
      </div>
    </div>
  )
}

export default PreStartCountdown
