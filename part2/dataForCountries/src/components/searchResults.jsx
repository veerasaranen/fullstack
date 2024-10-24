const SearchResults = ({list, show, weather}) => {
  
  if (list.length === 1 && weather) {
    const country = list[0]

    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} </p>
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map( language => 
            <li key={`${language}${country.ccn3}`}>{language}</li>
          )}
        </ul>
        <img src={`${country.flags.png}`} alt={country.flags.alt}></img>
        <h3> Weather in {country.capital} </h3>
        <p> temperature {Math.round((weather.main.temp - 273.15) * 10) / 10} Celsius </p>
        <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt={`${weather.weather[0].description}`} />
        <p> wind {weather.wind.speed} m/s </p>
      </div>
    )
  } else if (list.length === 1) {
    const country = list[0]

    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} </p>
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map( language => 
            <li key={`${language}${country.ccn3}`}>{language}</li>
          )}
        </ul>
        <img src={`${country.flags.png}`} alt={country.flags.alt}></img>
      </div>
    )
  } else if (list.length <= 9 && list.length > 0) {
    return (
      <ul>
        {list.map(country => 
          <div key={country.ccn3}>
            <li> {country.name.common} </li>
            <button onClick={() => show(country)}>Show</button>
          </div>
        )}
      </ul>
    )
  }
  return (
      <p> Too many matches. Type more. </p>
  )
}

export default SearchResults