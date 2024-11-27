import { useParams } from 'react-router-dom'
import {
  List,
  ListItem
} from '@mui/material'

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find((user) => user.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>{blog.title}</ListItem>
        ))}
      </List>
    </div>
  )
}

export default User
