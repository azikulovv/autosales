import type { CarModel } from '~/types/filters'
import type { Product, ProductDetails } from '~/types/product'
import type { CatalogOption, SortOption } from '~/types/catalog'

export const partCategories: CatalogOption[] = [
  { label: 'Все запчасти', value: 'all' },

  // Двигатель
  { label: 'Двигатель', value: 'engine' },
  { label: 'Поршневая группа', value: 'piston' },
  { label: 'ГРМ', value: 'timing' },
  { label: 'Система охлаждения', value: 'cooling' },
  { label: 'Система смазки', value: 'lubrication' },
  { label: 'Топливная система', value: 'fuel' },
  { label: 'Впуск и выпуск', value: 'intake-exhaust' },

  // Тормоза
  { label: 'Тормозная система', value: 'brakes' },
  { label: 'Тормозные колодки', value: 'brake-pads' },
  { label: 'Тормозные диски', value: 'brake-discs' },
  { label: 'Суппорты', value: 'calipers' },
  { label: 'Тормозные шланги', value: 'brake-hoses' },

  // Подвеска и рулевое
  { label: 'Подвеска', value: 'suspension' },
  { label: 'Амортизаторы', value: 'shocks' },
  { label: 'Пружины', value: 'springs' },
  { label: 'Рычаги подвески', value: 'arms' },
  { label: 'Ступицы и подшипники', value: 'hubs' },
  { label: 'Рулевое управление', value: 'steering' },

  // Трансмиссия
  { label: 'Трансмиссия', value: 'transmission' },
  { label: 'Сцепление', value: 'clutch' },
  { label: 'Коробка передач', value: 'gearbox' },
  { label: 'Приводы и ШРУСы', value: 'cv-joints' },
  { label: 'Редукторы', value: 'differential' },

  // Электрика
  { label: 'Электрика', value: 'electric' },
  { label: 'Аккумуляторы', value: 'battery' },
  { label: 'Генераторы', value: 'alternator' },
  { label: 'Стартеры', value: 'starter' },
  { label: 'Датчики', value: 'sensors' },
  { label: 'Проводка', value: 'wiring' },

  // Кузов
  { label: 'Кузов', value: 'body' },
  { label: 'Бамперы', value: 'bumpers' },
  { label: 'Капоты', value: 'hood' },
  { label: 'Крылья', value: 'fenders' },
  { label: 'Двери', value: 'doors' },
  { label: 'Зеркала', value: 'mirrors' },

  // Освещение
  { label: 'Освещение', value: 'lights' },
  { label: 'Фары', value: 'headlights' },
  { label: 'Фонари', value: 'taillights' },
  { label: 'Лампочки', value: 'bulbs' },

  // Фильтры
  { label: 'Фильтры', value: 'filters' },
  { label: 'Масляные фильтры', value: 'oil-filter' },
  { label: 'Воздушные фильтры', value: 'air-filter' },
  { label: 'Салонные фильтры', value: 'cabin-filter' },
  { label: 'Топливные фильтры', value: 'fuel-filter' },

  // Салон
  { label: 'Салон', value: 'interior' },
  { label: 'Сиденья', value: 'seats' },
  { label: 'Руль', value: 'steering-wheel' },
  { label: 'Панели', value: 'dashboard' },

  // Колеса
  { label: 'Колеса и шины', value: 'wheels' },
  { label: 'Шины', value: 'tires' },
  { label: 'Диски', value: 'rims' },

  // Жидкости и расходники
  { label: 'Автохимия и жидкости', value: 'fluids' },
  { label: 'Моторное масло', value: 'engine-oil' },
  { label: 'Антифриз', value: 'coolant-fluid' },
  { label: 'Тормозная жидкость', value: 'brake-fluid' },

  // Прочее
  { label: 'Аксессуары', value: 'accessories' },
  { label: 'Инструменты', value: 'tools' },
]

export const carBrands: CatalogOption[] = [
  { label: 'Все автомобили', value: 'all' },

  // Япония
  { label: 'Toyota', value: 'toyota' },
  { label: 'Lexus', value: 'lexus' },
  { label: 'Nissan', value: 'nissan' },
  { label: 'Infiniti', value: 'infiniti' },
  { label: 'Honda', value: 'honda' },
  { label: 'Acura', value: 'acura' },
  { label: 'Mazda', value: 'mazda' },
  { label: 'Subaru', value: 'subaru' },
  { label: 'Mitsubishi', value: 'mitsubishi' },
  { label: 'Suzuki', value: 'suzuki' },

  // Корея
  { label: 'Hyundai', value: 'hyundai' },
  { label: 'Kia', value: 'kia' },
  { label: 'Genesis', value: 'genesis' },

  // Германия
  { label: 'BMW', value: 'bmw' },
  { label: 'Mercedes-Benz', value: 'mercedes' },
  { label: 'Audi', value: 'audi' },
  { label: 'Volkswagen', value: 'volkswagen' },
  { label: 'Porsche', value: 'porsche' },
  { label: 'Opel', value: 'opel' },

  // Франция
  { label: 'Renault', value: 'renault' },
  { label: 'Peugeot', value: 'peugeot' },
  { label: 'Citroen', value: 'citroen' },

  // США
  { label: 'Ford', value: 'ford' },
  { label: 'Chevrolet', value: 'chevrolet' },
  { label: 'Cadillac', value: 'cadillac' },
  { label: 'Dodge', value: 'dodge' },
  { label: 'Jeep', value: 'jeep' },
  { label: 'Tesla', value: 'tesla' },

  // Китай (очень важно для рынка СНГ)
  { label: 'Geely', value: 'geely' },
  { label: 'Chery', value: 'chery' },
  { label: 'Haval', value: 'haval' },
  { label: 'Changan', value: 'changan' },
  { label: 'BYD', value: 'byd' },
  { label: 'Exeed', value: 'exeed' },

  // Россия / СНГ
  { label: 'Lada', value: 'lada' },
  { label: 'GAZ', value: 'gaz' },
  { label: 'UAZ', value: 'uaz' },

  // Прочее
  { label: 'Volvo', value: 'volvo' },
  { label: 'Skoda', value: 'skoda' },
  { label: 'Seat', value: 'seat' },
  { label: 'Saab', value: 'saab' },
  { label: 'Mini', value: 'mini' },
  { label: 'Land Rover', value: 'land-rover' },
  { label: 'Jaguar', value: 'jaguar' },
  { label: 'Alfa Romeo', value: 'alfa-romeo' },
  { label: 'Fiat', value: 'fiat' },
]

export const carModels: CarModel[] = [
  { label: 'Все модели', value: 'all', brand: 'all' },

  // TOYOTA
  { label: 'Camry 40', value: 'camry-40', brand: 'toyota' },
  { label: 'Camry 50', value: 'camry-50', brand: 'toyota' },
  { label: 'Camry 55', value: 'camry-55', brand: 'toyota' },
  { label: 'Camry 70', value: 'camry-70', brand: 'toyota' },
  { label: 'Corolla 120', value: 'corolla-120', brand: 'toyota' },
  { label: 'Corolla 150', value: 'corolla-150', brand: 'toyota' },
  { label: 'Corolla 180', value: 'corolla-180', brand: 'toyota' },
  { label: 'Corolla 210', value: 'corolla-210', brand: 'toyota' },
  { label: 'RAV4 30', value: 'rav4-30', brand: 'toyota' },
  { label: 'RAV4 40', value: 'rav4-40', brand: 'toyota' },
  { label: 'RAV4 50', value: 'rav4-50', brand: 'toyota' },
  { label: 'Land Cruiser 100', value: 'lc-100', brand: 'toyota' },
  { label: 'Land Cruiser 200', value: 'lc-200', brand: 'toyota' },
  { label: 'Land Cruiser 300', value: 'lc-300', brand: 'toyota' },
  { label: 'Prado 120', value: 'prado-120', brand: 'toyota' },
  { label: 'Prado 150', value: 'prado-150', brand: 'toyota' },

  // HYUNDAI
  { label: 'Elantra HD', value: 'elantra-hd', brand: 'hyundai' },
  { label: 'Elantra AD', value: 'elantra-ad', brand: 'hyundai' },
  { label: 'Elantra CN7', value: 'elantra-cn7', brand: 'hyundai' },
  { label: 'Sonata NF', value: 'sonata-nf', brand: 'hyundai' },
  { label: 'Sonata YF', value: 'sonata-yf', brand: 'hyundai' },
  { label: 'Sonata LF', value: 'sonata-lf', brand: 'hyundai' },
  { label: 'Sonata DN8', value: 'sonata-dn8', brand: 'hyundai' },
  { label: 'Tucson', value: 'tucson', brand: 'hyundai' },
  { label: 'Santa Fe', value: 'santa-fe', brand: 'hyundai' },

  // KIA
  { label: 'Rio 3', value: 'rio-3', brand: 'kia' },
  { label: 'Rio 4', value: 'rio-4', brand: 'kia' },
  { label: 'Cerato 2', value: 'cerato-2', brand: 'kia' },
  { label: 'Cerato 3', value: 'cerato-3', brand: 'kia' },
  { label: 'Cerato 4', value: 'cerato-4', brand: 'kia' },
  { label: 'Optima K5', value: 'optima', brand: 'kia' },
  { label: 'Sportage 3', value: 'sportage-3', brand: 'kia' },
  { label: 'Sportage 4', value: 'sportage-4', brand: 'kia' },
  { label: 'Sorento', value: 'sorento', brand: 'kia' },

  // BMW
  { label: '3 Series E46', value: 'e46', brand: 'bmw' },
  { label: '3 Series E90', value: 'e90', brand: 'bmw' },
  { label: '5 Series E60', value: 'e60', brand: 'bmw' },
  { label: '5 Series F10', value: 'f10', brand: 'bmw' },
  { label: '5 Series G30', value: 'g30', brand: 'bmw' },
  { label: 'X5 E53', value: 'x5-e53', brand: 'bmw' },
  { label: 'X5 E70', value: 'x5-e70', brand: 'bmw' },
  { label: 'X5 F15', value: 'x5-f15', brand: 'bmw' },
  { label: 'X5 G05', value: 'x5-g05', brand: 'bmw' },

  // MERCEDES
  { label: 'C-Class W204', value: 'w204', brand: 'mercedes' },
  { label: 'C-Class W205', value: 'w205', brand: 'mercedes' },
  { label: 'E-Class W211', value: 'w211', brand: 'mercedes' },
  { label: 'E-Class W212', value: 'w212', brand: 'mercedes' },
  { label: 'E-Class W213', value: 'w213', brand: 'mercedes' },
  { label: 'S-Class W221', value: 'w221', brand: 'mercedes' },
  { label: 'S-Class W222', value: 'w222', brand: 'mercedes' },

  // LADA
  { label: 'Vesta', value: 'vesta', brand: 'lada' },
  { label: 'Granta', value: 'granta', brand: 'lada' },
  { label: 'Priora', value: 'priora', brand: 'lada' },
  { label: 'Niva', value: 'niva', brand: 'lada' },

  // CHINESE (важно для KZ рынка)
  { label: 'Geely Coolray', value: 'coolray', brand: 'geely' },
  { label: 'Geely Atlas', value: 'atlas', brand: 'geely' },
  { label: 'Haval H6', value: 'h6', brand: 'haval' },
  { label: 'Chery Tiggo 4', value: 'tiggo-4', brand: 'chery' },
  { label: 'Chery Tiggo 7', value: 'tiggo-7', brand: 'chery' },
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
    images: [
      'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=80',
    ],
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
    images: [
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    ],
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
    images: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80',
    ],
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
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    ],
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
    images: [
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
    ],
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
    images: [
      'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?auto=format&fit=crop&w=1200&q=80',
    ],
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

export const catalogProducts: Product[] = catalogProductDetails.map(
  ({ images, description, specs, compatibleCars, ...product }) => product,
)

const findLabel = (options: CatalogOption[] | CarModel[], value: string, fallback: string) =>
  options.find((item) => item.value === value)?.label ?? fallback

export const formatPrice = (value: number) => `${value.toLocaleString('ru-RU')} ₸`

export const getBrandLabel = (value: string) => findLabel(carBrands, value, 'Автомобиль')

export const getModelLabel = (value: string) => findLabel(carModels, value, 'Модель')

export const getCategoryLabel = (value: string) => findLabel(partCategories, value, 'Категория')

export const getCatalogProductById = (id: number) =>
  catalogProductDetails.find((product) => product.id === id) ?? null
