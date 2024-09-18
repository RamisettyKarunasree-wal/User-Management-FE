import { Navigate, Outlet } from 'react-router-dom'
import { epochStandard, ROUTES } from '../../utils/constants'
import { useSelector } from 'react-redux'

export default function ProtectedRoute() {
  let user = {}
  const storeUser = useSelector((state) => state.settings.user)
  const currentTime = epochStandard(new Date().getTime())

  if (!storeUser || !storeUser._id) {
    const localStorageUser = localStorage.getItem('user')
    if (localStorageUser) {
      user = JSON.parse(localStorageUser)
      user.expires_at = epochStandard(user.expires_at)
    } else {
      user = null
    }
  } else {
    user = storeUser
  }

  if (user && currentTime < user.expires_at && user.isAuthorized) {
    console.log("ProtectedRoute ~ user:authorized")
    return <Outlet />
  } else {
    console.log("ProtectedRoute ~ user: not authorized", user)
    return <Navigate to={ROUTES.SIGN_IN.link} />
  }
}
