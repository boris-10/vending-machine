import React, { useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'

import { AuthContext } from '../../providers/AuthProvider'
import Button from '../atoms/Button'

const navigation = [
  { name: 'Vending machine', href: '/vending-machine', current: false },
  { name: 'Products', href: '/products', current: false },
  { name: 'Users', href: '/users', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function Header(): JSX.Element {
  const { logout, currentUser } = useContext(AuthContext)
  const history = useHistory()

  const onLogout = () => {
    logout()
    history.push('/login')
  }

  return (
    <div className="bg-gray-800 mb-6">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'px-3 py-2 rounded-md text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <span className="bg-gray-800 p-4 text-gray-400 cursor-default focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              {currentUser?.username}
            </span>
            <Button onClick={onLogout} text="Logout" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
