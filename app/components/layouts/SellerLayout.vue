<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-950">
    <div class="flex min-h-screen">
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <button
          v-if="isSidebarOpen"
          type="button"
          class="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Закрыть меню"
          @click="closeSidebar"
        />
      </transition>

      <aside
        class="fixed inset-y-0 left-0 z-50 flex w-72.5 max-w-[85vw] flex-col border-r border-neutral-200 bg-white transition-transform duration-200 lg:sticky lg:top-0 lg:z-30 lg:w-70 lg:max-w-none lg:translate-x-0"
        :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <div
          class="flex h-16 items-center justify-between border-b border-neutral-200 px-4 sm:px-5"
        >
          <NuxtLink to="/seller/dashboard" class="flex items-center gap-3" @click="closeSidebar">
            <!-- <div
              class="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-950 text-sm font-semibold text-white"
            >
              AP
            </div> -->
            <img
              src="/favicon.svg"
              alt=""
              class="border border-[#F7762F] h-10 w-10 shrink-0 rounded-2xl text-white"
            />

            <div>
              <p
                class="truncate text-sm font-semibold tracking-tight text-neutral-950 sm:text-base"
              >
                <span>авто</span>
                <span class="text-[#F7762F]">сейлс</span>
              </p>
              <p class="text-xs text-neutral-500">Кабинет продавца</p>
            </div>
          </NuxtLink>

          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-2xl border border-neutral-200 text-neutral-700 transition hover:bg-neutral-100 lg:hidden"
            @click="closeSidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              class="h-5 w-5"
            >
              <path stroke-linecap="round" d="M6 6l12 12" />
              <path stroke-linecap="round" d="M18 6l-12 12" />
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto px-3 py-4 sm:px-4">
          <div class="space-y-6">
            <section v-for="group in navigation" :key="group.title">
              <p class="px-3 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
                {{ group.title }}
              </p>

              <div class="mt-2 grid gap-1">
                <NuxtLink
                  v-for="item in group.items"
                  :key="item.to"
                  :to="item.to"
                  class="flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium transition"
                  :class="
                    isActive(item.to)
                      ? 'bg-neutral-950 text-white'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  "
                  @click="closeSidebar"
                >
                  <span>{{ item.label }}</span>

                  <svg
                    v-if="!isActive(item.to)"
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
            </section>
          </div>
        </div>

        <div class="border-t border-neutral-200 p-4">
          <div class="rounded-3xl bg-neutral-50 p-4">
            <p class="text-sm font-semibold text-neutral-950">
              {{ user?.name || 'Ваше имя не найдена!' }}
            </p>
            <p class="mt-1 text-sm text-neutral-500">
              {{ user?.email || 'Ваша почта не найдена!' }}
            </p>

            <div class="mt-4 grid gap-2">
              <button
                @click="logout"
                type="button"
                class="flex h-11 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div class="min-w-0 flex-1 overflow-y-auto h-screen">
        <header
          class="sticky lg:hidden top-0 z-20 border-b border-neutral-200 bg-white/90 backdrop-blur-xl"
        >
          <div class="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
            <div class="flex min-w-0 items-center gap-3">
              <button
                type="button"
                class="flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 text-neutral-700 transition hover:bg-neutral-100 lg:hidden"
                @click="isSidebarOpen = true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  class="h-5 w-5"
                >
                  <path stroke-linecap="round" d="M4 7h16" />
                  <path stroke-linecap="round" d="M4 12h16" />
                  <path stroke-linecap="round" d="M4 17h16" />
                </svg>
              </button>

              <div class="min-w-0">
                <p
                  class="truncate text-sm font-semibold tracking-tight text-neutral-950 sm:text-base"
                >
                  Кабинет продавца
                </p>
                <p class="truncate text-xs text-neutral-500">Управление магазином и товарами</p>
              </div>
            </div>

            <!-- <div class="flex items-center gap-2 sm:gap-3">
              <NuxtLink
                to="/seller/products/create"
                class="hidden h-11 items-center justify-center rounded-2xl bg-neutral-950 px-4 text-sm font-medium text-white transition hover:opacity-90 sm:inline-flex"
              >
                Добавить товар
              </NuxtLink>

              <NuxtLink
                to="/seller/orders"
                class="flex h-11 items-center justify-center rounded-2xl border border-neutral-200 px-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
              >
                Заказы
              </NuxtLink>
            </div> -->
          </div>
        </header>

        <main class="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { user, logout } = useAuth()
const route = useRoute()

const isSidebarOpen = ref(false)

const navigation = [
  {
    title: 'Обзор',
    items: [
      { label: 'Дашборд', to: '/seller/dashboard' },
      { label: 'Профиль магазина', to: '/seller/profile' },
      { label: 'Тариф', to: '/seller/tariff' },
      { label: 'Настройки', to: '/seller/settings' },
    ],
  },
  {
    title: 'Каталог',
    items: [
      { label: 'Все товары', to: '/seller/products' },
      { label: 'Добавить товар', to: '/seller/products/create' },
    ],
  },
  // {
  //   title: 'Продажи',
  //   items: [{ label: 'Заказы', to: '/seller/orders' }],
  // },
]

const isActive = (path: string) => {
  if (path === '/seller/products') {
    return route.path === path || route.path.startsWith('/seller/products/')
  }

  return route.path === path
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}
</script>
