import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import type { FC } from 'react'

type withAuthenticationFn = (Component: FC) => FC

const WithAuthentication: withAuthenticationFn = (Component) => {
  const Authenticated: FC = (): JSX.Element | null => {
    const { currentUser } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
      if (!currentUser) router.push('/auth')
    })

    return currentUser ? <Component /> : null
  }

  return Authenticated
}

export default WithAuthentication
