<script setup lang="ts">
import type { ProductDetails, ProductSpec } from '~/types/product'

defineProps<{
  specs: ProductSpec[]
  compatibleCars: ProductDetails['compatibleCars']
}>()
</script>

<template>
  <div class="space-y-4">
    <div class="rounded-[28px] bg-white p-4 shadow-sm sm:p-6">
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="text-sm font-medium text-neutral-500">Характеристики</p>
          <h2 class="mt-1 text-2xl font-semibold tracking-tight">Основная информация</h2>
        </div>
      </div>

      <div class="mt-5 grid gap-3">
        <div
          v-for="spec in specs"
          :key="spec.label"
          class="flex items-start justify-between gap-4 rounded-2xl bg-neutral-50 px-4 py-4"
        >
          <p class="text-sm text-neutral-400">{{ spec.label }}</p>
          <p class="text-right text-sm font-medium text-neutral-700">
            {{ spec.value }}
          </p>
        </div>
      </div>
    </div>

    <div class="rounded-[28px] bg-white p-4 shadow-sm sm:p-6">
      <p class="text-sm font-medium text-neutral-500">Совместимость</p>
      <h2 class="mt-1 text-2xl font-semibold tracking-tight">Подходит для автомобилей</h2>

      <div class="mt-5 grid gap-3">
        <div
          v-for="car in compatibleCars"
          :key="car"
          class="rounded-2xl bg-neutral-50 px-4 py-4 text-sm font-medium text-neutral-700"
        >
          {{ car }}
        </div>
      </div>
    </div>
  </div>
</template>
