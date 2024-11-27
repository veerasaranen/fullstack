import BlogContext from '../contexts/notificationContext'
import userContext from '../contexts/userContext'
import Notification from './Notification'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Blog from './Blog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef, useContext } from 'react'
import blogService from '../services/blogs'
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'

const Blogs = ({ blogs }) => {
  const [notification, notificationDispatch] = useContext(BlogContext)
  const [user, userDispatch] = useContext(userContext)

  const getId = () => (100000 * Math.random()).toFixed(0)

  const blogFromRef = useRef()

  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const handleCreation = async (blogObject) => {
    blogFromRef.current.toggleVisibility()
    newBlogMutation.mutate({ ...blogObject, id: getId() })
  }

  return (
    <BlogContext.Provider value={[notification, notificationDispatch]}>
      <div>
        <Notification message={notification} />
        <Togglable buttonLabel="create a blog" ref={blogFromRef}>
          <BlogForm createBlog={handleCreation} user={user} />
        </Togglable>
        <h2>blogs</h2>
        <TableContainer>
          <Table>
            <TableBody>
              {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <Blog blog={blog} user={user} />
                    </TableCell>
                    <TableCell>{blog.user.username}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </BlogContext.Provider>
  )
}

export default Blogs
