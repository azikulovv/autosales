<script lang="ts" setup>
import type { CarModel } from '~/types/filters'
import type { CatalogOption, SortOption } from '~/types/catalog'

defineProps<{
  carBrands: CatalogOption[]
  partCategories: CatalogOption[]
  sortOptions: SortOption[]
  availableModels: CarModel[]
}>()

const search = defineModel<string>('search', { required: true })
const selectedBrand = defineModel<string>('selectedBrand', { required: true })
const selectedModel = defineModel<string>('selectedModel', { required: true })
const selectedCategory = defineModel<string>('selectedCategory', { required: true })
const selectedSort = defineModel<string>('selectedSort', { required: true })
const onlyInStock = defineModel<boolean>('onlyInStock', { required: true })
const showMobileFilters = ref(false)

const inputClass =
  'h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950'

const resetFilters = () => {
  search.value = ''
  selectedBrand.value = 'all'
  selectedModel.value = 'all'
  selectedCategory.value = 'all'
  selectedSort.value = 'price-asc'
  onlyInStock.value = false
}
</script>

<template>
  <aside class="hidden lg:block">
    <div class="sticky top-20 rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="text-sm font-medium text-neutral-500">Фильтры</p>
          <h2 class="mt-1 text-xl font-semibold tracking-tight">Подбор</h2>
        </div>

        <button
          type="button"
          class="text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
          @click="resetFilters"
        >
          Сбросить
        </button>
      </div>

      <div class="mt-5 space-y-4">
        <div>
          <label class="mb-2 block text-sm font-medium text-neutral-700">Поиск</label>
          <input
            v-model="search"
            type="text"
            placeholder="Название, артикул, бренд"
            :class="inputClass"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-neutral-700">Автомобиль</label>
          <select v-model="selectedBrand" :class="inputClass">
            <option v-for="brand in carBrands" :key="brand.value" :value="brand.value">
              {{ brand.label }}
            </option>
          </select>
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-neutral-700">Модель</label>
          <select v-model="selectedModel" :class="inputClass">
            <option v-for="model in availableModels" :key="model.value" :value="model.value">
              {{ model.label }}
            </option>
          </select>
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-neutral-700">Тип запчасти</label>
          <select v-model="selectedCategory" :class="inputClass">
            <option
              v-for="category in partCategories"
              :key="category.value"
              :value="category.value"
            >
              {{ category.label }}
            </option>
          </select>
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-neutral-700">Сортировка</label>
          <select v-model="selectedSort" :class="inputClass">
            <option v-for="option in sortOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <label
          class="flex items-center gap-3 rounded-2xl bg-neutral-50 px-4 py-3 text-sm text-neutral-700"
        >
          <input v-model="onlyInStock" type="checkbox" class="h-4 w-4 rounded border-neutral-300" />
          Только в наличии
        </label>
      </div>
    </div>
  </aside>

  <section
    class="mt-4 rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm lg:mt-0 lg:hidden"
  >
    <div class="space-y-3">
      <input
        v-model="search"
        type="text"
        placeholder="Поиск по названию или артикулу"
        :class="inputClass"
      />

      <div class="grid grid-cols-2 gap-3">
        <select v-model="selectedBrand" :class="inputClass">
          <option v-for="brand in carBrands" :key="brand.value" :value="brand.value">
            {{ brand.label }}
          </option>
        </select>

        <button
          type="button"
          class="flex h-12 items-center justify-center rounded-2xl border border-neutral-200 px-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
          @click="showMobileFilters = !showMobileFilters"
        >
          {{ showMobileFilters ? 'Скрыть фильтры' : 'Фильтры' }}
        </button>
      </div>
    </div>

    <div v-if="showMobileFilters" class="mt-3 space-y-3 border-t border-neutral-100 pt-3">
      <select v-model="selectedModel" :class="inputClass">
        <option v-for="model in availableModels" :key="model.value" :value="model.value">
          {{ model.label }}
        </option>
      </select>

      <select v-model="selectedCategory" :class="inputClass">
        <option v-for="category in partCategories" :key="category.value" :value="category.value">
          {{ category.label }}
        </option>
      </select>

      <select v-model="selectedSort" :class="inputClass">
        <option v-for="option in sortOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <label
        class="flex items-center gap-3 rounded-2xl bg-neutral-50 px-4 py-3 text-sm text-neutral-700"
      >
        <input v-model="onlyInStock" type="checkbox" class="h-4 w-4 rounded border-neutral-300" />
        Только в наличии
      </label>

      <button
        type="button"
        class="flex h-12 w-full items-center justify-center rounded-2xl border border-neutral-200 px-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
        @click="resetFilters"
      >
        Сбросить фильтры
      </button>
    </div>
  </section>
</template>
