import React, { createContext, useState, FC } from 'react'
import Product from '../models/Product'

type ProductsContextState = {
  products: Product[]
  findProductById: (id: string) => Product | undefined
  upsertProduct: (product: Product) => void
  selectedProduct: Product | null
  setSelectedProduct: (product: Product) => void
}

const contextDefaultValues: ProductsContextState = {
  products: [
    { id: '1', sellerId: 'seller-1', name: 'Chocolate', amountAvailable: 100, cost: 20 },
    { id: '2', sellerId: 'seller-2', name: 'Coke', amountAvailable: 20, cost: 15 },
    { id: '3', sellerId: 'seller-3', name: 'Juice', amountAvailable: 30, cost: 10 },
    { id: '4', sellerId: 'seller-4', name: 'Sandwich', amountAvailable: 10, cost: 80 },
    { id: '5', sellerId: 'seller-5', name: 'Milk', amountAvailable: 50, cost: 5 },
  ],
  findProductById: () => undefined,
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

  const findProductById = (id: string) => {
    return products.find((product) => product.id === id)
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        upsertProduct,
        selectedProduct,
        setSelectedProduct,
        findProductById,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsContextProvider
