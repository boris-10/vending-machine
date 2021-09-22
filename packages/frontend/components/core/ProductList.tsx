import { useContext } from 'react'
import { useQuery } from 'react-query'

import axios from 'axios'

import ProductItem from '../core/ProductItem'

import { AuthContext } from '../../providers/AuthProvider'

import Product from '../../models/Product'
import { UserRole } from '../../models/User'
import WithAuthentication from './WithAuthentication'

const ProductList = (): JSX.Element => {
  const { currentUser } = useContext(AuthContext)

  const { data } = useQuery(
    'fetchProducts',
    async () => {
      const { data }: { data: Product[] } = await axios('/products')

      if (currentUser?.role === UserRole.Buyer) {
        return data
      }
      return data?.filter((product: Product) => product.seller.id === currentUser?.id)
    },
    { enabled: !!currentUser }
  )

  return (
    <>
      {data?.map((product: Product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </>
  )
}

export default WithAuthentication(ProductList)
