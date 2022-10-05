import axios from 'axios'
import { IForeCast } from '../types/forecast.type';

const getDailyForecast = async (location: number | string) => {
    try {
        if (location === undefined) {
            console.error("Location Key can't be empty");
            return

        }
        const apiKey = process.env.ACCUWEATHER_API
        const response = await axios.get(`${process.env.ACCUWEATHER_API_BASE_URL}forecasts/v1/daily/5day/${location}?apikey=${apiKey}&language=pt-br&details=true`)
        const forecasts: IForeCast = response.data
        return forecasts
    } catch (error) {
        console.log(error);

    }
}

export default getDailyForecast