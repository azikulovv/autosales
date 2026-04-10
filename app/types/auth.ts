export type UserRole = 'BUYER' | 'SELLER' | 'ADMIN'

export type User = {
  id: string
  name: string
  email: string
  phone: string | null
  role: UserRole
  createdAt: string
  updatedAt?: string
}
