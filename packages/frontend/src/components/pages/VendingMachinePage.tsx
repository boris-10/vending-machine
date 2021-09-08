import React from 'react'
import ProductsContextProvider from '../../providers/ProductsProvider'
import VendingMachine from '../core/VendingMachine'

function BuyerPage(): JSX.Element {
  return (
    <div>
      <h2>VENDING MACHINE</h2>

      <ProductsContextProvider>
        <VendingMachine />
      </ProductsContextProvider>
    </div>
  )
}

export default BuyerPage
