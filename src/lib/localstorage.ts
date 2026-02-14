export const setStartTime = (time: number) => {
  localStorage.setItem('startTime', time.toString())
}

export const getStartTime = (): number | null => {
  const time = localStorage.getItem('startTime')
  return time ? parseInt(time) : null
}

export const clearStartTime = () => {
  localStorage.removeItem('startTime')
}