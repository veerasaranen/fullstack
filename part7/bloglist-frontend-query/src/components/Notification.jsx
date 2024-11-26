import { useContext } from 'react'
import BlogContext from '../contexts/notificationContext'

const Notification = () => {
  const noteStyle = {
    color: 'darkblue',
    background: 'lightblue',
    fontSize: 14,
    padding: 10,
    marginBottom: 10,
  }

  const [notification] = useContext(BlogContext)

  if (notification === null) {
    return null
  }

  return <div style={noteStyle}>{notification}</div>
}

export default Notification
