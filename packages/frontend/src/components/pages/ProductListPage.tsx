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
    <div>
      <h2>Select product to edit:</h2>
      <ProductList onSelect={onProductSelect} />
      <br />
      <Button text="Create new" onClick={onCreateNewProduct} />
    </div>
  )
}

export default ProductListPage
