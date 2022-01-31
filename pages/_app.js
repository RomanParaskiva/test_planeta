import Layout from '../components/Layout'
import useAuth from '../hooks/auth.hook'
import useUser from '../hooks/user.hook'
import authContext from '../context/authContext'
import userContext from '../context/userContext'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  const { auth } = useAuth(),
        { user } = useUser()

  return (
    <authContext.Provider value={{ auth }}>
      <userContext.Provider value={{ user }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </userContext.Provider>
    </authContext.Provider >
  )
}

export default MyApp
