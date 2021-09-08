import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useMutation } from 'react-query'

import ProductList from './ProductList'
import { ProductsContext } from '../../providers/ProductsProvider'
import Button from '../atoms/Button'

function VendingMachine(): JSX.Element {
  const [depositedAmount, setDepositedAmount] = useState(0)
  const [selectedProductAmount, setSelectedProductAmount] = useState(1)
  const { selectedProduct, setSelectedProduct } = useContext(ProductsContext)

  const depositMutation = useMutation(async (amount: number) => {
    await axios.post(
      'http://localhost:8080/machine/deposit',
      { amount },
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNjMxMTAzMzQ4fQ.yqitnSBq20KnHZybDi8dRHCbIEQ0P8bH4bed37Fu7fQ',
        },
      }
    )

    setDepositedAmount(depositedAmount + amount)
  })

  const resetMutation = useMutation(async () => {
    await axios.post('http://localhost:8080/machine/reset', null, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNjMxMTAzMzQ4fQ.yqitnSBq20KnHZybDi8dRHCbIEQ0P8bH4bed37Fu7fQ',
      },
    })

    setDepositedAmount(0)
  })

  const buyMutation = useMutation(async () => {
    if (!selectedProduct) {
      return
    }
    await axios.post(
      'http://localhost:8080/machine/buy',
      { ...selectedProduct },
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNjMxMTAzMzQ4fQ.yqitnSBq20KnHZybDi8dRHCbIEQ0P8bH4bed37Fu7fQ',
        },
      }
    )
  })

  const isBuyEnabled = () => {
    return (
      selectedProduct &&
      selectedProduct.amountAvailable >= selectedProductAmount &&
      depositedAmount >= selectedProductAmount * selectedProduct.cost
    )
  }

  return (
    <div>
      <ProductList onSelect={(product) => setSelectedProduct(product)} />
      <br />
      Deposit:
      <br />
      <Button text="5 ¢" onClick={() => depositMutation.mutate(5)} />
      <Button text="10 ¢" onClick={() => depositMutation.mutate(10)} />
      <Button text="20 ¢" onClick={() => depositMutation.mutate(20)} />
      <Button text="50 ¢" onClick={() => depositMutation.mutate(50)} />
      <Button text="100 ¢" onClick={() => depositMutation.mutate(100)} />
      <br />
      <Button text="Return money" isDisabled={depositedAmount === 0} onClick={() => resetMutation.mutate()} />
      <br />
      Deposited: <b>{depositedAmount}</b> ¢
      <br />
      <input
        type="number"
        min="1"
        value={selectedProductAmount}
        onChange={(e) => setSelectedProductAmount(Number(e.target.value))}
      />
      <br />
      Selected product: {selectedProduct ? <b>{selectedProduct.productName}</b> : <i>[none]</i>}
      <br />
      <Button isDisabled={!isBuyEnabled()} onClick={() => buyMutation.mutate()} text="Buy" />
    </div>
  )
}

export default VendingMachine
