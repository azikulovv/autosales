<script setup lang="ts">
defineProps<{
  selectedBrand: string
  selectedCategory: string
  selectedModel: string
  onlyInStock: boolean
  getBrandLabel: (value: string) => string
  getCategoryLabel: (value: string) => string
  getModelLabel: (value: string) => string
}>()
</script>

<template>
  <section class="mt-4 flex flex-wrap items-center gap-2 lg:mt-0">
    <span
      class="rounded-full bg-white px-3 py-2 text-xs font-medium text-neutral-600 shadow-sm ring-1 ring-neutral-200"
    >
      {{ selectedBrand === 'all' ? 'Все автомобили' : getBrandLabel(selectedBrand) }}
    </span>

    <span
      class="rounded-full bg-white px-3 py-2 text-xs font-medium text-neutral-600 shadow-sm ring-1 ring-neutral-200"
    >
      {{ selectedCategory === 'all' ? 'Все запчасти' : getCategoryLabel(selectedCategory) }}
    </span>

    <span
      v-if="selectedModel !== 'all'"
      class="rounded-full bg-white px-3 py-2 text-xs font-medium text-neutral-600 shadow-sm ring-1 ring-neutral-200"
    >
      {{ getModelLabel(selectedModel) }}
    </span>

    <span
      v-if="onlyInStock"
      class="rounded-full bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200"
    >
      Только в наличии
    </span>
  </section>
</template>
