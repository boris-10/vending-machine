import { useRouter } from 'next/router'
import { ReactElement, useContext } from 'react'

import Layout from '../components/core/Layout'
import UserForm from '../components/core/UserForm'
import { AuthContext } from '../providers/AuthProvider'
import User from '../models/User'

export default function UserDetailPage() {
  const { currentUser, setCurrentUser, logout } = useContext(AuthContext)
  const router = useRouter()

  const onSubmit = (user: Partial<User>) => {
    setCurrentUser({ ...(currentUser as User), ...user })
    router.back()
  }

  return <UserForm onSubmit={onSubmit} onDelete={logout} />
}

UserDetailPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export function getStaticProps() {
  return {
    props: {
      auth: true,
    },
  }
}
