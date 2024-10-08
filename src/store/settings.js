import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  user: JSON.parse(localStorage.getItem('user')) || {},
  userList: [],
}

const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    loading: (state, action) => {
      state.loading = action.payload
    },
    user: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload))
      state.user = action.payload
    },
    userList: (state, action) => {
      state.userList = action.payload
    },
  },
})

const settingsReducer = settings.reducer

export const {
  loading: setLoading,
  user: setUser,
  userList: setStoreUserList,
} = settings.actions
export default settingsReducer
