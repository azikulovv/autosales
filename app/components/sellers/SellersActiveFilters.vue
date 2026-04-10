<script setup lang="ts">
defineProps<{
  selectedCity: string
  selectedBrand: string
  selectedSpecialization: string
  onlyVerified: boolean
}>()
</script>

<template>
  <section class="mt-4 flex flex-wrap items-center gap-2 lg:mt-0">
    <span
      class="rounded-full bg-white px-3 py-2 text-xs font-medium text-neutral-600 shadow-sm ring-1 ring-neutral-200"
    >
      {{ selectedCity === 'all' ? 'Все города' : selectedCity }}
    </span>
    <span
      class="rounded-full bg-white px-3 py-2 text-xs font-medium text-neutral-600 shadow-sm ring-1 ring-neutral-200"
    >
      {{ selectedBrand === 'all' ? 'Все марки' : selectedBrand }}
    </span>
    <span
      class="rounded-full bg-white px-3 py-2 text-xs font-medium text-neutral-600 shadow-sm ring-1 ring-neutral-200"
    >
      {{ selectedSpecialization === 'all' ? 'Все специализации' : selectedSpecialization }}
    </span>
    <span
      v-if="onlyVerified"
      class="rounded-full bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200"
    >
      Только проверенные
    </span>
  </section>
</template>
