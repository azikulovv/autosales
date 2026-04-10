<script setup lang="ts">
const isMenuOpen = ref(false)

const navItems = [
  { label: 'Каталог', to: '/catalog' },
  { label: 'Категории', to: '/categories' },
  { label: 'Продавцам', to: '/sellers' },
  { label: 'О сервисе', to: '/about' },
]

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/90 backdrop-blur-xl">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between gap-3 sm:h-18">
        <NuxtLink to="/" class="flex min-w-0 items-center gap-3" @click="closeMenu">
          <img
            src="/favicon.svg"
            alt=""
            class="border border-[#F7762F] h-10 w-10 shrink-0 rounded-2xl text-white"
          />

          <div class="min-w-0">
            <p class="truncate text-sm font-semibold tracking-tight text-neutral-950 sm:text-base">
              <span>авто</span>
              <span class="text-[#F7762F]">сейлс</span>
            </p>
            <p class="truncate text-xs text-neutral-500">Маркетплейс автозапчастей</p>
          </div>
        </NuxtLink>

        <nav class="hidden items-center gap-1 lg:flex">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="rounded-xl px-4 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="hidden items-center gap-3 lg:flex">
          <NuxtLink
            to="/auth/login"
            class="rounded-xl px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
          >
            Войти
          </NuxtLink>

          <NuxtLink
            to="/auth/register"
            class="inline-flex h-11 items-center justify-center rounded-2xl bg-neutral-950 px-5 text-sm font-medium text-white transition hover:opacity-90"
          >
            Стать продавцом
          </NuxtLink>
        </div>

        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 text-neutral-700 transition hover:bg-neutral-100 lg:hidden"
          :aria-expanded="isMenuOpen"
          aria-label="Открыть меню"
          @click="isMenuOpen = !isMenuOpen"
        >
          <svg
            v-if="!isMenuOpen"
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

          <svg
            v-else
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
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isMenuOpen" class="border-t border-neutral-200 bg-white lg:hidden">
        <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div class="space-y-3">
            <div class="rounded-2xl bg-neutral-50 p-2">
              <NuxtLink
                v-for="item in navItems"
                :key="item.to"
                :to="item.to"
                class="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-neutral-700 transition hover:bg-white hover:text-neutral-950"
                @click="closeMenu"
              >
                <span>{{ item.label }}</span>
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

            <div class="grid gap-3">
              <NuxtLink
                to="/auth/login"
                class="flex h-12 items-center justify-center rounded-2xl border border-neutral-200 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
                @click="closeMenu"
              >
                Войти
              </NuxtLink>

              <NuxtLink
                to="/auth/register"
                class="flex h-12 items-center justify-center rounded-2xl bg-neutral-950 text-sm font-medium text-white transition hover:opacity-90"
                @click="closeMenu"
              >
                Стать продавцом
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>
