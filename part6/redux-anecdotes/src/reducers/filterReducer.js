import { createSlice } from '@reduxjs/toolkit'

const initialState = []

/*
const filterReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FILTER':
        return action.payload
    default: 
    return state
  }
}*/

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filterChange(state, action) {
      return action.payload
    }
  }
})

/*
export const filterChange = filtered => {
  return {
    type: 'SET_FILTER',
    payload: filtered,
  }
} */  

export const filterChange = filterSlice.actions
export default filterSlice.reducer