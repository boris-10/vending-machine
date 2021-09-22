export enum UserRole {
  Buyer = 'Buyer',
  Seller = 'Seller',
}

export default interface User {
  id?: number
  username: string
  password: string
  deposit?: number
  role: UserRole
}
