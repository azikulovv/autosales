<script setup lang="ts">

useSeoMeta({
  title: 'Продавец автозапчастей',
  description: 'Публичная страница продавца с товарами, рейтингом, описанием и контактами.',
})

type SellerProduct = {
  id: number
  name: string
  category: string
  brand: string
  model: string
  article: string
  manufacturer: string
  price: number
  inStock: boolean
  image: string
}

type Seller = {
  id: number
  name: string
  city: string
  rating: number
  reviewsCount: number
  verified: boolean
  hasDelivery: boolean
  phone: string
  telegram: string
  description: string
  specializations: string[]
  brands: string[]
  cover: string
  logo: string
  products: SellerProduct[]
}

type FilterOption = {
  label: string
  value: string
}

const route = useRoute()

const categoryLabels: Record<string, string> = {
  brakes: 'Тормозная система',
  filters: 'Фильтры',
  suspension: 'Подвеска',
  engine: 'Двигатель',
  electric: 'Электрика',
  body: 'Кузов',
  transmission: 'Трансмиссия',
}

const brandLabels: Record<string, string> = {
  toyota: 'Toyota',
  hyundai: 'Hyundai',
  kia: 'Kia',
  bmw: 'BMW',
  mercedes: 'Mercedes-Benz',
  lada: 'Lada',
}

const modelLabels: Record<string, string> = {
  'camry-55': 'Camry 55',
  'corolla-150': 'Corolla 150',
  elantra: 'Elantra',
  sonata: 'Sonata',
  rio: 'Rio',
  sportage: 'Sportage',
  'x5-e70': 'X5 E70',
  f10: '5 Series F10',
  w212: 'W212',
  vesta: 'Vesta',
}

const categoryOptions: FilterOption[] = [
  { label: 'Все категории', value: 'all' },
  { label: 'Тормозная система', value: 'brakes' },
  { label: 'Фильтры', value: 'filters' },
  { label: 'Подвеска', value: 'suspension' },
  { label: 'Двигатель', value: 'engine' },
  { label: 'Электрика', value: 'electric' },
  { label: 'Кузов', value: 'body' },
]

const sortOptions: FilterOption[] = [
  { label: 'Сначала дешевле', value: 'price-asc' },
  { label: 'Сначала дороже', value: 'price-desc' },
  { label: 'Сначала в наличии', value: 'stock' },
]

const sellers: Seller[] = [
  {
    id: 1,
    name: 'AutoParts KRG',
    city: 'Караганда',
    rating: 4.9,
    reviewsCount: 184,
    verified: true,
    hasDelivery: true,
    phone: '+7 (777) 123-45-67',
    telegram: '@autoparts_krg',
    description:
      'Магазин с большим выбором тормозной системы, подвески и расходников для популярных автомобилей. Фокус на быструю выдачу, понятные карточки и актуальные остатки.',
    specializations: ['Тормозная система', 'Подвеска', 'Фильтры'],
    brands: ['Toyota', 'Kia', 'Hyundai'],
    cover:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80',
    logo: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=400&q=80',
    products: [
      {
        id: 101,
        name: 'Тормозные колодки передние',
        category: 'brakes',
        brand: 'toyota',
        model: 'camry-55',
        article: 'AKE-04465',
        manufacturer: 'Akebono',
        price: 14500,
        inStock: true,
        image:
          'https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 102,
        name: 'Стойка стабилизатора',
        category: 'suspension',
        brand: 'toyota',
        model: 'corolla-150',
        article: 'CTR-CLT-29',
        manufacturer: 'CTR',
        price: 7600,
        inStock: true,
        image:
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 103,
        name: 'Амортизатор передний',
        category: 'suspension',
        brand: 'kia',
        model: 'rio',
        article: 'KYB-338109',
        manufacturer: 'KYB',
        price: 21900,
        inStock: false,
        image:
          'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 104,
        name: 'Фильтр масляный',
        category: 'filters',
        brand: 'hyundai',
        model: 'elantra',
        article: 'MANN-W811',
        manufacturer: 'Mann Filter',
        price: 3200,
        inStock: true,
        image:
          'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  {
    id: 2,
    name: 'Filter Hub',
    city: 'Астана',
    rating: 4.8,
    reviewsCount: 129,
    verified: true,
    hasDelivery: true,
    phone: '+7 (701) 555-11-22',
    telegram: '@filterhub',
    description:
      'Специализация на фильтрах, свечах и базовых расходниках для обслуживания. Хорошо подходит для регулярных заказов и массовых позиций.',
    specializations: ['Фильтры', 'Двигатель'],
    brands: ['Hyundai', 'Kia', 'BMW'],
    cover:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=80',
    logo: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=400&q=80',
    products: [
      {
        id: 201,
        name: 'Фильтр воздушный',
        category: 'filters',
        brand: 'bmw',
        model: 'x5-e70',
        article: 'BOS-1A302',
        manufacturer: 'Bosch',
        price: 8900,
        inStock: true,
        image:
          'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 202,
        name: 'Свечи зажигания комплект',
        category: 'engine',
        brand: 'kia',
        model: 'sportage',
        article: 'NGK-9723',
        manufacturer: 'NGK',
        price: 11200,
        inStock: true,
        image:
          'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
]

const sellerId = computed(() => Number(route.params.id))
const seller = computed(() => sellers.find((item) => item.id === sellerId.value) ?? null)

const search = ref('')
const selectedCategory = ref('all')
const selectedSort = ref('price-asc')
const onlyInStock = ref(false)
const showMobileFilters = ref(false)

const formatPrice = (value: number) => `${value.toLocaleString('ru-RU')} ₸`

const getCategoryLabel = (value: string) => categoryLabels[value] ?? 'Категория'

const getCarLabel = (brand: string, model: string) => {
  const brandName = brandLabels[brand] ?? ''
  const modelName = modelLabels[model] ?? ''
  return `${brandName} ${modelName}`.trim()
}

const filteredProducts = computed(() => {
  if (!seller.value) {
    return []
  }

  let items = [...seller.value.products]

  if (search.value.trim()) {
    const query = search.value.trim().toLowerCase()

    items = items.filter((product) => {
      return [
        product.name,
        product.article,
        product.manufacturer,
        getCategoryLabel(product.category),
        getCarLabel(product.brand, product.model),
      ]
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
  }

  if (selectedCategory.value !== 'all') {
    items = items.filter((product) => product.category === selectedCategory.value)
  }

  if (onlyInStock.value) {
    items = items.filter((product) => product.inStock)
  }

  switch (selectedSort.value) {
    case 'price-desc':
      items.sort((a, b) => b.price - a.price)
      break
    case 'stock':
      items.sort((a, b) => Number(b.inStock) - Number(a.inStock) || a.price - b.price)
      break
    default:
      items.sort((a, b) => a.price - b.price)
  }

  return items
})

const sellerStats = computed(() => {
  if (!seller.value) {
    return {
      productsCount: 0,
      minPrice: '—',
      specializations: 0,
    }
  }

  const prices = seller.value.products.map((item) => item.price)

  return {
    productsCount: seller.value.products.length,
    minPrice: prices.length ? formatPrice(Math.min(...prices)) : '—',
    specializations: seller.value.specializations.length,
  }
})

const resetFilters = () => {
  search.value = ''
  selectedCategory.value = 'all'
  selectedSort.value = 'price-asc'
  onlyInStock.value = false
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-950">
    <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <template v-if="seller">
        <section class="overflow-hidden rounded-[28px] bg-white shadow-sm">
          <div class="relative h-48 bg-neutral-200 sm:h-56 lg:h-72">
            <img :src="seller.cover" :alt="seller.name" class="h-full w-full object-cover" />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
            />
          </div>

          <div class="relative px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
            <div
              class="-mt-14 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between"
            >
              <div class="flex min-w-0 items-end gap-4">
                <div
                  class="h-24 w-24 overflow-hidden rounded-[24px] border-4 border-white bg-white shadow-lg sm:h-28 sm:w-28"
                >
                  <img :src="seller.logo" :alt="seller.name" class="h-full w-full object-cover" />
                </div>

                <div class="min-w-0 pb-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <h1
                      class="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl"
                    >
                      {{ seller.name }}
                    </h1>
                    <span
                      v-if="seller.verified"
                      class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                    >
                      Проверен
                    </span>
                  </div>
                  <p class="mt-2 text-sm text-neutral-500 sm:text-base">
                    {{ seller.city }}
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-3 sm:w-auto">
                <div class="rounded-2xl bg-neutral-950 px-4 py-3 text-white">
                  <p class="text-[11px] uppercase tracking-[0.18em] text-white/50">Рейтинг</p>
                  <p class="mt-1 text-xl font-semibold tracking-tight">{{ seller.rating }}</p>
                </div>
                <div class="rounded-2xl bg-neutral-950 px-4 py-3 text-white">
                  <p class="text-[11px] uppercase tracking-[0.18em] text-white/50">Отзывы</p>
                  <p class="mt-1 text-xl font-semibold tracking-tight">{{ seller.reviewsCount }}</p>
                </div>
                <div class="rounded-2xl bg-neutral-950 px-4 py-3 text-white">
                  <p class="text-[11px] uppercase tracking-[0.18em] text-white/50">Товаров</p>
                  <p class="mt-1 text-xl font-semibold tracking-tight">
                    {{ sellerStats.productsCount }}
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-5 grid gap-5 lg:grid-cols-[1fr_320px] lg:gap-6">
              <div>
                <p class="text-sm leading-6 text-neutral-500 sm:text-base">
                  {{ seller.description }}
                </p>

                <div class="mt-4 flex flex-wrap gap-2">
                  <span
                    v-for="item in seller.specializations"
                    :key="item"
                    class="rounded-full bg-neutral-100 px-3 py-2 text-xs font-medium text-neutral-600"
                  >
                    {{ item }}
                  </span>
                </div>

                <div class="mt-3 flex flex-wrap gap-2">
                  <span
                    v-for="brand in seller.brands"
                    :key="brand"
                    class="rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-600"
                  >
                    {{ brand }}
                  </span>
                </div>
              </div>

              <aside class="rounded-[24px] bg-neutral-50 p-4 sm:p-5">
                <div class="space-y-3">
                  <div class="rounded-2xl bg-white px-4 py-4">
                    <p class="text-xs uppercase tracking-[0.18em] text-neutral-400">Телефон</p>
                    <p class="mt-2 text-sm font-medium text-neutral-700">{{ seller.phone }}</p>
                  </div>

                  <div class="rounded-2xl bg-white px-4 py-4">
                    <p class="text-xs uppercase tracking-[0.18em] text-neutral-400">Telegram</p>
                    <p class="mt-2 text-sm font-medium text-neutral-700">{{ seller.telegram }}</p>
                  </div>

                  <div class="rounded-2xl bg-white px-4 py-4">
                    <p class="text-xs uppercase tracking-[0.18em] text-neutral-400">Доставка</p>
                    <p class="mt-2 text-sm font-medium text-neutral-700">
                      {{ seller.hasDelivery ? 'Есть доставка' : 'Самовывоз / уточнять у продавца' }}
                    </p>
                  </div>
                </div>

                <div class="mt-4 grid gap-3">
                  <button
                    type="button"
                    class="flex h-12 items-center justify-center rounded-2xl bg-neutral-950 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    Написать продавцу
                  </button>

                  <button
                    type="button"
                    class="flex h-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
                  >
                    Позвонить
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section class="mt-4 grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6">
          <aside class="hidden lg:block">
            <div
              class="sticky top-6 rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <div class="flex items-center justify-between gap-3">
                <div>
                  <p class="text-sm font-medium text-neutral-500">Фильтры</p>
                  <h2 class="mt-1 text-xl font-semibold tracking-tight">Товары продавца</h2>
                </div>
                <button
                  type="button"
                  class="text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
                  @click="resetFilters"
                >
                  Сбросить
                </button>
              </div>

              <div class="mt-5 space-y-4">
                <div>
                  <label class="mb-2 block text-sm font-medium text-neutral-700">Поиск</label>
                  <input
                    v-model="search"
                    type="text"
                    placeholder="Название, артикул, бренд"
                    class="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
                  />
                </div>

                <div>
                  <label class="mb-2 block text-sm font-medium text-neutral-700">Категория</label>
                  <select
                    v-model="selectedCategory"
                    class="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
                  >
                    <option
                      v-for="option in categoryOptions"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="mb-2 block text-sm font-medium text-neutral-700">Сортировка</label>
                  <select
                    v-model="selectedSort"
                    class="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
                  >
                    <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                      {{ option.label }}
                    </option>
                  </select>
                </div>

                <label
                  class="flex items-center gap-3 rounded-2xl bg-neutral-50 px-4 py-3 text-sm text-neutral-700"
                >
                  <input
                    v-model="onlyInStock"
                    type="checkbox"
                    class="h-4 w-4 rounded border-neutral-300"
                  />
                  Только в наличии
                </label>
              </div>

              <div class="mt-5 grid gap-3">
                <div class="rounded-2xl bg-neutral-50 p-4">
                  <p class="text-xs uppercase tracking-[0.18em] text-neutral-400">
                    Минимальная цена
                  </p>
                  <p class="mt-2 text-lg font-semibold tracking-tight text-neutral-950">
                    {{ sellerStats.minPrice }}
                  </p>
                </div>

                <div class="rounded-2xl bg-neutral-50 p-4">
                  <p class="text-xs uppercase tracking-[0.18em] text-neutral-400">Специализаций</p>
                  <p class="mt-2 text-lg font-semibold tracking-tight text-neutral-950">
                    {{ sellerStats.specializations }}
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <div class="min-w-0">
            <section
              class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm lg:hidden"
            >
              <div class="space-y-3">
                <input
                  v-model="search"
                  type="text"
                  placeholder="Поиск по товарам продавца"
                  class="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
                />

                <div class="grid grid-cols-2 gap-3">
                  <select
                    v-model="selectedCategory"
                    class="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
                  >
                    <option
                      v-for="option in categoryOptions"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </option>
                  </select>

                  <button
                    type="button"
                    class="flex h-12 items-center justify-center rounded-2xl border border-neutral-200 px-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
                    @click="showMobileFilters = !showMobileFilters"
                  >
                    {{ showMobileFilters ? 'Скрыть фильтры' : 'Фильтры' }}
                  </button>
                </div>
              </div>

              <div v-if="showMobileFilters" class="mt-3 space-y-3 border-t border-neutral-100 pt-3">
                <select
                  v-model="selectedSort"
                  class="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
                >
                  <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>

                <label
                  class="flex items-center gap-3 rounded-2xl bg-neutral-50 px-4 py-3 text-sm text-neutral-700"
                >
                  <input
                    v-model="onlyInStock"
                    type="checkbox"
                    class="h-4 w-4 rounded border-neutral-300"
                  />
                  Только в наличии
                </label>

                <button
                  type="button"
                  class="flex h-12 w-full items-center justify-center rounded-2xl border border-neutral-200 px-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
                  @click="resetFilters"
                >
                  Сбросить фильтры
                </button>
              </div>
            </section>

            <section class="mt-4 flex flex-wrap items-center gap-2 lg:mt-0">
              <span
                class="rounded-full bg-white px-3 py-2 text-xs font-medium text-neutral-600 shadow-sm ring-1 ring-neutral-200"
              >
                {{
                  selectedCategory === 'all' ? 'Все категории' : categoryLabels[selectedCategory]
                }}
              </span>
              <span
                v-if="onlyInStock"
                class="rounded-full bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200"
              >
                Только в наличии
              </span>
              <span
                class="rounded-full bg-white px-3 py-2 text-xs font-medium text-neutral-600 shadow-sm ring-1 ring-neutral-200"
              >
                {{ filteredProducts.length }} товаров
              </span>
            </section>

            <section class="mt-4">
              <div v-if="filteredProducts.length" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <article
                  v-for="product in filteredProducts"
                  :key="product.id"
                  class="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div class="aspect-[4/3] overflow-hidden bg-neutral-100">
                    <img
                      :src="product.image"
                      :alt="product.name"
                      class="h-full w-full object-cover"
                    />
                  </div>

                  <div class="p-4">
                    <div class="flex items-start justify-between gap-3">
                      <div class="min-w-0">
                        <p class="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                          {{ getCategoryLabel(product.category) }}
                        </p>
                        <h2
                          class="mt-2 text-lg font-semibold leading-snug tracking-tight text-neutral-950"
                        >
                          {{ product.name }}
                        </h2>
                      </div>

                      <span
                        class="shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
                        :class="
                          product.inStock
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-neutral-100 text-neutral-500'
                        "
                      >
                        {{ product.inStock ? 'В наличии' : 'Под заказ' }}
                      </span>
                    </div>

                    <div class="mt-4 rounded-[22px] bg-neutral-950 p-4 text-white">
                      <p class="text-[11px] uppercase tracking-[0.18em] text-white/50">Цена</p>
                      <p class="mt-2 text-3xl font-semibold tracking-tight">
                        {{ formatPrice(product.price) }}
                      </p>
                    </div>

                    <dl class="mt-4 space-y-3 text-sm">
                      <div class="flex items-start justify-between gap-4">
                        <dt class="text-neutral-400">Автомобиль</dt>
                        <dd class="text-right font-medium text-neutral-700">
                          {{ getCarLabel(product.brand, product.model) }}
                        </dd>
                      </div>

                      <div class="flex items-start justify-between gap-4">
                        <dt class="text-neutral-400">Артикул</dt>
                        <dd class="text-right font-medium text-neutral-700">
                          {{ product.article }}
                        </dd>
                      </div>

                      <div class="flex items-start justify-between gap-4">
                        <dt class="text-neutral-400">Бренд</dt>
                        <dd class="text-right font-medium text-neutral-700">
                          {{ product.manufacturer }}
                        </dd>
                      </div>
                    </dl>

                    <NuxtLink
                      :to="`/product/${product.id}`"
                      class="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-neutral-950 text-sm font-medium text-white transition hover:opacity-90"
                    >
                      Открыть товар
                    </NuxtLink>
                  </div>
                </article>
              </div>

              <div
                v-else
                class="rounded-[28px] border border-dashed border-neutral-300 bg-white p-8 text-center shadow-sm"
              >
                <h2 class="text-xl font-semibold tracking-tight text-neutral-950">
                  Товары не найдены
                </h2>
                <p class="mt-2 text-sm leading-6 text-neutral-500">
                  Измени фильтры или сбрось поиск, чтобы увидеть больше позиций этого продавца.
                </p>
                <button
                  type="button"
                  class="mt-4 inline-flex rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
                  @click="resetFilters"
                >
                  Сбросить фильтры
                </button>
              </div>
            </section>
          </div>
        </section>
      </template>

      <section
        v-else
        class="rounded-[28px] border border-dashed border-neutral-300 bg-white p-8 text-center shadow-sm"
      >
        <h1 class="text-2xl font-semibold tracking-tight text-neutral-950">Продавец не найден</h1>
        <p class="mt-2 text-sm leading-6 text-neutral-500">
          Возможно, страница была удалена или ссылка указана неверно.
        </p>
        <NuxtLink
          to="/sellers"
          class="mt-4 inline-flex rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          Вернуться к продавцам
        </NuxtLink>
      </section>
    </div>
  </div>
</template>
