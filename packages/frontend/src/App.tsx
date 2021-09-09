import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import axios from 'axios'

import { AuthContext } from './providers/AuthProvider'
import LoginPage from './components/pages/LoginPage'
import ProductsContextProvider from './providers/ProductsProvider'
import ProductListPage from './components/pages/ProductListPage'
import ProductPage from './components/pages/ProductPage'
import UserListPage from './components/pages/UserListPage'
import UserPage from './components/pages/UserPage'
import VendingMachinePage from './components/pages/VendingMachinePage'
import Header from './components/core/Header'
import { UserRole } from './models/User'

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
          {!isLoggedIn && <Redirect to="/login" />}

          <Switch>
            <Route path="/login">
              {isLoggedIn && <Redirect to="/" />}
              <LoginPage />
            </Route>
            <Route path="/users/create">
              <UserPage />
            </Route>

            {currentUser?.role === UserRole.Buyer && [
              <Route key={0} path="/vending-machine">
                <VendingMachinePage />
              </Route>,
              <Route key={1} exact path="/">
                <Redirect to="/vending-machine" />
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
              <Route key={3} path="/users/:userId/edit">
                <UserPage />
              </Route>,
              <Route key={4} path="/users">
                <UserListPage />
              </Route>,
              <Route key={5} exact path="/">
                <Redirect to="/products" />
              </Route>,
            ]}

            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
