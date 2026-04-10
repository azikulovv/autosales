<script setup lang="ts">
import {
  formatPrice,
  getBrandLabel,
  getCatalogProductById,
  getCategoryLabel,
  getModelLabel,
} from '~/data/catalog'

useSeoMeta({
  title: 'автосейлс | Карточка автозапчасти',
  description: 'Подробная информация об автозапчасти: совместимость, артикул, наличие и цена.',
})

const route = useRoute()

const productId = computed(() => Number(route.params.id))
const product = computed(() => getCatalogProductById(productId.value))

const productCategoryLabel = computed(() => {
  if (!product.value) {
    return 'Категория'
  }

  return getCategoryLabel(product.value.category)
})

const productCarLabel = computed(() => {
  if (!product.value) {
    return 'Автомобиль'
  }

  return `${getBrandLabel(product.value.brand)} ${getModelLabel(product.value.model)}`.trim()
})

const sellerCardItems = computed(() => {
  if (!product.value) {
    return []
  }

  return [
    { label: 'Продавец', value: product.value.vendor },
    { label: 'Город', value: product.value.city },
    { label: 'Наличие', value: product.value.inStock ? 'В наличии' : 'Под заказ' },
  ]
})
</script>

<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-950">
    <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <template v-if="product">
        <section class="rounded-[28px] bg-white p-4 shadow-sm sm:p-6 lg:p-8">
          <CatalogProductBreadcrumbs
            :category-label="productCategoryLabel"
            :product-name="product.name"
          />

          <div class="mt-4 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
            <CatalogProductGallery :images="product.images" :product-name="product.name" />

            <CatalogProductSummary
              :product="product"
              :category-label="productCategoryLabel"
              :product-car-label="productCarLabel"
              :format-price="formatPrice"
            />
          </div>
        </section>

        <section class="mt-4 grid gap-4 lg:grid-cols-[1fr_320px] lg:gap-6">
          <CatalogProductMeta :specs="product.specs" :compatible-cars="product.compatibleCars" />

          <CatalogSellerCard :seller-name="product.vendor" :items="sellerCardItems" />
        </section>
      </template>

      <CatalogProductNotFound v-else />
    </div>
  </div>
</template>
