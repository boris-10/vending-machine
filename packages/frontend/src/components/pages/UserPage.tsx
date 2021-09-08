import React from 'react'
import { useParams, useHistory } from 'react-router-dom'

import UserForm from '../core/UserForm'

function UserPage(): JSX.Element {
  const history = useHistory()
  const { userId } = useParams<{ userId: string }>()

  const onSubmit = () => {
    history.push('/users')
  }

  return (
    <div>{userId ? <UserForm userId={Number(userId)} onSubmit={onSubmit} /> : <UserForm onSubmit={onSubmit} />}</div>
  )
}

export default UserPage
