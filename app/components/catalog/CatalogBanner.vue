<template>
  <section
    class="rounded-[28px] bg-neutral-950 p-5 text-white shadow-xl sm:rounded-4xl sm:p-7 lg:p-8"
  >
    <div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
      <div>
        <p
          class="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/70 sm:text-xs"
        >
          Каталог автозапчастей
        </p>
        <h1
          class="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
        >
          Подбор запчастей по автомобилю и типу детали
        </h1>
        <p class="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
          Выбери автомобиль, затем нужную категорию. В карточке оставлено только самое важное: фото,
          название, совместимость, наличие и цена.
        </p>
      </div>

      <div
        class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:justify-self-end lg:w-full lg:max-w-xs"
      >
        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p class="text-2xl font-semibold tracking-tight">{{ catalogStats.total }}</p>
          <p class="mt-1 text-sm text-white/60">найдено позиций</p>
        </div>

        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p class="text-2xl font-semibold tracking-tight">{{ catalogStats.minPrice }}</p>
          <p class="mt-1 text-sm text-white/60">минимальная цена</p>
        </div>

        <div class="col-span-2 rounded-2xl border border-white/10 bg-white/5 p-4 sm:col-span-1">
          <p class="text-2xl font-semibold tracking-tight">{{ catalogStats.categories }}</p>
          <p class="mt-1 text-sm text-white/60">категорий в выдаче</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  catalogStats: {
    total: number
    minPrice: string
    categories: number
  }
}>()
</script>
