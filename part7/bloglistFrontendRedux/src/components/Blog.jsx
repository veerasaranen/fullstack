import { useState } from 'react'
import Details from './Details'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { deleteRedux } from '../reducers/blogReducer'

const Blog = ({ blog, user, state }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom:10,
    border: 'solid',
    borderColor: 'darkblue',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const deleteBlog = () => {
    if (window.confirm(`Are you sure you want to remove ${blog.title} by ${blog.author}`)) {
      blogService.deleting(blog.id)
      dispatch(deleteRedux(blog.id))
    }
  }

  if (user.username === blog.user.username) {
    return(
      <div style={blogStyle}>
        <p className='blogContent'>{blog.title} by {blog.author}</p>
        <div style={hideWhenVisible} className='view'>
          <button onClick={() => setDetailsVisible(true)}>view</button>
        </div>
        <div style={showWhenVisible} className='details'>
          <Details blog={blog}/>
          <button onClick={() => setDetailsVisible(false)}>hide</button>
        </div>
        <br></br>
        <button onClick={deleteBlog}>delete</button>
      </div>
    )
  }

  return(
    <div style={blogStyle}>
      <p className='blogContent'>{blog.title} by {blog.author}</p>
      <div style={hideWhenVisible} className='view'>
        <button onClick={() => setDetailsVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible} className='details'>
        <Details blog={blog}/>
        <button onClick={() => setDetailsVisible(false)}>hide</button>
      </div>
      <br></br>
    </div>
  )
}

export default Blog