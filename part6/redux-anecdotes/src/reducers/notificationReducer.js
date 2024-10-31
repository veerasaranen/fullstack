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

export const timer = (notification, time) => {
  return async dispatch => {
    dispatch(notify(notification))
    setTimeout(() => {
      dispatch(notify(''))
    }, time * 1000) // i assume the time is provided in seconds
  }
}

export default notificationSlice.reducer