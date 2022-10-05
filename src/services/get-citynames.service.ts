import axios from 'axios'
import { ICitySearch } from '../types/city-search';

const getCityNames = async (query: string) => {
    try {
        if (query === "") {
            return null
        }
        const apiKey = process.env.ACCUWEATHER_API
        const response = await axios.get(`${process.env.ACCUWEATHER_API_BASE_URL}locations/v1/cities/autocomplete?apikey=${apiKey}&q=${query}&language=pt-br&details=true`)
        const citySearch: ICitySearch = response.data
        return citySearch
    } catch (error) {
        console.log(error);

    }
}

export default getCityNames
