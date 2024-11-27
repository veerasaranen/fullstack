import { useContext } from 'react'
import BlogContext from '../contexts/notificationContext'
import { Alert } from '@mui/material'

const Notification = () => {
  const [notification] = useContext(BlogContext)

  const padding = {
    paddingBottom: 20,
  }

  if (notification === null) {
    return null
  }

  if (notification === 'Wrong credentials') {
    return (
      <div style={padding}>
        <Alert severity="error">{notification}</Alert>
      </div>
    )
  }
  return (
    <div style={padding}>
      <Alert>{notification}</Alert>
    </div>
  )
}

export default Notification
