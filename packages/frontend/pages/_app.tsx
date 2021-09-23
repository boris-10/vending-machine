import { ReactElement, ReactNode, useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'
import ReactNotification, { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import User, { UserRole } from '../models/User'
import { AuthContext } from '../providers/AuthProvider'

import 'tailwindcss/tailwind.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const queryClient = new QueryClient()

axios.interceptors.request.use((request) => {
  request.baseURL = 'http://localhost:8080'

  const token = localStorage.getItem('jwt')
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`
  }

  return request
})

axios.interceptors.response.use(undefined, (error) => {
  const message = Array.isArray(error.response?.data?.message)
    ? error.response?.data?.message.join('\n')
    : error.response?.data?.message

  store.addNotification({
    title: 'Error',
    message,
    type: 'danger',
    insert: 'top',
    container: 'top-right',
    dismiss: { duration: 3000, onScreen: true },
  })

  return Promise.reject(error)
})

function App({ Component, pageProps }: AppPropsWithLayout) {
  const { auth, roles } = pageProps
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    if (!auth) {
      return
    }

    ;(async () => {
      try {
        const { data: user }: { data: User } = await axios('/users/me')
        setCurrentUser(user)
      } catch (error) {
        router.push('/login')
      }
    })()
  }, [])

  const login = async (username: string, password: string) => {
    const { data: token } = await axios.post('/sign-in', { username, password })
    localStorage.setItem('jwt', token)

    const { data: user } = await axios('/users/me')
    setCurrentUser(user)
    if (user?.role === UserRole.Buyer) {
      router.push('/vending-machine')
    } else {
      router.push('/products')
    }
  }

  const logout = async () => {
    localStorage.removeItem('jwt')
    setCurrentUser(null)
  }

  if (auth && !currentUser) {
    return null
  }

  if (auth && currentUser && roles && !roles.includes(currentUser?.role)) {
    router.push('/404')
    return null
  }

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        login,
        logout,
      }}
    >
      <ReactNotification />
      <QueryClientProvider client={queryClient}>{getLayout(<Component {...pageProps} />)}</QueryClientProvider>
    </AuthContext.Provider>
  )
}
export default App
