import { createSlice, current } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    deleteRedux(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
    likeBlog(state, action) {
      const id = action.payload
      const blog = state.find( b => b.id === id )
      const newBlog = {
        ...blog,
        likes: blog.likes + 1
      }
      return state.map(b => b.id !== id ? b : newBlog)
    }
  },
})

export const { appendBlog, setBlogs, deleteRedux, likeBlog } = blogSlice.actions
export default blogSlice.reducer

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}