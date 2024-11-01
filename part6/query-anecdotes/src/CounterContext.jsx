import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
        return `Added '${action.payload}'`
    case 'VOTE':
        return `Voted '${action.payload}'`
    case 'RESET': 
        return ''
    case 'ERROR':
        return 'Too short. Anecdote must have length 5 or more'
    default:
        return state
  }
}

const CounterContext = createContext()

export const CounterContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <CounterContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </CounterContext.Provider>
  )
}

export default CounterContext