import React, { createContext, useState, FC } from 'react'
import axios from 'axios'

import User from '../models/User'

type AuthContextState = {
  currentUser: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const contextDefaultValues: AuthContextState = {
  currentUser: null,
  login: () => Promise.resolve(),
  logout: () => undefined,
}

export const AuthContext = createContext<AuthContextState>(contextDefaultValues)

const AuthContextProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({} as User)

  const login = async (username: string, password: string) => {
    const tokenResponse = await axios.post('http://localhost:8080/auth/login', { username, password })
    localStorage.setItem('jwt', tokenResponse.data.accessToken)

    const userResponse = await axios('http://localhost:8080/users/1')
    setCurrentUser(userResponse.data)
  }

  const logout = () => {
    localStorage.removeItem('jwt')
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
