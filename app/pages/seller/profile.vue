<script setup lang="ts">
import FormField from '~/components/ui/form/FormField.vue'
import ImageUpload from '~/components/ui/ImageUpload.vue'
import InputAutocomplete from '~/components/ui/InputAutocomplete.vue'
import type { SellerProfile } from '~/types/seller'

useSeoMeta({
  title: 'Профиль магазина',
  description: 'Настройки профиля продавца, контактов и публичной информации магазина.',
})

const toast = useToastify()
const { pending, isSubmitting, getProfile, updateProfile } = useSellerProfile()

const brandOptions = [
  'Toyota',
  'Hyundai',
  'Kia',
  'BMW',
  'Mercedes-Benz',
  'Lada',
  'Volkswagen',
  'Audi',
]

const specializationOptions = [
  'Тормозная система',
  'Фильтры',
  'Подвеска',
  'Двигатель',
  'Электрика',
  'Кузов',
  'Трансмиссия',
]

const form = ref<SellerProfile>({
  shopName: '',
  slug: '',
  city: '',
  address: '',
  phone: '',
  whatsapp: '',
  telegram: '',
  email: '',
  description: '',
  logo: '',
  website: '',
  hasDelivery: false,
  isVerified: false,
  workingHours: '',
  brands: [],
  categories: [],
})

const publicStoreUrl = computed(() => `/seller/${form.value.slug}`)

const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const { success, data } = await useApiFetch<{
    success: boolean
    data: { url: string }
  }>('/uploads/single', {
    method: 'POST',
    body: formData,
  })

  if (!success) {
    toast.error('Ошибка загрузки изображения')
  }

  return data.url
}

const onUpdateProfile = async () => {
  let logoUrl: string | null = null

  if (form.value.logo instanceof File) {
    logoUrl = await uploadImage(form.value.logo)
  } else if (typeof form.value.logo === 'string') {
    logoUrl = form.value.logo
  }

  form.value = await toast.promise(updateProfile({ ...form.value, logo: logoUrl }), {
    loading: 'Сохраняем профиль...',
    success: 'Профиль успешно сохранен!',
    error: 'Ошибка при сохранении профиля!',
    title: 'Профиль продавца',
  })
}

onMounted(async () => {
  form.value = await toast.promise(getProfile(), {
    loading: 'Получаем профиль...',
    success: 'Профиль успешно получен',
    error: 'Ошибка при получении профиля',
    title: 'Профиль продавца',
  })
})
</script>

<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-950">
    <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <section v-if="pending">Loading...</section>

      <section v-else class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-6">
        <div class="space-y-4">
          <section class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
            <p class="text-sm font-medium text-neutral-500">Основная информация</p>
            <h2 class="mt-1 text-2xl font-semibold tracking-tight">Данные магазина</h2>

            <div class="mt-5 grid gap-4">
              <ImageUpload v-model="form.logo" />

              <div class="grid gap-4 sm:grid-cols-2">
                <FormField v-model="form.shopName" :required="true" label="Название магазина" />
                <FormField v-model="form.city" :required="true" label="Город" />
              </div>

              <div class="grid gap-4 sm:grid-cols-2">
                <FormField v-model="form.workingHours" :required="true" label="Часы работы" />
                <FormField v-model="form.address" :required="true" label="Адрес" />
              </div>

              <FormField
                v-model="form.description"
                :required="true"
                type="textarea"
                label="Описание"
              />
            </div>
          </section>

          <section class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
            <p class="text-sm font-medium text-neutral-500">Контакты</p>
            <h2 class="mt-1 text-2xl font-semibold tracking-tight">Способы связи</h2>

            <div class="mt-5 grid gap-4">
              <div class="grid gap-4 sm:grid-cols-2">
                <FormField type="phone" :required="true" v-model="form.phone" label="Телефон" />
                <FormField type="phone" :required="true" v-model="form.whatsapp" label="WhatsApp" />

                <FormField v-model="form.telegram" label="Telegram" />
                <FormField :required="true" v-model="form.email" type="email" label="Email" />
              </div>

              <FormField label="Сайт" v-model="form.website" />
            </div>
          </section>

          <section class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
            <p class="text-sm font-medium text-neutral-500">Позиционирование</p>
            <h2 class="mt-1 text-2xl font-semibold tracking-tight">Бренды и специализация</h2>

            <div class="mt-5">
              <p class="text-sm font-medium text-neutral-700">С какими марками работает магазин</p>

              <InputAutocomplete
                class="mt-2"
                :multiple="true"
                :items="brandOptions"
                :clearable="true"
                v-model="form.brands"
              />
            </div>

            <div class="mt-6">
              <p class="text-sm font-medium text-neutral-700">Основные специализации</p>

              <InputAutocomplete
                class="mt-2"
                :multiple="true"
                :items="specializationOptions"
                :clearable="true"
                v-model="form.categories"
              />
            </div>
          </section>
        </div>

        <aside class="space-y-4">
          <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
            <p class="text-sm font-medium text-neutral-500">Публикация</p>

            <div class="mt-4 space-y-3">
              <label
                class="flex items-center justify-between gap-4 rounded-2xl bg-neutral-50 px-4 py-4"
              >
                <span class="text-sm font-medium text-neutral-700">Есть доставка</span>
                <input
                  v-model="form.hasDelivery"
                  type="checkbox"
                  class="h-4 w-4 rounded border-neutral-300"
                />
              </label>

              <label
                class="flex items-center justify-between gap-4 rounded-2xl bg-neutral-50 px-4 py-4"
              >
                <span class="text-sm font-medium text-neutral-700">Проверенный магазин</span>

                <input
                  v-model="form.isVerified"
                  type="checkbox"
                  class="h-4 w-4 rounded border-neutral-300"
                />
              </label>
            </div>

            <div class="mt-5 grid gap-3">
              <button
                type="button"
                class="flex h-12 items-center justify-center rounded-2xl bg-neutral-950 text-sm font-medium text-white transition hover:opacity-90"
                :disabled="isSubmitting"
                @click="onUpdateProfile()"
              >
                {{ isSubmitting ? 'Сохранение...' : 'Сохранить профиль' }}
              </button>

              <NuxtLink
                :to="publicStoreUrl"
                class="flex h-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
              >
                Открыть публичную страницу
              </NuxtLink>
            </div>
          </div>
        </aside>
      </section>
    </div>
  </div>
</template>
