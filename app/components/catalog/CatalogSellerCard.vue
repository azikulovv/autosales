<script setup lang="ts">
defineProps<{
  sellerName: string
  items: Array<{
    label: string
    value: string
  }>
}>()
</script>

<template>
  <aside>
    <div class="sticky top-6 rounded-[28px] bg-white p-4 shadow-sm sm:p-5">
      <p class="text-sm font-medium text-neutral-500">Продавец</p>
      <h2 class="mt-1 text-2xl font-semibold tracking-tight">
        {{ sellerName }}
      </h2>

      <div class="mt-5 space-y-3">
        <div v-for="item in items" :key="item.label" class="rounded-2xl bg-neutral-50 px-4 py-4">
          <p class="text-xs uppercase tracking-[0.18em] text-neutral-400">
            {{ item.label }}
          </p>
          <p class="mt-2 text-sm font-medium text-neutral-700">
            {{ item.value }}
          </p>
        </div>
      </div>

      <button
        type="button"
        class="mt-5 flex h-12 w-full items-center justify-center rounded-2xl bg-neutral-950 text-sm font-medium text-white transition hover:opacity-90"
      >
        Написать продавцу
      </button>
    </div>
  </aside>
</template>
