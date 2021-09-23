import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import ProductForm from '../../components/core/ProductForm'
import Layout from '../../components/core/Layout'
import { UserRole } from '../../models/User'

export default function ProductDetailPage() {
  const router = useRouter()

  const { productId } = router.query

  const redirectToProducts = () => {
    router.push('/products')
  }

  return <ProductForm productId={Number(productId)} onSubmit={redirectToProducts} onDelete={redirectToProducts} />
}

ProductDetailPage.getLayout = (page: ReactElement) => {
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

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
