import { useState } from 'react'
import Details from './Details'
import blogService from '../services/blogs'
import { useQueryClient, useMutation } from '@tanstack/react-query'


const Blog = ({ blog, user }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const queryClient = useQueryClient()

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

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const deleteBlog = () => {
    if (window.confirm(`Are you sure you want to remove ${blog.title} by ${blog.author}`)) {
      const id = blog.id
      deleteBlogMutation.mutate(id)
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