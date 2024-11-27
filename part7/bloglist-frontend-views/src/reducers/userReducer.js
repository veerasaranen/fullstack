const initialState = []

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
  }
}
