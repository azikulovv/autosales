import {
  carModels,
  catalogProducts,
  formatPrice,
  getBrandLabel,
  getModelLabel,
} from '~/data/catalog'
import type { CatalogStats } from '~/types/catalog'

export const useCatalogFilters = () => {
  const search = ref('')
  const selectedCategory = ref('all')
  const selectedBrand = ref('all')
  const selectedModel = ref('all')
  const selectedSort = ref('price-asc')
  const onlyInStock = ref(false)

  const availableModels = computed(() => {
    if (selectedBrand.value === 'all') {
      return carModels.filter((model) => model.brand === 'all')
    }

    return carModels.filter((model) => model.brand === 'all' || model.brand === selectedBrand.value)
  })

  watch(selectedBrand, () => {
    const isCurrentModelAvailable = availableModels.value.some(
      (model) => model.value === selectedModel.value,
    )

    if (!isCurrentModelAvailable) {
      selectedModel.value = 'all'
    }
  })

  const filteredProducts = computed(() => {
    let items = [...catalogProducts]

    if (search.value.trim()) {
      const query = search.value.trim().toLowerCase()

      items = items.filter((product) => {
        return [
          product.name,
          product.article,
          product.manufacturer,
          product.vendor,
          getBrandLabel(product.brand),
          getModelLabel(product.model),
        ]
          .join(' ')
          .toLowerCase()
          .includes(query)
      })
    }

    if (selectedCategory.value !== 'all') {
      items = items.filter((product) => product.category === selectedCategory.value)
    }

    if (selectedBrand.value !== 'all') {
      items = items.filter((product) => product.brand === selectedBrand.value)
    }

    if (selectedModel.value !== 'all') {
      items = items.filter((product) => product.model === selectedModel.value)
    }

    if (onlyInStock.value) {
      items = items.filter((product) => product.inStock)
    }

    switch (selectedSort.value) {
      case 'price-desc':
        items.sort((a, b) => b.price - a.price)
        break
      case 'stock':
        items.sort((a, b) => Number(b.inStock) - Number(a.inStock) || a.price - b.price)
        break
      default:
        items.sort((a, b) => a.price - b.price)
    }

    return items
  })

  const catalogStats = computed<CatalogStats>(() => {
    const prices = filteredProducts.value.map((item) => item.price)

    return {
      total: filteredProducts.value.length,
      minPrice: prices.length ? formatPrice(Math.min(...prices)) : '—',
      categories: new Set(filteredProducts.value.map((item) => item.category)).size,
    }
  })

  const resetFilters = () => {
    search.value = ''
    selectedCategory.value = 'all'
    selectedBrand.value = 'all'
    selectedModel.value = 'all'
    selectedSort.value = 'price-asc'
    onlyInStock.value = false
  }

  return {
    search,
    selectedCategory,
    selectedBrand,
    selectedModel,
    selectedSort,
    onlyInStock,
    availableModels,
    filteredProducts,
    catalogStats,
    resetFilters,
  }
}
