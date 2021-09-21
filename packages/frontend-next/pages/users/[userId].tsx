import { useRouter } from 'next/router'

import UserForm from '../../components/core/UserForm'
import WithAuthentication from '../../components/core/WithAuthentication'

import type { NextPage } from 'next'

const UserDetailPage: NextPage = () => {
  const router = useRouter()

  const { userId } = router.query

  const redirectToUsers = () => {
    router.push('/users')
  }

  return <UserForm userId={Number(userId)} onSubmit={redirectToUsers} onDelete={redirectToUsers} />
}

export default WithAuthentication(UserDetailPage)
