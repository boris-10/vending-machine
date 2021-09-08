import React, { createContext, useState, FC } from 'react'
import Product from '../models/Product'

type ProductsContextState = {
  selectedProduct: Product | null
  setSelectedProduct: (product: Product) => void
}

const contextDefaultValues: ProductsContextState = {
  selectedProduct: null,
  setSelectedProduct: () => undefined,
}

export const ProductsContext = createContext<ProductsContextState>(contextDefaultValues)

const ProductsContextProvider: FC = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState({} as Product)

  return (
    <ProductsContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsContextProvider
