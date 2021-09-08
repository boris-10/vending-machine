import React, { createContext, useState, FC } from 'react'
import Product from '../models/Product'

type ProductListContextState = {
  products: Product[]
  addProduct: (product: Product) => void
}

const contextDefaultValues: ProductListContextState = {
  products: [
    { id: 'product1', sellerId: 'seller1', name: 'Chocolate', amountAvailable: 100, cost: 20 },
    { id: 'product2', sellerId: 'seller2', name: 'Coke', amountAvailable: 20, cost: 15 },
    { id: 'product3', sellerId: 'seller3', name: 'Juice', amountAvailable: 30, cost: 10 },
    { id: 'product4', sellerId: 'seller4', name: 'Sandwich', amountAvailable: 10, cost: 80 },
    { id: 'product5', sellerId: 'seller5', name: 'Milk', amountAvailable: 50, cost: 5 },
  ],
  addProduct: () => {
    null
  },
}

export const ProductListContext = createContext<ProductListContextState>(contextDefaultValues)

const ProductListContextProvider: FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(contextDefaultValues.products)

  const addProduct = (newProduct: Product) => setProducts((products) => [...products, newProduct])

  return (
    <ProductListContext.Provider
      value={{
        products,
        addProduct,
      }}
    >
      {children}
    </ProductListContext.Provider>
  )
}

export default ProductListContextProvider
