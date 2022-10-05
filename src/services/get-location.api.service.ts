import axios from 'axios'

const getLocation = async () => {
    const apiKey = process.env.ACCUWEATHER_API
    const response = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=-22.9485%2C-43.3436&language=pt-br`)


    return response.data.Key

}

export default getLocation