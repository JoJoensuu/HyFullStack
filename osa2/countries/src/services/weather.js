import axios from 'axios'

const getWeather = (latitude, longitude) => {
    const api_key = process.env.REACT_APP_API_KEY
    const baseUrl = `https://openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { getWeather }