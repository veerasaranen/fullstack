import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notify(state, action) {
      return action.payload
    }
  }
})


export const { notify } = notificationSlice.actions
export default notificationSlice.reducer