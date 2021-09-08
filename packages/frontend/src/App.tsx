import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import './App.css'
import LoginPage from './components/pages/LoginPage'
import ProductsContextProvider from './providers/ProductsProvider'
import ProductListPage from './components/pages/ProductListPage'
import ProductPage from './components/pages/ProductPage'
import UsersContextProvider from './providers/UsersProvider'
import UserListPage from './components/pages/UserListPage'
import UserPage from './components/pages/UserPage'
import VendingMachinePage from './components/pages/VendingMachinePage'

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <Link to="/vending-machine">VENDING MACHINE</Link>
        <br />
        <Link to="/products">PRODUCTS</Link>
        <br />
        <Link to="/users">USERS</Link>

        <br />
        <br />

        <Switch>
          <Route path="/login">
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
            <UsersContextProvider>
              <UserPage />
            </UsersContextProvider>
          </Route>
          <Route path="/user/create">
            <UsersContextProvider>
              <UserPage />
            </UsersContextProvider>
          </Route>
          <Route path="/vending-machine">
            <VendingMachinePage />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
