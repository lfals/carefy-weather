import React, { ReactNode } from 'react'
import layout from '../styles/card.module.scss'


function Card({ children, title }: { children: ReactNode, title: string }) {
    return (
        <div className={layout['content-card']}>
            <p className={layout.title}>{title}</p>
            <div className={layout['card-body']}>
                {children}
            </div>
        </div>

    )
}

export default Card