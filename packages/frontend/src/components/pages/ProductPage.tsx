import React from 'react'
import { useParams, useHistory } from 'react-router-dom'

import ProductForm from '../core/ProductForm'

function ProductPage(): JSX.Element {
  const history = useHistory()
  const { productId } = useParams<{ productId: string }>()

  const onSubmit = () => {
    history.push('/products')
  }

  return (
    <div>
      {productId ? (
        <ProductForm productId={Number(productId)} onSubmit={onSubmit} />
      ) : (
        <ProductForm onSubmit={onSubmit} />
      )}
    </div>
  )
}

export default ProductPage
