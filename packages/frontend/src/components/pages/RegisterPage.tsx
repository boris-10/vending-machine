import React from 'react'
import { useHistory } from 'react-router-dom'

import RegisterForm from '../core/RegisterForm'

function RegisterPage(): JSX.Element {
  const history = useHistory()

  const onRegisterSuccess = () => {
    history.push('/login')
  }

  return (
    <div>
      <RegisterForm onRegisterSuccess={onRegisterSuccess} />
    </div>
  )
}

export default RegisterPage
