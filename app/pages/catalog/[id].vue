<script setup lang="ts">
useSeoMeta({
  title: 'автосейлс | Карточка автозапчасти',
  description: 'Подробная информация об автозапчасти: совместимость, артикул, наличие и цена.',
})

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
  images: string[]
  description: string
  specs: Array<{
    label: string
    value: string
  }>
  compatibleCars: string[]
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

const activeImageIndex = ref(0)

const activeImage = computed(() => {
  return product.value?.images[activeImageIndex.value] ?? ''
})

watchEffect(() => {
  activeImageIndex.value = 0
})

const showPrevImage = () => {
  if (!product.value?.images.length) {
    return
  }

  activeImageIndex.value =
    activeImageIndex.value === 0 ? product.value.images.length - 1 : activeImageIndex.value - 1
}

const showNextImage = () => {
  if (!product.value?.images.length) {
    return
  }

  activeImageIndex.value =
    activeImageIndex.value === product.value.images.length - 1 ? 0 : activeImageIndex.value + 1
}

const products: Product[] = [
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
]

const productId = computed(() => Number(route.params.id))
const product = computed(() => products.find((item) => item.id === productId.value) ?? null)

const formatPrice = (value: number) => `${value.toLocaleString('ru-RU')} ₸`

const productCategoryLabel = computed(() => {
  if (!product.value) {
    return 'Категория'
  }

  return categoryLabels[product.value.category] ?? 'Категория'
})

const productCarLabel = computed(() => {
  if (!product.value) {
    return 'Автомобиль'
  }

  const brand = brandLabels[product.value.brand] ?? ''
  const model = modelLabels[product.value.model] ?? ''

  return `${brand} ${model}`.trim()
})

const sellerCardItems = computed(() => {
  if (!product.value) {
    return []
  }

  return [
    { label: 'Продавец', value: product.value.vendor },
    { label: 'Город', value: product.value.city },
    { label: 'Наличие', value: product.value.inStock ? 'В наличии' : 'Под заказ' },
  ]
})
</script>

<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-950">
    <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <template v-if="product">
        <section class="rounded-[28px] bg-white p-4 shadow-sm sm:p-6 lg:p-8">
          <div class="flex flex-wrap items-center gap-2 text-sm text-neutral-500">
            <NuxtLink to="/" class="transition hover:text-neutral-950"> Главная </NuxtLink>
            <span>/</span>
            <NuxtLink to="/catalog" class="transition hover:text-neutral-950"> Каталог </NuxtLink>
            <span>/</span>
            <NuxtLink to="/categories" class="transition hover:text-neutral-950">
              {{ productCategoryLabel }}
            </NuxtLink>
            <span>/</span>
            <span class="text-neutral-950">{{ product.name }}</span>
          </div>

          <div class="mt-4 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
            <div>
              <div class="overflow-hidden rounded-[24px] border border-neutral-200 bg-white">
                <div class="relative aspect-[4/3] bg-neutral-100">
                  <img :src="activeImage" :alt="product.name" class="h-full w-full object-cover" />

                  <div
                    v-if="product.images.length > 1"
                    class="pointer-events-none absolute inset-x-0 top-3 flex justify-center"
                  >
                    <div
                      class="rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                    >
                      {{ activeImageIndex + 1 }} / {{ product.images.length }}
                    </div>
                  </div>

                  <template v-if="product.images.length > 1">
                    <button
                      type="button"
                      class="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-sm backdrop-blur transition hover:bg-white"
                      aria-label="Предыдущее фото"
                      @click="showPrevImage"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        class="h-5 w-5"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      class="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-sm backdrop-blur transition hover:bg-white"
                      aria-label="Следующее фото"
                      @click="showNextImage"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        class="h-5 w-5"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 6l6 6-6 6" />
                      </svg>
                    </button>
                  </template>
                </div>
              </div>

              <div
                v-if="product.images.length > 1"
                class="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5"
              >
                <button
                  v-for="(image, index) in product.images"
                  :key="`${image}-${index}`"
                  type="button"
                  class="overflow-hidden rounded-[18px] border bg-neutral-100 transition"
                  :class="
                    activeImageIndex === index
                      ? 'border-neutral-950 ring-2 ring-neutral-950/10'
                      : 'border-neutral-200 hover:border-neutral-300'
                  "
                  @click="activeImageIndex = index"
                >
                  <img
                    :src="image"
                    :alt="`${product.name} ${index + 1}`"
                    class="aspect-[4/3] h-full w-full object-cover"
                  />
                </button>
              </div>
            </div>

            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-2">
                <span
                  class="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600"
                >
                  {{ productCategoryLabel }}
                </span>

                <span
                  class="rounded-full px-3 py-1 text-xs font-semibold"
                  :class="
                    product.inStock
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-neutral-100 text-neutral-500'
                  "
                >
                  {{ product.inStock ? 'В наличии' : 'Под заказ' }}
                </span>
              </div>

              <h1
                class="mt-4 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-4xl"
              >
                {{ product.name }}
              </h1>

              <p class="mt-3 text-sm leading-6 text-neutral-500 sm:text-base">
                {{ product.description }}
              </p>

              <div class="mt-5 rounded-[24px] bg-neutral-950 p-5 text-white">
                <p class="text-[11px] uppercase tracking-[0.18em] text-white/50">Цена</p>
                <p class="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                  {{ formatPrice(product.price) }}
                </p>
              </div>

              <dl class="mt-5 space-y-3 rounded-[24px] bg-neutral-50 p-4 sm:p-5">
                <div class="flex items-start justify-between gap-4">
                  <dt class="text-sm text-neutral-400">Автомобиль</dt>
                  <dd class="text-right text-sm font-medium text-neutral-700">
                    {{ productCarLabel }}
                  </dd>
                </div>

                <div v-if="product.generation" class="flex items-start justify-between gap-4">
                  <dt class="text-sm text-neutral-400">Поколение</dt>
                  <dd class="text-right text-sm font-medium text-neutral-700">
                    {{ product.generation }}
                  </dd>
                </div>

                <div v-if="product.engine" class="flex items-start justify-between gap-4">
                  <dt class="text-sm text-neutral-400">Двигатель</dt>
                  <dd class="text-right text-sm font-medium text-neutral-700">
                    {{ product.engine }}
                  </dd>
                </div>

                <div class="flex items-start justify-between gap-4">
                  <dt class="text-sm text-neutral-400">Артикул</dt>
                  <dd class="text-right text-sm font-medium text-neutral-700">
                    {{ product.article }}
                  </dd>
                </div>

                <div class="flex items-start justify-between gap-4">
                  <dt class="text-sm text-neutral-400">Бренд детали</dt>
                  <dd class="text-right text-sm font-medium text-neutral-700">
                    {{ product.manufacturer }}
                  </dd>
                </div>
              </dl>

              <div class="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  class="flex h-12 items-center justify-center rounded-2xl bg-neutral-950 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Связаться с продавцом
                </button>

                <button
                  type="button"
                  class="flex h-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
                >
                  Добавить в сравнение
                </button>
              </div>
            </div>
          </div>
        </section>

        <section class="mt-4 grid gap-4 lg:grid-cols-[1fr_320px] lg:gap-6">
          <div class="space-y-4">
            <div class="rounded-[28px] bg-white p-4 shadow-sm sm:p-6">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <p class="text-sm font-medium text-neutral-500">Характеристики</p>
                  <h2 class="mt-1 text-2xl font-semibold tracking-tight">Основная информация</h2>
                </div>
              </div>

              <div class="mt-5 grid gap-3">
                <div
                  v-for="spec in product.specs"
                  :key="spec.label"
                  class="flex items-start justify-between gap-4 rounded-2xl bg-neutral-50 px-4 py-4"
                >
                  <p class="text-sm text-neutral-400">{{ spec.label }}</p>
                  <p class="text-right text-sm font-medium text-neutral-700">
                    {{ spec.value }}
                  </p>
                </div>
              </div>
            </div>

            <div class="rounded-[28px] bg-white p-4 shadow-sm sm:p-6">
              <p class="text-sm font-medium text-neutral-500">Совместимость</p>
              <h2 class="mt-1 text-2xl font-semibold tracking-tight">Подходит для автомобилей</h2>

              <div class="mt-5 grid gap-3">
                <div
                  v-for="car in product.compatibleCars"
                  :key="car"
                  class="rounded-2xl bg-neutral-50 px-4 py-4 text-sm font-medium text-neutral-700"
                >
                  {{ car }}
                </div>
              </div>
            </div>
          </div>

          <aside>
            <div class="sticky top-6 rounded-[28px] bg-white p-4 shadow-sm sm:p-5">
              <p class="text-sm font-medium text-neutral-500">Продавец</p>
              <h2 class="mt-1 text-2xl font-semibold tracking-tight">
                {{ product.vendor }}
              </h2>

              <div class="mt-5 space-y-3">
                <div
                  v-for="item in sellerCardItems"
                  :key="item.label"
                  class="rounded-2xl bg-neutral-50 px-4 py-4"
                >
                  <p class="text-xs uppercase tracking-[0.18em] text-neutral-400">
                    {{ item.label }}
                  </p>
                  <p class="mt-2 text-sm font-medium text-neutral-700">
                    {{ item.value }}
                  </p>
                </div>
              </div>

              <button
                type="button"
                class="mt-5 flex h-12 w-full items-center justify-center rounded-2xl bg-neutral-950 text-sm font-medium text-white transition hover:opacity-90"
              >
                Написать продавцу
              </button>
            </div>
          </aside>
        </section>
      </template>

      <section
        v-else
        class="rounded-[28px] border border-dashed border-neutral-300 bg-white p-8 text-center shadow-sm"
      >
        <h1 class="text-2xl font-semibold tracking-tight text-neutral-950">Товар не найден</h1>
        <p class="mt-2 text-sm leading-6 text-neutral-500">
          Возможно, товар был удален или ссылка указана неверно.
        </p>
        <NuxtLink
          to="/catalog"
          class="mt-4 inline-flex rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          Вернуться в каталог
        </NuxtLink>
      </section>
    </div>
  </div>
</template>
