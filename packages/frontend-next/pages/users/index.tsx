import type { NextPage } from 'next'
import Link from 'next/link'
import UserList from '../../components/core/UserList'
import Button from '../../components/atoms/Button'

const UserListPage: NextPage = () => {
  return (
    <div>
      <h1>User list</h1>
      <UserList />
      <Link href={'/users/create'} passHref>
        <Button text="Add user" variation="success" />
      </Link>
    </div>
  )
}

export default UserListPage
