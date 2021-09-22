import { useRouter } from 'next/router'
import { useEffect, useContext, ReactElement, ReactNode } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import type { FC } from 'react'

type withAuthenticationFn = (Component: FC) => FC & { getLayout?: (page: ReactElement) => ReactNode }

const WithAuthentication: withAuthenticationFn = (Component) => {
  const Authenticated: FC = (): JSX.Element | null => {
    const { currentUser } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
      const token = localStorage.getItem('jwt')?.toString()

      if (!token) router.push('/login')
    })

    return currentUser ? <Component /> : null
  }

  return Authenticated
}

export default WithAuthentication
