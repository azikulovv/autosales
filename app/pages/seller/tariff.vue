<script setup lang="ts">
useSeoMeta({
  title: 'Тариф продавца',
  description: 'Управление тарифом продавца, лимитами и продвижением магазина.',
})

type TariffKey = 'start' | 'pro' | 'business'

type TariffFeature = {
  label: string
  start: string
  pro: string
  business: string
}

type TariffPlan = {
  key: TariffKey
  name: string
  price: string
  period: string
  description: string
  badge?: string
  cta: string
}

type BillingItem = {
  id: number
  title: string
  amount: string
  date: string
  status: string
}

const currentTariff = ref<TariffKey>('pro')
const selectedTariff = ref<TariffKey>('pro')
const isAnnual = ref(false)
const isSaving = ref(false)
const saveMessage = ref('')

const plans: TariffPlan[] = [
  {
    key: 'start',
    name: 'Start',
    price: '9 900 ₸',
    period: '/ месяц',
    description: 'Для небольшого магазина с базовым размещением товаров.',
    cta: 'Выбрать Start',
  },
  {
    key: 'pro',
    name: 'Pro',
    price: '24 900 ₸',
    period: '/ месяц',
    description: 'Оптимальный тариф для активных продавцов с приоритетом в выдаче.',
    badge: 'Текущий тариф',
    cta: 'Оставить Pro',
  },
  {
    key: 'business',
    name: 'Business',
    price: '59 900 ₸',
    period: '/ месяц',
    description: 'Для крупных магазинов с максимальным охватом и расширенными лимитами.',
    cta: 'Перейти на Business',
  },
]

const features: TariffFeature[] = [
  {
    label: 'Количество товаров',
    start: 'до 100',
    pro: 'до 2 000',
    business: 'без лимита',
  },
  {
    label: 'Приоритет в поиске',
    start: '—',
    pro: 'Да',
    business: 'Максимальный',
  },
  {
    label: 'Выделение карточек',
    start: '—',
    pro: 'Да',
    business: 'Да',
  },
  {
    label: 'Аналитика магазина',
    start: 'Базовая',
    pro: 'Расширенная',
    business: 'Полная',
  },
  {
    label: 'Поддержка',
    start: 'Стандарт',
    pro: 'Приоритет',
    business: 'Персональная',
  },
]

const usageStats = computed(() => ({
  productsUsed: 1248,
  productsLimit:
    currentTariff.value === 'start' ? 100 : currentTariff.value === 'pro' ? 2000 : null,
  views: '12 430',
  promotedProducts:
    currentTariff.value === 'start'
      ? '0'
      : currentTariff.value === 'pro'
        ? '24'
        : 'Без ограничений',
}))

const billingHistory = ref<BillingItem[]>([
  {
    id: 1,
    title: 'Оплата тарифа Pro',
    amount: '24 900 ₸',
    date: '05.04.2026',
    status: 'Оплачено',
  },
  {
    id: 2,
    title: 'Продление тарифа Pro',
    amount: '24 900 ₸',
    date: '05.03.2026',
    status: 'Оплачено',
  },
  {
    id: 3,
    title: 'Поднятие товаров',
    amount: '9 900 ₸',
    date: '22.02.2026',
    status: 'Оплачено',
  },
])

const annualDiscountText = computed(() => {
  return isAnnual.value ? 'Скидка 15% применена' : 'Ежемесячная оплата'
})

const currentPlan = computed(() => {
  return plans.find((plan) => plan.key === currentTariff.value) ?? plans[1]
})

const selectedPlan = computed(() => {
  return plans.find((plan) => plan.key === selectedTariff.value) ?? plans[1]
})

const saveTariff = async () => {
  isSaving.value = true
  saveMessage.value = ''

  try {
    await new Promise((resolve) => setTimeout(resolve, 700))
    currentTariff.value = selectedTariff.value
    saveMessage.value = `Тариф обновлен: ${selectedPlan.value.name}`
  } catch {
    saveMessage.value = 'Ошибка при смене тарифа'
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-950">
    <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <!-- <section
        class="rounded-[28px] bg-neutral-950 p-5 text-white shadow-xl sm:rounded-[32px] sm:p-7 lg:p-8"
      >
        <div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p
              class="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/70 sm:text-xs"
            >
              Тариф и продвижение
            </p>
            <h1
              class="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            >
              Управляй лимитами магазина и видимостью в каталоге
            </h1>
            <p class="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
              Выбирай подходящий тариф, увеличивай количество товаров, получай больше показов и
              подключай продвижение магазина.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              class="flex h-12 items-center justify-center rounded-2xl bg-white text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
              :disabled="isSaving"
              @click="saveTariff"
            >
              {{ isSaving ? 'Сохранение...' : 'Изменить тариф' }}
            </button>

            <button
              type="button"
              class="flex h-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-sm font-medium text-white transition hover:bg-white/15"
            >
              История оплат
            </button>
          </div>
        </div>
      </section> -->

      <!-- <section class="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"> -->
      <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article class="rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm">
          <p class="text-sm text-neutral-500">Текущий тариф</p>
          <p class="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
            {{ currentPlan.name }}
          </p>
        </article>

        <article class="rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm">
          <p class="text-sm text-neutral-500">Товаров</p>
          <p class="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
            {{
              usageStats.productsLimit
                ? `${usageStats.productsUsed} / ${usageStats.productsLimit}`
                : `${usageStats.productsUsed}`
            }}
          </p>
        </article>

        <article class="rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm">
          <p class="text-sm text-neutral-500">Показы магазина</p>
          <p class="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
            {{ usageStats.views }}
          </p>
        </article>

        <article
          class="rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm sm:col-span-2 xl:col-span-1"
        >
          <p class="text-sm text-neutral-500">Продвигаемых товаров</p>
          <p class="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
            {{ usageStats.promotedProducts }}
          </p>
        </article>
      </section>

      <section class="mt-4 rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-sm font-medium text-neutral-500">Выбор тарифа</p>
            <h2 class="mt-1 text-2xl font-semibold tracking-tight">Сравнение планов</h2>
          </div>

          <label
            class="flex items-center gap-3 rounded-2xl bg-neutral-50 px-4 py-3 text-sm text-neutral-700"
          >
            <input v-model="isAnnual" type="checkbox" class="h-4 w-4 rounded border-neutral-300" />
            Годовая оплата
          </label>
        </div>

        <p class="mt-3 text-sm text-neutral-500">
          {{ annualDiscountText }}
        </p>

        <div class="mt-5 grid gap-4 xl:grid-cols-3">
          <article
            v-for="plan in plans"
            :key="plan.key"
            class="rounded-[26px] border p-5 transition"
            :class="
              selectedTariff === plan.key
                ? 'border-neutral-950 bg-neutral-950 text-white shadow-lg'
                : 'border-neutral-200 bg-neutral-50 text-neutral-950'
            "
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-lg font-semibold tracking-tight">
                  {{ plan.name }}
                </p>
                <p
                  class="mt-1 text-sm"
                  :class="selectedTariff === plan.key ? 'text-white/65' : 'text-neutral-500'"
                >
                  {{ plan.description }}
                </p>
              </div>

              <span
                v-if="plan.key === currentTariff"
                class="rounded-full px-3 py-1 text-xs font-semibold"
                :class="
                  selectedTariff === plan.key
                    ? 'bg-white/15 text-white'
                    : 'bg-neutral-950 text-white'
                "
              >
                Текущий
              </span>
            </div>

            <div class="mt-5">
              <p class="text-3xl font-semibold tracking-tight sm:text-4xl">
                {{ plan.price }}
              </p>
              <p
                class="mt-1 text-sm"
                :class="selectedTariff === plan.key ? 'text-white/65' : 'text-neutral-500'"
              >
                {{ isAnnual ? '/ месяц при оплате за год' : plan.period }}
              </p>
            </div>

            <button
              type="button"
              class="mt-5 flex h-12 w-full items-center justify-center rounded-2xl text-sm font-medium transition"
              :class="
                selectedTariff === plan.key
                  ? 'bg-white text-neutral-950 hover:bg-neutral-200'
                  : 'bg-neutral-950 text-white hover:opacity-90'
              "
              @click="selectedTariff = plan.key"
            >
              {{ selectedTariff === plan.key ? 'Выбран' : plan.cta }}
            </button>
          </article>
        </div>
      </section>

      <section class="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-6">
        <div class="space-y-4">
          <section class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
            <p class="text-sm font-medium text-neutral-500">Что входит</p>
            <h2 class="mt-1 text-2xl font-semibold tracking-tight">Сравнение возможностей</h2>

            <div class="mt-5 overflow-hidden rounded-[24px] border border-neutral-200">
              <div class="hidden grid-cols-[1.3fr_1fr_1fr_1fr] bg-neutral-50 lg:grid">
                <div
                  class="px-4 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400"
                >
                  Возможность
                </div>
                <div
                  class="px-4 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400"
                >
                  Start
                </div>
                <div
                  class="px-4 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400"
                >
                  Pro
                </div>
                <div
                  class="px-4 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400"
                >
                  Business
                </div>
              </div>

              <div class="divide-y divide-neutral-200">
                <div
                  v-for="feature in features"
                  :key="feature.label"
                  class="grid gap-4 px-4 py-4 lg:grid-cols-[1.3fr_1fr_1fr_1fr]"
                >
                  <div class="text-sm font-medium text-neutral-900">
                    {{ feature.label }}
                  </div>
                  <div class="text-sm text-neutral-600">
                    <span class="lg:hidden text-neutral-400">Start: </span>{{ feature.start }}
                  </div>
                  <div class="text-sm text-neutral-600">
                    <span class="lg:hidden text-neutral-400">Pro: </span>{{ feature.pro }}
                  </div>
                  <div class="text-sm text-neutral-600">
                    <span class="lg:hidden text-neutral-400">Business: </span>{{ feature.business }}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-sm font-medium text-neutral-500">История платежей</p>
                <h2 class="mt-1 text-2xl font-semibold tracking-tight">Последние списания</h2>
              </div>
            </div>

            <div class="mt-5 space-y-3">
              <article
                v-for="item in billingHistory"
                :key="item.id"
                class="rounded-[22px] bg-neutral-50 p-4"
              >
                <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 class="text-base font-semibold tracking-tight text-neutral-950">
                      {{ item.title }}
                    </h3>
                    <p class="mt-1 text-sm text-neutral-500">
                      {{ item.date }}
                    </p>
                  </div>

                  <div class="text-left sm:text-right">
                    <p class="text-base font-semibold tracking-tight text-neutral-950">
                      {{ item.amount }}
                    </p>
                    <p class="mt-1 text-sm text-emerald-600">
                      {{ item.status }}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </div>

        <aside class="space-y-4">
          <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
            <p class="text-sm font-medium text-neutral-500">Текущий выбор</p>

            <div class="mt-4 rounded-[24px] bg-neutral-950 p-5 text-white">
              <p class="text-lg font-semibold tracking-tight">
                {{ selectedPlan.name }}
              </p>
              <p class="mt-2 text-3xl font-semibold tracking-tight">
                {{ selectedPlan.price }}
              </p>
              <p class="mt-1 text-sm text-white/65">
                {{ isAnnual ? 'Годовая оплата со скидкой 15%' : selectedPlan.period }}
              </p>
            </div>

            <div class="mt-4 space-y-3">
              <div class="rounded-2xl bg-neutral-50 px-4 py-4">
                <p class="text-xs uppercase tracking-[0.18em] text-neutral-400">Лимит товаров</p>
                <p class="mt-2 text-sm font-semibold text-neutral-950">
                  {{
                    selectedTariff === 'start'
                      ? 'до 100'
                      : selectedTariff === 'pro'
                        ? 'до 2 000'
                        : 'без лимита'
                  }}
                </p>
              </div>

              <div class="rounded-2xl bg-neutral-50 px-4 py-4">
                <p class="text-xs uppercase tracking-[0.18em] text-neutral-400">
                  Поиск и продвижение
                </p>
                <p class="mt-2 text-sm font-semibold text-neutral-950">
                  {{
                    selectedTariff === 'start'
                      ? 'Базовое размещение'
                      : selectedTariff === 'pro'
                        ? 'Приоритет в выдаче'
                        : 'Максимальный приоритет'
                  }}
                </p>
              </div>
            </div>

            <button
              type="button"
              class="mt-5 flex h-12 w-full items-center justify-center rounded-2xl bg-neutral-950 text-sm font-medium text-white transition hover:opacity-90"
              :disabled="isSaving"
              @click="saveTariff"
            >
              {{ isSaving ? 'Сохранение...' : 'Подтвердить тариф' }}
            </button>

            <p v-if="saveMessage" class="mt-4 text-sm font-medium text-emerald-600">
              {{ saveMessage }}
            </p>
          </div>

          <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
            <p class="text-sm font-medium text-neutral-500">Подсказка</p>
            <p class="mt-3 text-sm leading-6 text-neutral-500">
              Для магазина с активным каталогом и регулярными заказами обычно лучше подходит Pro. Он
              дает приоритет в выдаче и больше лимитов без перегруза по цене.
            </p>
          </div>
        </aside>
      </section>
    </div>
  </div>
</template>
