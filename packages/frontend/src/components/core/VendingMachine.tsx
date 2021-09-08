import React, { useState, useContext } from 'react'

import Product from '../../models/Product'
import ProductList from './ProductList'
import { ProductsContext } from '../../providers/ProductsProvider'
import Button from '../atoms/Button'

function VendingMachine(): JSX.Element {
  const [depositedAmount, setDepositedAmount] = useState(0)
  const { selectedProduct, setSelectedProduct } = useContext(ProductsContext)

  const deposit = (amount: number) => {
    console.log('/deposit API call', amount)

    setDepositedAmount(depositedAmount + amount) // Call when endpoint returns 200
  }

  const reset = () => {
    console.log('/reset API call')

    setDepositedAmount(0) // Call when endpoint returns 200
  }

  const buyProduct = () => {
    console.log('/buy API call')
  }

  const onProductSelect = (product: Product) => {
    setSelectedProduct(product)
  }

  return (
    <div>
      <ProductList onSelect={onProductSelect} />
      <br />
      Deposit:
      <br />
      <Button text="5 ¢" onClick={() => deposit(5)} />
      <Button text="10 ¢" onClick={() => deposit(10)} />
      <Button text="20 ¢" onClick={() => deposit(20)} />
      <Button text="50 ¢" onClick={() => deposit(50)} />
      <Button text="100 ¢" onClick={() => deposit(100)} />
      <br />
      <Button text="Return money" isDisabled={depositedAmount === 0} onClick={() => reset()} />
      <br />
      Deposited: <b>{depositedAmount}</b> ¢
      <br />
      Selected product: {selectedProduct ? <b>{selectedProduct.productName}</b> : <i>[none]</i>}
      <br />
      <Button isDisabled={!selectedProduct || depositedAmount < selectedProduct.cost} onClick={buyProduct} text="Buy" />
    </div>
  )
}

export default VendingMachine
