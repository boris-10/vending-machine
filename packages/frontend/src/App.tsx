import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import axios from 'axios'
import ReactNotification, { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import { AuthContext } from './providers/AuthProvider'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import ProductsContextProvider from './providers/ProductsProvider'
import ProductListPage from './components/pages/ProductListPage'
import ProductPage from './components/pages/ProductPage'
import UserListPage from './components/pages/UserListPage'
import UserPage from './components/pages/UserPage'
import VendingMachinePage from './components/pages/VendingMachinePage'
import Header from './components/core/Header'
import { UserRole } from './models/User'

const queryClient = new QueryClient()

axios.interceptors.request.use((request) => {
  request.baseURL = 'http://localhost:8080'

  const token = localStorage.getItem('jwt')?.toString()
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
    dismiss: { duration: 5000, onScreen: true },
  })

  return Promise.reject(error)
})

function App(): JSX.Element {
  const { currentUser } = useContext(AuthContext)
  const isLoggedIn = Boolean(localStorage.getItem('jwt'))

  return (
    <QueryClientProvider client={queryClient}>
      <ReactNotification />

      <Router>
        <div className="App">
          {!!currentUser && <Header />}
          {!isLoggedIn && <Redirect to="/login" />}

          <Switch>
            <Route path="/login">
              {isLoggedIn && <Redirect to="/" />}
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>

            {currentUser?.role === UserRole.Buyer && [
              <Route key={0} path="/vending-machine">
                <VendingMachinePage />
              </Route>,
              <Route key={1} exact path="/">
                <Redirect to="/vending-machine" />
              </Route>,

              <Route key={8} path="*">
                <Redirect to="/" />
              </Route>,
            ]}

            {currentUser?.role === UserRole.Seller && [
              <Route key={0} path="/products/create">
                <ProductsContextProvider>
                  <ProductPage />
                </ProductsContextProvider>
              </Route>,
              <Route key={1} path="/products/:productId/edit">
                <ProductsContextProvider>
                  <ProductPage />
                </ProductsContextProvider>
              </Route>,
              <Route key={2} path="/products">
                <ProductListPage />
              </Route>,
              <Route key={3} path="/users/create">
                <UserPage />
              </Route>,
              <Route key={4} path="/users/:userId/edit">
                <UserPage />
              </Route>,
              <Route key={5} path="/users">
                <UserListPage />
              </Route>,
              <Route key={6} exact path="/">
                <Redirect to="/products" />
              </Route>,

              <Route key={7} path="*">
                <Redirect to="/" />
              </Route>,
            ]}
          </Switch>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
