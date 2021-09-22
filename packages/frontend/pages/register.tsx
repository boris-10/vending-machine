import { useRouter } from 'next/router'

import RegisterForm from '../components/core/RegisterForm'

const RegisterPage = () => {
  const router = useRouter()

  const onRegisterSuccess = () => {
    router.push('/login')
  }

  return <RegisterForm onRegisterSuccess={onRegisterSuccess} />
}

export default RegisterPage
