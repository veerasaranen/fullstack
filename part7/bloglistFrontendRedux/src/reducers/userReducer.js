import { createSlice, current } from '@reduxjs/toolkit'

const initialState = []

export const userReducer = () => {}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
