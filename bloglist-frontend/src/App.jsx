import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [blogs])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
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
      setNotification('Wrong credentials')
      setTimeout(() => {
        setNotification(null)
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
    setBlogs(blogs.concat(newBlog))
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
        <BlogForm createBlog={handleCreation} user={user} setNotification={setNotification}/>
      </Togglable>
      <h2>blogs</h2>
      <div>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <div key={blog.id} className='blogList'>
            <Blog blog={blog} user={user} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App