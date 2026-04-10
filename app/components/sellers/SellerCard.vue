<script setup lang="ts">
import type { Seller } from '~/types/seller'

defineProps<{
  seller: Seller
}>()
</script>

<template>
  <article
    class="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
  >
    <div class="aspect-[16/10] overflow-hidden bg-neutral-100">
      <img :src="seller.avatar" :alt="seller.name" class="h-full w-full object-cover" />
    </div>

    <div class="p-4 sm:p-5">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div class="min-w-0 flex-1">
          <div class="flex flex-wrap items-center gap-2">
            <h2 class="text-xl font-semibold tracking-tight text-neutral-950">
              {{ seller.name }}
            </h2>
            <span
              v-if="seller.verified"
              class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
            >
              Проверен
            </span>
          </div>

          <p class="mt-1 text-sm text-neutral-500">
            {{ seller.city }}
          </p>
        </div>

        <div
          class="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-neutral-950 px-3 py-2 text-sm font-semibold text-white"
        >
          <span>{{ seller.rating }}</span>
          <span aria-hidden="true" class="text-amber-300">★</span>
        </div>
      </div>

      <p class="mt-4 text-sm leading-6 text-neutral-500">
        {{ seller.description }}
      </p>

      <div class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="item in seller.specialization"
          :key="item"
          class="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600"
        >
          {{ item }}
        </span>
      </div>

      <div class="mt-4 grid grid-cols-3 gap-3">
        <div class="rounded-2xl bg-neutral-50 p-3">
          <p class="text-xs text-neutral-400">Отзывы</p>
          <p class="mt-1 text-sm font-semibold text-neutral-800">
            {{ seller.reviewsCount }}
          </p>
        </div>
        <div class="rounded-2xl bg-neutral-50 p-3">
          <p class="text-xs text-neutral-400">Товаров</p>
          <p class="mt-1 text-sm font-semibold text-neutral-800">
            {{ seller.productsCount }}
          </p>
        </div>
        <div class="rounded-2xl bg-neutral-50 p-3">
          <p class="text-xs text-neutral-400">Доставка</p>
          <p class="mt-1 text-sm font-semibold text-neutral-800">
            {{ seller.hasDelivery ? 'Есть' : 'Нет' }}
          </p>
        </div>
      </div>

      <div class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="brand in seller.brands"
          :key="brand"
          class="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600"
        >
          {{ brand }}
        </span>
      </div>

      <div class="mt-5 grid gap-3 xl:grid-cols-2">
        <NuxtLink
          :to="`/catalog?seller=${seller.id}`"
          class="flex h-12 w-full items-center justify-center rounded-2xl bg-neutral-950 px-4 text-center text-sm font-medium text-white transition hover:opacity-90"
        >
          Смотреть товары
        </NuxtLink>
        <button
          type="button"
          class="flex h-12 w-full items-center justify-center rounded-2xl border border-neutral-200 bg-white px-4 text-center text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
        >
          Связаться
        </button>
      </div>
    </div>
  </article>
</template>
