import axios from "axios";
import { ICurrentWeather } from "../types/curent.type";

const getCurrentCondition = async (location: number | string) => {
    try {
        if (location === undefined) {
            console.error("Location Key can't be empty");
            return

        }
        const apiKey = process.env.ACCUWEATHER_API
        const response = await axios.get(`${process.env.ACCUWEATHER_API_BASE_URL}currentconditions/v1/${location}?apikey=${apiKey}&language=pt-br&details=true`)
        const current: ICurrentWeather[] = response.data
        return current
    } catch (error) {
        console.log(error);

    }
}

export default getCurrentCondition