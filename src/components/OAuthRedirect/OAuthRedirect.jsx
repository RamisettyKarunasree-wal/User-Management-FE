import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import useAxios from '../../utils/axiosSetup'
import { API_PATHS, ROUTES } from '../../utils/constants'
import { setUser } from '../../store/settings'
import './OAuthRedirect.scss'

export default function OAuthRedirect() {
  const api = useAxios()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(API_PATHS.NEW_TOKEN)
        dispatch(setUser(response.data))
        navigate(location?.state?.redirect_to || ROUTES.PROFILE.link)
      } catch (error) {
        navigate(ROUTES.PROFILE.link)
      }
    }
    fetchData()
  }, [navigate, api, dispatch, location.state])

  return (
    <div className="page-loader">
      <div className="loader"></div>
    </div>
  )
}
