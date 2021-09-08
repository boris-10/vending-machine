enum UserRole {
  Buyer,
  Seller,
}

export default interface Product {
  id?: string
  username: string
  password: string
  deposit: number
  role: UserRole
}
