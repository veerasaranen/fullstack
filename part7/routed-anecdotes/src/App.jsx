import { useState } from 'react'
import { useField } from './hooks/index'

import {
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate
} from 'react-router-dom'

const Menu = () => {

  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to='/about'>about</Link>
    </div>
  )
}

const Notification = ({ notification }) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification === '') {
    return (
      <div></div>
    )
  }

  return (
    <div>
      <br></br>
      <div style={style}>
        {notification}
      </div>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link> 
        </li>
      )}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <div>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </div>
    </div>
  )
}

const CreateNew = (props) => {
  /*const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  */

  const contentInput = useField('content')
  const authorInput = useField('author')
  const infoInput = useField('info')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    /*props.addNew({
      content,
      author,
      info,
      votes: 0
    })*/

   props.addNew({
     content: contentInput.value,
     author: authorInput.value,
     info: infoInput.value,
     votes: 0
   })

    navigate('/')
  }

  //The reset button works with nothing for the onClick operation

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input {...contentInput} />
        </div>
        <div>
          author
          <input {...authorInput} />
        </div>
        <div>
          url for more info
          <input {...infoInput} />
        </div>
        <button onClick={handleSubmit}>create</button>
        <button>reset</button> 
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote '${anecdote.content}' created`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdoteById(Number(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
        <Menu />
        <Notification notification={notification}/>
        <Routes>
          <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        </Routes>
      <br></br>
      <Footer />
    </div>
  )
}

export default App
