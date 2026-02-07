import TrainingTypeSelector from '../components/TrainingTypeSelector'

const HomePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-4 sm:p-8 bg-[#1a1f1a]">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#4ade80]">
        Select your Training
      </h1>
      <TrainingTypeSelector />
    </main>
  )
}

export default HomePage
