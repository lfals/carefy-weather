import type { NextPage } from 'next'
import { Layout } from '../components'
import Resume from '../components/resume.component'
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
