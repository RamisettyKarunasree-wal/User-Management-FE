import axios from 'axios'
import { API_PATHS, ROUTES } from '../utils/constants'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/settings'

export const useAxios = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const baseURL = import.meta.env.VITE_APP_BASE_URL
  const instance = axios.create({ baseURL })

  const unAuthHandler = (toastNeeded = false) => {
    const user = JSON.parse(localStorage.getItem('user'))
    user.isAuthorized = false
    localStorage.setItem('user', JSON.stringify(user))
    if (toastNeeded) toast.error('Unauthorized, Please login again')
    navigate(ROUTES.SIGN_IN.link)
  }

  instance.interceptors.request.use(async (config) => {
    const customConfig = config
    customConfig.headers = { 'Content-Type': 'application/json' }
    customConfig.withCredentials = true
    return customConfig
  })

  instance.interceptors.response.use(
    async (response) => {
      if (response?.data?.code === 'LOGIN_AGAIN') unAuthHandler(false)
      const resHeaders = response.headers.toJSON()
      if (resHeaders['ums-token-refreshed'] === 'true') {
        try {
          const res = await axios.get(baseURL + API_PATHS.PROFILE, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          })
          dispatch(setUser(res.data))
        } catch (error) {
          console.error('failed to get new data')
        }
        
      }
      return response
    },
    (error) => {
      if (
        error?.response?.status === 401 &&
        error?.response?.data?.error === 'Unauthorized'
      ) {
        unAuthHandler()
      }
      if (error?.response?.status === 403) {
        toast.error('Blocked or do not have access to these resources.')
      }
      return Promise.reject(error)
    },
  )

  return instance
}

export default useAxios
