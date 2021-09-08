import React, { createContext, useState, FC } from 'react'
import User from '../models/User'

type UsersContextState = {
  users: User[]
  findUserById: (id: string) => User | undefined
  upsertUser: (user: User) => void
}

const contextDefaultValues: UsersContextState = {
  users: [
    { id: '1', username: 'user-1', password: '12345', deposit: 1000, role: 1 },
    { id: '2', username: 'user-2', password: '12345', deposit: 2000, role: 1 },
    { id: '3', username: 'user-3', password: '12345', deposit: 3000, role: 1 },
    { id: '4', username: 'user-4', password: '12345', deposit: 4000, role: 1 },
  ],
  findUserById: () => undefined,
  upsertUser: () => undefined,
}

export const UsersContext = createContext<UsersContextState>(contextDefaultValues)

const UsersContextProvider: FC = ({ children }) => {
  const [users, setUsers] = useState<User[]>(contextDefaultValues.users)

  const upsertUser = (user: User) => {
    if (user.id) {
      // POST
    } else {
      // PUT
    }
    setUsers((users) => [...users, user])
  }

  const findUserById = (id: string) => {
    return users.find((user) => user.id === id)
  }

  return (
    <UsersContext.Provider
      value={{
        users,
        upsertUser,
        findUserById,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}

export default UsersContextProvider
