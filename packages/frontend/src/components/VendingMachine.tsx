import React from 'react'
import { useState } from 'react'

import Product from '../models/Product'
import ProductListProvider from '../providers/ProductsProvider'
import ProductList from '../components/ProductList'
import Button from './Button'

function VendingMachine(): JSX.Element {
  const [depositedAmount, setDepositedAmount] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState({} as Product)

  const deposit = (amount: number) => {
    setDepositedAmount(depositedAmount + amount)
  }

  const reset = () => {
    setDepositedAmount(0)
  }

  const buyProduct = () => {
    console.log('Buy product!')
  }

  return (
    <div>
      <ProductListProvider>
        <ProductList onSelect={setSelectedProduct} />
      </ProductListProvider>
      <br />
      Deposit:
      <br />
      <Button text="5 ¢" callback={() => deposit(5)} />
      <Button text="10 ¢" callback={() => deposit(10)} />
      <Button text="20 ¢" callback={() => deposit(20)} />
      <Button text="50 ¢" callback={() => deposit(50)} />
      <Button text="100 ¢" callback={() => deposit(100)} />
      <br />
      <Button text="Return money" isDisabled={depositedAmount === 0} callback={() => reset()} />
      <br />
      Deposited: <b>{depositedAmount}</b> ¢
      <br />
      Selected product: {selectedProduct ? <b>{selectedProduct.name}</b> : <i>[none]</i>}
      <br />
      <Button
        isDisabled={!selectedProduct || depositedAmount < selectedProduct.cost}
        callback={buyProduct}
        text="Buy"
      />
    </div>
  )
}

export default VendingMachine
