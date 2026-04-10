<script setup lang="ts">
definePageMeta({
  layout: false,
})

useSeoMeta({
  title: 'автосейлс | Вход для продавцов',
  description: 'Авторизация продавцов в кабинете маркетплейса автозапчастей.',
})
</script>

<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-950">
    <div
      class="mx-auto flex min-h-screen max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6 lg:grid lg:grid-cols-[0.92fr_1.08fr] lg:gap-6 lg:px-8 lg:py-8"
    >
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
                <p class="text-xs text-white/60 sm:text-sm">Кабинет продавца автозапчастей</p>
              </div>
            </div>

            <div class="mt-8 sm:mt-10 lg:mt-12">
              <p
                class="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/70 sm:text-xs"
              >
                Вход для продавцов
              </p>
              <h1
                class="mt-4 text-2xl font-semibold leading-tight tracking-tight sm:mt-5 sm:text-4xl lg:text-5xl"
              >
                Продавай автозапчасти там, где покупатели ищут дешевле
              </h1>
              <p class="mt-3 max-w-lg text-sm leading-6 text-white/70 sm:mt-4 sm:text-base">
                Загружай товары по категориям, управляй ценами и получай заявки от покупателей,
                которые уже готовы сравнивать предложения.
              </p>
            </div>

            <div class="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4 lg:mt-10">
              <div class="rounded-[22px] border border-white/10 bg-white/5 p-4 sm:rounded-3xl">
                <p class="text-xl font-semibold sm:text-2xl">12 000+</p>
                <p class="mt-1 text-sm text-white/60">поисков в каталоге</p>
              </div>
              <div class="rounded-[22px] border border-white/10 bg-white/5 p-4 sm:rounded-3xl">
                <p class="text-xl font-semibold sm:text-2xl">350+</p>
                <p class="mt-1 text-sm text-white/60">активных продавцов</p>
              </div>
              <div class="rounded-[22px] border border-white/10 bg-white/5 p-4 sm:rounded-3xl">
                <p class="text-xl font-semibold sm:text-2xl">3 тарифа</p>
                <p class="mt-1 text-sm text-white/60">для роста магазина</p>
              </div>
            </div>
          </div>

          <div class="mt-6 grid gap-3 sm:mt-8 lg:mt-10">
            <div class="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div
                class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs text-neutral-950"
              >
                ✓
              </div>
              <div>
                <p class="text-sm font-medium">Управление каталогом</p>
                <p class="mt-1 text-sm leading-6 text-white/60">
                  Добавляй товары, меняй цены и обновляй наличие в одном кабинете.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div
                class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs text-neutral-950"
              >
                ✓
              </div>
              <div>
                <p class="text-sm font-medium">Продвижение через тариф</p>
                <p class="mt-1 text-sm leading-6 text-white/60">
                  Поднимай предложения выше в выдаче и получай больше просмотров.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="order-1 flex items-center justify-center rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm sm:rounded-4xl sm:p-7 lg:order-2 lg:rounded-[36px] lg:p-10"
      >
        <div class="w-full max-w-md">
          <div class="mb-6 sm:mb-8">
            <p class="text-sm font-medium text-neutral-500">Авторизация</p>
            <h2 class="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Войти в кабинет продавца
            </h2>
            <p class="mt-3 text-sm leading-6 text-neutral-500">
              Введите свои данные, чтобы управлять товарами, категориями и тарифом магазина.
            </p>
          </div>

          <form class="space-y-4">
            <div>
              <label class="mb-2 block text-sm font-medium text-neutral-700">Email</label>
              <input
                type="email"
                placeholder="seller@example.com"
                class="h-13 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950 sm:h-14"
              />
            </div>

            <div>
              <div class="mb-2 flex items-center justify-between gap-3">
                <label class="block text-sm font-medium text-neutral-700">Пароль</label>
                <button
                  type="button"
                  class="text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
                >
                  Забыли пароль?
                </button>
              </div>
              <input
                type="password"
                placeholder="Введите пароль"
                class="h-13 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950 sm:h-14"
              />
            </div>

            <div
              class="flex flex-col gap-3 rounded-2xl bg-neutral-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <label class="flex items-center gap-3 text-sm text-neutral-600">
                <input type="checkbox" class="h-4 w-4 rounded border-neutral-300" />
                Запомнить меня
              </label>
              <span class="text-xs text-neutral-400">Только для продавцов</span>
            </div>

            <button
              type="submit"
              class="flex h-13 w-full items-center justify-center rounded-2xl bg-neutral-950 text-sm font-medium text-white transition hover:opacity-90 sm:h-14"
            >
              Войти
            </button>

            <!-- <button
              type="button"
              class="flex h-13 w-full items-center justify-center rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-800 transition hover:bg-neutral-50 sm:h-14"
            >
              Войти через Google
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
            <p class="text-sm font-medium text-neutral-800">Еще не продаете на платформе?</p>
            <p class="mt-2 text-sm leading-6 text-neutral-500">
              Зарегистрируйте магазин, выберите тариф и начните размещать автозапчасти в каталоге.
            </p>

            <NuxtLink
              to="/auth/register"
              class="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 sm:w-auto"
            >
              Создать аккаунт продавца
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
