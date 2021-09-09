import React from 'react'
import ProductsContextProvider from '../../providers/ProductsProvider'
import VendingMachine from '../core/VendingMachine'

function BuyerPage(): JSX.Element {
  return (
    <div className="flex flex-col">
      <h1 className="mb-6 text-center">Vending Machine</h1>
      <div className="flex justify-center">
        <ProductsContextProvider>
          <VendingMachine />
        </ProductsContextProvider>
      </div>
    </div>
  )
}

export default BuyerPage
