import type { SellerProfile } from '~/types/seller'

export const useSellerProfile = () => {
  const pending = ref<boolean>(false)
  const isSubmitting = ref<boolean>(false)

  const getProfile = async (): Promise<SellerProfile> => {
    pending.value = true

    try {
      const { data, success } = await useApiFetch<{
        success: boolean
        data: SellerProfile
      }>('/seller/profile')

      if (!success) {
        throw Error('Сервер вернул ошибку!')
      }

      return data
    } finally {
      pending.value = false
    }
  }

  const updateProfile = async (payload: Omit<SellerProfile, 'slug'>) => {
    isSubmitting.value = true

    try {
      const { data, success } = await useApiFetch<{
        success: boolean
        data: SellerProfile
      }>('/seller/profile', {
        method: 'PATCH',
        body: {
          address: payload.address,
          brands: payload.brands,
          categories: payload.categories,
          city: payload.city,
          description: payload.description,
          email: payload.email,
          hasDelivery: payload.hasDelivery,
          isVerified: payload.isVerified,
          logo: payload.logo,
          phone: payload.phone,
          shopName: payload.shopName,
          telegram: payload.telegram,
          website: payload.website,
          whatsapp: payload.whatsapp,
          workingHours: payload.workingHours,
        },
      })

      if (!success) {
        throw Error('Сервер вернул ошибку при обновлений пользователя!')
      }

      return data
    } finally {
      isSubmitting.value = false
    }
  }

  return { pending, isSubmitting, getProfile, updateProfile }
}
