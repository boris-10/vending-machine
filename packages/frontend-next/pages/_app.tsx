import axios from 'axios'
import { QueryClient, QueryClientProvider } from 'react-query'

import AuthContextProvider from '../providers/AuthProvider'
import Layout from '../components/core/Layout'

import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

const queryClient = new QueryClient()

axios.interceptors.request.use((request) => {
  request.baseURL = 'http://localhost:8080'

  const token = localStorage.getItem('jwt')?.toString()
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`
  }

  return request
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </AuthContextProvider>
  )
}
export default MyApp
