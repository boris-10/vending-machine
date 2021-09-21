import Link from 'next/link'

import UserList from '../../components/core/UserList'
import Button from '../../components/atoms/Button'
import WithAuthentication from '../../components/core/WithAuthentication'

import type { NextPage } from 'next'

const UserListPage: NextPage = () => {
  return (
    <>
      <UserList />
      <Link href={'/users/create'} passHref>
        <Button text="Add user" variation="success" />
      </Link>
    </>
  )
}

export default WithAuthentication(UserListPage)
