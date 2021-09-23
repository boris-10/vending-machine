import Link from 'next/link'
import { ReactElement } from 'react'
import { useRouter } from 'next/router'

import ProductList from '../../components/core/ProductList'
import Layout from '../../components/core/Layout'
import Button from '../../components/shared/Button'
import { UserRole } from '../../models/User'
import { ProductProvider } from '../../providers/ProductsProvider'

export default function ProductListPage() {
  const router = useRouter()

  return (
    <ProductProvider>
      <div className="flex flex-col m-auto w-96">
        <ProductList onSelect={(product) => router.push(`/products/${product.id}`)} />
        <Link href={'/products/create'} passHref>
          <Button text="Add product" variation="success" />
        </Link>
      </div>
    </ProductProvider>
  )
}

ProductListPage.getLayout = (page: ReactElement) => {
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
