import { sellers } from '~/data/sellers'
import type { SellerStats } from '~/types/seller'

export const useSellerFilters = () => {
  const search = ref('')
  const selectedCity = ref('all')
  const selectedBrand = ref('all')
  const selectedSpecialization = ref('all')
  const selectedSort = ref('rating')
  const onlyVerified = ref(false)

  const filteredSellers = computed(() => {
    let items = [...sellers]

    if (search.value.trim()) {
      const query = search.value.trim().toLowerCase()
      items = items.filter((seller) => {
        return [
          seller.name,
          seller.city,
          seller.description,
          ...seller.specialization,
          ...seller.brands,
        ]
          .join(' ')
          .toLowerCase()
          .includes(query)
      })
    }

    if (selectedCity.value !== 'all') {
      items = items.filter((seller) => seller.city === selectedCity.value)
    }

    if (selectedBrand.value !== 'all') {
      items = items.filter((seller) => seller.brands.includes(selectedBrand.value))
    }

    if (selectedSpecialization.value !== 'all') {
      items = items.filter((seller) => seller.specialization.includes(selectedSpecialization.value))
    }

    if (onlyVerified.value) {
      items = items.filter((seller) => seller.verified)
    }

    switch (selectedSort.value) {
      case 'products':
        items.sort((a, b) => b.productsCount - a.productsCount)
        break
      case 'verified':
        items.sort((a, b) => Number(b.verified) - Number(a.verified) || b.rating - a.rating)
        break
      default:
        items.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount)
    }

    return items
  })

  const stats = computed<SellerStats>(() => ({
    total: filteredSellers.value.length,
    verified: filteredSellers.value.filter((item) => item.verified).length,
    avgRating: filteredSellers.value.length
      ? (
          filteredSellers.value.reduce((sum, item) => sum + item.rating, 0) /
          filteredSellers.value.length
        ).toFixed(1)
      : '0.0',
  }))

  const resetFilters = () => {
    search.value = ''
    selectedCity.value = 'all'
    selectedBrand.value = 'all'
    selectedSpecialization.value = 'all'
    selectedSort.value = 'rating'
    onlyVerified.value = false
  }

  return {
    search,
    selectedCity,
    selectedBrand,
    selectedSpecialization,
    selectedSort,
    onlyVerified,
    filteredSellers,
    stats,
    resetFilters,
  }
}
