<script setup lang="ts">
const footerNav = [
  {
    title: 'Платформа',
    links: [
      { label: 'Каталог', to: '/catalog' },
      { label: 'Категории', to: '/categories' },
      { label: 'Продавцам', to: '/sellers' },
      { label: 'О сервисе', to: '/about' },
    ],
  },
  {
    title: 'Продавцам',
    links: [
      { label: 'Вход', to: '/auth/login' },
      { label: 'Регистрация', to: '/auth/register' },
      { label: 'Тарифы', to: '/auth/register' },
      { label: 'Поддержка', to: '/support' },
    ],
  },
  {
    title: 'Контакты',
    links: [
      { label: 'Telegram', to: 'https://t.me/auto_sales' },
      { label: 'Email', to: 'mailto:admin@auto-sales.kz' },
      { label: 'Instagram', to: 'https://instagram.com/auto_sales.kz' },
    ],
  },
]

const isExternalLink = (url: string) => {
  return url.startsWith('http') || url.startsWith('mailto:')
}
</script>

<template>
  <footer class="border-t border-neutral-200 bg-white">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div class="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <div>
          <NuxtLink to="/" class="flex items-center gap-3">
            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-neutral-950 text-sm font-semibold text-white"
            >
              АС
            </div>

            <div>
              <p class="text-base font-semibold tracking-tight text-neutral-950">автосейлс</p>
              <p class="text-sm text-neutral-500">Маркетплейс автозапчастей</p>
            </div>
          </NuxtLink>

          <p class="mt-4 max-w-md text-sm leading-6 text-neutral-500 sm:text-base">
            Подбирай автозапчасти по автомобилю, сравнивай цены от продавцов и находи нужные детали
            в одном каталоге.
          </p>

          <div class="mt-6 flex flex-wrap gap-3">
            <NuxtLink
              to="/catalog"
              class="inline-flex h-11 items-center justify-center rounded-2xl bg-neutral-950 px-5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Перейти в каталог
            </NuxtLink>

            <NuxtLink
              to="/seller/register"
              class="inline-flex h-11 items-center justify-center rounded-2xl border border-neutral-200 px-5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
            >
              Стать продавцом
            </NuxtLink>
          </div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="group in footerNav"
            :key="group.title"
            class="rounded-3xl bg-neutral-50 p-4 sm:p-5"
          >
            <p class="text-sm font-semibold text-neutral-950">
              {{ group.title }}
            </p>

            <div class="mt-4 space-y-3">
              <component
                :is="isExternalLink(link.to) ? 'a' : 'NuxtLink'"
                v-for="link in group.links"
                :key="link.label"
                :href="isExternalLink(link.to) ? link.to : undefined"
                :to="!isExternalLink(link.to) ? link.to : undefined"
                :target="
                  isExternalLink(link.to) && link.to.startsWith('http') ? '_blank' : undefined
                "
                :rel="
                  isExternalLink(link.to) && link.to.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                "
                class="block text-sm text-neutral-500 transition hover:text-neutral-950"
              >
                {{ link.label }}
              </component>
            </div>
          </div>
        </div>
      </div>

      <div
        class="mt-8 flex flex-col gap-3 border-t border-neutral-200 pt-6 text-sm text-neutral-400 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:pt-8"
      >
        <p>© 2026 autosales. Все права защищены.</p>
        <div class="flex flex-wrap gap-4">
          <NuxtLink to="/privacy" class="transition hover:text-neutral-700">
            Политика конфиденциальности
          </NuxtLink>
          <NuxtLink to="/terms" class="transition hover:text-neutral-700">
            Условия использования
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
