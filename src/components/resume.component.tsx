import React, { Component, useEffect, useState } from 'react'
import useEase from '../hooks/ease-number.hooks';
import layout from '../styles/layout.module.scss'
import { BsSunset, BsSunrise } from 'react-icons/bs'
import { TiWeatherCloudy } from 'react-icons/ti'
import useClock from '../hooks/clock.hooks';
import { ILocation } from '../types/location.type';
import { IForeCast } from '../types/forecast.type';
import { ICurrentWeather } from '../types/curent.type';
import { IDailyForecast } from '../types/daily-forecast';
import icons from '../helpers/icons.helper';
import useLocation from '../hooks/location.hooks';
import { useRecoilValue } from 'recoil';
import forecastAtom from '../hooks/forecast.hook.atom';
import cityAtom from '../hooks/city.hook.atom';
import getCurrentCondition from '../services/get-current-condition.service';

function Resume() {

    const forecast = useRecoilValue(forecastAtom)
    const city = useRecoilValue(cityAtom)
    const [weather, setWeather] = useState({} as ICurrentWeather)


    const currentTime = useClock()
    const [dayTime, setDayTime] = useState("day")
    const [sun, setSun] = useState({
        rise: "",
        set: ""
    })



    const treatSun = () => {
        if (forecast.DailyForecasts === undefined) {
            return {
                rise: "",
                set: ""
            }
        }
        const riseRaw = new Date(forecast.DailyForecasts[0].Sun.Rise)
        const setRaw = new Date(forecast.DailyForecasts[0].Sun.Set)
        const riseHour = riseRaw.getHours()
        const riseMinute = riseRaw.getMinutes()

        const setHour = setRaw.getHours()
        const setMinute = setRaw.getMinutes()

        const currentHour = new Date().getHours()

        if (currentHour >= riseHour && currentHour <= setHour) {
            setDayTime("day")
        } else {
            setDayTime("night")
        }

        setSun({
            rise: `${riseHour < 10 ? '0' + riseHour : riseHour}:${riseMinute < 10 ? '0' + riseMinute : riseMinute} `,
            set: `${setHour < 10 ? '0' + setHour : setHour}:${setMinute < 10 ? '0' + setMinute : setMinute}`
        })
    }

    const getConditions = async () => {
        const response = await getCurrentCondition(city.Key)
        if (response) {
            setWeather(response[0])
            console.log(forecast);

        }

    }


    useEffect(() => {
        if (city.Key === undefined) {
            return
        }
        treatSun()
        getConditions()
    }, [city, forecast])

    return (
        <div className={layout[dayTime]} >
            <div className={layout['wheater-container']}>
                <div className={layout['city-info-container']}>
                    <div>
                        <h1 className={layout['city-name']}>{city.LocalizedName?.split(' ')[0]}</h1>
                        <p>{`${city.AdministrativeArea?.LocalizedName}, ${city.AdministrativeArea?.ID}`}</p>
                    </div>
                    <h1>{currentTime}</h1>
                </div>
                <div className={layout['temps-info-container']}>
                    {weather.WeatherIcon && React.createElement(icons[weather?.WeatherIcon], {
                        size: 125
                    })}
                    <h1>
                        {weather.ApparentTemperature?.Metric.Value}&#176;C
                    </h1>
                    <span>Sensação termica: {weather?.RealFeelTemperature?.Metric?.Value}&#176;C</span>

                    <p>{weather?.WeatherText}</p>
                </div>

                <div className={layout['sun-info']}>
                    <div>
                        <BsSunrise size={50} />
                        <div>
                            <p>Nascer do Sol</p>
                            <h1>{sun.rise} AM</h1>
                        </div>
                    </div>
                    <div>
                        <BsSunset size={50} />
                        <div>
                            <p>Por do Sol</p>
                            <h1>{sun.set} PM</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Resume