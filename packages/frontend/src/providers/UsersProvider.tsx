import React, { createContext, useState, FC } from 'react'
import User from '../models/User'

type UsersContextState = {
  users: User[]
  upsertUser: (user: User) => void
}

const contextDefaultValues: UsersContextState = {
  users: [],
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

  return (
    <UsersContext.Provider
      value={{
        users,
        upsertUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}

export default UsersContextProvider
