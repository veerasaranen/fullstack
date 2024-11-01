import { useMutation } from '@tanstack/react-query'
import { create } from '../requests'
import { useContext } from 'react'
import CounterContext from '../CounterContext'
import { useQueryClient } from '@tanstack/react-query'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const [notification, dispatch] = useContext(CounterContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: create,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      }, 50)
    },
    onError: (error) => {
      if (error.status === 400)
        dispatch({ type: 'ERROR' })
        setTimeout(() => {
          dispatch({ type: 'RESET'})
        }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')

    dispatch({ type: 'ADD', payload: content})
    console.log(notification)
    setTimeout(() => {
      dispatch({ type: 'RESET'})
    }, 5000)

    console.log(notification)

    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
