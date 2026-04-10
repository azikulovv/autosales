<script setup lang="ts">
useSeoMeta({
  title: 'Товары продавца',
  description: 'Управление товарами продавца: поиск, фильтры, статусы и действия по ассортименту.',
})

type ProductStatus = 'active' | 'draft' | 'out'

type SellerProduct = {
  id: number
  name: string
  article: string
  category: string
  brand: string
  model: string
  price: number
  stock: number
  status: ProductStatus
  updatedAt: string
  image: string
}

type FilterOption = {
  label: string
  value: string
}

const statusOptions: FilterOption[] = [
  { label: 'Все статусы', value: 'all' },
  { label: 'Активные', value: 'active' },
  { label: 'Черновики', value: 'draft' },
  { label: 'Нет в наличии', value: 'out' },
]

const categoryOptions: FilterOption[] = [
  { label: 'Все категории', value: 'all' },
  { label: 'Тормозная система', value: 'Тормозная система' },
  { label: 'Фильтры', value: 'Фильтры' },
  { label: 'Подвеска', value: 'Подвеска' },
  { label: 'Двигатель', value: 'Двигатель' },
  { label: 'Электрика', value: 'Электрика' },
  { label: 'Кузов', value: 'Кузов' },
]

const sortOptions: FilterOption[] = [
  { label: 'Сначала обновленные', value: 'updated' },
  { label: 'Сначала дешевле', value: 'price-asc' },
  { label: 'Сначала дороже', value: 'price-desc' },
  { label: 'По остатку', value: 'stock' },
]

const products = ref<SellerProduct[]>([
  {
    id: 101,
    name: 'Тормозные колодки передние',
    article: 'AKE-04465',
    category: 'Тормозная система',
    brand: 'Toyota',
    model: 'Camry 55',
    price: 14500,
    stock: 12,
    status: 'active',
    updatedAt: 'Сегодня, 12:40',
    image:
      'https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 102,
    name: 'Фильтр масляный',
    article: 'MANN-W811',
    category: 'Фильтры',
    brand: 'Hyundai',
    model: 'Elantra',
    price: 3200,
    stock: 34,
    status: 'active',
    updatedAt: 'Сегодня, 10:15',
    image:
      'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 103,
    name: 'Амортизатор передний',
    article: 'KYB-338109',
    category: 'Подвеска',
    brand: 'Kia',
    model: 'Rio',
    price: 21900,
    stock: 0,
    status: 'out',
    updatedAt: 'Вчера, 18:20',
    image:
      'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 104,
    name: 'Свечи зажигания комплект',
    article: 'NGK-9723',
    category: 'Двигатель',
    brand: 'Kia',
    model: 'Sportage',
    price: 11200,
    stock: 5,
    status: 'draft',
    updatedAt: 'Вчера, 14:05',
    image:
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 105,
    name: 'Генератор',
    article: 'VAL-90812',
    category: 'Электрика',
    brand: 'BMW',
    model: 'X5 E70',
    price: 68400,
    stock: 2,
    status: 'active',
    updatedAt: '2 дня назад',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 106,
    name: 'Передний бампер',
    article: 'LADA-BMP-11',
    category: 'Кузов',
    brand: 'Lada',
    model: 'Vesta',
    price: 35800,
    stock: 0,
    status: 'draft',
    updatedAt: '3 дня назад',
    image:
      'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?auto=format&fit=crop&w=900&q=80',
  },
])

const search = ref('')
const selectedStatus = ref('all')
const selectedCategory = ref('all')
const selectedSort = ref('updated')
const onlyLowStock = ref(false)
const showMobileFilters = ref(false)
const selectedIds = ref<number[]>([])

const formatPrice = (value: number) => `${value.toLocaleString('ru-RU')} ₸`

const statusMap: Record<ProductStatus, string> = {
  active: 'Активен',
  draft: 'Черновик',
  out: 'Нет в наличии',
}

const filteredProducts = computed(() => {
  let items = [...products.value]

  if (search.value.trim()) {
    const query = search.value.trim().toLowerCase()

    items = items.filter((product) => {
      return [product.name, product.article, product.category, product.brand, product.model]
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
  }

  if (selectedStatus.value !== 'all') {
    items = items.filter((product) => product.status === selectedStatus.value)
  }

  if (selectedCategory.value !== 'all') {
    items = items.filter((product) => product.category === selectedCategory.value)
  }

  if (onlyLowStock.value) {
    items = items.filter((product) => product.stock > 0 && product.stock <= 5)
  }

  switch (selectedSort.value) {
    case 'price-asc':
      items.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      items.sort((a, b) => b.price - a.price)
      break
    case 'stock':
      items.sort((a, b) => b.stock - a.stock)
      break
    default:
      items.sort((a, b) => b.id - a.id)
  }

  return items
})

const stats = computed(() => {
  const active = products.value.filter((item) => item.status === 'active').length
  const draft = products.value.filter((item) => item.status === 'draft').length
  const out = products.value.filter((item) => item.status === 'out').length
  const lowStock = products.value.filter((item) => item.stock > 0 && item.stock <= 5).length

  return { active, draft, out, lowStock, total: products.value.length }
})

const allVisibleSelected = computed(() => {
  if (!filteredProducts.value.length) {
    return false
  }

  return filteredProducts.value.every((product) => selectedIds.value.includes(product.id))
})

const toggleSelectAllVisible = () => {
  if (allVisibleSelected.value) {
    selectedIds.value = selectedIds.value.filter(
      (id) => !filteredProducts.value.some((product) => product.id === id),
    )
    return
  }

  const visibleIds = filteredProducts.value.map((product) => product.id)
  selectedIds.value = Array.from(new Set([...selectedIds.value, ...visibleIds]))
}

const toggleSelected = (id: number) => {
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter((item) => item !== id)
    return
  }

  selectedIds.value = [...selectedIds.value, id]
}

const resetFilters = () => {
  search.value = ''
  selectedStatus.value = 'all'
  selectedCategory.value = 'all'
  selectedSort.value = 'updated'
  onlyLowStock.value = false
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-950">
    <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <section
        class="rounded-[28px] bg-neutral-950 p-5 text-white shadow-xl sm:rounded-[32px] sm:p-7 lg:p-8"
      >
        <div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p
              class="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/70 sm:text-xs"
            >
              Управление товарами
            </p>
            <h1
              class="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            >
              Весь ассортимент магазина в одном месте
            </h1>
            <p class="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
              Ищи товары, фильтруй по статусу и категории, отслеживай остатки и быстро переходи к
              редактированию.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              class="flex h-12 items-center justify-center rounded-2xl bg-white text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
            >
              Добавить товар
            </button>
            <button
              type="button"
              class="flex h-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-sm font-medium text-white transition hover:bg-white/15"
            >
              Импорт Excel
            </button>
          </div>
        </div>
      </section>

      <section class="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <article class="rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm">
          <p class="text-sm text-neutral-500">Всего товаров</p>
          <p class="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
            {{ stats.total }}
          </p>
        </article>
        <article class="rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm">
          <p class="text-sm text-neutral-500">Активные</p>
          <p class="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
            {{ stats.active }}
          </p>
        </article>
        <article class="rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm">
          <p class="text-sm text-neutral-500">Черновики</p>
          <p class="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
            {{ stats.draft }}
          </p>
        </article>
        <article class="rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm">
          <p class="text-sm text-neutral-500">Нет в наличии</p>
          <p class="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">{{ stats.out }}</p>
        </article>
        <article
          class="rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm sm:col-span-2 xl:col-span-1"
        >
          <p class="text-sm text-neutral-500">Заканчиваются</p>
          <p class="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
            {{ stats.lowStock }}
          </p>
        </article>
      </section>

      <section class="mt-4 rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
        <div class="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p class="text-sm font-medium text-neutral-500">Фильтры</p>
            <h2 class="mt-1 text-2xl font-semibold tracking-tight">Ассортимент магазина</h2>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row">
            <input
              v-model="search"
              type="text"
              placeholder="Название, артикул, категория, бренд"
              class="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950 sm:min-w-[280px]"
            />
            <button
              type="button"
              class="flex h-12 items-center justify-center rounded-2xl border border-neutral-200 px-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 lg:hidden"
              @click="showMobileFilters = !showMobileFilters"
            >
              {{ showMobileFilters ? 'Скрыть фильтры' : 'Показать фильтры' }}
            </button>
          </div>
        </div>

        <div class="mt-4 hidden grid-cols-1 gap-3 lg:grid lg:grid-cols-4">
          <select
            v-model="selectedStatus"
            class="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
          >
            <option v-for="option in statusOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>

          <select
            v-model="selectedCategory"
            class="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
          >
            <option v-for="option in categoryOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>

          <select
            v-model="selectedSort"
            class="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
          >
            <option v-for="option in sortOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>

          <div class="flex gap-3">
            <label
              class="flex min-w-0 flex-1 items-center gap-3 rounded-2xl bg-neutral-50 px-4 py-3 text-sm text-neutral-700"
            >
              <input
                v-model="onlyLowStock"
                type="checkbox"
                class="h-4 w-4 rounded border-neutral-300"
              />
              Заканчиваются
            </label>

            <button
              type="button"
              class="flex h-12 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 px-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
              @click="resetFilters"
            >
              Сбросить
            </button>
          </div>
        </div>

        <div
          v-if="showMobileFilters"
          class="mt-4 space-y-3 border-t border-neutral-100 pt-4 lg:hidden"
        >
          <select
            v-model="selectedStatus"
            class="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
          >
            <option v-for="option in statusOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>

          <select
            v-model="selectedCategory"
            class="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950"
          >
            <option v-for="option in categoryOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>

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
              v-model="onlyLowStock"
              type="checkbox"
              class="h-4 w-4 rounded border-neutral-300"
            />
            Заканчиваются
          </label>

          <button
            type="button"
            class="flex h-12 w-full items-center justify-center rounded-2xl border border-neutral-200 px-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
            @click="resetFilters"
          >
            Сбросить фильтры
          </button>
        </div>

        <div class="mt-4 flex flex-wrap items-center gap-2">
          <span class="rounded-full bg-neutral-100 px-3 py-2 text-xs font-medium text-neutral-600">
            {{ filteredProducts.length }} товаров
          </span>
          <span
            v-if="selectedStatus !== 'all'"
            class="rounded-full bg-neutral-100 px-3 py-2 text-xs font-medium text-neutral-600"
          >
            {{ statusOptions.find((item) => item.value === selectedStatus)?.label }}
          </span>
          <span
            v-if="selectedCategory !== 'all'"
            class="rounded-full bg-neutral-100 px-3 py-2 text-xs font-medium text-neutral-600"
          >
            {{ selectedCategory }}
          </span>
          <span
            v-if="onlyLowStock"
            class="rounded-full bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700"
          >
            Заканчиваются
          </span>
        </div>

        <div
          v-if="selectedIds.length"
          class="mt-4 flex flex-col gap-3 rounded-[24px] bg-neutral-950 p-4 text-white sm:flex-row sm:items-center sm:justify-between"
        >
          <p class="text-sm font-medium">Выбрано товаров: {{ selectedIds.length }}</p>

          <div class="grid grid-cols-2 gap-3 sm:flex">
            <button
              type="button"
              class="flex h-11 items-center justify-center rounded-2xl bg-white px-4 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
            >
              Активировать
            </button>
            <button
              type="button"
              class="flex h-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-4 text-sm font-medium text-white transition hover:bg-white/15"
            >
              Снять с публикации
            </button>
          </div>
        </div>

        <section class="mt-5">
          <div class="hidden overflow-hidden rounded-[24px] border border-neutral-200 lg:block">
            <table class="min-w-full border-collapse">
              <thead class="bg-neutral-50">
                <tr>
                  <th class="w-14 px-4 py-4 text-left">
                    <input
                      type="checkbox"
                      class="h-4 w-4 rounded border-neutral-300"
                      :checked="allVisibleSelected"
                      @change="toggleSelectAllVisible"
                    />
                  </th>
                  <th
                    class="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400"
                  >
                    Товар
                  </th>
                  <th
                    class="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400"
                  >
                    Категория
                  </th>
                  <th
                    class="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400"
                  >
                    Цена
                  </th>
                  <th
                    class="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400"
                  >
                    Остаток
                  </th>
                  <th
                    class="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400"
                  >
                    Статус
                  </th>
                  <th
                    class="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400"
                  >
                    Обновлено
                  </th>
                  <th
                    class="px-4 py-4 text-right text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400"
                  >
                    Действия
                  </th>
                </tr>
              </thead>

              <tbody class="bg-white">
                <tr
                  v-for="product in filteredProducts"
                  :key="product.id"
                  class="border-t border-neutral-200"
                >
                  <td class="px-4 py-4 align-top">
                    <input
                      type="checkbox"
                      class="h-4 w-4 rounded border-neutral-300"
                      :checked="selectedIds.includes(product.id)"
                      @change="toggleSelected(product.id)"
                    />
                  </td>

                  <td class="px-4 py-4">
                    <div class="flex items-center gap-3">
                      <div class="h-14 w-14 overflow-hidden rounded-2xl bg-neutral-100">
                        <img
                          :src="product.image"
                          :alt="product.name"
                          class="h-full w-full object-cover"
                        />
                      </div>

                      <div class="min-w-0">
                        <p class="font-semibold text-neutral-950">
                          {{ product.name }}
                        </p>
                        <p class="mt-1 text-sm text-neutral-500">
                          {{ product.brand }} {{ product.model }} • {{ product.article }}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td class="px-4 py-4 text-sm text-neutral-600">
                    {{ product.category }}
                  </td>

                  <td class="px-4 py-4">
                    <p class="font-semibold text-neutral-950">
                      {{ formatPrice(product.price) }}
                    </p>
                  </td>

                  <td class="px-4 py-4 text-sm text-neutral-600">{{ product.stock }} шт.</td>

                  <td class="px-4 py-4">
                    <span
                      class="rounded-full px-3 py-1 text-xs font-semibold"
                      :class="
                        product.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : product.status === 'draft'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-neutral-200 text-neutral-600'
                      "
                    >
                      {{ statusMap[product.status] }}
                    </span>
                  </td>

                  <td class="px-4 py-4 text-sm text-neutral-500">
                    {{ product.updatedAt }}
                  </td>

                  <td class="px-4 py-4">
                    <div class="flex justify-end gap-2">
                      <button
                        type="button"
                        class="rounded-xl border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
                      >
                        Изменить
                      </button>
                      <button
                        type="button"
                        class="rounded-xl bg-neutral-950 px-3 py-2 text-sm font-medium text-white transition hover:opacity-90"
                      >
                        Открыть
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="grid gap-4 lg:hidden">
            <article
              v-for="product in filteredProducts"
              :key="product.id"
              class="overflow-hidden rounded-[24px] border border-neutral-200 bg-white shadow-sm"
            >
              <div class="aspect-[4/3] overflow-hidden bg-neutral-100">
                <img :src="product.image" :alt="product.name" class="h-full w-full object-cover" />
              </div>

              <div class="p-4">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <p class="text-xs uppercase tracking-[0.18em] text-neutral-400">
                      {{ product.category }}
                    </p>
                    <h3
                      class="mt-2 text-lg font-semibold leading-snug tracking-tight text-neutral-950"
                    >
                      {{ product.name }}
                    </h3>
                    <p class="mt-1 text-sm text-neutral-500">
                      {{ product.brand }} {{ product.model }} • {{ product.article }}
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    class="mt-1 h-4 w-4 shrink-0 rounded border-neutral-300"
                    :checked="selectedIds.includes(product.id)"
                    @change="toggleSelected(product.id)"
                  />
                </div>

                <div class="mt-4 rounded-[20px] bg-neutral-950 p-4 text-white">
                  <p class="text-[11px] uppercase tracking-[0.18em] text-white/50">Цена</p>
                  <p class="mt-2 text-3xl font-semibold tracking-tight">
                    {{ formatPrice(product.price) }}
                  </p>
                </div>

                <dl class="mt-4 space-y-3 text-sm">
                  <div class="flex items-start justify-between gap-4">
                    <dt class="text-neutral-400">Остаток</dt>
                    <dd class="text-right font-medium text-neutral-700">{{ product.stock }} шт.</dd>
                  </div>

                  <div class="flex items-start justify-between gap-4">
                    <dt class="text-neutral-400">Статус</dt>
                    <dd>
                      <span
                        class="rounded-full px-3 py-1 text-xs font-semibold"
                        :class="
                          product.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700'
                            : product.status === 'draft'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-neutral-200 text-neutral-600'
                        "
                      >
                        {{ statusMap[product.status] }}
                      </span>
                    </dd>
                  </div>

                  <div class="flex items-start justify-between gap-4">
                    <dt class="text-neutral-400">Обновлено</dt>
                    <dd class="text-right font-medium text-neutral-700">
                      {{ product.updatedAt }}
                    </dd>
                  </div>
                </dl>

                <div class="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    class="flex h-11 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
                  >
                    Изменить
                  </button>
                  <button
                    type="button"
                    class="flex h-11 items-center justify-center rounded-2xl bg-neutral-950 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    Открыть
                  </button>
                </div>
              </div>
            </article>
          </div>

          <div
            v-if="!filteredProducts.length"
            class="mt-4 rounded-[24px] border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center"
          >
            <h3 class="text-xl font-semibold tracking-tight text-neutral-950">Товары не найдены</h3>
            <p class="mt-2 text-sm leading-6 text-neutral-500">
              Попробуй изменить фильтры или поисковый запрос.
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
      </section>
    </div>
  </div>
</template>
