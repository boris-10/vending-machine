import Link from 'next/link'
import { ReactElement } from 'react'

import ProductList from '../../components/core/ProductList'
import Layout from '../../components/core/Layout'
import Button from '../../components/atoms/Button'
import WithAuthentication from '../../components/core/WithAuthentication'

const ProductListPage = WithAuthentication(function () {
  return (
    <div className="flex flex-col m-auto w-96">
      <ProductList />
      <Link href={'/products/create'} passHref>
        <Button text="Add product" variation="success" />
      </Link>
    </div>
  )
})

ProductListPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default ProductListPage
