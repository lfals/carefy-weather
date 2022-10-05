import type { NextPage } from 'next'
import { Layout } from '../components'
import Resume from '../components/resume.component'
import layout from '../styles/layout.module.scss'
import main from '../styles/home.module.scss'
import { monthArray, shortMonthArray, weekArray } from '../helpers/date.helper'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import { FiWind } from 'react-icons/fi'
import Details from '../components/details.component'

const Home: NextPage = () => {

  return (
    <Layout>
      <Details />
      <Resume />
    </Layout>
  )
}

export default Home
