<script setup lang="ts">
definePageMeta({
  layout: false,
  public: true,
})

useSeoMeta({
  title: 'автосейлс | Регистрация продавца',
  description: 'Создание аккаунта продавца в маркетплейсе автозапчастей.',
})

type StatItem = {
  value: string
  label: string
}

type BenefitItem = {
  title: string
  description: string
}

type FormField = {
  id: string
  label: string
  type: 'text' | 'email' | 'password'
  placeholder: string
}

const stats: StatItem[] = [
  {
    value: '350+',
    label: 'продавцов уже на платформе',
  },
  {
    value: '12 000+',
    label: 'товаров ищут покупатели',
  },
  {
    value: '3 тарифа',
    label: 'для разных форматов магазинов',
  },
]

const benefits: BenefitItem[] = [
  {
    title: 'Быстрый старт магазина',
    description: 'Создай аккаунт, выбери тариф и начни размещать товары по категориям.',
  },
  {
    title: 'Управление ценами и остатками',
    description: 'Обновляй предложения в кабинете и повышай видимость в поиске.',
  },
]

const fields: FormField[] = [
  {
    id: 'storeName',
    label: 'Название магазина',
    type: 'text',
    placeholder: 'Например: AutoParts KRG',
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'seller@example.com',
  },
  {
    id: 'password',
    label: 'Пароль',
    type: 'password',
    placeholder: 'Придумайте пароль',
  },
  {
    id: 'passwordConfirm',
    label: 'Подтвердите пароль',
    type: 'password',
    placeholder: 'Повторите пароль',
  },
]

const tariffs = ['Start — до 100 товаров', 'Pro — приоритет в выдаче', 'Business — без лимитов']

const baseInputClass =
  'h-14 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950'
</script>

<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-950">
    <div
      class="mx-auto flex min-h-screen max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6 lg:grid lg:grid-cols-[0.92fr_1.08fr] lg:gap-6 lg:px-8 lg:py-8"
    >
      <section
        class="order-1 flex items-center justify-center rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm sm:rounded-4xl sm:p-7 lg:order-2 lg:rounded-[36px] lg:p-10"
      >
        <div class="w-full max-w-md">
          <div class="mb-6 sm:mb-8">
            <p class="text-sm font-medium text-neutral-500">Регистрация продавца</p>
            <h1 class="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Создать аккаунт магазина
            </h1>
            <p class="mt-3 text-sm leading-6 text-neutral-500">
              Заполните данные, чтобы открыть кабинет продавца и начать размещать автозапчасти.
            </p>
          </div>

          <form class="space-y-4">
            <div v-for="field in fields" :key="field.id">
              <label :for="field.id" class="mb-2 block text-sm font-medium text-neutral-700">
                {{ field.label }}
              </label>

              <input
                :id="field.id"
                :type="field.type"
                :placeholder="field.placeholder"
                :class="baseInputClass"
              />
            </div>

            <div>
              <label for="tariff" class="mb-2 block text-sm font-medium text-neutral-700">
                Тариф
              </label>
              <select
                id="tariff"
                class="h-14 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
              >
                <option>Выберите тариф</option>
                <option v-for="tariff in tariffs" :key="tariff">
                  {{ tariff }}
                </option>
              </select>
            </div>

            <div class="rounded-2xl bg-neutral-50 px-4 py-3">
              <label class="flex items-start gap-3 text-sm text-neutral-600">
                <input type="checkbox" class="mt-0.5 h-4 w-4 rounded border-neutral-300" />
                <span> Я принимаю условия платформы и согласен на обработку данных магазина. </span>
              </label>
            </div>

            <button
              type="submit"
              class="flex h-14 w-full items-center justify-center rounded-2xl bg-neutral-950 text-sm font-medium text-white transition hover:opacity-90"
            >
              Создать аккаунт
            </button>

            <!-- <button
              type="button"
              class="flex h-14 w-full items-center justify-center rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
            >
              Зарегистрироваться через Google
            </button> -->
          </form>

          <div class="my-5 flex items-center gap-4 sm:my-6">
            <div class="h-px flex-1 bg-neutral-200"></div>
            <span
              class="text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400 sm:text-xs"
              >или</span
            >
            <div class="h-px flex-1 bg-neutral-200"></div>
          </div>

          <div class="rounded-3xl bg-neutral-50 p-4 sm:rounded-[28px] sm:p-5">
            <p class="text-sm font-medium text-neutral-800">Уже есть аккаунт продавца?</p>
            <p class="mt-2 text-sm leading-6 text-neutral-500">
              Войдите в кабинет, чтобы управлять товарами, тарифом и заявками покупателей.
            </p>
            <NuxtLink
              to="/seller/login"
              class="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 sm:w-auto"
            >
              Перейти ко входу
            </NuxtLink>
          </div>
        </div>
      </section>

      <section
        class="relative order-2 overflow-hidden rounded-[28px] bg-neutral-950 p-5 text-white shadow-xl sm:rounded-4xl sm:p-7 lg:order-1 lg:min-h-[calc(100vh-4rem)] lg:rounded-[36px] lg:p-10"
      >
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_28%)]"
        ></div>

        <div class="relative z-10 flex h-full flex-col justify-between">
          <div>
            <div class="flex items-center gap-3">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-neutral-950 sm:h-11 sm:w-11"
              >
                AP
              </div>
              <div>
                <p class="text-base font-semibold tracking-tight sm:text-lg">AutoPrice Seller</p>
                <p class="text-xs text-white/60 sm:text-sm">Подключение магазина к платформе</p>
              </div>
            </div>

            <div class="mt-8 sm:mt-10 lg:mt-12">
              <p
                class="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/70 sm:text-xs"
              >
                Регистрация продавцов
              </p>
              <h2
                class="mt-4 text-2xl font-semibold leading-tight tracking-tight sm:mt-5 sm:text-4xl lg:text-5xl"
              >
                Подключи магазин и начни продавать автозапчасти онлайн
              </h2>
              <p class="mt-3 max-w-lg text-sm leading-6 text-white/70 sm:mt-4 sm:text-base">
                После регистрации ты сможешь загружать товары, выбирать тариф и получать клиентов,
                которые ищут лучшие цены.
              </p>
            </div>

            <div class="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4 lg:mt-10">
              <div
                v-for="stat in stats"
                :key="stat.label"
                class="rounded-[22px] border border-white/10 bg-white/5 p-4 sm:rounded-3xl"
              >
                <p class="text-xl font-semibold sm:text-2xl">{{ stat.value }}</p>
                <p class="mt-1 text-sm text-white/60">{{ stat.label }}</p>
              </div>
            </div>
          </div>

          <div class="mt-6 grid gap-3 sm:mt-8 lg:mt-10">
            <div
              v-for="benefit in benefits"
              :key="benefit.title"
              class="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div
                class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs text-neutral-950"
              >
                ✓
              </div>
              <div>
                <p class="text-sm font-medium">{{ benefit.title }}</p>
                <p class="mt-1 text-sm leading-6 text-white/60">{{ benefit.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
