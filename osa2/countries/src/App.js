import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'

const Countries = ({countries, showCountry}) => {
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countries.length === 1) {
    return (
      countries.map(country => (
        <div key={country.name.common}>
          <Country country={country} />
        </div>
      ))
    )
  } else {
    return (
      countries.map(country => (
        <div key={country.name.common}>
          {country.name.common}
            <button
            value={country.name.common}
            onClick={() => showCountry(country)}>
              show
            </button>
          </div>
      ))
    )
  }
}

const Country = ({country}) => {
  const [temp, setTemp] = useState('')
  const [wind, setWind] = useState('')
  const [icon, setIcon] = useState('')

  const latitude = country.capitalInfo.latlng[0]
  const longitude = country.capitalInfo.latlng[1]
  useEffect(() => {
    weatherService
      .getWeather(latitude, longitude)
      .then(response => {
        setTemp(response.current.temp)
        setWind(response.current.wind_speed)
        setIcon(response.current.weather[0].icon)
      })
  })
  const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

  return (
    <div key={country.name.common}>
          <h1>{country.name.common}</h1>
          capital {country.capital}<br></br>
          area {country.area}
          <h2>languages:</h2>
          <ul>
            <Languages languages={country.languages} />
          </ul>
          <img src={country.flags.png} width="200"></img>
          <h2>Weather in {country.capital}</h2>
          temperature {temp} Celcius<br></br>
          <img src={iconUrl}></img><br></br>
          wind {wind} m/s
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
  const [allCountries, setAllCountries] = useState([])
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setAllCountries(initialCountries)
      })
  }, [])

  const handleFilterChange = (event) => {
    const newFilter = event.target.value
    setNewFilter(newFilter)
    setCountries(allCountries.filter(country => country.name.common.toLowerCase().includes(newFilter)))
    console.log(countries)
  }

  const showCountry = (country) => {
    const name = country.name.common
    setCountries(countries.filter(country => country.name.common === name))
  }

  return (
    <div>
      find countries<input value={filter.toLowerCase()} onChange={handleFilterChange}></input>
        <Countries
        showCountry={showCountry}
        countries={countries.filter(country => country.name.common.toLowerCase().includes(filter))}
        />
    </div>
  )
}

export default App;
