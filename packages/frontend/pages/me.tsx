import { useRouter } from 'next/router'
import { ReactElement, useContext } from 'react'

import Layout from '../components/core/Layout'
import WithAuthentication from '../components/core/WithAuthentication'
import UserForm from '../components/core/UserForm'
import { AuthContext } from '../providers/AuthProvider'
import User from '../models/User'

const UserDetailPage = WithAuthentication(function () {
  const { currentUser, setCurrentUser, logout } = useContext(AuthContext)
  const router = useRouter()

  const onSubmit = (user: Partial<User>) => {
    setCurrentUser({ ...currentUser, ...user })
    router.back()
  }

  const onDelete = () => {
    logout()
  }

  return <UserForm onSubmit={onSubmit} onDelete={onDelete} />
})

UserDetailPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default UserDetailPage
