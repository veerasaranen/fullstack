import { useState, useContext } from 'react'
import BlogContext from '../contexts/notificationContext'

const BlogForm = ({ createBlog, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          data-testid="title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder="title"
        />
      </div>
      <div>
        author:
        <input
          data-testid="author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="author"
        />
      </div>
      <div>
        url:
        <input
          data-testid="url"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          placeholder="url"
        />
      </div>
      <br />
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
