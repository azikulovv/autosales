<script setup lang="ts">
useSeoMeta({
  title: 'Продавцы автозапчастей',
  description:
    'Каталог продавцов автозапчастей с фильтрами по городу, марке автомобиля и специализации.',
})

type Seller = {
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

type FilterOption = {
  label: string
  value: string
}

const cityOptions: FilterOption[] = [
  { label: 'Все города', value: 'all' },
  { label: 'Караганда', value: 'Караганда' },
  { label: 'Астана', value: 'Астана' },
  { label: 'Алматы', value: 'Алматы' },
  { label: 'Шымкент', value: 'Шымкент' },
]

const brandOptions: FilterOption[] = [
  { label: 'Все марки', value: 'all' },
  { label: 'Toyota', value: 'Toyota' },
  { label: 'Hyundai', value: 'Hyundai' },
  { label: 'Kia', value: 'Kia' },
  { label: 'BMW', value: 'BMW' },
  { label: 'Mercedes-Benz', value: 'Mercedes-Benz' },
  { label: 'Lada', value: 'Lada' },
]

const specializationOptions: FilterOption[] = [
  { label: 'Все специализации', value: 'all' },
  { label: 'Тормозная система', value: 'Тормозная система' },
  { label: 'Фильтры', value: 'Фильтры' },
  { label: 'Подвеска', value: 'Подвеска' },
  { label: 'Двигатель', value: 'Двигатель' },
  { label: 'Электрика', value: 'Электрика' },
  { label: 'Кузов', value: 'Кузов' },
]

const sortOptions: FilterOption[] = [
  { label: 'По рейтингу', value: 'rating' },
  { label: 'По количеству товаров', value: 'products' },
  { label: 'Сначала проверенные', value: 'verified' },
]

const sellers = ref<Seller[]>([
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
])

const search = ref('')
const selectedCity = ref('all')
const selectedBrand = ref('all')
const selectedSpecialization = ref('all')
const selectedSort = ref('rating')
const onlyVerified = ref(false)
const showMobileFilters = ref(false)

const inputClass =
  'h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950'

const filteredSellers = computed(() => {
  let items = [...sellers.value]

  if (search.value.trim()) {
    const query = search.value.trim().toLowerCase()
    items = items.filter((seller) => {
      return [
        seller.name,
        seller.city,
        seller.description,
        ...seller.specialization,
        ...seller.brands,
      ]
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
  }

  if (selectedCity.value !== 'all') {
    items = items.filter((seller) => seller.city === selectedCity.value)
  }

  if (selectedBrand.value !== 'all') {
    items = items.filter((seller) => seller.brands.includes(selectedBrand.value))
  }

  if (selectedSpecialization.value !== 'all') {
    items = items.filter((seller) => seller.specialization.includes(selectedSpecialization.value))
  }

  if (onlyVerified.value) {
    items = items.filter((seller) => seller.verified)
  }

  switch (selectedSort.value) {
    case 'products':
      items.sort((a, b) => b.productsCount - a.productsCount)
      break
    case 'verified':
      items.sort((a, b) => Number(b.verified) - Number(a.verified) || b.rating - a.rating)
      break
    default:
      items.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount)
  }

  return items
})

const stats = computed(() => ({
  total: filteredSellers.value.length,
  verified: filteredSellers.value.filter((item) => item.verified).length,
  avgRating: filteredSellers.value.length
    ? (
        filteredSellers.value.reduce((sum, item) => sum + item.rating, 0) /
        filteredSellers.value.length
      ).toFixed(1)
    : '0.0',
}))

const resetFilters = () => {
  search.value = ''
  selectedCity.value = 'all'
  selectedBrand.value = 'all'
  selectedSpecialization.value = 'all'
  selectedSort.value = 'rating'
  onlyVerified.value = false
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-950">
    <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <section
        class="rounded-[28px] bg-neutral-950 p-5 text-white shadow-xl sm:rounded-[32px] sm:p-7 lg:p-8"
      >
        <div class="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p
              class="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/70 sm:text-xs"
            >
              Каталог продавцов
            </p>
            <h1
              class="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            >
              Проверенные магазины автозапчастей в одном месте
            </h1>
            <p class="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
              Выбирай продавцов по городу, марке автомобиля и специализации. На карточке только
              важное: рейтинг, ассортимент, направление и количество товаров.
            </p>
          </div>

          <div
            class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:justify-self-end lg:w-full lg:max-w-xs"
          >
            <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p class="text-2xl font-semibold tracking-tight">{{ stats.total }}</p>
              <p class="mt-1 text-sm text-white/60">продавцов найдено</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p class="text-2xl font-semibold tracking-tight">{{ stats.verified }}</p>
              <p class="mt-1 text-sm text-white/60">проверенных магазинов</p>
            </div>
            <div class="col-span-2 rounded-2xl border border-white/10 bg-white/5 p-4 sm:col-span-1">
              <p class="text-2xl font-semibold tracking-tight">{{ stats.avgRating }}</p>
              <p class="mt-1 text-sm text-white/60">средний рейтинг</p>
            </div>
          </div>
        </div>
      </section>

      <section class="mt-4 lg:mt-6 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6">
        <aside class="hidden lg:block">
          <div class="sticky top-6 rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-sm font-medium text-neutral-500">Фильтры</p>
                <h2 class="mt-1 text-xl font-semibold tracking-tight">Подбор продавца</h2>
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
                  placeholder="Магазин, город, бренд"
                  :class="inputClass"
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-neutral-700">Город</label>
                <select v-model="selectedCity" :class="inputClass">
                  <option v-for="option in cityOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-neutral-700"
                  >Марка автомобиля</label
                >
                <select v-model="selectedBrand" :class="inputClass">
                  <option v-for="option in brandOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-neutral-700">Специализация</label>
                <select v-model="selectedSpecialization" :class="inputClass">
                  <option
                    v-for="option in specializationOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
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
                  v-model="onlyVerified"
                  type="checkbox"
                  class="h-4 w-4 rounded border-neutral-300"
                />
                Только проверенные
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
                placeholder="Поиск по продавцам"
                :class="inputClass"
              />

              <div class="grid grid-cols-2 gap-3">
                <select v-model="selectedCity" :class="inputClass">
                  <option v-for="option in cityOptions" :key="option.value" :value="option.value">
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
              <select v-model="selectedBrand" :class="inputClass">
                <option v-for="option in brandOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>

              <select v-model="selectedSpecialization" :class="inputClass">
                <option
                  v-for="option in specializationOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
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
                  v-model="onlyVerified"
                  type="checkbox"
                  class="h-4 w-4 rounded border-neutral-300"
                />
                Только проверенные
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
              {{ selectedCity === 'all' ? 'Все города' : selectedCity }}
            </span>
            <span
              class="rounded-full bg-white px-3 py-2 text-xs font-medium text-neutral-600 shadow-sm ring-1 ring-neutral-200"
            >
              {{ selectedBrand === 'all' ? 'Все марки' : selectedBrand }}
            </span>
            <span
              class="rounded-full bg-white px-3 py-2 text-xs font-medium text-neutral-600 shadow-sm ring-1 ring-neutral-200"
            >
              {{ selectedSpecialization === 'all' ? 'Все специализации' : selectedSpecialization }}
            </span>
            <span
              v-if="onlyVerified"
              class="rounded-full bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200"
            >
              Только проверенные
            </span>
          </section>

          <section class="mt-4">
            <div v-if="filteredSellers.length" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <article
                v-for="seller in filteredSellers"
                :key="seller.id"
                class="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div class="aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img :src="seller.avatar" :alt="seller.name" class="h-full w-full object-cover" />
                </div>

                <div class="p-4 sm:p-5">
                  <div class="flex items-start justify-between gap-3">
                    <div class="min-w-0">
                      <div class="flex flex-wrap items-center gap-2">
                        <h2 class="text-xl font-semibold tracking-tight text-neutral-950">
                          {{ seller.name }}
                        </h2>
                        <span
                          v-if="seller.verified"
                          class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                        >
                          Проверен
                        </span>
                      </div>

                      <p class="mt-1 text-sm text-neutral-500">
                        {{ seller.city }}
                      </p>
                    </div>

                    <div class="rounded-2xl bg-neutral-950 px-3 py-2 text-right text-white">
                      <p class="text-xs uppercase tracking-[0.18em] text-white/50">Рейтинг</p>
                      <p class="mt-1 text-lg font-semibold tracking-tight">
                        {{ seller.rating }}
                      </p>
                    </div>
                  </div>

                  <p class="mt-4 text-sm leading-6 text-neutral-500">
                    {{ seller.description }}
                  </p>

                  <div class="mt-4 flex flex-wrap gap-2">
                    <span
                      v-for="item in seller.specialization"
                      :key="item"
                      class="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600"
                    >
                      {{ item }}
                    </span>
                  </div>

                  <div class="mt-4 grid grid-cols-3 gap-3">
                    <div class="rounded-2xl bg-neutral-50 p-3">
                      <p class="text-xs text-neutral-400">Отзывы</p>
                      <p class="mt-1 text-sm font-semibold text-neutral-800">
                        {{ seller.reviewsCount }}
                      </p>
                    </div>
                    <div class="rounded-2xl bg-neutral-50 p-3">
                      <p class="text-xs text-neutral-400">Товаров</p>
                      <p class="mt-1 text-sm font-semibold text-neutral-800">
                        {{ seller.productsCount }}
                      </p>
                    </div>
                    <div class="rounded-2xl bg-neutral-50 p-3">
                      <p class="text-xs text-neutral-400">Доставка</p>
                      <p class="mt-1 text-sm font-semibold text-neutral-800">
                        {{ seller.hasDelivery ? 'Есть' : 'Нет' }}
                      </p>
                    </div>
                  </div>

                  <div class="mt-4 flex flex-wrap gap-2">
                    <span
                      v-for="brand in seller.brands"
                      :key="brand"
                      class="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600"
                    >
                      {{ brand }}
                    </span>
                  </div>

                  <div class="mt-5 grid gap-3 sm:grid-cols-2">
                    <NuxtLink
                      :to="`/catalog?seller=${seller.id}`"
                      class="flex h-12 items-center justify-center rounded-2xl bg-neutral-950 text-sm font-medium text-white transition hover:opacity-90"
                    >
                      Смотреть товары
                    </NuxtLink>
                    <button
                      type="button"
                      class="flex h-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
                    >
                      Связаться
                    </button>
                  </div>
                </div>
              </article>
            </div>

            <div
              v-else
              class="rounded-[28px] border border-dashed border-neutral-300 bg-white p-8 text-center shadow-sm"
            >
              <h2 class="text-xl font-semibold tracking-tight text-neutral-950">
                Продавцы не найдены
              </h2>
              <p class="mt-2 text-sm leading-6 text-neutral-500">
                Попробуй изменить фильтры или сбросить поиск, чтобы увидеть больше магазинов.
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
