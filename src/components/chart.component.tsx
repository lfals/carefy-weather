
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { weekArray } from '../helpers/date.helper';
import cityAtom from '../hooks/city.hook.atom';
import getDailyForecast from '../services/get-dailyforecast.api.service';
import { IForeCast } from '../types/forecast.type';
const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false
});

interface IChartData {
    data: {
        min: number[],
        max: number[]
    },
    categories: string[]
}

export const Charts = () => {
    const [chartData, setChartData] = useState({} as IChartData)
    const city = useRecoilValue(cityAtom)
    const getForecast = async () => {
        const response = await getDailyForecast(city.Key)
        if (response) {
            const data = {
                min: response.DailyForecasts?.map(item => parseFloat((5 * (item.Temperature.Minimum.Value - 32) / 9).toFixed(1))),
                max: response.DailyForecasts?.map(item => parseFloat((5 * (item.Temperature.Maximum.Value - 32) / 9).toFixed(1)))
            }
            const categories = response.DailyForecasts?.map(item => weekArray[new Date(item.Date).getDay()])
            setChartData({ data, categories })
        }
    }

    useEffect(() => {
        if (city.Key === undefined) {
            return
        }
        getForecast()
    }, [city])



    const options: ApexOptions = {

        yaxis: {
            show: false
        },
        xaxis: {
            categories: chartData.categories
        },
        grid: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },


        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100]
            }
        },
        chart: {
            toolbar: {
                show: false
            }
        }
    }

    const series = [
        {
            name: "Maxima",
            data: chartData.data?.max
        },
        {
            name: "Mínima",
            data: chartData.data?.min
        }
    ]


    return (
        <>

            <Chart
                options={options}
                series={series}
                type='area'
                height={220}
            />
        </>
    )
}
