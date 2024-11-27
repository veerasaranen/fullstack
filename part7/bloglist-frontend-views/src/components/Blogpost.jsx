import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import commentService from '../services/comments'
import {
  Button,
  TextField,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  List,
  ListItem
} from '@mui/material'

const Blogpost = ({ blogs }) => {
  const [comment, setComment] = useState('')
  const id = useParams().id
  const blog = blogs.find((n) => n.id === id)

  const getId = () => (100000 * Math.random()).toFixed(0)

  const queryClient = useQueryClient()

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const like = () => {
    likeBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const commentQuery = useQuery({
    queryKey: ['comments'],
    queryFn: () =>
      axios
        .get(`http://localhost:3003/api/blogs/${id}`)
        .then((res) => res.data),
  }) //same comments for everyone??? the state problem in blogform???
  //all of the comments are in every id, although the database shows the right id
  const comments = commentQuery.data

  const addComment = (event) => {
    event.preventDefault()

    handleCreation({
      comment: comment,
      blog: blog,
    })

    setComment('')
  }

  const newCommentMutation = useMutation({
    mutationFn: commentService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
  })

  const handleCreation = async (commentObject) => {
    newCommentMutation.mutate({ ...commentObject, id: getId() })
  }

  const padding = {
    padding: 5,
  }

  if (commentQuery.isLoading) {
    return <div>loading data...</div>
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <a href={`${blog.url}`}>{blog.url}</a>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <p>{blog.likes} likes</p>
              </TableCell>
              <TableCell>
                <Button variant="contained" onClick={like}>
                  like
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <p>added by {blog.user.username}</p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <h3>comments</h3>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id}>{comment.comment}</ListItem>
        ))}
      </List>
      <form onSubmit={addComment}>
        <div>
          <TextField
            label="Comment"
            type="text"
            value={comment}
            name="Comment"
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <div style={padding} />
        <Button variant="contained" type="submit">
          comment
        </Button>
      </form>
    </div>
  )
}

export default Blogpost
