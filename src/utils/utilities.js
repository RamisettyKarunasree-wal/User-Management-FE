import toast from 'react-hot-toast'

export const apiErrorHandler = (error, needToast = true) => {
  let errorMessage = 'Operation failed, please try after sometime.';
  if (error.message === 'Network Error') {
    errorMessage = 'Please check internet connection or try after sometime.'
  }
  if (needToast) toast.error(error?.response?.data?.message || errorMessage) 
};
