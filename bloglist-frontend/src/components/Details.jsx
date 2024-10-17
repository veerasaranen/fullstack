import blogService from '../services/blogs'

const Details = ({ blog }) => {

  const like = () => {
    const newObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    blogService.update(blog.id, newObject)
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