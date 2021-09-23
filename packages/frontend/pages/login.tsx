import { useRouter } from 'next/router'

import LoginForm from '../components/core/LoginForm'

export default function LoginPage() {
  const router = useRouter()

  const onLoginSuccess = () => {
    router.push('/products')
  }

  return <LoginForm onLoginSuccess={onLoginSuccess} />
}
