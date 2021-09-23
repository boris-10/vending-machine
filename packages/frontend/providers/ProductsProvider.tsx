import React, { createContext, ReactElement, useContext, useState } from 'react'
import { QueryObserverResult, useQuery } from 'react-query'
import axios from 'axios'

import Product from '../models/Product'
import { AuthContext } from './AuthProvider'
import { UserRole } from '../models/User'

interface ProductsContextState {
  products: Product[]
  selectedProduct: Product | null
  setSelectedProduct: (product: Product | null) => void
  refetchProducts: () => Promise<QueryObserverResult> | Promise<void>
}

export const ProductsContext = createContext<ProductsContextState>({
  products: [],
  selectedProduct: null,
  setSelectedProduct: (product: Product | null) => undefined,
  refetchProducts: () => Promise.resolve(),
})

export function ProductProvider({ children }: { children: ReactElement }) {
  const { currentUser } = useContext(AuthContext)
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const { refetch: refetchProducts } = useQuery(
    'fetchProducts',
    async () => {
      const { data }: { data: Product[] } = await axios('/products')

      if (currentUser?.role === UserRole.Buyer) {
        setProducts(data)
      } else {
        setProducts(data?.filter((product: Product) => product.seller?.id === currentUser?.id))
      }
    },
    { enabled: !!currentUser }
  )

  return (
    <ProductsContext.Provider value={{ products, selectedProduct, setSelectedProduct, refetchProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}
