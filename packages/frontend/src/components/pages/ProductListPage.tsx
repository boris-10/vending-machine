import React from 'react'
import { useHistory } from 'react-router-dom'

import Product from '../../models/Product'
import ProductList from '../core/ProductList'
import Button from '../atoms/Button'

function ProductListPage(): JSX.Element {
  const history = useHistory()

  const onProductSelect = (product: Product) => {
    history.push(`/product/${product.id}/edit`)
  }

  const onCreateNewProduct = () => {
    history.push('/product/create')
  }

  return (
    <div className="flex flex-col m-auto w-1/2">
      <h1 className="mb-4 text-center">Products</h1>
      <ProductList onSelect={onProductSelect} />
      <Button text="Create new" onClick={onCreateNewProduct} variation="success" />
    </div>
  )
}

export default ProductListPage
