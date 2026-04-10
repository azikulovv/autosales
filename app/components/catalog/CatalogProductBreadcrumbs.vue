<script setup lang="ts">
defineProps<{
  categoryLabel: string
  productName: string
}>()
</script>

<template>
  <div class="flex flex-wrap items-center gap-2 text-sm text-neutral-500">
    <NuxtLink to="/" class="transition hover:text-neutral-950"> Главная </NuxtLink>
    <span>/</span>
    <NuxtLink to="/catalog" class="transition hover:text-neutral-950"> Каталог </NuxtLink>
    <span>/</span>
    <NuxtLink to="/categories" class="transition hover:text-neutral-950">
      {{ categoryLabel }}
    </NuxtLink>
    <span>/</span>
    <span class="text-neutral-950">{{ productName }}</span>
  </div>
</template>
