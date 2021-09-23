import { ReactElement } from 'react'
import { useRouter } from 'next/router'

import ProductForm from '../../components/core/ProductForm'
import Layout from '../../components/core/Layout'
import { UserRole } from '../../models/User'

export default function ProductCreatePage() {
  const router = useRouter()

  const redirectToProducts = () => {
    router.push('/products')
  }

  return <ProductForm onSubmit={redirectToProducts} />
}

ProductCreatePage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export function getStaticProps() {
  return {
    props: {
      auth: true,
      roles: [UserRole.Seller],
    },
  }
}
