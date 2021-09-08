import React, { createContext, useState, FC } from 'react'
import Product from '../models/Product'

type ProductsContextState = {
  products: Product[]
  upsertProduct: (product: Product) => void
  selectedProduct: Product | null
  setSelectedProduct: (product: Product) => void
}

const contextDefaultValues: ProductsContextState = {
  products: [],
  upsertProduct: () => undefined,
  selectedProduct: null,
  setSelectedProduct: () => undefined,
}

export const ProductsContext = createContext<ProductsContextState>(contextDefaultValues)

const ProductsContextProvider: FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(contextDefaultValues.products)
  const [selectedProduct, setSelectedProduct] = useState({} as Product)

  const upsertProduct = (product: Product) => {
    if (product.id) {
      // POST
    } else {
      // PATCH
    }
    setProducts((products) => [...products, product])
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        upsertProduct,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsContextProvider
