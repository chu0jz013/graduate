import { createBrowserRouter } from 'react-router'
import { InvitationPage } from './pages/InvitationPage'
import { NotFoundPage } from './pages/NotFoundPage'

export const router = createBrowserRouter([
  // The unaddressed card, for a link shared without a name.
  { path: '/', element: <InvitationPage /> },
  // The personalised card: /dao-trong-an, /dang-sang, …
  // An unknown slug still renders here, unaddressed, rather than erroring.
  { path: '/:slug', element: <InvitationPage /> },
  { path: '*', element: <NotFoundPage /> },
])
