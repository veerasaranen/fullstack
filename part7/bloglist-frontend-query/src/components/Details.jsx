import blogService from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Details = ({ blog }) => {

  const queryClient = useQueryClient()

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const like = () => {
    likeBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
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