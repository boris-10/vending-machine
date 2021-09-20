import Link from 'next/link'
import axios from 'axios'
import { useQuery } from 'react-query'

import User from '../../models/User'

const UserList = (): JSX.Element => {
  const { data } = useQuery('fetchUsers', () => axios('/users'))

  return (
    <div>
      {data?.data.map((user: User) => (
        <Link key={user.id} href={`/users/${user.id}`}>
          <div>
            <b>{user.username}</b>
            <span className="uppercase">{user.role}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default UserList
