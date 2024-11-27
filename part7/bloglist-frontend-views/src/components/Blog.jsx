import { useState } from 'react'
import Details from './Details'
import blogService from '../services/blogs'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import {
  Button
} from '@mui/material'

const Blog = ({ blog, user }) => {
  const queryClient = useQueryClient()

  const blogStyle = {
    paddingLeft: 20,
    paddingBottom: 10,
  }
  /*
  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }
  */
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const deleteBlog = () => {
    if (
      window.confirm(
        `Are you sure you want to remove ${blog.title} by ${blog.author}`
      )
    ) {
      const id = blog.id
      deleteBlogMutation.mutate(id)
    }
  }

  if (user.username === blog.user.username) {
    return (
      <div style={blogStyle}>
        <Link to={`/blogs/${blog.id}`}>
          <p className="blogContent">
            {blog.title} by {blog.author}
          </p>
        </Link>
        <Button variant="contained" onClick={deleteBlog}>delete</Button>
      </div>
    )
  }

  /*
  <div style={hideWhenVisible} className='view'>
          <button onClick={() => setDetailsVisible(true)}>view</button>
        </div>
        <div style={showWhenVisible} className='details'>
          <Details blog={blog}/>
          <button onClick={() => setDetailsVisible(false)}>hide</button>
        </div>
        <br></br>

        <div style={hideWhenVisible} className="view">
        <button onClick={() => setDetailsVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible} className="details">
        <Details blog={blog} />
        <button onClick={() => setDetailsVisible(false)}>hide</button>
      </div>
      <br></br>
  */

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        <p className="blogContent">
          {blog.title} by {blog.author}
        </p>
      </Link>
    </div>
  )
}

export default Blog
