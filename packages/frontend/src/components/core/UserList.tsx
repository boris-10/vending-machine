import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'

import User from '../../models/User'

interface UserListProps {
  onSelect: (user: User) => void
}

function UserList(props: UserListProps): JSX.Element {
  const { isLoading, isError, data, error } = useQuery('fetchUsers', () => axios('/users'))

  return (
    <div className="UserList">
      {data?.data.map((user: User) => (
        <div key={user.id} onClick={() => props.onSelect(user)} className="UserItem">
          <b>{user.username}</b>
        </div>
      ))}
    </div>
  )
}

export default UserList
