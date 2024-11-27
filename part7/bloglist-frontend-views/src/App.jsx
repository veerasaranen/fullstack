import { useEffect, useReducer } from 'react'
import blogService from './services/blogs'
import BlogContext from './contexts/notificationContext'
import userContext from './contexts/userContext'
import usernameContext from './contexts/usernameContext'
import passwordContext from './contexts/passwordContext'
import { notificationReducer } from './reducers/notificationReducer'
import { userReducer } from './reducers/userReducer'
import Login from './components/Login'
import Users from './components/Users'
import Blogs from './components/Blogs'
import User from './components/User'
import Blogpost from './components/Blogpost'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Container, Button, AppBar, Toolbar, IconButton } from '@mui/material'

const App = () => {
  const [user, userDispatch] = useReducer(userReducer, null)
  const [username, usernameDispatch] = useReducer(userReducer, '')
  const [password, passwordDispatch] = useReducer(userReducer, '')
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  )

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

  const userQuery = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      axios.get('http://localhost:3003/api/users').then((res) => res.data),
  })

  const users = userQuery.data

  const blogQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: () =>
      axios.get('http://localhost:3003/api/blogs').then((res) => res.data),
  })

  /*<em style={padding}>{user.name} logged in</em> */

  const blogs = blogQuery.data

  if (blogQuery.isLoading) {
    return <div>loading data...</div>
  }

  if (userQuery.isLoading) {
    return <div>loading data...</div>
  }

  const padding = {
    padding: 5,
  }

  if (user === null) {
    return (
      <Container>
        <BlogContext.Provider value={[notification, notificationDispatch]}>
          <userContext.Provider value={[user, userDispatch]}>
            <usernameContext.Provider value={[username, usernameDispatch]}>
              <passwordContext.Provider value={[password, passwordDispatch]}>
                <Login />
              </passwordContext.Provider>
            </usernameContext.Provider>
          </userContext.Provider>
        </BlogContext.Provider>
      </Container>
    )
  }

  return (
    <Container>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
            ></IconButton>
            <Button color="inherit" component={Link} to="/">
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button >
            {user ? (
              <div>
                <Button variant="contained" onClick={handleLogout}>
                  {`logout (${user.username})`}
                </Button>
              </div>
            ) : (
              <Link style={padding} to="/login">
                login
              </Link>
            )}
          </Toolbar>
        </AppBar>

        <div>
          <h1>Blog app</h1>
          <br />
        </div>

        <Routes>
          <Route path="/users/:id" element={<User users={users} />} />
          <Route path="/blogs/:id" element={<Blogpost blogs={blogs} />} />
          <Route
            path="/"
            element={
              <BlogContext.Provider
                value={[notification, notificationDispatch]}
              >
                <userContext.Provider value={[user, userDispatch]}>
                  <usernameContext.Provider
                    value={[username, usernameDispatch]}
                  >
                    <passwordContext.Provider
                      value={[password, passwordDispatch]}
                    >
                      <Blogs blogs={blogs} />
                    </passwordContext.Provider>
                  </usernameContext.Provider>
                </userContext.Provider>
              </BlogContext.Provider>
            }
          />
          <Route path="/users" element={<Users users={users} />} />
          <Route
            path="/login"
            element={
              <BlogContext.Provider
                value={[notification, notificationDispatch]}
              >
                <userContext.Provider value={[user, userDispatch]}>
                  <usernameContext.Provider
                    value={[username, usernameDispatch]}
                  >
                    <passwordContext.Provider
                      value={[password, passwordDispatch]}
                    >
                      <Login />
                    </passwordContext.Provider>
                  </usernameContext.Provider>
                </userContext.Provider>
              </BlogContext.Provider>
            }
          />
        </Routes>
      </Router>
    </Container>
  )
}

export default App
