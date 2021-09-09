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
  const { data } = useQuery('fetchProducts', () => axios('/products'))

  return (
    <div className="my-4">
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
