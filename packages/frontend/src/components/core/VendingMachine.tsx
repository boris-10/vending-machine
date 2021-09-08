import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useMutation } from 'react-query'

import ProductList from './ProductList'
import { ProductsContext } from '../../providers/ProductsProvider'
import Button from '../atoms/Button'

interface CoinChange {
  coin: number
  count: number
}

function VendingMachine(): JSX.Element {
  const [depositedAmount, setDepositedAmount] = useState(0)
  const [selectedProductAmount, setSelectedProductAmount] = useState(1)
  const [coinChange, setCoinChange] = useState<CoinChange[]>([])
  const { selectedProduct, setSelectedProduct } = useContext(ProductsContext)

  const depositMutation = useMutation(async (amount: number) => {
    const { data } = await axios.post('/machine/deposit', { amount })
    setDepositedAmount(data.deposit)
  })

  const resetMutation = useMutation(async () => {
    await axios.post('/machine/reset')
    setDepositedAmount(0)
  })

  const buyMutation = useMutation(async () => {
    if (!selectedProduct) {
      return
    }
    const { data }: { data: CoinChange[] } = await axios.post('/machine/buy', {
      productId: selectedProduct.id,
      amount: selectedProductAmount,
    })
    setCoinChange(data.filter((change) => change.coin !== 0))
    setDepositedAmount(0)
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
      {[5, 10, 20, 50, 100].map((n) => (
        <Button key={n} text={`${n} ¢`} onClick={() => depositMutation.mutate(n)} />
      ))}
      <br />
      <Button text="Reset deposit" isDisabled={depositedAmount === 0} onClick={() => resetMutation.mutate()} />
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
      <br />
      {coinChange.map(({ coin, count }) => (
        <div key={coin}>
          Coin: {coin}¢ x {count}
        </div>
      ))}
    </div>
  )
}

export default VendingMachine
