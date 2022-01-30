import Layout from '../components/Layout'
import useAuth from '../hooks/auth.hook'
import authContext from '../context/authContext'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  const { auth } = useAuth()

  return (
    <authContext.Provider value={{auth}}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </authContext.Provider>
  )
}

export default MyApp
