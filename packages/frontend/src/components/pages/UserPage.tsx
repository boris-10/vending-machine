import React, { useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import UserForm from '../core/UserForm'
import { UsersContext } from '../../providers/UsersProvider'

function UserPage(): JSX.Element {
  const history = useHistory()
  const { findUserById } = useContext(UsersContext)
  const { userId } = useParams<{ userId: string }>()

  const user = findUserById(userId)

  const onSubmit = () => {
    history.push('/users')
  }

  return (
    <div>
      <h2>{user ? `Edit user - ${user.username}` : 'Create user'}</h2>

      {user ? <UserForm user={user} onSubmit={onSubmit} /> : <UserForm onSubmit={onSubmit} />}
    </div>
  )
}

export default UserPage
