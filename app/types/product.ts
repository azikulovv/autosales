export type Product = {
  id: number
  name: string
  category: string
  brand: string
  model: string
  generation?: string
  engine?: string
  vendor: string
  article: string
  manufacturer: string
  price: number
  inStock: boolean
  city: string
  image: string
}

export type ProductSpec = {
  label: string
  value: string
}

export type ProductDetails = Product & {
  images: string[]
  description: string
  specs: ProductSpec[]
  compatibleCars: string[]
}
