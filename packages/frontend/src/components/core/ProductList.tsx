import React, { useContext } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'

import Product from '../../models/Product'
import { ProductsContext } from '../../providers/ProductsProvider'
import ProductItem from './ProductItem'

interface ProductListProps {
  onSelect: (product: Product) => void
}

function ProductList(props: ProductListProps): JSX.Element {
  const { selectedProduct } = useContext(ProductsContext)

  const { isLoading, isError, data, error } = useQuery('fetchProducts', () =>
    axios('http://localhost:8080/products', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNjMxMTAzMzQ4fQ.yqitnSBq20KnHZybDi8dRHCbIEQ0P8bH4bed37Fu7fQ',
      },
    })
  )

  return (
    <div className="ProductList">
      {data?.data.map((product: Product) => (
        <ProductItem
          key={product.id}
          product={product}
          isSelected={product.id === selectedProduct?.id}
          onClick={() => {
            props.onSelect(product)
          }}
        />
      ))}
    </div>
  )
}

export default ProductList
