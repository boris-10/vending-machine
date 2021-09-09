import React, { createContext, useState, FC, useEffect } from 'react'
import axios from 'axios'

import User from '../models/User'

type AuthContextState = {
  currentUser: Partial<User> | null
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
  const [currentUser, setCurrentUser] = useState<Partial<User> | null>(null)

  useEffect(() => {
    if (location.pathname === '/login') {
      return
    }

    ;(async () => {
      const { data: user } = await axios('/auth/me')
      setCurrentUser(user)
    })()
  }, [])

  const login = async (username: string, password: string) => {
    const { data: tokenResponse } = await axios.post('/auth/login', { username, password })
    localStorage.setItem('jwt', tokenResponse.accessToken)

    const { data: user } = await axios('/auth/me')
    setCurrentUser(user)
  }

  const logout = () => {
    localStorage.removeItem('jwt')
    setCurrentUser(null)
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
