import { ReactElement } from 'react'
import { useRouter } from 'next/router'

import ProductForm from '../../components/core/ProductForm'
import Layout from '../../components/core/Layout'
import WithAuthentication from '../../components/core/WithAuthentication'
import { UserRole } from '../../models/User'

const ProductCreatePage = WithAuthentication(function () {
  const router = useRouter()

  const redirectToProducts = () => {
    router.push('/products')
  }

  return <ProductForm onSubmit={redirectToProducts} />
})

ProductCreatePage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export async function getStaticProps() {
  return {
    props: {
      protected: true,
      roles: [UserRole.Buyer],
    },
  }
}

export default ProductCreatePage
