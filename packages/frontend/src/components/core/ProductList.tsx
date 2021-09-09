import React, { useContext } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'

import { ProductsContext } from '../../providers/ProductsProvider'
import { AuthContext } from '../../providers/AuthProvider'
import Product from '../../models/Product'
import ProductItem from './ProductItem'
import { UserRole } from '../../models/User'

interface ProductListProps {
  onSelect: (product: Product) => void
}

function ProductList(props: ProductListProps): JSX.Element {
  const { currentUser } = useContext(AuthContext)
  const { selectedProduct } = useContext(ProductsContext)

  const { data } = useQuery(
    'fetchProducts',
    async () => {
      const { data }: { data: Product[] } = await axios('/products')

      if (currentUser?.role === UserRole.Buyer) {
        return data
      }
      return data.filter((product) => product.sellerId === currentUser?.id)
    },
    { enabled: !!currentUser }
  )

  return (
    <div className="my-4">
      {data?.map((product: Product) => (
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
