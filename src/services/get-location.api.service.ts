import axios from 'axios'
import { ILocation } from '../types/location.type'



const getLocation = async ({ latitude, longitude }: IGeoLocation) => {
    try {
        const apiKey = process.env.ACCUWEATHER_API
        const response = await axios.get(`${process.env.ACCUWEATHER_API_BASE_URL}locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${latitude}%2C${longitude}&language=pt-br`)
        const location: ILocation = response.data
        return location
    } catch (error) {
        console.log(error);

    }
}

export default getLocation