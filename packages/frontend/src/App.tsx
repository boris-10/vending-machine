import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import './App.css'
import Buyer from './components/Buyer'
import Seller from './components/Seller'

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <Link to="/">Buyer</Link>
        <br />
        <Link to="/seller">Seller</Link>

        <br />
        <br />

        <Switch>
          <Route path="/seller">
            <Seller />
          </Route>
          <Route path="/">
            <Buyer />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
