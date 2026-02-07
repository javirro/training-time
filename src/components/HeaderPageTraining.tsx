import { useLocation } from "react-router-dom"
import { trainingDescriptions, type TrainingType } from "../constants"

const HeaderPageTraining = () => {
  const location = useLocation()
  const route = location.pathname.split('/')[2] || 'train'
  const title = route.charAt(0).toUpperCase() + route.slice(1)
  const trainType = route.toUpperCase() as TrainingType
  const description = trainingDescriptions[trainType] || "Train hard, stay consistent, and see the results. Let's get to work!"

  return (
    <>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#4ade80]">
        {title}
      </h1>
      <p className="text-center text-[#9ca89c] max-w-md mx-auto mt-2">
        {description}
      </p>
    </>
  )
}

export default HeaderPageTraining