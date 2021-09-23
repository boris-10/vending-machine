import { ReactElement } from 'react'

import Layout from '../components/core/Layout'

export default function ChangePassword() {
  return null
}

ChangePassword.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export function getStaticProps() {
  return {
    props: {
      auth: true,
    },
  }
}
