export const ResetButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="px-8 py-4 bg-[#384038] text-[#f0f4f0] rounded-lg hover:bg-[#434d43] active:scale-95 transition-all text-lg font-semibold min-w-30"
    >
      Reset
    </button>
  )
}

export const StartButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="px-8 py-4 bg-[#22c55e] text-white rounded-lg hover:bg-[#4ade80] active:scale-95 transition-all text-lg font-semibold min-w-30 shadow-lg shadow-green-900/20"
    >
      Start
    </button>
  )
}

export const PauseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="px-8 py-4 bg-[#fbbf24] text-[#1a1f1a] rounded-lg hover:bg-[#fcd34d] active:scale-95 transition-all text-lg font-semibold min-w-30 shadow-lg"
    >
      Pause
    </button>
  )
}
