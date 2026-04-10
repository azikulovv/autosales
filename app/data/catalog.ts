import type { CarModel } from '~/types/filters'
import type { Product, ProductDetails } from '~/types/product'
import type { CatalogOption, SortOption } from '~/types/catalog'

export const partCategories: CatalogOption[] = [
  { label: 'Все запчасти', value: 'all' },
  { label: 'Тормозная система', value: 'brakes' },
  { label: 'Фильтры', value: 'filters' },
  { label: 'Подвеска', value: 'suspension' },
  { label: 'Двигатель', value: 'engine' },
  { label: 'Электрика', value: 'electric' },
  { label: 'Кузов', value: 'body' },
  { label: 'Трансмиссия', value: 'transmission' },
]

export const carBrands: CatalogOption[] = [
  { label: 'Все автомобили', value: 'all' },
  { label: 'Toyota', value: 'toyota' },
  { label: 'Hyundai', value: 'hyundai' },
  { label: 'Kia', value: 'kia' },
  { label: 'BMW', value: 'bmw' },
  { label: 'Mercedes-Benz', value: 'mercedes' },
  { label: 'Lada', value: 'lada' },
]

export const carModels: CarModel[] = [
  { label: 'Все модели', value: 'all', brand: 'all' },
  { label: 'Camry 55', value: 'camry-55', brand: 'toyota' },
  { label: 'Corolla 150', value: 'corolla-150', brand: 'toyota' },
  { label: 'Elantra', value: 'elantra', brand: 'hyundai' },
  { label: 'Sonata', value: 'sonata', brand: 'hyundai' },
  { label: 'Rio', value: 'rio', brand: 'kia' },
  { label: 'Sportage', value: 'sportage', brand: 'kia' },
  { label: 'X5 E70', value: 'x5-e70', brand: 'bmw' },
  { label: '5 Series F10', value: 'f10', brand: 'bmw' },
  { label: 'W212', value: 'w212', brand: 'mercedes' },
  { label: 'Vesta', value: 'vesta', brand: 'lada' },
]

export const sortOptions: SortOption[] = [
  { label: 'Сначала дешевле', value: 'price-asc' },
  { label: 'Сначала дороже', value: 'price-desc' },
  { label: 'Сначала в наличии', value: 'stock' },
]

export const catalogProductDetails: ProductDetails[] = [
  {
    id: 1,
    name: 'Тормозные колодки передние',
    category: 'brakes',
    brand: 'toyota',
    model: 'camry-55',
    generation: '2014–2017',
    engine: '2.5',
    vendor: 'AutoParts KRG',
    article: 'AKE-04465',
    manufacturer: 'Akebono',
    price: 14500,
    inStock: true,
    city: 'Караганда',
    image:
      'https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'Передние тормозные колодки для Toyota Camry 55. Подходят для ежедневной эксплуатации, обеспечивают стабильное торможение и хороший ресурс.',
    specs: [
      { label: 'Тип детали', value: 'Передние тормозные колодки' },
      { label: 'Производитель', value: 'Akebono' },
      { label: 'Артикул', value: 'AKE-04465' },
      { label: 'Состояние', value: 'Новая' },
      { label: 'Город', value: 'Караганда' },
    ],
    compatibleCars: [
      'Toyota Camry 55 2.5 (2014–2017)',
      'Toyota Camry 55 3.5 (2014–2017)',
      'Toyota Camry 55 рестайлинг (2017)',
    ],
  },
  {
    id: 2,
    name: 'Фильтр масляный',
    category: 'filters',
    brand: 'hyundai',
    model: 'elantra',
    generation: '2018–2021',
    engine: '1.6',
    vendor: 'Filter Hub',
    article: 'MANN-W811',
    manufacturer: 'Mann Filter',
    price: 3200,
    inStock: true,
    city: 'Астана',
    image:
      'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'Качественный масляный фильтр для Hyundai Elantra. Подходит для регулярного технического обслуживания и стабильной работы двигателя.',
    specs: [
      { label: 'Тип детали', value: 'Масляный фильтр' },
      { label: 'Производитель', value: 'Mann Filter' },
      { label: 'Артикул', value: 'MANN-W811' },
      { label: 'Состояние', value: 'Новая' },
      { label: 'Город', value: 'Астана' },
    ],
    compatibleCars: ['Hyundai Elantra 1.6 (2018–2021)', 'Hyundai Elantra 2.0 (2018–2021)'],
  },
  {
    id: 3,
    name: 'Амортизатор передний',
    category: 'suspension',
    brand: 'kia',
    model: 'rio',
    generation: '2017–2021',
    engine: '1.4',
    vendor: 'Drive Market',
    article: 'KYB-338109',
    manufacturer: 'KYB',
    price: 21900,
    inStock: true,
    city: 'Алматы',
    image:
      'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=900&q=80',
    images: ['https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=80'],
    description:
      'Передний амортизатор для Kia Rio с комфортной настройкой для городской езды. Хороший вариант для замены штатной детали без потери управляемости.',
    specs: [
      { label: 'Тип детали', value: 'Передний амортизатор' },
      { label: 'Производитель', value: 'KYB' },
      { label: 'Артикул', value: 'KYB-338109' },
      { label: 'Состояние', value: 'Новая' },
      { label: 'Город', value: 'Алматы' },
    ],
    compatibleCars: ['Kia Rio 1.4 (2017–2021)', 'Kia Rio 1.6 (2017–2021)'],
  },
  {
    id: 4,
    name: 'Фильтр воздушный',
    category: 'filters',
    brand: 'bmw',
    model: 'x5-e70',
    generation: '2007–2013',
    engine: '3.0',
    vendor: 'Euro Parts',
    article: 'BOS-1A302',
    manufacturer: 'Bosch',
    price: 8900,
    inStock: false,
    city: 'Шымкент',
    image:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80',
    images: ['https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80'],
    description:
      'Воздушный фильтр для BMW X5 E70, рассчитан на стабильную фильтрацию воздуха и корректную работу двигателя в городском режиме.',
    specs: [
      { label: 'Тип детали', value: 'Воздушный фильтр' },
      { label: 'Производитель', value: 'Bosch' },
      { label: 'Артикул', value: 'BOS-1A302' },
      { label: 'Состояние', value: 'Новая' },
      { label: 'Город', value: 'Шымкент' },
    ],
    compatibleCars: ['BMW X5 E70 3.0 (2007–2013)', 'BMW X5 E70 4.8 (2007–2013)'],
  },
  {
    id: 5,
    name: 'Свечи зажигания комплект',
    category: 'engine',
    brand: 'kia',
    model: 'sportage',
    generation: '2016–2021',
    engine: '2.0',
    vendor: 'Spark Auto',
    article: 'NGK-9723',
    manufacturer: 'NGK',
    price: 11200,
    inStock: true,
    city: 'Караганда',
    image:
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=900&q=80',
    images: ['https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80'],
    description:
      'Комплект свечей зажигания для Kia Sportage 2.0. Обеспечивает стабильный запуск, ровную работу мотора и подходит для планового обслуживания.',
    specs: [
      { label: 'Тип детали', value: 'Свечи зажигания' },
      { label: 'Производитель', value: 'NGK' },
      { label: 'Артикул', value: 'NGK-9723' },
      { label: 'Состояние', value: 'Новая' },
      { label: 'Город', value: 'Караганда' },
    ],
    compatibleCars: ['Kia Sportage 2.0 (2016–2021)', 'Kia Sportage 2.4 (2016–2021)'],
  },
  {
    id: 6,
    name: 'Стойка стабилизатора',
    category: 'suspension',
    brand: 'toyota',
    model: 'corolla-150',
    generation: '2007–2013',
    engine: '1.6',
    vendor: 'Parts Zone',
    article: 'CTR-CLT-29',
    manufacturer: 'CTR',
    price: 7600,
    inStock: true,
    city: 'Алматы',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
    images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'],
    description:
      'Стойка стабилизатора для Toyota Corolla 150. Подходит для восстановления подвески и уменьшения посторонних стуков на неровностях.',
    specs: [
      { label: 'Тип детали', value: 'Стойка стабилизатора' },
      { label: 'Производитель', value: 'CTR' },
      { label: 'Артикул', value: 'CTR-CLT-29' },
      { label: 'Состояние', value: 'Новая' },
      { label: 'Город', value: 'Алматы' },
    ],
    compatibleCars: ['Toyota Corolla 150 1.6 (2007–2013)', 'Toyota Corolla 150 1.8 (2007–2013)'],
  },
  {
    id: 7,
    name: 'Генератор',
    category: 'electric',
    brand: 'mercedes',
    model: 'w212',
    generation: '2009–2013',
    engine: '2.0',
    vendor: 'German Auto',
    article: 'MB-ALTN-77',
    manufacturer: 'Valeo',
    price: 68400,
    inStock: true,
    city: 'Астана',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80',
    images: ['https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80'],
    description:
      'Генератор для Mercedes-Benz W212. Подходит для штатной замены и рассчитан на стабильную работу бортовой сети.',
    specs: [
      { label: 'Тип детали', value: 'Генератор' },
      { label: 'Производитель', value: 'Valeo' },
      { label: 'Артикул', value: 'MB-ALTN-77' },
      { label: 'Состояние', value: 'Новая' },
      { label: 'Город', value: 'Астана' },
    ],
    compatibleCars: ['Mercedes-Benz W212 2.0 (2009–2013)', 'Mercedes-Benz W212 3.0 (2009–2013)'],
  },
  {
    id: 8,
    name: 'Передний бампер',
    category: 'body',
    brand: 'lada',
    model: 'vesta',
    generation: '2018–2023',
    engine: '1.6',
    vendor: 'Body Mall',
    article: 'LADA-BMP-11',
    manufacturer: 'Lada',
    price: 35800,
    inStock: false,
    city: 'Караганда',
    image:
      'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?auto=format&fit=crop&w=900&q=80',
    images: ['https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?auto=format&fit=crop&w=1200&q=80'],
    description:
      'Передний бампер для Lada Vesta под покраску. Подходит для замены поврежденной детали и дальнейшей подготовки к установке.',
    specs: [
      { label: 'Тип детали', value: 'Передний бампер' },
      { label: 'Производитель', value: 'Lada' },
      { label: 'Артикул', value: 'LADA-BMP-11' },
      { label: 'Состояние', value: 'Новая' },
      { label: 'Город', value: 'Караганда' },
    ],
    compatibleCars: ['Lada Vesta 1.6 (2018–2023)', 'Lada Vesta 1.8 (2018–2023)'],
  },
]

export const catalogProducts: Product[] = catalogProductDetails.map(({ images, description, specs, compatibleCars, ...product }) => product)

const findLabel = (options: CatalogOption[] | CarModel[], value: string, fallback: string) =>
  options.find((item) => item.value === value)?.label ?? fallback

export const formatPrice = (value: number) => `${value.toLocaleString('ru-RU')} ₸`

export const getBrandLabel = (value: string) => findLabel(carBrands, value, 'Автомобиль')

export const getModelLabel = (value: string) => findLabel(carModels, value, 'Модель')

export const getCategoryLabel = (value: string) => findLabel(partCategories, value, 'Категория')

export const getCatalogProductById = (id: number) =>
  catalogProductDetails.find((product) => product.id === id) ?? null
