import axios from 'axios'
import { ReactElement, useContext, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

import Layout from '../components/core/Layout'
import Product from '../models/Product'
import ProductList from '../components/core/ProductList'
import Button from '../components/shared/Button'
import { AuthContext } from '../providers/AuthProvider'
import { UserRole } from '../models/User'

type CoinChange = Record<number, number>

export default function VendingMachinePage() {
  const { currentUser } = useContext(AuthContext)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [depositedAmount, setDepositedAmount] = useState(0)
  const [selectedProductAmount, setSelectedProductAmount] = useState(1)
  const [coinChange, setCoinChange] = useState<CoinChange>({})

  useEffect(() => {
    currentUser?.deposit && setDepositedAmount(currentUser?.deposit)
  }, [currentUser])

  const depositMutation = useMutation(async (amount: number) => {
    await axios.post('/machine/deposit', { amount })
    setDepositedAmount(depositedAmount + amount)
  })

  const resetMutation = useMutation(async () => {
    await axios.post('/machine/reset-deposit')
    setDepositedAmount(0)
  })

  const purchaseMutation = useMutation(async () => {
    if (!selectedProduct) {
      return
    }
    const { data: coinChange }: { data: CoinChange } = await axios.post('/machine/purchase', {
      productId: selectedProduct.id,
      amount: selectedProductAmount,
    })
    setCoinChange(coinChange)
    setDepositedAmount(0)
    setSelectedProduct(null)
    setSelectedProductAmount(1)
  })

  const isPurchaseEnabled = () => {
    return (
      selectedProduct &&
      selectedProduct.amountAvailable >= selectedProductAmount &&
      depositedAmount >= selectedProductAmount * selectedProduct.cost
    )
  }

  return (
    <div className="flex flex-col m-auto w-96">
      <ProductList onSelect={(product: Product) => setSelectedProduct(product)} />
      <div className="flex justify-between mb-4">
        {[5, 10, 20, 50, 100].map((n) => (
          <div key={n} className="inline">
            <Button text={`${n} ¢`} onClick={() => depositMutation.mutate(n)} />
          </div>
        ))}
      </div>
      <Button
        text="Reset deposit"
        isDisabled={depositedAmount === 0}
        onClick={() => resetMutation.mutate()}
        variation="warning"
        className="mb-4"
      />
      <div className="flex justify-between mb-4">
        <h2>
          Selected product:&nbsp;
          {selectedProduct && selectedProduct.name ? (
            <b>{selectedProduct.name}</b>
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
      <Button
        isDisabled={!isPurchaseEnabled()}
        onClick={() => purchaseMutation.mutate()}
        text="Buy"
        variation="success"
      />

      {Object.keys(coinChange).length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2">Returned change:</h2>
          {Object.entries(coinChange).map(([coin, count]) => (
            <div key={coin}>
              <b>{coin}</b>¢ (<b>{count}</b>)
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

VendingMachinePage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export function getStaticProps() {
  return {
    props: {
      auth: true,
      roles: [UserRole.Buyer],
    },
  }
}
