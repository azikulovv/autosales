<script setup lang="ts">
import {
  sellerBrandOptions,
  sellerCityOptions,
  sellerSortOptions,
  sellerSpecializationOptions,
} from '~/data/sellers'

useSeoMeta({
  title: 'Продавцы автозапчастей',
  description:
    'Каталог продавцов автозапчастей с фильтрами по городу, марке автомобиля и специализации.',
})

definePageMeta({
  public: true,
})

const {
  search,
  selectedCity,
  selectedBrand,
  selectedSpecialization,
  selectedSort,
  onlyVerified,
  filteredSellers,
  stats,
  resetFilters,
} = useSellerFilters()
</script>

<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-950">
    <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <SellersBanner :stats="stats" />

      <section class="mt-4 lg:mt-6 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6">
        <SellersFilter
          v-model:search="search"
          v-model:selected-city="selectedCity"
          v-model:selected-brand="selectedBrand"
          v-model:selected-specialization="selectedSpecialization"
          v-model:selected-sort="selectedSort"
          v-model:only-verified="onlyVerified"
          :city-options="sellerCityOptions"
          :brand-options="sellerBrandOptions"
          :specialization-options="sellerSpecializationOptions"
          :sort-options="sellerSortOptions"
        />

        <div class="min-w-0">
          <SellersActiveFilters
            :selected-city="selectedCity"
            :selected-brand="selectedBrand"
            :selected-specialization="selectedSpecialization"
            :only-verified="onlyVerified"
          />

          <SellersSellerList :sellers="filteredSellers" @reset="resetFilters" />
        </div>
      </section>
    </div>
  </div>
</template>
