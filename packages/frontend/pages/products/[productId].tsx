import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import ProductForm from '../../components/core/ProductForm'
import Layout from '../../components/core/Layout'
import WithAuthentication from '../../components/core/WithAuthentication'

const ProductDetailPage = WithAuthentication(function () {
  const router = useRouter()

  const { productId } = router.query

  const redirectToProducts = () => {
    router.push('/products')
  }

  return <ProductForm productId={Number(productId)} onSubmit={redirectToProducts} onDelete={redirectToProducts} />
})

ProductDetailPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default ProductDetailPage
