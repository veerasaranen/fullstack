import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { timer } from '../reducers/notificationReducer'


const AnecdoteList = () => {

  const anecdotes = useSelector( state => state.anecdotes ) 
  const filtered =  useSelector( state => state.filter )
  const dispatch = useDispatch()

  const vote = async (id) => {
    const anecdote = anecdotes.find( anecdote => anecdote.id === id)
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    
    dispatch(voteAnecdote(id, voted))
    dispatch(timer(`Voted for '${anecdote.content}'`, 5))
  }

  if (filtered.length > 0) {
    return (
      <div>
        {[...filtered].sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList