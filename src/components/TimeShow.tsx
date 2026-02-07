import type { FC } from 'react'

const TimeShow: FC<{ time: string }> = ({ time }) => {
  return (
    <div className="text-9xl sm:text-9xl md:text-9xl font-bold text-[#4ade80] tabular-nums">
      {time}
    </div>
  )
}

export default TimeShow
