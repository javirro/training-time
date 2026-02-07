import { Outlet, useNavigate } from 'react-router-dom'

const TrainPage = () => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate('/')
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1f1a]">
      <nav className="w-full max-w-4xl flex items-center justify-start mb-6 bg-[#2d342d] px-3 py-3 rounded-b-lg shadow-lg">
        <button
          onClick={handleBack}
          className="px-4 py-2 text-sm bg-[#384038] text-[#f0f4f0] rounded-lg hover:bg-[#434d43] transition-colors"
        >
          ← Back
        </button>
      </nav>
      <Outlet />
    </div>
  )
}
export default TrainPage
