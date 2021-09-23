import React, { createContext, useState, FC } from 'react'
import Product from '../models/Product'

interface ProductsContextState {
  selectedProduct: Product | null
  setSelectedProduct: (product: Product) => void
}

export const ProductsContext = createContext<ProductsContextState>({
  selectedProduct: null,
  setSelectedProduct: () => undefined,
})
