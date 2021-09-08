import React, { useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import ProductForm from '../core/ProductForm'
import { ProductsContext } from '../../providers/ProductsProvider'

function ProductPage(): JSX.Element {
  const history = useHistory()
  const { findProductById } = useContext(ProductsContext)
  const { productId } = useParams<{ productId: string }>()

  const product = findProductById(productId)

  const onSubmit = () => {
    history.push('/products')
  }

  return (
    <div>
      <h2>{product ? `Edit product - ${product.name}` : 'Create product'}</h2>

      {product ? <ProductForm product={product} onSubmit={onSubmit} /> : <ProductForm onSubmit={onSubmit} />}
    </div>
  )
}

export default ProductPage
