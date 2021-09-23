import { useRouter } from 'next/router'

import LoginForm from '../components/core/LoginForm'

export default function LoginPage() {
  const router = useRouter()

  return <LoginForm />
}
