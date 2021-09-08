import React, { useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'

import { AuthContext } from '../../providers/AuthProvider'
import Button from '../atoms/Button'

function Header(): JSX.Element {
  const { logout } = useContext(AuthContext)
  const history = useHistory()

  const onLogout = () => {
    logout()
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

      <Button onClick={onLogout} text="Logout" />
    </div>
  )
}

export default Header
