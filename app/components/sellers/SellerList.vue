<script setup lang="ts">
import type { Seller } from '~/types/seller'

defineProps<{
  sellers: Seller[]
}>()

defineEmits<{
  reset: []
}>()
</script>

<template>
  <section class="mt-4">
    <div v-if="sellers.length" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <SellersSellerCard v-for="seller in sellers" :key="seller.id" :seller="seller" />
    </div>

    <div
      v-else
      class="rounded-[28px] border border-dashed border-neutral-300 bg-white p-8 text-center shadow-sm"
    >
      <h2 class="text-xl font-semibold tracking-tight text-neutral-950">
        Продавцы не найдены
      </h2>
      <p class="mt-2 text-sm leading-6 text-neutral-500">
        Попробуй изменить фильтры или сбросить поиск, чтобы увидеть больше магазинов.
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
