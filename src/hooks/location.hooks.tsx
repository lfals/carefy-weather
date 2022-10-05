import React, { useEffect, useState } from 'react'
import getCurrentCondition from '../services/get-current-condition.service'
import getDailyForecast from '../services/get-forecast.api.service'
import getForecast from '../services/get-dailyforecast.api.service'
import getLocation from '../services/get-location.api.service'
import { CitySearch } from '../types/city-search'
import { ICurrentWeather } from '../types/curent.type'
import { IDailyForecast } from '../types/daily-forecast'
import { IForeCast } from '../types/forecast.type'
import { ILocation } from '../types/location.type'

function useLocation() {

    const [weatherData, setWeatherData] = useState({} as ICurrentWeather)
    const [forecastData, setForecast] = useState({} as IForeCast)
    const [forecastDailyData, setDailyForecast] = useState({} as IDailyForecast)
    const [locationData, setLocationData] = useState({} as CitySearch)
    const [searchedLocation, setSearchedLocation] = useState({} as CitySearch)


    // const location = (position: GeolocationPosition) => {
    //     const { latitude, longitude } = position.coords
    //     queryLocation({ latitude, longitude })
    // }

    // const queryLocation = async ({ latitude, longitude }: IGeoLocation) => {
    //     const location = await getLocation({ latitude, longitude })
    //     setLocationData(location)
    //     queryForecast(location.Key)
    //     queryDailyForecast(location.Key)
    //     queryWeather(location.Key)
    // }

    // const queryForecast = async (key: number | string) => {

    //     if (key === "") {
    //         console.error("Erro ao encontrar localização");
    //         return
    //     }
    //     const forecast = await getForecast(key)

    //     if (forecast === undefined) {
    //         console.error("Erro ao encontrar localização");
    //         return
    //     }
    //     setForecast(forecast)
    // }

    // const queryDailyForecast = async (key: number | string) => {
    //     const forecast = await getDailyForecast(key)
    //     if (forecast === undefined) {
    //         console.error("Erro ao encontrar localização");
    //         return
    //     }
    //     setDailyForecast(forecast)
    // }

    // const queryWeather = async (key: number | string) => {
    //     const weather = await getCurrentCondition(key)
    //     if (weather === undefined) {
    //         console.error("Erro ao encontrar localização");
    //         return
    //     }

    //     setWeatherData(weather[0])
    // }

    // useEffect(() => {
    //     if (!searchedLocation) {
    //         navigator.geolocation.getCurrentPosition(location)
    //     }
    // }, [])

    // useEffect(() => {
    //     if (searchedLocation) {
    //         setLocationData(searchedLocation)
    //         queryForecast(searchedLocation.Key)
    //         queryForecast(searchedLocation.Key)
    //         queryDailyForecast(searchedLocation.Key)
    //         queryWeather(searchedLocation.Key)
    //     }
    // }, [])

    useEffect(() => {
        console.log("akjshdjhiasjdh");
    }, [])



    return {
        weatherData,
        forecastData,
        forecastDailyData,
        locationData,
        searchedLocation,
        setSearchedLocation
    }

}

export default useLocation