import axios from 'axios'

const getWeather = async (location: number) => {
    if (location === undefined) {
        console.error("Location Key can't be empty");
        return

    }
    const apiKey = process.env.ACCUWEATHER_API
    const response = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${location}?apikey=${apiKey}&language=pt-br`)
    return response.data
}

export default getWeather