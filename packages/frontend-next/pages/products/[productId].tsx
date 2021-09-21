import { useRouter } from 'next/router'

import ProductForm from '../../components/core/ProductForm'
import WithAuthentication from '../../components/core/WithAuthentication'

import type { NextPage } from 'next'

const ProductDetailPage: NextPage = () => {
  const router = useRouter()

  const { productId } = router.query

  const redirectToProducts = () => {
    router.push('/products')
  }

  return <ProductForm productId={Number(productId)} onSubmit={redirectToProducts} onDelete={redirectToProducts} />
}

export default WithAuthentication(ProductDetailPage)
