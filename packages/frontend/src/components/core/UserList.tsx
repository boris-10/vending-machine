import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'

import User from '../../models/User'

interface UserListProps {
  onSelect: (user: User) => void
}

function UserList(props: UserListProps): JSX.Element {
  const { data } = useQuery('fetchUsers', () => axios('/users'))

  return (
    <div className="my-4">
      {data?.data.map((user: User) => (
        <div
          key={user.id}
          onClick={() => props.onSelect(user)}
          className={'flex justify-between my-2 border p-2 border-gray-300 rounded-sm hover:bg-gray-200 cursor-pointer'}
        >
          <b>{user.username}</b>
          <span className="uppercase">{user.role}</span>
        </div>
      ))}
    </div>
  )
}

export default UserList
