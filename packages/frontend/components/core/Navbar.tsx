import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { AuthContext } from '../../providers/AuthProvider'
import Button from '../shared/Button'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = (): JSX.Element => {
  const router = useRouter()

  const { logout, currentUser } = useContext(AuthContext)
  const [currentRoute, setCurrentRoute] = useState('')

  useEffect(() => {
    setCurrentRoute(router.pathname)
  }, [])

  const onLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="bg-gray-800 mb-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4 cursor-pointer">
                <Link href="/products">
                  <span
                    className={classNames(
                      currentRoute.includes('products')
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'px-3 py-2 rounded-md text-sm font-medium'
                    )}
                  >
                    Products
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <span className="bg-gray-800 p-4 text-gray-400 cursor-default focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white cursor-pointer">
              <Link href="me">
                <span>{currentUser?.username}</span>
              </Link>
            </span>
            {currentUser && <Button onClick={onLogout} text="Logout" />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
