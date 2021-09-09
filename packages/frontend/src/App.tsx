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

const buyerRoutes = [
  { path: '/vending-machine', component: <VendingMachinePage /> },
  { path: '/', component: <Redirect to="/vending-machine" /> },
  { path: '*', component: <Redirect to="/" /> },
]

const sellerRoutes = [
  {
    path: '/products/create',
    component: (
      <ProductsContextProvider>
        <ProductPage />
      </ProductsContextProvider>
    ),
  },
  {
    path: '/products/:productId/edit',
    component: (
      <ProductsContextProvider>
        <ProductPage />
      </ProductsContextProvider>
    ),
  },
  { path: '/products', component: <ProductListPage /> },
  { path: '/users/create', component: <UserPage /> },
  { path: '/users/:userId/edit', component: <UserPage /> },
  { path: '/users', component: <UserListPage /> },
  { path: '/', component: <Redirect to="/products" /> },
  { path: '*', component: <Redirect to="/" /> },
]

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

            {currentUser?.role === UserRole.Buyer &&
              buyerRoutes.map(({ path, component }, i) => (
                <Route key={i} path={path}>
                  {component}
                </Route>
              ))}

            {currentUser?.role === UserRole.Seller &&
              sellerRoutes.map(({ path, component }, i) => (
                <Route key={i} path={path}>
                  {component}
                </Route>
              ))}
          </Switch>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
