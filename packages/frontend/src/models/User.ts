export enum UserRole {
  Buyer = 'buyer',
  Seller = 'seller',
}

export default interface User {
  id?: number
  username: string
  password: string
  deposit?: number
  role: UserRole
}
