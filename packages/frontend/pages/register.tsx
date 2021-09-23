import { useRouter } from 'next/router'

import RegisterForm from '../components/core/RegisterForm'

export default function RegisterPage() {
  const router = useRouter()

  const onRegisterSuccess = () => {
    router.push('/login')
  }

  return <RegisterForm onRegisterSuccess={onRegisterSuccess} />
}
