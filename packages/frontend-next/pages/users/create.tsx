import { useRouter } from 'next/router'

import UserForm from '../../components/core/UserForm'
import WithAuthentication from '../../components/core/WithAuthentication'

import type { NextPage } from 'next'

const UserDetailPage: NextPage = () => {
  const router = useRouter()

  const redirectToUsers = () => {
    router.push('/users')
  }

  return <UserForm onSubmit={redirectToUsers} />
}

export default WithAuthentication(UserDetailPage)
