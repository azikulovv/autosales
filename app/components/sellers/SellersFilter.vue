<script setup lang="ts">
import type { CatalogOption } from '~/types/catalog'

defineProps<{
  cityOptions: CatalogOption[]
  brandOptions: CatalogOption[]
  specializationOptions: CatalogOption[]
  sortOptions: CatalogOption[]
}>()

const search = defineModel<string>('search', { required: true })
const selectedCity = defineModel<string>('selectedCity', { required: true })
const selectedBrand = defineModel<string>('selectedBrand', { required: true })
const selectedSpecialization = defineModel<string>('selectedSpecialization', { required: true })
const selectedSort = defineModel<string>('selectedSort', { required: true })
const onlyVerified = defineModel<boolean>('onlyVerified', { required: true })
const showMobileFilters = ref(false)

const inputClass =
  'h-12 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-950'

const resetFilters = () => {
  search.value = ''
  selectedCity.value = 'all'
  selectedBrand.value = 'all'
  selectedSpecialization.value = 'all'
  selectedSort.value = 'rating'
  onlyVerified.value = false
}
</script>

<template>
  <aside class="hidden lg:block">
    <div class="sticky top-20 rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="text-sm font-medium text-neutral-500">Фильтры</p>
          <h2 class="mt-1 text-xl font-semibold tracking-tight">Подбор продавца</h2>
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
            placeholder="Магазин, город, бренд"
            :class="inputClass"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-neutral-700">Город</label>
          <select v-model="selectedCity" :class="inputClass">
            <option v-for="option in cityOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-neutral-700">Марка автомобиля</label>
          <select v-model="selectedBrand" :class="inputClass">
            <option v-for="option in brandOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-neutral-700">Специализация</label>
          <select v-model="selectedSpecialization" :class="inputClass">
            <option
              v-for="option in specializationOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
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
          <input v-model="onlyVerified" type="checkbox" class="h-4 w-4 rounded border-neutral-300" />
          Только проверенные
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
        placeholder="Поиск по продавцам"
        :class="inputClass"
      />

      <div class="grid grid-cols-2 gap-3">
        <select v-model="selectedCity" :class="inputClass">
          <option v-for="option in cityOptions" :key="option.value" :value="option.value">
            {{ option.label }}
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
      <select v-model="selectedBrand" :class="inputClass">
        <option v-for="option in brandOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <select v-model="selectedSpecialization" :class="inputClass">
        <option
          v-for="option in specializationOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
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
        <input v-model="onlyVerified" type="checkbox" class="h-4 w-4 rounded border-neutral-300" />
        Только проверенные
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
