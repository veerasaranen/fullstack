import Notification from './Notification'
import loginService from '../services/login'
import blogService from '../services/blogs'
import BlogContext from '../contexts/notificationContext'
import userContext from '../contexts/userContext'
import usernameContext from '../contexts/usernameContext'
import passwordContext from '../contexts/passwordContext'
import { useContext } from 'react'

const Login = () => {
  const [notification, notificationDispatch] = useContext(BlogContext)
  const [user, userDispatch] = useContext(userContext)
  const [username, usernameDispatch] = useContext(usernameContext)
  const [password, passwordDispatch] = useContext(passwordContext)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      userDispatch({ type: 'SET', payload: user })
    } catch (exception) {
      usernameDispatch({ type: 'SET', payload: '' })
      passwordDispatch({ type: 'SET', payload: '' })
      notificationDispatch({
        type: 'NEW_NOTIFICATION',
        payload: 'Wrong credentials',
      })
      setTimeout(() => {
        notificationDispatch({ type: 'NEW_NOTIFICATION', payload: null })
      }, 5000)
    }
  }

  return (
    <div>
      <h2 className="loginPage">Log in</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) =>
              usernameDispatch({ type: 'SET', payload: target.value })
            }
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) =>
              passwordDispatch({ type: 'SET', payload: target.value })
            }
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
