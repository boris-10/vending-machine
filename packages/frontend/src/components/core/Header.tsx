import React from 'react'
import { useHistory, Link } from 'react-router-dom'

import Button from '../atoms/Button'

function Header(): JSX.Element {
  const history = useHistory()

  const logout = () => {
    localStorage.removeItem('jwt')
    history.push('/login')
  }

  return (
    <div className="Header">
      <div className="Header__links">
        <Link to="/vending-machine">VENDING MACHINE</Link>
        <Link to="/products">PRODUCTS</Link>
        <Link to="/users">USERS</Link>
      </div>

      <span>TODO username</span>

      <Button onClick={logout} text="Logout" />
    </div>
  )
}

export default Header
