import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout, NotFound, ProtectedRoute } from './components'
import { LAYOUT, ROUTES, USER_ROLES } from './utils/constants'
import { AppLogin, AppSignUp } from './pages'
import HomePage from './pages/static/home/Home'
import UsersList from './pages/client/users/userslist'
import Loader from './components/Loader/Loader'
import { useSelector } from 'react-redux'
import AccountSettings from './pages/client/profile/AccountSettings'
import OAuthRedirect from './components/OAuthRedirect/OAuthRedirect'

export default function AppRoutes() {
  const loading = useSelector((state) => state.settings.loading)
  const storeUser = useSelector((state) => state.settings.user)

  return (
    <BrowserRouter>
      <Loader loading={loading} />
      <Routes>
        <Route
          path={ROUTES.HOME.link}
          element={<Layout alignment={LAYOUT.STATIC} />}
        >
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path={ROUTES.HOME.link}
            element={<Layout alignment={LAYOUT.STATIC} />}
          >
            <Route path={ROUTES.PROFILE.link} element={<AccountSettings />} />
            {storeUser?.userRole === USER_ROLES.ADMIN.key && (
              <Route path={ROUTES.USERS.link} element={<UsersList />} />
            )}
          </Route>
        </Route>

        <Route path={ROUTES.SIGN_IN.link} element={<AppLogin />} />
        <Route path={ROUTES.SIGN_UP.link} element={<AppSignUp />} />
        <Route path={ROUTES.OAUTH_REDIRECT.link} element={<OAuthRedirect />} />
      </Routes>
    </BrowserRouter>
  )
}
