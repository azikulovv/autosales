<script setup lang="ts">
useSeoMeta({
  title: 'автосейлс | Каталог автозапчастей',
  description: 'Каталог автозапчастей с подбором по автомобилю, категории и цене.',
})

type PartCategory = {
  label: string
  value: string
}

type CarBrand = {
  label: string
  value: string
}

type CarModel = {
  label: string
  value: string
  brand: string
}

type SortOption = {
  label: string
  value: string
}

type Product = {
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

const partCategories: PartCategory[] = [
  { label: 'Все запчасти', value: 'all' },
  { label: 'Тормозная система', value: 'brakes' },
  { label: 'Фильтры', value: 'filters' },
  { label: 'Подвеска', value: 'suspension' },
  { label: 'Двигатель', value: 'engine' },
  { label: 'Электрика', value: 'electric' },
  { label: 'Кузов', value: 'body' },
  { label: 'Трансмиссия', value: 'transmission' },
]

const carBrands: CarBrand[] = [
  { label: 'Все автомобили', value: 'all' },
  { label: 'Toyota', value: 'toyota' },
  { label: 'Hyundai', value: 'hyundai' },
  { label: 'Kia', value: 'kia' },
  { label: 'BMW', value: 'bmw' },
  { label: 'Mercedes-Benz', value: 'mercedes' },
  { label: 'Lada', value: 'lada' },
]

const carModels: CarModel[] = [
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

const sortOptions: SortOption[] = [
  { label: 'Сначала дешевле', value: 'price-asc' },
  { label: 'Сначала дороже', value: 'price-desc' },
  { label: 'Сначала в наличии', value: 'stock' },
]

const products = ref<Product[]>([
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
  },
])

const search = ref('')
const selectedCategory = ref('all')
const selectedBrand = ref('all')
const selectedModel = ref('all')
const selectedSort = ref('price-asc')
const onlyInStock = ref(false)
const showMobileFilters = ref(false)

const inputClass =
  'h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950'

const availableModels = computed(() => {
  if (selectedBrand.value === 'all') {
    return carModels.filter((model) => model.brand === 'all')
  }

  return carModels.filter((model) => model.brand === 'all' || model.brand === selectedBrand.value)
})

watch(selectedBrand, () => {
  const isCurrentModelAvailable = availableModels.value.some(
    (model) => model.value === selectedModel.value,
  )

  if (!isCurrentModelAvailable) {
    selectedModel.value = 'all'
  }
})

const formatPrice = (value: number) => `${value.toLocaleString('ru-RU')} ₸`

const getBrandLabel = (value: string) =>
  carBrands.find((item) => item.value === value)?.label ?? 'Автомобиль'

const getModelLabel = (value: string) =>
  carModels.find((item) => item.value === value)?.label ?? 'Модель'

const getCategoryLabel = (value: string) =>
  partCategories.find((item) => item.value === value)?.label ?? 'Категория'

const filteredProducts = computed(() => {
  let items = [...products.value]

  if (search.value.trim()) {
    const query = search.value.trim().toLowerCase()

    items = items.filter((product) => {
      return [
        product.name,
        product.article,
        product.manufacturer,
        product.vendor,
        getBrandLabel(product.brand),
        getModelLabel(product.model),
      ]
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
  }

  if (selectedCategory.value !== 'all') {
    items = items.filter((product) => product.category === selectedCategory.value)
  }

  if (selectedBrand.value !== 'all') {
    items = items.filter((product) => product.brand === selectedBrand.value)
  }

  if (selectedModel.value !== 'all') {
    items = items.filter((product) => product.model === selectedModel.value)
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

const catalogStats = computed(() => {
  const prices = filteredProducts.value.map((item) => item.price)

  return {
    total: filteredProducts.value.length,
    minPrice: prices.length ? formatPrice(Math.min(...prices)) : '—',
    categories: new Set(filteredProducts.value.map((item) => item.category)).size,
  }
})

const resetFilters = () => {
  search.value = ''
  selectedCategory.value = 'all'
  selectedBrand.value = 'all'
  selectedModel.value = 'all'
  selectedSort.value = 'price-asc'
  onlyInStock.value = false
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-950">
    <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <section
        class="rounded-[28px] bg-neutral-950 p-5 text-white shadow-xl sm:rounded-4xl sm:p-7 lg:p-8"
      >
        <div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p
              class="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/70 sm:text-xs"
            >
              Каталог автозапчастей
            </p>
            <h1
              class="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            >
              Подбор запчастей по автомобилю и типу детали
            </h1>
            <p class="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
              Выбери автомобиль, затем нужную категорию. В карточке оставлено только самое важное:
              фото, название, совместимость, наличие и цена.
            </p>
          </div>

          <div
            class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:justify-self-end lg:w-full lg:max-w-xs"
          >
            <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p class="text-2xl font-semibold tracking-tight">{{ catalogStats.total }}</p>
              <p class="mt-1 text-sm text-white/60">найдено позиций</p>
            </div>

            <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p class="text-2xl font-semibold tracking-tight">{{ catalogStats.minPrice }}</p>
              <p class="mt-1 text-sm text-white/60">минимальная цена</p>
            </div>

            <div class="col-span-2 rounded-2xl border border-white/10 bg-white/5 p-4 sm:col-span-1">
              <p class="text-2xl font-semibold tracking-tight">{{ catalogStats.categories }}</p>
              <p class="mt-1 text-sm text-white/60">категорий в выдаче</p>
            </div>
          </div>
        </div>
      </section>

      <section class="mt-4 lg:mt-6 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6">
        <aside class="hidden lg:block">
          <div
            class="sticky top-20 rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm"
          >
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-sm font-medium text-neutral-500">Фильтры</p>
                <h2 class="mt-1 text-xl font-semibold tracking-tight">Подбор</h2>
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
                  :class="inputClass"
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-neutral-700">Автомобиль</label>
                <select v-model="selectedBrand" :class="inputClass">
                  <option v-for="brand in carBrands" :key="brand.value" :value="brand.value">
                    {{ brand.label }}
                  </option>
                </select>
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-neutral-700">Модель</label>
                <select v-model="selectedModel" :class="inputClass">
                  <option v-for="model in availableModels" :key="model.value" :value="model.value">
                    {{ model.label }}
                  </option>
                </select>
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-neutral-700">Тип запчасти</label>
                <select v-model="selectedCategory" :class="inputClass">
                  <option
                    v-for="category in partCategories"
                    :key="category.value"
                    :value="category.value"
                  >
                    {{ category.label }}
                  </option>
                </select>
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-neutral-700">Сортировка</label>
                <select v-model="selectedSort" :class="inputClass">
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
          </div>
        </aside>

        <div class="min-w-0">
          <section
            class="mt-4 rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm lg:mt-0 lg:hidden"
          >
            <div class="space-y-3">
              <input
                v-model="search"
                type="text"
                placeholder="Поиск по названию или артикулу"
                :class="inputClass"
              />

              <div class="grid grid-cols-2 gap-3">
                <select v-model="selectedBrand" :class="inputClass">
                  <option v-for="brand in carBrands" :key="brand.value" :value="brand.value">
                    {{ brand.label }}
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
              <select v-model="selectedModel" :class="inputClass">
                <option v-for="model in availableModels" :key="model.value" :value="model.value">
                  {{ model.label }}
                </option>
              </select>

              <select v-model="selectedCategory" :class="inputClass">
                <option
                  v-for="category in partCategories"
                  :key="category.value"
                  :value="category.value"
                >
                  {{ category.label }}
                </option>
              </select>

              <select v-model="selectedSort" :class="inputClass">
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
              {{ selectedBrand === 'all' ? 'Все автомобили' : getBrandLabel(selectedBrand) }}
            </span>

            <span
              class="rounded-full bg-white px-3 py-2 text-xs font-medium text-neutral-600 shadow-sm ring-1 ring-neutral-200"
            >
              {{ selectedCategory === 'all' ? 'Все запчасти' : getCategoryLabel(selectedCategory) }}
            </span>

            <span
              v-if="selectedModel !== 'all'"
              class="rounded-full bg-white px-3 py-2 text-xs font-medium text-neutral-600 shadow-sm ring-1 ring-neutral-200"
            >
              {{ getModelLabel(selectedModel) }}
            </span>

            <span
              v-if="onlyInStock"
              class="rounded-full bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200"
            >
              Только в наличии
            </span>
          </section>

          <section class="mt-4">
            <div v-if="filteredProducts.length" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <article
                v-for="product in filteredProducts"
                :key="product.id"
                class="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div class="aspect-4/3 overflow-hidden bg-neutral-100">
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
                        {{ getBrandLabel(product.brand) }} {{ getModelLabel(product.model) }}
                      </dd>
                    </div>

                    <div v-if="product.engine" class="flex items-start justify-between gap-4">
                      <dt class="text-neutral-400">Двигатель</dt>
                      <dd class="text-right font-medium text-neutral-700">{{ product.engine }}</dd>
                    </div>

                    <div class="flex items-start justify-between gap-4">
                      <dt class="text-neutral-400">Артикул</dt>
                      <dd class="text-right font-medium text-neutral-700">{{ product.article }}</dd>
                    </div>

                    <div class="flex items-start justify-between gap-4">
                      <dt class="text-neutral-400">Бренд</dt>
                      <dd class="text-right font-medium text-neutral-700">
                        {{ product.manufacturer }}
                      </dd>
                    </div>
                  </dl>

                  <div
                    class="mt-4 flex items-center justify-between gap-3 text-sm text-neutral-500"
                  >
                    <span>{{ product.vendor }}</span>
                    <span>{{ product.city }}</span>
                  </div>

                  <button
                    type="button"
                    class="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-neutral-950 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    Открыть карточку
                  </button>
                </div>
              </article>
            </div>

            <div
              v-else
              class="rounded-[28px] border border-dashed border-neutral-300 bg-white p-8 text-center shadow-sm"
            >
              <h2 class="text-xl font-semibold tracking-tight text-neutral-950">
                Ничего не найдено
              </h2>
              <p class="mt-2 text-sm leading-6 text-neutral-500">
                Измени автомобиль, тип запчасти или сбрось фильтры, чтобы увидеть больше позиций.
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
    </div>
  </div>
</template>
