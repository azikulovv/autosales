<script setup lang="ts">
import type { ProductDetails } from '~/types/product'

defineProps<{
  product: ProductDetails
  categoryLabel: string
  productCarLabel: string
  formatPrice: (value: number) => string
}>()
</script>

<template>
  <div class="min-w-0">
    <div class="flex flex-wrap items-center gap-2">
      <span class="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
        {{ categoryLabel }}
      </span>

      <span
        class="rounded-full px-3 py-1 text-xs font-semibold"
        :class="product.inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-500'"
      >
        {{ product.inStock ? 'В наличии' : 'Под заказ' }}
      </span>
    </div>

    <h1 class="mt-4 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
      {{ product.name }}
    </h1>

    <p class="mt-3 text-sm leading-6 text-neutral-500 sm:text-base">
      {{ product.description }}
    </p>

    <div class="mt-5 rounded-[24px] bg-neutral-950 p-5 text-white">
      <p class="text-[11px] uppercase tracking-[0.18em] text-white/50">Цена</p>
      <p class="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
        {{ formatPrice(product.price) }}
      </p>
    </div>

    <dl class="mt-5 space-y-3 rounded-[24px] bg-neutral-50 p-4 sm:p-5">
      <div class="flex items-start justify-between gap-4">
        <dt class="text-sm text-neutral-400">Автомобиль</dt>
        <dd class="text-right text-sm font-medium text-neutral-700">
          {{ productCarLabel }}
        </dd>
      </div>

      <div v-if="product.generation" class="flex items-start justify-between gap-4">
        <dt class="text-sm text-neutral-400">Поколение</dt>
        <dd class="text-right text-sm font-medium text-neutral-700">
          {{ product.generation }}
        </dd>
      </div>

      <div v-if="product.engine" class="flex items-start justify-between gap-4">
        <dt class="text-sm text-neutral-400">Двигатель</dt>
        <dd class="text-right text-sm font-medium text-neutral-700">
          {{ product.engine }}
        </dd>
      </div>

      <div class="flex items-start justify-between gap-4">
        <dt class="text-sm text-neutral-400">Артикул</dt>
        <dd class="text-right text-sm font-medium text-neutral-700">
          {{ product.article }}
        </dd>
      </div>

      <div class="flex items-start justify-between gap-4">
        <dt class="text-sm text-neutral-400">Бренд детали</dt>
        <dd class="text-right text-sm font-medium text-neutral-700">
          {{ product.manufacturer }}
        </dd>
      </div>
    </dl>

    <div class="mt-5 grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        class="flex h-12 items-center justify-center rounded-2xl bg-neutral-950 text-sm font-medium text-white transition hover:opacity-90"
      >
        Связаться с продавцом
      </button>

      <button
        type="button"
        class="flex h-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
      >
        Добавить в сравнение
      </button>
    </div>
  </div>
</template>
