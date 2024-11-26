import { useEffect, useRef, useReducer } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import BlogContext from './contexts/notificationContext'
import userContext from './contexts/userContext'
import usernameContext from './contexts/usernameContext'
import passwordContext from './contexts/passwordContext'
import { notificationReducer } from './reducers/notificationReducer'
import { userReducer } from './reducers/userReducer'
import Login from './components/Login'

const App = () => {
  const [user, userDispatch] = useReducer(userReducer, null)
  const [username, usernameDispatch] = useReducer(userReducer, '')
  const [password, passwordDispatch] = useReducer(userReducer, '')
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  )

  const queryClient = useQueryClient()

  const getId = () => (100000 * Math.random()).toFixed(0)

  const blogQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: () =>
      axios.get('http://localhost:3003/api/blogs').then((res) => res.data),
  })

  const blogs = blogQuery.data

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      userDispatch({ type: 'SET', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    userDispatch({ type: 'SET', payload: null })
    window.localStorage.removeItem('loggedBlogappUser')
    usernameDispatch({ type: 'SET', payload: '' })
    passwordDispatch({ type: 'SET', payload: '' })
  }

  const blogFromRef = useRef()

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

  if (blogQuery.isLoading) {
    return <div>loading data...</div>
  }

  if (user === null) {
    return (
      <BlogContext.Provider value={[notification, notificationDispatch]}>
        <userContext.Provider value={[user, userDispatch]}>
          <usernameContext.Provider value={[username, usernameDispatch]}>
            <passwordContext.Provider value={[password, passwordDispatch]}>
              <Login />
            </passwordContext.Provider>
          </usernameContext.Provider>
        </userContext.Provider>
      </BlogContext.Provider>
    )
  }

  return (
    <BlogContext.Provider value={[notification, notificationDispatch]}>
      <div>
        <h1>Blog app</h1>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        <br />
        <br />
        <h2>create a blog</h2>
        <Notification message={notification} />
        <Togglable buttonLabel="create a blog" ref={blogFromRef}>
          <BlogForm createBlog={handleCreation} user={user} />
        </Togglable>
        <h2>blogs</h2>
        <div>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <div key={blog.id} className="blogList">
                <Blog blog={blog} user={user} />
              </div>
            ))}
        </div>
      </div>
    </BlogContext.Provider>
  )
}

export default App
