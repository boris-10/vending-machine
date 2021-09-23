import { ReactElement, ReactNode, useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import axios from 'axios'
import { NextPage } from 'next'
import { QueryClient, QueryClientProvider } from 'react-query'

import AuthContextProvider from '../providers/AuthProvider'

import 'tailwindcss/tailwind.css'
import Layout from '../components/core/Layout'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const queryClient = new QueryClient()

axios.interceptors.request.use((request) => {
  request.baseURL = 'http://localhost:8080'

  const token = localStorage.getItem('jwt')?.toString()
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`
  }

  return request
})

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  console.log(pageProps)

  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>{getLayout(<Component {...pageProps} />)}</QueryClientProvider>
    </AuthContextProvider>
  )
}
export default App
