<script setup lang="ts">
useSeoMeta({
  title: 'Кабинет продавца',
  description: 'Панель управления продавца: статистика, товары, заказы и активность магазина.',
})

type DashboardStat = {
  label: string
  value: string
  hint: string
}

type SellerProduct = {
  id: number
  name: string
  article: string
  category: string
  price: number
  stock: number
  status: 'active' | 'draft' | 'out'
  image: string
}

type OrderItem = {
  id: number
  customer: string
  product: string
  amount: number
  status: 'new' | 'paid' | 'shipped'
  date: string
}

type ActivityItem = {
  id: number
  title: string
  description: string
  time: string
}

const stats: DashboardStat[] = [
  {
    label: 'Товаров',
    value: '1 248',
    hint: '+24 за неделю',
  },
  {
    label: 'Заказов',
    value: '86',
    hint: 'за 30 дней',
  },
  {
    label: 'Выручка',
    value: '1 284 000 ₸',
    hint: 'текущий месяц',
  },
  {
    label: 'Просмотры',
    value: '12 430',
    hint: '+8.4% к прошлой неделе',
  },
]

const products = ref<SellerProduct[]>([
  {
    id: 101,
    name: 'Тормозные колодки передние',
    article: 'AKE-04465',
    category: 'Тормозная система',
    price: 14500,
    stock: 12,
    status: 'active',
    image:
      'https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 102,
    name: 'Фильтр масляный',
    article: 'MANN-W811',
    category: 'Фильтры',
    price: 3200,
    stock: 34,
    status: 'active',
    image:
      'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 103,
    name: 'Амортизатор передний',
    article: 'KYB-338109',
    category: 'Подвеска',
    price: 21900,
    stock: 0,
    status: 'out',
    image:
      'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 104,
    name: 'Свечи зажигания комплект',
    article: 'NGK-9723',
    category: 'Двигатель',
    price: 11200,
    stock: 5,
    status: 'draft',
    image:
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=900&q=80',
  },
])

const orders = ref<OrderItem[]>([
  {
    id: 5001,
    customer: 'Азамат Т.',
    product: 'Тормозные колодки передние',
    amount: 14500,
    status: 'new',
    date: 'Сегодня, 12:40',
  },
  {
    id: 5002,
    customer: 'Руслан К.',
    product: 'Фильтр масляный',
    amount: 3200,
    status: 'paid',
    date: 'Сегодня, 10:15',
  },
  {
    id: 5003,
    customer: 'Мади С.',
    product: 'Амортизатор передний',
    amount: 21900,
    status: 'shipped',
    date: 'Вчера, 18:20',
  },
])

const activity = ref<ActivityItem[]>([
  {
    id: 1,
    title: 'Обновлен остаток товара',
    description: 'Тормозные колодки передние: остаток изменен на 12 шт.',
    time: '10 минут назад',
  },
  {
    id: 2,
    title: 'Новый заказ',
    description: 'Поступил новый заказ на Фильтр масляный.',
    time: '32 минуты назад',
  },
  {
    id: 3,
    title: 'Товар снят с наличия',
    description: 'Амортизатор передний временно отсутствует на складе.',
    time: '1 час назад',
  },
])

const search = ref('')
const activeTab = ref<'all' | 'active' | 'draft' | 'out'>('all')
const showMobileSidebar = ref(false)

const formatPrice = (value: number) => `${value.toLocaleString('ru-RU')} ₸`

const filteredProducts = computed(() => {
  let items = [...products.value]

  if (search.value.trim()) {
    const query = search.value.trim().toLowerCase()

    items = items.filter((product) => {
      return [product.name, product.article, product.category]
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
  }

  if (activeTab.value !== 'all') {
    items = items.filter((product) => product.status === activeTab.value)
  }

  return items
})

const statusMap: Record<SellerProduct['status'], string> = {
  active: 'Активен',
  draft: 'Черновик',
  out: 'Нет в наличии',
}

const orderStatusMap: Record<OrderItem['status'], string> = {
  new: 'Новый',
  paid: 'Оплачен',
  shipped: 'Отправлен',
}

const productTabs = [
  { label: 'Все', value: 'all' },
  { label: 'Активные', value: 'active' },
  { label: 'Черновики', value: 'draft' },
  { label: 'Нет в наличии', value: 'out' },
] as const
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
              Кабинет продавца
            </p>
            <h1
              class="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            >
              Управляй товарами, заказами и магазином из одного места
            </h1>
            <p class="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
              Здесь ты видишь ключевые показатели магазина, управляешь ассортиментом и следишь за
              новыми заказами.
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
              Перейти в магазин
            </button>
          </div>
        </div>
      </section>

      <section class="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="stat in stats"
          :key="stat.label"
          class="rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-5"
        >
          <p class="text-sm text-neutral-500">{{ stat.label }}</p>
          <p class="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
            {{ stat.value }}
          </p>
          <p class="mt-2 text-sm text-neutral-400">{{ stat.hint }}</p>
        </article>
      </section>

      <section class="mt-4 lg:hidden">
        <button
          type="button"
          class="flex h-12 w-full items-center justify-center rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-100"
          @click="showMobileSidebar = !showMobileSidebar"
        >
          {{ showMobileSidebar ? 'Скрыть панель' : 'Показать панель' }}
        </button>
      </section>

      <section class="mt-4 grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6">
        <aside class="space-y-4" :class="showMobileSidebar ? 'block' : 'hidden lg:block'">
          <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
            <p class="text-sm font-medium text-neutral-500">Быстрые действия</p>
            <div class="mt-4 grid gap-3">
              <button
                type="button"
                class="flex h-12 items-center justify-center rounded-2xl bg-neutral-950 text-sm font-medium text-white transition hover:opacity-90"
              >
                Новый товар
              </button>
              <button
                type="button"
                class="flex h-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
              >
                Обновить остатки
              </button>
              <button
                type="button"
                class="flex h-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
              >
                Управлять тарифом
              </button>
            </div>
          </div>

          <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
            <p class="text-sm font-medium text-neutral-500">Новая активность</p>
            <div class="mt-4 space-y-3">
              <article
                v-for="item in activity"
                :key="item.id"
                class="rounded-2xl bg-neutral-50 p-4"
              >
                <p class="text-sm font-semibold text-neutral-900">
                  {{ item.title }}
                </p>
                <p class="mt-1 text-sm leading-6 text-neutral-500">
                  {{ item.description }}
                </p>
                <p class="mt-2 text-xs text-neutral-400">
                  {{ item.time }}
                </p>
              </article>
            </div>
          </div>
        </aside>

        <div class="min-w-0 space-y-4">
          <section class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
            <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p class="text-sm font-medium text-neutral-500">Товары</p>
                <h2 class="mt-1 text-2xl font-semibold tracking-tight">Управление ассортиментом</h2>
              </div>

              <div class="flex flex-col gap-3 sm:flex-row">
                <input
                  v-model="search"
                  type="text"
                  placeholder="Поиск по названию, артикулу, категории"
                  class="h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950 sm:min-w-[280px]"
                />
                <button
                  type="button"
                  class="flex h-12 items-center justify-center rounded-2xl bg-neutral-950 px-5 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Добавить товар
                </button>
              </div>
            </div>

            <div class="mt-4 flex flex-wrap gap-2">
              <button
                v-for="tab in productTabs"
                :key="tab.value"
                type="button"
                class="rounded-full px-4 py-2 text-sm font-medium transition"
                :class="
                  activeTab === tab.value
                    ? 'bg-neutral-950 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                "
                @click="activeTab = tab.value"
              >
                {{ tab.label }}
              </button>
            </div>

            <div class="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <article
                v-for="product in filteredProducts"
                :key="product.id"
                class="overflow-hidden rounded-[24px] border border-neutral-200 bg-neutral-50"
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
                      <p class="text-xs uppercase tracking-[0.18em] text-neutral-400">
                        {{ product.category }}
                      </p>
                      <h3
                        class="mt-2 text-lg font-semibold leading-snug tracking-tight text-neutral-950"
                      >
                        {{ product.name }}
                      </h3>
                    </div>

                    <span
                      class="shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
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
                  </div>

                  <div class="mt-4 rounded-[20px] bg-neutral-950 p-4 text-white">
                    <p class="text-[11px] uppercase tracking-[0.18em] text-white/50">Цена</p>
                    <p class="mt-2 text-3xl font-semibold tracking-tight">
                      {{ formatPrice(product.price) }}
                    </p>
                  </div>

                  <dl class="mt-4 space-y-3 text-sm">
                    <div class="flex items-start justify-between gap-4">
                      <dt class="text-neutral-400">Артикул</dt>
                      <dd class="text-right font-medium text-neutral-700">
                        {{ product.article }}
                      </dd>
                    </div>
                    <div class="flex items-start justify-between gap-4">
                      <dt class="text-neutral-400">Остаток</dt>
                      <dd class="text-right font-medium text-neutral-700">
                        {{ product.stock }} шт.
                      </dd>
                    </div>
                  </dl>

                  <div class="mt-4 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      class="flex h-11 items-center justify-center rounded-2xl bg-white text-sm font-medium text-neutral-700 ring-1 ring-neutral-200 transition hover:bg-neutral-100"
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
              class="mt-5 rounded-[24px] border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center"
            >
              <h3 class="text-xl font-semibold tracking-tight text-neutral-950">
                Товары не найдены
              </h3>
              <p class="mt-2 text-sm leading-6 text-neutral-500">
                Попробуй изменить фильтр или поисковый запрос.
              </p>
            </div>
          </section>

          <section class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-sm font-medium text-neutral-500">Последние заказы</p>
                <h2 class="mt-1 text-2xl font-semibold tracking-tight">Заказы магазина</h2>
              </div>
              <button
                type="button"
                class="hidden rounded-2xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 sm:inline-flex"
              >
                Смотреть все
              </button>
            </div>

            <div class="mt-5 space-y-3">
              <article
                v-for="order in orders"
                :key="order.id"
                class="rounded-[22px] bg-neutral-50 p-4"
              >
                <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div class="flex flex-wrap items-center gap-2">
                      <h3 class="text-base font-semibold tracking-tight text-neutral-950">
                        Заказ #{{ order.id }}
                      </h3>
                      <span
                        class="rounded-full px-3 py-1 text-xs font-semibold"
                        :class="
                          order.status === 'new'
                            ? 'bg-amber-50 text-amber-700'
                            : order.status === 'paid'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-neutral-200 text-neutral-600'
                        "
                      >
                        {{ orderStatusMap[order.status] }}
                      </span>
                    </div>
                    <p class="mt-2 text-sm text-neutral-500">
                      {{ order.customer }} • {{ order.product }}
                    </p>
                  </div>

                  <div class="text-left sm:text-right">
                    <p class="text-base font-semibold tracking-tight text-neutral-950">
                      {{ formatPrice(order.amount) }}
                    </p>
                    <p class="mt-1 text-sm text-neutral-400">
                      {{ order.date }}
                    </p>
                  </div>
                </div>
              </article>
            </div>

            <button
              type="button"
              class="mt-4 flex h-12 w-full items-center justify-center rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 sm:hidden"
            >
              Смотреть все заказы
            </button>
          </section>
        </div>
      </section>
    </div>
  </div>
</template>
