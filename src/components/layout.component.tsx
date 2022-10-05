import React, { ReactNode } from 'react'
import style from '../styles/layout.module.scss'

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className={style.container}>{children}</div>
    )
}

export default Layout