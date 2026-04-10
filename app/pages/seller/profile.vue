<script setup lang="ts">
useSeoMeta({
  title: 'Профиль магазина',
  description: 'Настройки профиля продавца, контактов и публичной информации магазина.',
})

type StoreProfile = {
  name: string
  slug: string
  city: string
  address: string
  phone: string
  whatsapp: string
  telegram: string
  email: string
  description: string
  logo: string
  cover: string
  website: string
  hasDelivery: boolean
  isVerified: boolean
  workingHours: string
  brands: string[]
  specializations: string[]
}

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

const form = ref<StoreProfile>({
  name: 'AutoParts KRG',
  slug: 'autoparts-krg',
  city: 'Караганда',
  address: 'ул. Примерная, 25',
  phone: '+7 (777) 123-45-67',
  whatsapp: '+7 (777) 123-45-67',
  telegram: '@autoparts_krg',
  email: 'hello@autoparts.kz',
  description:
    'Магазин автозапчастей с упором на тормозную систему, подвеску и расходники для популярных автомобилей. Работаем по актуальным остаткам и быстро отвечаем покупателям.',
  logo: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=500&q=80',
  cover:
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80',
  website: 'https://autoparts.kz',
  hasDelivery: true,
  isVerified: true,
  workingHours: 'Пн–Сб, 09:00–19:00',
  brands: ['Toyota', 'Hyundai', 'Kia'],
  specializations: ['Тормозная система', 'Подвеска', 'Фильтры'],
})

const showMobileSidebar = ref(false)
const isSaving = ref(false)
const saveMessage = ref('')

const toggleArrayValue = (list: string[], value: string) => {
  if (list.includes(value)) {
    return list.filter((item) => item !== value)
  }

  return [...list, value]
}

const toggleBrand = (value: string) => {
  form.value.brands = toggleArrayValue(form.value.brands, value)
}

const toggleSpecialization = (value: string) => {
  form.value.specializations = toggleArrayValue(form.value.specializations, value)
}

const saveProfile = async () => {
  isSaving.value = true
  saveMessage.value = ''

  try {
    await new Promise((resolve) => setTimeout(resolve, 700))
    saveMessage.value = 'Профиль магазина сохранен'
  } catch {
    saveMessage.value = 'Ошибка при сохранении'
  } finally {
    isSaving.value = false
  }
}

const publicStoreUrl = computed(() => `/seller/${form.value.slug}`)
</script>

<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-950">
    <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <section
        class="rounded-[28px] bg-neutral-950 p-5 text-white shadow-xl sm:rounded-[32px] sm:p-7 lg:p-8"
      >
        <div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p
              class="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/70 sm:text-xs"
            >
              Профиль магазина
            </p>
            <h1
              class="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            >
              Настрой публичную страницу и контакты магазина
            </h1>
            <p class="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
              Здесь редактируются данные магазина, которые видят покупатели: описание, контакты,
              бренды, специализация и внешний вид страницы продавца.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              class="flex h-12 items-center justify-center rounded-2xl bg-white text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
              :disabled="isSaving"
              @click="saveProfile"
            >
              {{ isSaving ? 'Сохранение...' : 'Сохранить' }}
            </button>

            <NuxtLink
              :to="publicStoreUrl"
              class="flex h-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-sm font-medium text-white transition hover:bg-white/15"
            >
              Открыть магазин
            </NuxtLink>
          </div>
        </div>
      </section>

      <section class="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-6">
        <div class="space-y-4">
          <section
            class="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm"
          >
            <div class="relative h-48 bg-neutral-200 sm:h-56 lg:h-72">
              <img :src="form.cover" alt="Обложка магазина" class="h-full w-full object-cover" />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
              />
            </div>

            <div class="relative px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
              <div
                class="-mt-14 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between"
              >
                <div class="flex min-w-0 items-end gap-4">
                  <div
                    class="h-24 w-24 overflow-hidden rounded-[24px] border-4 border-white bg-white shadow-lg sm:h-28 sm:w-28"
                  >
                    <img
                      :src="form.logo"
                      alt="Логотип магазина"
                      class="h-full w-full object-cover"
                    />
                  </div>

                  <div class="min-w-0 pb-1">
                    <div class="flex flex-wrap items-center gap-2">
                      <h2
                        class="text-2xl font-semibold tracking-tight text-white sm:text-3xl text-shadow-black"
                      >
                        {{ form.name || 'Название магазина' }}
                      </h2>
                      <span
                        v-if="form.isVerified"
                        class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                      >
                        Проверен
                      </span>
                    </div>
                    <p class="mt-2 text-sm text-neutral-500 sm:text-base">
                      {{ form.city || 'Город не указан' }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-medium text-neutral-700"
                    >Ссылка на логотип</label
                  >
                  <input
                    v-model="form.logo"
                    type="text"
                    class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  />
                </div>

                <div>
                  <label class="mb-2 block text-sm font-medium text-neutral-700"
                    >Ссылка на обложку</label
                  >
                  <input
                    v-model="form.cover"
                    type="text"
                    class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  />
                </div>
              </div>
            </div>
          </section>

          <section class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
            <p class="text-sm font-medium text-neutral-500">Основная информация</p>
            <h2 class="mt-1 text-2xl font-semibold tracking-tight">Данные магазина</h2>

            <div class="mt-5 grid gap-4">
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-medium text-neutral-700"
                    >Название магазина</label
                  >
                  <input
                    v-model="form.name"
                    type="text"
                    class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  />
                </div>

                <div>
                  <label class="mb-2 block text-sm font-medium text-neutral-700">Slug</label>
                  <input
                    v-model="form.slug"
                    type="text"
                    class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  />
                </div>
              </div>

              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-medium text-neutral-700">Город</label>
                  <input
                    v-model="form.city"
                    type="text"
                    class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  />
                </div>

                <div>
                  <label class="mb-2 block text-sm font-medium text-neutral-700">Часы работы</label>
                  <input
                    v-model="form.workingHours"
                    type="text"
                    class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  />
                </div>
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-neutral-700">Адрес</label>
                <input
                  v-model="form.address"
                  type="text"
                  class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-neutral-700">Описание</label>
                <textarea
                  v-model="form.description"
                  rows="5"
                  class="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-950"
                />
              </div>
            </div>
          </section>

          <section class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
            <p class="text-sm font-medium text-neutral-500">Контакты</p>
            <h2 class="mt-1 text-2xl font-semibold tracking-tight">Способы связи</h2>

            <div class="mt-5 grid gap-4">
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-medium text-neutral-700">Телефон</label>
                  <input
                    v-model="form.phone"
                    type="text"
                    class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  />
                </div>

                <div>
                  <label class="mb-2 block text-sm font-medium text-neutral-700">WhatsApp</label>
                  <input
                    v-model="form.whatsapp"
                    type="text"
                    class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  />
                </div>
              </div>

              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-medium text-neutral-700">Telegram</label>
                  <input
                    v-model="form.telegram"
                    type="text"
                    class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  />
                </div>

                <div>
                  <label class="mb-2 block text-sm font-medium text-neutral-700">Email</label>
                  <input
                    v-model="form.email"
                    type="email"
                    class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  />
                </div>
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-neutral-700">Сайт</label>
                <input
                  v-model="form.website"
                  type="text"
                  class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                />
              </div>
            </div>
          </section>

          <section class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
            <p class="text-sm font-medium text-neutral-500">Позиционирование</p>
            <h2 class="mt-1 text-2xl font-semibold tracking-tight">Бренды и специализация</h2>

            <div class="mt-5">
              <p class="text-sm font-medium text-neutral-700">С какими марками работает магазин</p>
              <div class="mt-3 flex flex-wrap gap-2">
                <button
                  v-for="brand in brandOptions"
                  :key="brand"
                  type="button"
                  class="rounded-full px-4 py-2 text-sm font-medium transition"
                  :class="
                    form.brands.includes(brand)
                      ? 'bg-neutral-950 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  "
                  @click="toggleBrand(brand)"
                >
                  {{ brand }}
                </button>
              </div>
            </div>

            <div class="mt-6">
              <p class="text-sm font-medium text-neutral-700">Основные специализации</p>
              <div class="mt-3 flex flex-wrap gap-2">
                <button
                  v-for="item in specializationOptions"
                  :key="item"
                  type="button"
                  class="rounded-full px-4 py-2 text-sm font-medium transition"
                  :class="
                    form.specializations.includes(item)
                      ? 'bg-neutral-950 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  "
                  @click="toggleSpecialization(item)"
                >
                  {{ item }}
                </button>
              </div>
            </div>
          </section>
        </div>

        <aside class="space-y-4" :class="showMobileSidebar ? 'block' : 'hidden lg:block'">
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
                :disabled="isSaving"
                @click="saveProfile"
              >
                {{ isSaving ? 'Сохранение...' : 'Сохранить профиль' }}
              </button>

              <NuxtLink
                :to="publicStoreUrl"
                class="flex h-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
              >
                Открыть публичную страницу
              </NuxtLink>
            </div>

            <p v-if="saveMessage" class="mt-4 text-sm font-medium text-emerald-600">
              {{ saveMessage }}
            </p>
          </div>

          <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
            <p class="text-sm font-medium text-neutral-500">Предпросмотр</p>

            <div class="mt-4 rounded-[24px] overflow-hidden border border-neutral-200 bg-white">
              <div class="h-28 bg-neutral-200">
                <img :src="form.cover" alt="Cover preview" class="h-full w-full object-cover" />
              </div>

              <div class="px-4 pb-4">
                <div class="-mt-8 flex items-end gap-3">
                  <div
                    class="h-16 w-16 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-sm"
                  >
                    <img :src="form.logo" alt="Logo preview" class="h-full w-full object-cover" />
                  </div>

                  <div class="pb-1 min-w-0">
                    <p class="truncate text-base font-semibold tracking-tight text-neutral-950">
                      {{ form.name || 'Название магазина' }}
                    </p>
                    <p class="truncate text-sm text-neutral-500">
                      {{ form.city || 'Город' }}
                    </p>
                  </div>
                </div>

                <p class="mt-3 line-clamp-3 text-sm leading-6 text-neutral-500">
                  {{ form.description || 'Описание магазина появится здесь.' }}
                </p>

                <div class="mt-3 flex flex-wrap gap-2">
                  <span
                    v-for="item in form.specializations.slice(0, 3)"
                    :key="item"
                    class="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600"
                  >
                    {{ item }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section class="mt-4 lg:hidden">
        <button
          type="button"
          class="flex h-12 w-full items-center justify-center rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-100"
          @click="showMobileSidebar = !showMobileSidebar"
        >
          {{ showMobileSidebar ? 'Скрыть боковую панель' : 'Показать боковую панель' }}
        </button>
      </section>
    </div>
  </div>
</template>
