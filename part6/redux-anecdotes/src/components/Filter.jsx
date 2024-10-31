import { useDispatch, useSelector } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector( state => state.anecdotes )

    const handleChange = (event) => {
      event.preventDefault()
      const search = event.target.value
      const filtered = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(search.toLowerCase()))

      dispatch(filterChange(filtered))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div>
        <h2>Anecdotes</h2>
        <div style={style}>
          filter <input onChange={handleChange} />
        </div>
      </div>
    )
  }
  
  export default Filter
