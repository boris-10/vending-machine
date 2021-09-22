import User from './User'

export default interface Product {
  id?: number
  name: string
  amountAvailable: number
  cost: number
  seller?: User
}
