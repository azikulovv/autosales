<script setup lang="ts">
import type { Product } from '~/types/product'

defineProps<{
  product: Product
  getBrandLabel: (value: string) => string
  getCategoryLabel: (value: string) => string
  getModelLabel: (value: string) => string
  formatPrice: (value: number) => string
}>()
</script>

<template>
  <article
    class="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
  >
    <div class="aspect-4/3 overflow-hidden bg-neutral-100">
      <img :src="product.image" :alt="product.name" class="h-full w-full object-cover" />
    </div>

    <div class="p-4">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <p class="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
            {{ getCategoryLabel(product.category) }}
          </p>
          <h2 class="mt-2 text-lg font-semibold leading-snug tracking-tight text-neutral-950">
            {{ product.name }}
          </h2>
        </div>

        <span
          class="shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
          :class="
            product.inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-500'
          "
        >
          {{ product.inStock ? 'В наличии' : 'Под заказ' }}
        </span>
      </div>

      <div class="mt-4 rounded-[22px] justify-between bg-neutral-950 p-4 text-white">
        <p class="text-[11px] uppercase tracking-[0.18em] text-white/50">Цена</p>
        <p class="text-3xl font-semibold tracking-tight">
          {{ formatPrice(product.price) }}
        </p>
      </div>

      <dl class="mt-4 space-y-3 text-sm">
        <div class="flex items-start justify-between gap-4">
          <dt class="text-neutral-400">Автомобиль</dt>
          <dd class="text-right font-medium text-neutral-700">
            {{ getBrandLabel(product.brand) }} {{ getModelLabel(product.model) }}
          </dd>
        </div>

        <div v-if="product.engine" class="flex items-start justify-between gap-4">
          <dt class="text-neutral-400">Двигатель</dt>
          <dd class="text-right font-medium text-neutral-700">{{ product.engine }}</dd>
        </div>

        <div class="flex items-start justify-between gap-4">
          <dt class="text-neutral-400">Артикул</dt>
          <dd class="text-right font-medium text-neutral-700">{{ product.article }}</dd>
        </div>

        <div class="flex items-start justify-between gap-4">
          <dt class="text-neutral-400">Бренд</dt>
          <dd class="text-right font-medium text-neutral-700">{{ product.manufacturer }}</dd>
        </div>
      </dl>

      <div class="mt-4 flex items-center justify-between gap-3 text-sm text-neutral-500">
        <span>{{ product.vendor }}</span>
        <span>{{ product.city }}</span>
      </div>

      <NuxtLink
        :to="`/catalog/${product.id}`"
        class="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-neutral-950 text-sm font-medium text-white transition hover:opacity-90"
      >
        Открыть карточку
      </NuxtLink>
    </div>
  </article>
</template>
