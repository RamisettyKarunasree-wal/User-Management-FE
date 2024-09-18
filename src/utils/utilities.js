import { API_PATHS } from "./constants"

export const fetchProfile = async (axiosInstance) => {
  try {
    const res = await axiosInstance.get(API_PATHS.PROFILE)
    localStorage.setItem('user', JSON.stringify(res.data))
    return res.data;
  } catch (error) {
    return null
  }
}