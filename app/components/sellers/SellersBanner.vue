<script setup lang="ts">
import type { SellerStats } from '~/types/seller'

defineProps<{
  stats: SellerStats
}>()
</script>

<template>
  <section
    class="rounded-[28px] bg-neutral-950 p-5 text-white shadow-xl sm:rounded-4xl sm:p-7 lg:p-8"
  >
    <div class="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
      <div>
        <p
          class="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/70 sm:text-xs"
        >
          Каталог продавцов
        </p>
        <h1 class="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
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
</template>
