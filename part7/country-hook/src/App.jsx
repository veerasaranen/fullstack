import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => { //this is fucked
  const [country, setCountry] = useState(null)

  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

  useEffect(() => {
    if (name === '') {
      return setCountry(null)
    }

    const request = axios.get(`${baseUrl}/${name}`)
    request.then(response => response.data)
      .then(found => {
        console.log(found)
        setCountry({
          data: {
            name: found.name.common,
            capital: found.capital,
            population: found.population,
            flags: found.flags
          },
          found: true
        })
      }).catch(error => {
        setCountry({found: false})
        console.log(error)
      })
  }, [name])

  return country
}

const Country = ({ country }) => {
  console.log(country)
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

// the image did not show on the screenso i fixed that too

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flags.png} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App