import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

*/

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [], //initialState
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdote = state.find( anecdote => anecdote.id === id )
      const voted = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
  
      return state.map( anecdote => 
        anecdote.id !== id ? anecdote : voted
      ) //tarviiko?
    },
    /*voteAnecdote(state, action) {
      const id = action.payload
      const anecdote = state.find( anecdote => anecdote.id === id )
      const voted = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
  
      return state.map( anecdote => 
        anecdote.id !== id ? anecdote : voted
      ) 
    },*/
    /*createAnecdote(state, action) {
      state.push(action.payload)
    },*/
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
    /*createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0
      })
    },*/
  }
})

/*
const anecdoteReducer = (state = initialState, action) => {

  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.payload]
    case 'VOTE': {
      const id = action.payload.id
      const anecdote = state.find( anecdote => anecdote.id === id )

      const voted = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
  
      return state.map( anecdote => 
        anecdote.id !== id ? anecdote : voted
      ) 
    }
    default: 
      return state
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    payload: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content,
      id: getId(),
      votes: 0
    }
  }
}
*/

export const { appendAnecdote, setAnecdotes, vote} = anecdoteSlice.actions //used to import createAnecdote, voteAnecdote

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id, newObject) => {
  return async dispatch => {
    await anecdoteService.update(id, newObject)
    dispatch(vote(id))
  }
}

export default anecdoteSlice.reducer