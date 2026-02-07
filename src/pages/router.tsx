import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './HomePage'
import AmrapPage from './AmrapPage'
import TabataPage from './TabataPage'
import EmomPage from './EmomPage'
import TimekeeperPage from './TimekeeperPage'
import TrainPage from './TrainPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/train',
    element: <TrainPage />,
    children: [
      {
        path: 'amrap',
        element: <AmrapPage />,
      },
      {
        path: 'tabata',
        element: <TabataPage />,
      },
      {
        path: 'emom',
        element: <EmomPage />,
      },
      {
        path: 'timekeeper',
        element: <TimekeeperPage />,
      },
    ],
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}
