import { useState, useEffect } from 'react'
import countryService from './services/countryService'
import SearchResults from './components/searchResults'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [country, setCountry] = useState(null)
  const [weatherData, setWeather] = useState(null)

  const api_key = import.meta.env.VITE_SOME_KEY

  const hook = () => {
    countryService
      .get()
      .then(countryList => {
        setCountries(countryList)
        setResults(countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())))
      })
  }

  const weatherHook = () => {
    if (country) {
      countryService
        .getWeather(country, api_key)
        .then(weather => {
          setWeather(weather)
        })
    }
  }

  const resultHook = () => {
    if (results.length === 1) {
      setCountry(results[0])
    }
  }

  useEffect(hook, [search])
  useEffect(weatherHook, [country])
  useEffect(resultHook, [results])

  const handleChange = (event) => {
    event.preventDefault()
    setSearch(event.target.value)
  }

  const handleShowing = (country) => {
    setSearch(country.name.common)
    setCountry(country)
  }

  return (
    <div>
      <h1>Find countries</h1>
      <form>
        Search:  
        <input value={search} onChange={handleChange} />
      </form>
      <SearchResults list={results} show={handleShowing} weather={weatherData} />
    </div>
  )
  
}

export default App