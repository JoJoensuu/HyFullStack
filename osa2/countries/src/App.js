import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({countries}) => {
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countries.length === 1) {
    return (
      countries.map(country => (
        <div>
          <Country country={country} />
        </div>
      ))
    )
  } else {
    return (
      countries.map(country => (
        <div key={country.name.common}>
          <form onSubmit={handleFilterChange}>
          {country.name.common}
            <button type="submit" value={country.name.common}>
              show
            </button>
            </form>
          </div>
      ))
    )
  }
}

const Country = ({country}) => {
  return (
    <div key={country.name.common}>
          <h1>{country.name.common}</h1>
          capital {country.capital}<br></br>
          area {country.area}
          <h2>languages:</h2>
          <ul>
            <Languages languages={country.languages} />
          </ul>handleFilterChange
          <img src={country.flags.png} width="200"></img>
        </div>
  )
}

const Languages = ({languages}) => {
    return (
      Object.entries(languages).map(([key, value]) => (
        <li key={key}>{value}</li>
      ))
    )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      find countries<input value={filter} onChange={handleFilterChange}></input>
        <Countries countries={countries.filter(country => country.name.common.toLowerCase().includes(filter))} />
    </div>
  );
}

export default App;
