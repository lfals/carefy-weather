import React from 'react'
import { FiWind } from 'react-icons/fi'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import { monthArray, shortMonthArray, weekArray } from '../helpers/date.helper'
import layout from '../styles/details.module.scss'

function Details() {

    const currentDate = new Date()


    return (
        <div className={layout['content-container']}>
            <div className={layout.header}>
                <div>
                    <h1>{`${monthArray[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</h1>
                    <p>{`${weekArray[currentDate.getDay()]}, ${shortMonthArray[currentDate.getMonth()]} ${currentDate.getDate()} ${currentDate.getFullYear()}`}</p>
                </div>

                <span className={layout['search-input']}>
                    <img src="/search.png" alt="" />
                    <input type="text" />
                </span>
            </div>

            <div className={layout.content}>
                <h3>Resumo de hoje</h3>
                <div>
                    <div className={layout['content-card']}>
                        <p>Temperatura</p>
                        <div>
                            <div>
                                <MdArrowDropDown size={25} color={"#5287ff"} /> <h1>19.7</h1>
                            </div>
                            <div>
                                <MdArrowDropUp size={25} color={"#ff5252"} /> <h1>26.1</h1>
                            </div>
                        </div>
                    </div>
                    <div className={layout['content-card']}>
                        <p>Sensação termica</p>
                        <div>
                            <div>
                                <MdArrowDropDown size={25} color={"#5287ff"} /> <h1>19.7</h1>
                            </div>
                            <div>
                                <MdArrowDropUp size={25} color={"#ff5252"} /> <h1>26.1</h1>
                            </div>
                        </div>
                    </div>
                    <div className={layout['content-card']}>
                        <p>Qualidade do ar</p>
                        <div>
                            <div>
                                <FiWind color={"#5287ff"} size={25} />
                                <h1>Boa</h1>
                            </div>
                        </div>
                    </div>
                    <div className={layout['content-card']}>
                        <p>Índice UV</p>
                        <div>
                            <div>
                                <FiWind color={"#5287ff"} size={25} />
                                <h1>Moderado</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details