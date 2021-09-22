import { useRouter } from 'next/router'

import LoginForm from '../components/core/LoginForm'

import type { NextPage } from 'next'

const AuthPage: NextPage = () => {
  const router = useRouter()

  const onLoginSuccess = () => {
    router.push('/')
  }

  return <LoginForm onLoginSuccess={onLoginSuccess} />
}

export default AuthPage
