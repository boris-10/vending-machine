import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import axios from 'axios'

import './App.css'
import { AuthContext } from './providers/AuthProvider'
import LoginPage from './components/pages/LoginPage'
import ProductsContextProvider from './providers/ProductsProvider'
import ProductListPage from './components/pages/ProductListPage'
import ProductPage from './components/pages/ProductPage'
import UserListPage from './components/pages/UserListPage'
import UserPage from './components/pages/UserPage'
import VendingMachinePage from './components/pages/VendingMachinePage'
import Header from './components/core/Header'

const queryClient = new QueryClient()

axios.interceptors.request.use(
  (request) => {
    request.baseURL = 'http://localhost:8080'

    const token = localStorage.getItem('jwt')?.toString()
    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`
    }
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

function App(): JSX.Element {
  const { currentUser } = useContext(AuthContext)
  const isLoggedIn = Boolean(localStorage.getItem('jwt'))

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          {!!currentUser && <Header />}
          <br />

          {!isLoggedIn && <Redirect to="/login" />}

          <Switch>
            <Route path="/login">
              {isLoggedIn && <Redirect to="/" />}
              <LoginPage />
            </Route>
            <Route path="/products">
              <ProductListPage />
            </Route>
            <Route path="/product/:productId/edit">
              <ProductsContextProvider>
                <ProductPage />
              </ProductsContextProvider>
            </Route>
            <Route path="/product/create">
              <ProductsContextProvider>
                <ProductPage />
              </ProductsContextProvider>
            </Route>
            <Route path="/users">
              <UserListPage />
            </Route>
            <Route path="/user/:userId/edit">
              <UserPage />
            </Route>
            <Route path="/user/create">
              <UserPage />
            </Route>
            <Route path="/vending-machine">
              <VendingMachinePage />
            </Route>
            <Route exact path="/">
              <Redirect to="/vending-machine" />
            </Route>
          </Switch>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
