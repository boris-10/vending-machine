import React, { useContext } from 'react'

import Product from '../../models/Product'
import { ProductsContext } from '../../providers/ProductsProvider'
import ProductItem from './ProductItem'

interface ProductListProps {
  onSelect: (product: Product) => void
}

function ProductList(props: ProductListProps): JSX.Element {
  const { products, selectedProduct } = useContext(ProductsContext)

  return (
    <div className="ProductList">
      {products.map((product, i) => (
        <ProductItem
          key={i}
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
