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
      <div className="mb-4">
        {[5, 10, 20, 50, 100].map((n) => (
          <div key={n} className="inline mr-2 mb-4">
            <Button text={`${n} ¢`} onClick={() => depositMutation.mutate(n)} />
          </div>
        ))}
        <Button
          text="Reset deposit"
          isDisabled={depositedAmount === 0}
          onClick={() => resetMutation.mutate()}
          variation="danger"
        />
      </div>
      <div className="flex justify-between mb-4">
        <h2>
          Selected product:&nbsp;
          {selectedProduct && selectedProduct.productName ? (
            <b>{selectedProduct.productName}</b>
          ) : (
            <span className="text-gray-500">none</span>
          )}
        </h2>
        <input
          type="number"
          min="1"
          value={selectedProductAmount}
          onChange={(e) => setSelectedProductAmount(Number(e.target.value))}
          className="border border-gray-500 w-16 text-center pl-3"
        />
      </div>
      <h2 className="mb-4">
        Deposited: <b>{depositedAmount}</b> ¢
      </h2>
      <Button isDisabled={!isBuyEnabled()} onClick={() => buyMutation.mutate()} text="Buy" variation="success" />
      <div className="my-4">
        {coinChange.map(({ coin, count }) => (
          <div key={coin}>
            Coin: {coin}¢ x {count}
          </div>
        ))}
      </div>
    </div>
  )
}

export default VendingMachine
