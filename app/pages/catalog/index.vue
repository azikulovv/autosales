<script setup lang="ts">
import {
  carBrands,
  formatPrice,
  getBrandLabel,
  getCategoryLabel,
  getModelLabel,
  partCategories,
  sortOptions,
} from '~/data/catalog'

useSeoMeta({
  title: 'автосейлс | Каталог автозапчастей',
  description: 'Каталог автозапчастей с подбором по автомобилю, категории и цене.',
})

const {
  search,
  selectedCategory,
  selectedBrand,
  selectedModel,
  selectedSort,
  onlyInStock,
  availableModels,
  filteredProducts,
  resetFilters,
} = useCatalogFilters()
</script>

<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-950">
    <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <!-- <CatalogBanner :catalog-stats="catalogStats" /> -->

      <section class="mt-4 lg:mt-6 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6">
        <CatalogFilter
          v-model:search="search"
          v-model:selected-brand="selectedBrand"
          v-model:selected-model="selectedModel"
          v-model:selected-category="selectedCategory"
          v-model:selected-sort="selectedSort"
          v-model:only-in-stock="onlyInStock"
          :car-brands="carBrands"
          :part-categories="partCategories"
          :sort-options="sortOptions"
          :available-models="availableModels"
        />

        <div class="min-w-0">
          <CatalogActiveFilters
            :selected-brand="selectedBrand"
            :selected-category="selectedCategory"
            :selected-model="selectedModel"
            :only-in-stock="onlyInStock"
            :get-brand-label="getBrandLabel"
            :get-category-label="getCategoryLabel"
            :get-model-label="getModelLabel"
          />

          <CatalogProductList
            :products="filteredProducts"
            :get-brand-label="getBrandLabel"
            :get-category-label="getCategoryLabel"
            :get-model-label="getModelLabel"
            :format-price="formatPrice"
            @reset="resetFilters"
          />
        </div>
      </section>
    </div>
  </div>
</template>
