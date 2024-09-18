import axios from 'axios'
import { ROUTES } from '../utils/constants'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const useAxios = () => {
  const navigate = useNavigate()
  const baseURL = import.meta.env.VITE_APP_BASE_URL
  const instance = axios.create({ baseURL })

  const unAuthHandler = (toastNeeded = false) => {
    const user = JSON.parse(localStorage.getItem('user'))
    user.isAuthorized = false
    localStorage.setItem('user', JSON.stringify(user))
    if(toastNeeded) toast.error('Unauthorized, Please login again')
    navigate(ROUTES.SIGN_IN.link)
  }

  instance.interceptors.request.use(async (config) => {
    const customConfig = config
    customConfig.headers = { 'Content-Type': 'application/json' }
    customConfig.withCredentials = true
    return customConfig
  })

  instance.interceptors.response.use(
    (response) => {
      if (response?.data?.code === 'LOGIN_AGAIN') unAuthHandler(false)
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
        toast.error('You do not have access to these resources.')
      }
      return Promise.reject(error)
    },
  )

  return instance
}

export default useAxios
