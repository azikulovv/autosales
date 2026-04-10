<script setup lang="ts">
useSeoMeta({
  title: 'автосейлс | Категории автозапчастей',
  description:
    'Выбор категорий автозапчастей с быстрым переходом в каталог по автомобилю и типу детали.',
})

type CategoryItem = {
  title: string
  slug: string
  description: string
  icon: string
  partsCount: string
  tags: string[]
}

type BrandItem = {
  label: string
  value: string
}

type QuickLink = {
  label: string
  to: string
}

const categories: CategoryItem[] = [
  {
    title: 'Тормозная система',
    slug: 'brakes',
    description: 'Колодки, диски, суппорты, датчики и другие детали тормозной системы.',
    icon: '🛞',
    partsCount: '2 400+',
    tags: ['Колодки', 'Диски', 'Суппорты'],
  },
  {
    title: 'Фильтры',
    slug: 'filters',
    description: 'Масляные, воздушные, салонные и топливные фильтры для разных моделей.',
    icon: '🧰',
    partsCount: '1 800+',
    tags: ['Масляные', 'Воздушные', 'Салонные'],
  },
  {
    title: 'Подвеска',
    slug: 'suspension',
    description: 'Амортизаторы, стойки, рычаги и элементы ходовой части.',
    icon: '🔩',
    partsCount: '2 100+',
    tags: ['Амортизаторы', 'Стойки', 'Рычаги'],
  },
  {
    title: 'Двигатель',
    slug: 'engine',
    description: 'Свечи, ремни, прокладки, насосы и другие детали двигателя.',
    icon: '⚙️',
    partsCount: '1 650+',
    tags: ['Свечи', 'Ремни', 'Прокладки'],
  },
  {
    title: 'Электрика',
    slug: 'electric',
    description: 'Генераторы, стартеры, датчики, лампы и элементы электрооборудования.',
    icon: '🔋',
    partsCount: '1 300+',
    tags: ['Генераторы', 'Стартеры', 'Датчики'],
  },
  {
    title: 'Кузов',
    slug: 'body',
    description: 'Бамперы, зеркала, фары, крылья и внешние элементы автомобиля.',
    icon: '🚘',
    partsCount: '1 120+',
    tags: ['Бамперы', 'Фары', 'Зеркала'],
  },
]

const brands: BrandItem[] = [
  { label: 'Toyota', value: 'toyota' },
  { label: 'Hyundai', value: 'hyundai' },
  { label: 'Kia', value: 'kia' },
  { label: 'BMW', value: 'bmw' },
  { label: 'Mercedes-Benz', value: 'mercedes' },
  { label: 'Lada', value: 'lada' },
]

const quickLinks: QuickLink[] = [
  { label: 'Все автозапчасти', to: '/catalog' },
  { label: 'Только в наличии', to: '/catalog?stock=1' },
  { label: 'Самые дешевые', to: '/catalog?sort=price-asc' },
  { label: 'Для продавцов', to: '/seller/register' },
]

const selectedBrand = ref('toyota')

const popularSearches = computed(() => [
  {
    label: 'Тормозные колодки',
    to: `/catalog?brand=${selectedBrand.value}&category=brakes`,
  },
  {
    label: 'Масляный фильтр',
    to: `/catalog?brand=${selectedBrand.value}&category=filters`,
  },
  {
    label: 'Амортизаторы',
    to: `/catalog?brand=${selectedBrand.value}&category=suspension`,
  },
  {
    label: 'Свечи зажигания',
    to: `/catalog?brand=${selectedBrand.value}&category=engine`,
  },
])
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
              Категории автозапчастей
            </p>
            <h1
              class="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            >
              Выбирай категорию и переходи к нужным деталям быстрее
            </h1>
            <p class="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
              Здесь собраны основные группы автозапчастей для всех популярных автомобилей. Можно
              начать с категории или сразу отфильтровать каталог под конкретную марку.
            </p>
          </div>

          <div
            class="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:justify-self-end lg:w-full lg:max-w-sm"
          >
            <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p class="text-2xl font-semibold tracking-tight">{{ categories.length }}</p>
              <p class="mt-1 text-sm text-white/60">основных категорий</p>
            </div>

            <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p class="text-2xl font-semibold tracking-tight">10 000+</p>
              <p class="mt-1 text-sm text-white/60">позиций в каталоге</p>
            </div>
          </div>
        </div>
      </section>

      <section class="mt-4 grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <div class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-sm font-medium text-neutral-500">Быстрый подбор</p>
              <h2 class="mt-1 text-2xl font-semibold tracking-tight">Часто ищут по марке</h2>
            </div>
            <NuxtLink
              to="/catalog"
              class="hidden rounded-2xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 sm:inline-flex"
            >
              Открыть каталог
            </NuxtLink>
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <button
              v-for="brand in brands"
              :key="brand.value"
              type="button"
              class="rounded-full px-4 py-2 text-sm font-medium transition"
              :class="
                selectedBrand === brand.value
                  ? 'bg-neutral-950 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              "
              @click="selectedBrand = brand.value"
            >
              {{ brand.label }}
            </button>
          </div>

          <div class="mt-5 grid gap-3 sm:grid-cols-2">
            <NuxtLink
              v-for="searchItem in popularSearches"
              :key="searchItem.to"
              :to="searchItem.to"
              class="rounded-[22px] border border-neutral-200 bg-neutral-50 p-4 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
            >
              <p class="text-sm font-semibold text-neutral-950">
                {{ searchItem.label }}
              </p>
              <p class="mt-1 text-sm text-neutral-500">
                Для {{ brands.find((item) => item.value === selectedBrand)?.label }}
              </p>
            </NuxtLink>
          </div>

          <NuxtLink
            to="/catalog"
            class="mt-4 flex h-12 items-center justify-center rounded-2xl bg-neutral-950 text-sm font-medium text-white transition hover:opacity-90 sm:hidden"
          >
            Открыть каталог
          </NuxtLink>
        </div>

        <div class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
          <p class="text-sm font-medium text-neutral-500">Быстрые переходы</p>
          <h2 class="mt-1 text-2xl font-semibold tracking-tight">Полезные сценарии</h2>

          <div class="mt-5 grid gap-3">
            <NuxtLink
              v-for="link in quickLinks"
              :key="link.to"
              :to="link.to"
              class="flex items-center justify-between rounded-[22px] border border-neutral-200 bg-neutral-50 px-4 py-4 text-sm font-medium text-neutral-700 transition hover:bg-white hover:text-neutral-950 hover:shadow-sm"
            >
              <span>{{ link.label }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                class="h-4 w-4 text-neutral-400"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 6l6 6-6 6" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </section>

      <section
        class="mt-4 rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-6 lg:mt-6"
      >
        <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-sm font-medium text-neutral-500">Основные группы</p>
            <h2 class="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Категории запчастей
            </h2>
          </div>

          <p class="text-sm text-neutral-500">
            Начни с общей категории и затем уточни подбор в каталоге
          </p>
        </div>

        <div class="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <NuxtLink
            v-for="category in categories"
            :key="category.slug"
            :to="`/catalog?category=${category.slug}`"
            class="group rounded-[26px] border border-neutral-200 bg-neutral-50 p-5 transition hover:-translate-y-1 hover:border-neutral-300 hover:bg-white hover:shadow-md"
          >
            <div class="flex items-start justify-between gap-4">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm"
              >
                {{ category.icon }}
              </div>
              <span
                class="rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-500 shadow-sm"
              >
                {{ category.partsCount }}
              </span>
            </div>

            <h3 class="mt-4 text-xl font-semibold tracking-tight text-neutral-950">
              {{ category.title }}
            </h3>

            <p class="mt-2 text-sm leading-6 text-neutral-500">
              {{ category.description }}
            </p>

            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tag in category.tags"
                :key="tag"
                class="rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-600 shadow-sm"
              >
                {{ tag }}
              </span>
            </div>

            <div
              class="mt-5 flex items-center justify-between text-sm font-medium text-neutral-700"
            >
              <span>Смотреть в каталоге</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                class="h-4 w-4 transition group-hover:translate-x-0.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 6l6 6-6 6" />
              </svg>
            </div>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>
