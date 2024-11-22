import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'
import { appendBlog } from './reducers/blogReducer'
import { getBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
  const [blogState, setBlogState] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.users)


  // so the problem is not the user, the problem is that this does not happen when i need it to (after creation)
  useEffect(() => {
    console.log('here')
    console.log(blogs)
    dispatch(getBlogs())
    console.log(blogs)
  }, [blogState])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(createNotification('Wrong credentials'))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const blogFromRef = useRef()

  const handleCreation = async (blogObject) => {
    blogFromRef.current.toggleVisibility()
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
    setBlogState(blogState.concat(newBlog))
  }

  if (user === null) {
    return (
      <div>
        <h2 className='loginPage'>Log in</h2>
        <Notification message={notification}/>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              data-testid='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              data-testid='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  //.sort((a, b) => b.likes - a.likes)

  //console.log([...blogs].map(blog => blog.id))

  //they have dif ids but it says they dont?? so probelm in the keys? this happened after using the copied version
  return (
    <div>
      <h1>Blog app</h1>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <br/>
      <br/>
      <h2>create a blog</h2>
      <Notification message={notification}/>
      <Togglable buttonLabel="create a blog" ref={blogFromRef}>
        <BlogForm createBlog={handleCreation} user={user} />
      </Togglable>
      <h2>blogs</h2>
      <div>
        {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
          <div key={blog.id} className='blogList'>
            <Blog blog={blog} user={user} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App