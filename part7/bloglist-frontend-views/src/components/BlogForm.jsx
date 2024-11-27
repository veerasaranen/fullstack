import { useState, useContext } from 'react'
import BlogContext from '../contexts/notificationContext'
import {
  TextField, Button
} from '@mui/material'

const BlogForm = ({ createBlog, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  // tsekkaa viel et onks tää ok

  const [notification, dispatch] = useContext(BlogContext)

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url,
    })

    dispatch({
      type: 'NEW_NOTIFICATION',
      payload: `${title} created by ${user.name}`,
    })
    setTimeout(() => {
      dispatch({ type: 'NEW_NOTIFICATION', payload: null })
    }, 5000)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const padding = {
    padding: 5,
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <TextField
          label="title"
          data-testid="title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder="title"
        />
      </div>
      <div>
        <TextField
          label="author"
          data-testid="author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="author"
        />
      </div>
      <div>
        <TextField
          label="url"
          data-testid="url"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          placeholder="url"
        />
      </div>
      <br />
      <Button variant="contained" color="primary" type="submit" >create</Button>
      <div style={padding}/>
    </form>
  )
}

export default BlogForm
