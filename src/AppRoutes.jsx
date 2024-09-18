import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout, NotFound, ProtectedRoute } from './components'
import { LAYOUT, ROUTES } from './utils/constants'
import { AppLogin, AppSignUp } from './pages'
import HomePage from './pages/static/home/Home'
import UsersList from './pages/client/users/userslist'
import Loader from './components/Loader/Loader'
import { useSelector } from 'react-redux'
import AccountSettings from './pages/client/profile/accountSettings'

export default function AppRoutes() {
  const loading = useSelector((state) => state.settings.loading);

  return (
    <BrowserRouter>
      <Loader loading={loading} />
      <Routes>
        <Route
          path="/"
          element={<Layout alignment={LAYOUT.STATIC} />}
        >
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout alignment={LAYOUT.STATIC} />}>
            <Route path="/profile" element={<AccountSettings />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/transactions" element={<h1>transactions</h1>} />
          </Route>
        </Route>

        <Route path={ROUTES.SIGN_IN.link} element={<AppLogin />} />
        <Route path={ROUTES.SIGN_UP.link} element={<AppSignUp />} />
      </Routes>
    </BrowserRouter>
  )
}
