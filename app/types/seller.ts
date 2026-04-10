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

export type SellerProfile = {
  shopName: string
  slug: string
  city: string
  address: string
  phone: string
  whatsapp: string
  telegram: string
  email: string
  description: string
  logo: string | File | null
  website: string
  hasDelivery: boolean
  isVerified: boolean
  workingHours: string
  brands: string[]
  categories: string[]
}

export type SellerStats = {
  total: number
  verified: number
  avgRating: string
}
