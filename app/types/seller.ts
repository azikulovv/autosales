export type Seller = {
  id: number
  name: string
  city: string
  specialization: string[]
  brands: string[]
  rating: number
  reviewsCount: number
  productsCount: number
  description: string
  verified: boolean
  hasDelivery: boolean
  avatar: string
}

export type SellerStats = {
  total: number
  verified: number
  avgRating: string
}
