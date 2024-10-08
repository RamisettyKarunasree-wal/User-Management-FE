import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'
import { useSelector } from 'react-redux'
import moment from 'moment/moment'

export default function ProtectedRoute() {
  let user = {}
  const location = useLocation()
  const storeUser = useSelector((state) => state.settings.user)
  const currentTime = moment().unix()

  if (!storeUser || !storeUser._id) {
    return (
      <Navigate
        to={ROUTES.OAUTH_REDIRECT.link}
        state={{ redirect_to: location.pathname }}
      />
    )
  } else {
    user = storeUser
  }

  if (user && currentTime < user.expires_at && user.isAuthorized) {
    return <Outlet />
  } else {
    return (
      <Navigate
        to={ROUTES.OAUTH_REDIRECT.link}
        state={{ redirect_to: location.pathname }}
      />
    )
  }
}
