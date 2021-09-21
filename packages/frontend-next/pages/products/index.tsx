import Link from 'next/link'

import ProductList from '../../components/core/ProductList'
import Button from '../../components/atoms/Button'
import WithAuthentication from '../../components/core/WithAuthentication'

import type { NextPage } from 'next'

const ProductListPage: NextPage = () => {
  return (
    <div className="flex flex-col m-auto w-96">
      <ProductList />
      <Link href={'/products/create'} passHref>
        <Button text="Add product" variation="success" />
      </Link>
    </div>
  )
}

export default WithAuthentication(ProductListPage)
