import { ReactElement } from 'react'

import VendingMachine from '../components/core/VendingMachine'
import Layout from '../components/core/Layout'
import { ProductProvider } from '../providers/ProductsProvider'
import { UserRole } from '../models/User'

export default function VendingMachinePage() {
  return (
    <ProductProvider>
      <VendingMachine />
    </ProductProvider>
  )
}

VendingMachinePage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export function getStaticProps() {
  return {
    props: {
      auth: true,
      roles: [UserRole.Buyer],
    },
  }
}
