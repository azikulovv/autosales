import type { CatalogOption } from '~/types/catalog'
import type { Seller } from '~/types/seller'

export const sellerCityOptions: CatalogOption[] = [
  { label: 'Все города', value: 'all' },
  { label: 'Караганда', value: 'Караганда' },
  { label: 'Астана', value: 'Астана' },
  { label: 'Алматы', value: 'Алматы' },
  { label: 'Шымкент', value: 'Шымкент' },
]

export const sellerBrandOptions: CatalogOption[] = [
  { label: 'Все марки', value: 'all' },
  { label: 'Toyota', value: 'Toyota' },
  { label: 'Hyundai', value: 'Hyundai' },
  { label: 'Kia', value: 'Kia' },
  { label: 'BMW', value: 'BMW' },
  { label: 'Mercedes-Benz', value: 'Mercedes-Benz' },
  { label: 'Lada', value: 'Lada' },
]

export const sellerSpecializationOptions: CatalogOption[] = [
  { label: 'Все специализации', value: 'all' },
  { label: 'Тормозная система', value: 'Тормозная система' },
  { label: 'Фильтры', value: 'Фильтры' },
  { label: 'Подвеска', value: 'Подвеска' },
  { label: 'Двигатель', value: 'Двигатель' },
  { label: 'Электрика', value: 'Электрика' },
  { label: 'Кузов', value: 'Кузов' },
]

export const sellerSortOptions: CatalogOption[] = [
  { label: 'По рейтингу', value: 'rating' },
  { label: 'По количеству товаров', value: 'products' },
  { label: 'Сначала проверенные', value: 'verified' },
]

export const sellers: Seller[] = [
  {
    id: 1,
    name: 'AutoParts KRG',
    city: 'Караганда',
    specialization: ['Тормозная система', 'Подвеска'],
    brands: ['Toyota', 'Kia', 'Hyundai'],
    rating: 4.9,
    reviewsCount: 184,
    productsCount: 1240,
    description:
      'Магазин с большим выбором ходовой части, тормозных систем и расходников для популярных автомобилей.',
    verified: true,
    hasDelivery: true,
    avatar:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Filter Hub',
    city: 'Астана',
    specialization: ['Фильтры', 'Двигатель'],
    brands: ['Hyundai', 'Kia', 'BMW'],
    rating: 4.8,
    reviewsCount: 129,
    productsCount: 860,
    description:
      'Специализация на фильтрах, свечах и базовых расходниках для регулярного обслуживания авто.',
    verified: true,
    hasDelivery: true,
    avatar:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Drive Market',
    city: 'Алматы',
    specialization: ['Подвеска', 'Электрика'],
    brands: ['Toyota', 'BMW', 'Mercedes-Benz'],
    rating: 4.7,
    reviewsCount: 96,
    productsCount: 1430,
    description:
      'Большой ассортимент амортизаторов, стоек, генераторов и сопутствующих деталей для седанов и кроссоверов.',
    verified: false,
    hasDelivery: true,
    avatar:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'German Auto',
    city: 'Астана',
    specialization: ['Электрика', 'Двигатель'],
    brands: ['BMW', 'Mercedes-Benz'],
    rating: 4.9,
    reviewsCount: 78,
    productsCount: 620,
    description:
      'Детали для немецких автомобилей: электрооборудование, датчики, узлы двигателя и оригинальные позиции.',
    verified: true,
    hasDelivery: false,
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5,
    name: 'Body Mall',
    city: 'Шымкент',
    specialization: ['Кузов'],
    brands: ['Lada', 'Toyota', 'Hyundai'],
    rating: 4.6,
    reviewsCount: 54,
    productsCount: 410,
    description:
      'Кузовные элементы, фары, зеркала, бамперы и сопутствующие детали для повседневных городских автомобилей.',
    verified: false,
    hasDelivery: true,
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 6,
    name: 'Spark Auto',
    city: 'Караганда',
    specialization: ['Двигатель', 'Фильтры'],
    brands: ['Kia', 'Hyundai', 'Lada'],
    rating: 4.8,
    reviewsCount: 112,
    productsCount: 980,
    description:
      'Свечи, катушки, фильтры, прокладки и популярные позиции для обслуживания и ремонта двигателя.',
    verified: true,
    hasDelivery: true,
    avatar:
      'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=400&q=80',
  },
]
