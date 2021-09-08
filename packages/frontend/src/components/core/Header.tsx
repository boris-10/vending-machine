import React from 'react'
import { Link } from 'react-router-dom'

function Header(): JSX.Element {
  return (
    <div className="Header">
      <div className="Header__links">
        <Link to="/vending-machine">VENDING MACHINE</Link>
        <Link to="/products">PRODUCTS</Link>
        <Link to="/users">USERS</Link>
      </div>

      <span>TODO username</span>
    </div>
  )
}

export default Header
