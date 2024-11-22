import blogService from '../services/blogs'
import { likeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Details = ({ blog }) => {

  const dispatch = useDispatch()

  const like = () => {
    const newObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    blogService.update(blog.id, newObject)
    dispatch(likeBlog(blog.id))
  }

  return (
    <div>
      <p>Url: { blog.url }</p>
      <p>Likes: { blog.likes }</p>
      <button onClick={like}>like</button>
      <p>Creator: { blog.user.name }</p>
    </div>
  )
}

export default Details