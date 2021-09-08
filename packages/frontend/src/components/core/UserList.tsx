import React, { useContext } from 'react'

import User from '../../models/User'
import { UsersContext } from '../../providers/UsersProvider'

interface UserListProps {
  onSelect: (user: User) => void
}

function UserList(props: UserListProps): JSX.Element {
  const { users } = useContext(UsersContext)

  return (
    <div className="UserList">
      {users.map((user, i) => (
        <div key={i} onClick={() => props.onSelect(user)} className="UserItem">
          <b>{user.username}</b>
        </div>
      ))}
    </div>
  )
}

export default UserList
