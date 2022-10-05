import React, { useEffect } from 'react'
import useEase from '../hooks/ease-number.hooks';
import layout from '../styles/layout.module.scss'
import { BsSunset, BsSunrise } from 'react-icons/bs'

function Resume() {
    const { currentCount, setLength } = useEase()

    const showPosition = async (position: GeolocationPosition) => {
        console.log(position);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(showPosition);
    }, [])
    return (
        <div className={layout.night} >
            <div className={layout['wheater-container']}>
                <div className={layout['city-info-container']}>
                    <div>
                        <h1 className={layout['city-name']}>Resende</h1>
                        <p>Rio de Janeiro, RJ</p>
                    </div>
                    <h1>8:20</h1>
                </div>
                <div className={layout['temps-info-container']}>
                    <img src="https://developer.accuweather.com/sites/default/files/01-s.png" alt="" />
                    <h1>
                        {currentCount}&#176;C
                    </h1>
                    <span>Sensação termica: {currentCount}&#176;C</span>
                    <p>Nublado</p>
                </div>
                <div className={layout['rain-probability']}>
                    <h1>Precipitação</h1>
                    <div>
                        <h3>Dia</h3>
                        <div className={layout['progress-bar']}>
                            <span style={{ width: '75%' }}></span>
                        </div>
                        <h1>85%</h1>
                    </div>
                    <div>
                        <h3>Noite</h3>
                        <div className={layout['progress-bar']}>
                            <span style={{ width: '75%' }}></span>
                        </div>
                        <h1>85%</h1>
                    </div>
                </div>
                <div className={layout['sun-info']}>
                    <div>
                        <BsSunrise size={50} />
                        <div>
                            <p>Nascer do Sol</p>
                            <h1>5:00 AM</h1>
                        </div>
                    </div>
                    <div>
                        <BsSunset size={50} />
                        <div>
                            <p>Nascer do Sol</p>
                            <h1>5:00 AM</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Resume