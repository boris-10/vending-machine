import React from 'react'
import { useHistory } from 'react-router-dom'

import User from '../../models/User'
import UserList from '../core/UserList'
import Button from '../atoms/Button'

function UserListPage(): JSX.Element {
  const history = useHistory()

  const onUserSelect = (user: User) => {
    history.push(`/user/${user.id}/edit`)
  }

  const onCreateNewUser = () => {
    history.push('/user/create')
  }

  return (
    <div>
      <h2>Select user to edit:</h2>
      <UserList onSelect={onUserSelect} />
      <br />
      <Button text="Create new" onClick={onCreateNewUser} />
    </div>
  )
}

export default UserListPage
