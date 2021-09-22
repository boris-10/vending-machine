import { useRouter } from 'next/router'

import LoginForm from '../components/core/LoginForm'

import type { NextPage } from 'next'

const LoginPage = () => {
  const router = useRouter()

  const onLoginSuccess = () => {
    router.push('/products')
  }

  return <LoginForm onLoginSuccess={onLoginSuccess} />
}

export default LoginPage
