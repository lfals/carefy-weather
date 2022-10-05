import axios from 'axios'
import { IDailyForecast } from '../types/daily-forecast';

const getForecast = async (location: number | string) => {

    try {
        const apiKey = process.env.ACCUWEATHER_API
        const response = await axios.get(`${process.env.ACCUWEATHER_API_BASE_URL}forecasts/v1/daily/1day/${location}?apikey=${apiKey}&language=pt-br&details=true`)
        const forecasts: IDailyForecast = response.data
        return forecasts
    } catch (error) {
        console.log(error);

    }
}

export default getForecast