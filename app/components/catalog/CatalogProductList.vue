<script setup lang="ts">
import type { Product } from '~/types/product'

defineProps<{
  products: Product[]
  getBrandLabel: (value: string) => string
  getCategoryLabel: (value: string) => string
  getModelLabel: (value: string) => string
  formatPrice: (value: number) => string
}>()

defineEmits<{
  reset: []
}>()
</script>

<template>
  <section class="mt-4">
    <div v-if="products.length" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <CatalogProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :get-brand-label="getBrandLabel"
        :get-category-label="getCategoryLabel"
        :get-model-label="getModelLabel"
        :format-price="formatPrice"
      />
    </div>

    <div
      v-else
      class="rounded-[28px] border border-dashed border-neutral-300 bg-white p-8 text-center shadow-sm"
    >
      <h2 class="text-xl font-semibold tracking-tight text-neutral-950">Ничего не найдено</h2>
      <p class="mt-2 text-sm leading-6 text-neutral-500">
        Измени автомобиль, тип запчасти или сбрось фильтры, чтобы увидеть больше позиций.
      </p>
      <button
        type="button"
        class="mt-4 inline-flex rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
        @click="$emit('reset')"
      >
        Сбросить фильтры
      </button>
    </div>
  </section>
</template>
