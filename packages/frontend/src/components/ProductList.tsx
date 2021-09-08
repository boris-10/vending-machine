import React from 'react'
import Product from '../models/Product'
import { useContext, useState } from 'react'
import { ProductListContext } from '../providers/ProductsProvider'
import ProductItem from './ProductItem'

interface ProductListProps {
  onSelect: (product: Product) => void
}

function ProductList(props: ProductListProps): JSX.Element {
  const { products } = useContext(ProductListContext)
  const [selectedProduct, setSelectedProduct] = useState({} as Product)

  const onSelect = (product: Product) => {
    setSelectedProduct(product)

    props.onSelect(product)
  }

  return (
    <div className="ProductList">
      {products.map((product, i) => (
        <ProductItem
          key={i}
          product={product}
          isSelected={product.id === selectedProduct.id}
          onClick={() => {
            onSelect(product)
          }}
        />
      ))}
    </div>
  )
}

export default ProductList
