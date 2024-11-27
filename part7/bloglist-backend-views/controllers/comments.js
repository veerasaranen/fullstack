const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
require('express-async-errors')

commentsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const comments= await Comment.find({ blog: id }).populate('blog')
  response.json(comments)
})

commentsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const id = request.params.id

  if (body.comment === undefined) {
    return response.status(400).json({ error: 'comment missing' })
  }

  console.log('comments', id)

  const comment = new Comment({
    comment: body.comment,
    blog: id
  })

  const result = await comment.save()

  response.status(201).json(result)

})

module.exports = commentsRouter