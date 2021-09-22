import { useRouter } from 'next/router'
import type { NextPage } from 'next'

import WithAuthentication from '../../components/core/WithAuthentication'
import UserForm from '../../components/core/UserForm'

const UserDetailPage: NextPage = () => {
  const router = useRouter()

  const { userId } = router.query

  const redirectToUsers = () => {
    router.push('/users')
  }

  return <UserForm userId={Number(userId)} onSubmit={redirectToUsers} onDelete={redirectToUsers} />
}

export default WithAuthentication(UserDetailPage)
