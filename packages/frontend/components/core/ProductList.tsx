import { useContext } from 'react'

import ProductItem from '../core/ProductItem'

import Product from '../../models/Product'
import { ProductsContext } from '../../providers/ProductsProvider'

interface ProductListProps {
  onSelect?: (product: Product) => void
}

const ProductList = ({ onSelect }: ProductListProps): JSX.Element => {
  const { products, selectedProduct, setSelectedProduct } = useContext(ProductsContext)

  return (
    <>
      {products?.map((product: Product) => (
        <ProductItem
          key={product.id}
          product={product}
          isSelected={product.id === selectedProduct?.id}
          onClick={() => {
            setSelectedProduct(product)
            onSelect && onSelect(product)
          }}
        />
      ))}
    </>
  )
}

export default ProductList
