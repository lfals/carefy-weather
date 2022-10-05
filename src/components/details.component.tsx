import React, { FormEvent, useEffect, useState } from 'react'
import { FiWind } from 'react-icons/fi'
import { MdArrowDropDown, MdArrowDropUp, MdOutlineWbSunny } from 'react-icons/md'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { monthArray, shortMonthArray, weekArray } from '../helpers/date.helper'
import { useDebounce } from '../hooks/debounce.hook'
import getCityNames from '../services/get-citynames.service'
import getLocation from '../services/get-location.api.service'
import layout from '../styles/details.module.scss'
import { CitySearch } from '../types/city-search'
import { AirAndPollen } from '../types/daily-forecast'
import Card from './card.component'
import { Charts } from './chart.component'
import cityAtom from '../hooks/city.hook.atom'
import getForecast from '../services/get-forecast.api.service'
import { ICity } from '../types/city.type'
import FahrenheitToCelsius from '../helpers/temperature.helper'
import forecastAtom from '../hooks/forecast.hook.atom'
interface IData {
    temperature: {
        max: string | number,
        min: string | number
    },
    realFeel: {
        max: string | number,
        min: string | number
    },
    quality: {
        air: AirAndPollen,
        uv: AirAndPollen
    }
}

function Details() {
    const [city, setCity] = useRecoilState(cityAtom)
    const setForecast = useSetRecoilState(forecastAtom)
    const [search, setSearch] = useState("")
    const [cityOptions, setCityOptions] = useState([] as CitySearch[])
    const [forecastData, setForecastData] = useState({} as IData)
    const deboucedSearch = useDebounce(search, 800)
    const currentDate = new Date()

    const getDailyForecast = async () => {
        const forecast = await getForecast(city.Key)
        if (forecast?.DailyForecasts === undefined) {
            return
        }
        setForecast(forecast)
        const data: IData = {
            realFeel: {
                min: FahrenheitToCelsius(forecast?.DailyForecasts[0].RealFeelTemperature.Minimum.Value),
                max: FahrenheitToCelsius(forecast?.DailyForecasts[0].RealFeelTemperature.Maximum.Value)
            },
            temperature: {
                min: FahrenheitToCelsius(forecast?.DailyForecasts[0].Temperature.Minimum.Value),
                max: FahrenheitToCelsius(forecast?.DailyForecasts[0].Temperature.Maximum.Value)
            },
            quality: {
                air: forecast.DailyForecasts[0].AirAndPollen[0],
                uv: forecast.DailyForecasts[0].AirAndPollen[5]
            }
        }

        setForecastData(data)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (search === "") {
            return
        }
        const searchSplited = search.split('-')
        const localizedName = searchSplited[0].replaceAll(' ', '')
        const AdministrativeAreaId = searchSplited[1].replaceAll(' ', '')
        const selectedOption = cityOptions.filter(item => item.LocalizedName.replaceAll(' ', '') === localizedName).filter(item => item.AdministrativeArea.ID === AdministrativeAreaId)[0]



        const data: ICity = {
            LocalizedName: selectedOption.LocalizedName,
            AdministrativeArea: selectedOption.AdministrativeArea,
            Key: selectedOption.Key
        }
        setCity(data)

        localStorage.setItem('@city:data', JSON.stringify(data))
        setSearch("")
        return
    }

    const queryOptions = async (e: string) => {
        const response = await getCityNames(e)
        if (response) {
            setCityOptions(response)
        }
    }

    const currentLocation = async (e: GeolocationPosition) => {
        const { latitude, longitude } = e.coords
        const response = await getLocation({ latitude, longitude })
        if (response === undefined) {
            return
        }
        const { Key, LocalizedName, AdministrativeArea } = response
        setCity({ Key, LocalizedName, AdministrativeArea })
        localStorage.setItem('@city:data', JSON.stringify({ Key, LocalizedName, AdministrativeArea }))
    }

    useEffect(() => {
        queryOptions(search)
    }, [deboucedSearch])

    useEffect(() => {
        if (city.Key === undefined) {
            return
        }
        getDailyForecast()
    }, [city])

    useEffect(() => {
        const savedCity = localStorage.getItem('@city:data')
        if (savedCity) {
            setCity(JSON.parse(savedCity))
            return
        }
        navigator.geolocation.getCurrentPosition(currentLocation)
    }, [])

    return (

        <div className={layout['content-container']}>
            <div className={layout.header}>
                <div>
                    <h1>{`${monthArray[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</h1>
                    <p>{`${weekArray[currentDate.getDay()]}, ${shortMonthArray[currentDate.getMonth()]} ${currentDate.getDate()} ${currentDate.getFullYear()}`}</p>
                </div>

                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <span className={layout['search-input']}>
                        <img src="/search.png" alt="" />
                        <input id='search' type="text" value={search} onChange={(e) => setSearch(e.target.value)} list="suggestions" autoComplete="off" />
                    </span>
                    <datalist id="suggestions">
                        {cityOptions !== null && cityOptions?.map((item, i) => <option key={i} value={`${item.LocalizedName} - ${item.AdministrativeArea.ID}`} />)}
                    </datalist>
                </form>
            </div>

            <div className={layout.content}>
                <h3>Resumo de hoje</h3>
                <div>
                    <Card title='Temperatura'>
                        <div>
                            <MdArrowDropDown size={25} color={"#5287ff"} /> <h1>{forecastData.temperature?.min}</h1>
                        </div>
                        <div>
                            <MdArrowDropUp size={25} color={"#ff5252"} /> <h1>{forecastData.temperature?.max}</h1>
                        </div>
                    </Card>
                    <Card title='Sensação termica'>
                        <div>
                            <MdArrowDropDown size={25} color={"#5287ff"} /> <h1>{forecastData.realFeel?.min}</h1>
                        </div>
                        <div>
                            <MdArrowDropUp size={25} color={"#ff5252"} /> <h1>{forecastData.realFeel?.max}</h1>
                        </div>
                    </Card>
                    <Card title='Qualidade do ar'>
                        <FiWind color={"#5287ff"} size={25} />
                        <h1>{forecastData.quality?.air?.Category}</h1>
                    </Card>
                    <Card title='Índice UV'>
                        <MdOutlineWbSunny color={"#5287ff"} size={25} />
                        <h1>{forecastData.quality?.uv?.Category}</h1>
                    </Card>
                </div>
            </div>
            <div className={layout.content}>
                <h3>5 Dias</h3>
                <Charts />

            </div>
        </div>
    )
}

export default Details