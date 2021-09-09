import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useMutation } from 'react-query'

import { ProductsContext } from '../../providers/ProductsProvider'
import { AuthContext } from '../../providers/AuthProvider'
import ProductList from './ProductList'
import Button from '../atoms/Button'

interface CoinChange {
  coin: number
  count: number
}

function VendingMachine(): JSX.Element {
  const { selectedProduct, setSelectedProduct } = useContext(ProductsContext)
  const { currentUser } = useContext(AuthContext)
  const [depositedAmount, setDepositedAmount] = useState(0)
  const [selectedProductAmount, setSelectedProductAmount] = useState(1)
  const [productListRenderKey, setProductListRenderKey] = useState(0)
  const [coinChange, setCoinChange] = useState<CoinChange[]>([])

  useEffect(() => {
    currentUser?.deposit && setDepositedAmount(currentUser?.deposit)
  }, [currentUser])

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
    setProductListRenderKey(productListRenderKey + 1)
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
      <ProductList onSelect={(product) => setSelectedProduct(product)} key={productListRenderKey} />
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
          variation="warning"
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
          className="border border-gray-500 w-16 text-center pl-3 rounded-sm"
        />
      </div>
      <h2 className="mb-4">
        Deposited: <b>{depositedAmount}</b> ¢
      </h2>
      <Button isDisabled={!isBuyEnabled()} onClick={() => buyMutation.mutate()} text="Buy" variation="success" />

      {coinChange.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2">Returned change:</h2>
          {coinChange.map(({ coin, count }) => (
            <div key={coin}>
              <b>{coin}</b>¢ (<b>{count}</b>)
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VendingMachine
