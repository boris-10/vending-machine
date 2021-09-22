import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import Layout from '../../components/core/Layout'
import WithAuthentication from '../../components/core/WithAuthentication'

const ChangePassword = WithAuthentication(function () {
  return null
})

ChangePassword.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default ChangePassword
