import { createContext } from 'react'

import User from '../models/User'

interface AuthContextState {
  currentUser: User | null
  setCurrentUser: (user: User) => void
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextState>({
  currentUser: null,
  setCurrentUser: (user: User) => undefined,
  login: (username: string, password: string) => Promise.resolve(),
  logout: () => Promise.resolve(),
})
