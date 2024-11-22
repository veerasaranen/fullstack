export const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.payload
    default:
      return state
  }
}

export const createNotification = (notification) => {
  return {
    type: 'NEW_NOTIFICATION',
    payload: notification,
  }
}
