<script setup lang="ts">
useSeoMeta({
  title: 'Добавление товара',
  description: 'Создание нового товара в кабинете продавца.',
})

type ProductStatus = 'active' | 'draft' | 'out'

type ProductImage = {
  id: number
  url: string
}

type ProductSpec = {
  id: number
  label: string
  value: string
}

type ProductForm = {
  name: string
  article: string
  category: string
  brand: string
  model: string
  generation: string
  engine: string
  manufacturer: string
  price: number | null
  stock: number | null
  status: ProductStatus
  city: string
  description: string
  images: ProductImage[]
  specs: ProductSpec[]
}

const categoryOptions = [
  'Тормозная система',
  'Фильтры',
  'Подвеска',
  'Двигатель',
  'Электрика',
  'Кузов',
  'Трансмиссия',
]

const statusOptions: Array<{ label: string; value: ProductStatus }> = [
  { label: 'Активен', value: 'active' },
  { label: 'Черновик', value: 'draft' },
  { label: 'Нет в наличии', value: 'out' },
]

const placeholderImages: ProductImage[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=80',
  },
]

const createDefaultForm = (): ProductForm => ({
  name: '',
  article: '',
  category: 'Тормозная система',
  brand: '',
  model: '',
  generation: '',
  engine: '',
  manufacturer: '',
  price: null,
  stock: null,
  status: 'draft',
  city: 'Караганда',
  description: '',
  images: [...placeholderImages],
  specs: [
    { id: 1, label: 'Категория', value: '' },
    { id: 2, label: 'Бренд авто', value: '' },
    { id: 3, label: 'Модель', value: '' },
  ],
})

const form = ref<ProductForm>(createDefaultForm())
const activeImageIndex = ref(0)
const isSaving = ref(false)
const saveMessage = ref('')
const showMobileSidebar = ref(false)

const activeImage = computed(() => {
  return form.value.images[activeImageIndex.value]?.url ?? ''
})

const formatPrice = (value: number | null) => {
  if (!value) {
    return '0 ₸'
  }

  return `${value.toLocaleString('ru-RU')} ₸`
}

const statusMap: Record<ProductStatus, string> = {
  active: 'Активен',
  draft: 'Черновик',
  out: 'Нет в наличии',
}

const statusClassMap: Record<ProductStatus, string> = {
  active: 'bg-emerald-50 text-emerald-700',
  draft: 'bg-amber-50 text-amber-700',
  out: 'bg-neutral-200 text-neutral-600',
}

const showPrevImage = () => {
  if (!form.value.images.length) return

  activeImageIndex.value =
    activeImageIndex.value === 0 ? form.value.images.length - 1 : activeImageIndex.value - 1
}

const showNextImage = () => {
  if (!form.value.images.length) return

  activeImageIndex.value =
    activeImageIndex.value === form.value.images.length - 1 ? 0 : activeImageIndex.value + 1
}

const addSpec = () => {
  form.value.specs.push({
    id: Date.now(),
    label: '',
    value: '',
  })
}

const removeSpec = (id: number) => {
  form.value.specs = form.value.specs.filter((spec) => spec.id !== id)
}

const addImage = () => {
  form.value.images.push({
    id: Date.now(),
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
  })
}

const removeImage = (id: number) => {
  form.value.images = form.value.images.filter((image) => image.id !== id)

  if (activeImageIndex.value >= form.value.images.length) {
    activeImageIndex.value = Math.max(0, form.value.images.length - 1)
  }
}

const resetForm = () => {
  form.value = createDefaultForm()
  activeImageIndex.value = 0
  saveMessage.value = ''
}

const saveProduct = async () => {
  isSaving.value = true
  saveMessage.value = ''

  try {
    await new Promise((resolve) => setTimeout(resolve, 700))
    saveMessage.value = 'Новый товар успешно создан'
  } catch {
    saveMessage.value = 'Ошибка при создании товара'
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-950">
    <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <!-- <section
        class="rounded-[28px] bg-neutral-950 p-5 text-white shadow-xl sm:rounded-[32px] sm:p-7 lg:p-8"
      >
        <div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p
              class="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/70 sm:text-xs"
            >
              Создание товара
            </p>
            <h1
              class="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            >
              Добавь новый товар в каталог
            </h1>
            <p class="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
              Заполни основные данные, добавь описание, характеристики и изображения. После
              сохранения товар появится в кабинете.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              class="flex h-12 items-center justify-center rounded-2xl bg-white text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
              :disabled="isSaving"
              @click="saveProduct"
            >
              {{ isSaving ? 'Сохранение...' : 'Создать товар' }}
            </button>

            <button
              type="button"
              class="flex h-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-sm font-medium text-white transition hover:bg-white/15"
              @click="resetForm"
            >
              Очистить
            </button>
          </div>
        </div>
      </section> -->

      <!-- <section class="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-6"> -->
      <section class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-6">
        <div class="space-y-4">
          <section
            class="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm"
          >
            <div class="">
              <div class="p-4 sm:p-6">
                <div class="overflow-hidden rounded-[24px] border border-neutral-200 bg-white">
                  <div class="relative aspect-[4/3] bg-neutral-100">
                    <img
                      :src="activeImage"
                      alt="Изображение товара"
                      class="h-full w-full object-cover"
                    />

                    <div
                      v-if="form.images.length > 1"
                      class="pointer-events-none absolute inset-x-0 top-3 flex justify-center"
                    >
                      <div
                        class="rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                      >
                        {{ activeImageIndex + 1 }} / {{ form.images.length }}
                      </div>
                    </div>

                    <template v-if="form.images.length > 1">
                      <button
                        type="button"
                        class="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-sm backdrop-blur transition hover:bg-white"
                        @click="showPrevImage"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.8"
                          class="h-5 w-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 18l-6-6 6-6"
                          />
                        </svg>
                      </button>

                      <button
                        type="button"
                        class="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-sm backdrop-blur transition hover:bg-white"
                        @click="showNextImage"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.8"
                          class="h-5 w-5"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 6l6 6-6 6" />
                        </svg>
                      </button>
                    </template>
                  </div>
                </div>

                <div
                  v-if="form.images.length > 0"
                  class="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5"
                >
                  <div v-for="(image, index) in form.images" :key="image.id" class="relative">
                    <button
                      type="button"
                      class="w-full overflow-hidden rounded-[18px] border bg-neutral-100 transition"
                      :class="
                        activeImageIndex === index
                          ? 'border-neutral-950 ring-2 ring-neutral-950/10'
                          : 'border-neutral-200 hover:border-neutral-300'
                      "
                      @click="activeImageIndex = index"
                    >
                      <img
                        :src="image.url"
                        :alt="`Изображение ${index + 1}`"
                        class="aspect-[4/3] h-full w-full object-cover"
                      />
                    </button>

                    <button
                      type="button"
                      class="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs text-white transition hover:bg-black/80"
                      @click="removeImage(image.id)"
                    >
                      ×
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  class="mt-4 flex h-12 w-full items-center justify-center rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
                  @click="addImage"
                >
                  Добавить изображение
                </button>
              </div>

              <div class="border-t border-neutral-200 p-4 sm:p-6 lg:border-l lg:border-t-0">
                <div class="grid gap-4">
                  <div>
                    <label class="mb-2 block text-sm font-medium text-neutral-700">
                      Название товара
                    </label>
                    <input
                      v-model="form.name"
                      type="text"
                      placeholder="Например: Тормозные колодки передние"
                      class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                    />
                  </div>

                  <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label class="mb-2 block text-sm font-medium text-neutral-700">Артикул</label>
                      <input
                        v-model="form.article"
                        type="text"
                        placeholder="Например: AKE-04465"
                        class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                      />
                    </div>

                    <div>
                      <label class="mb-2 block text-sm font-medium text-neutral-700"
                        >Производитель</label
                      >
                      <input
                        v-model="form.manufacturer"
                        type="text"
                        placeholder="Например: Akebono"
                        class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                      />
                    </div>
                  </div>

                  <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label class="mb-2 block text-sm font-medium text-neutral-700"
                        >Категория</label
                      >
                      <select
                        v-model="form.category"
                        class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                      >
                        <option
                          v-for="category in categoryOptions"
                          :key="category"
                          :value="category"
                        >
                          {{ category }}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label class="mb-2 block text-sm font-medium text-neutral-700">Статус</label>
                      <select
                        v-model="form.status"
                        class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                      >
                        <option
                          v-for="status in statusOptions"
                          :key="status.value"
                          :value="status.value"
                        >
                          {{ status.label }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label class="mb-2 block text-sm font-medium text-neutral-700">Цена</label>
                      <input
                        v-model.number="form.price"
                        type="number"
                        min="0"
                        placeholder="0"
                        class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                      />
                    </div>

                    <div>
                      <label class="mb-2 block text-sm font-medium text-neutral-700">Остаток</label>
                      <input
                        v-model.number="form.stock"
                        type="number"
                        min="0"
                        placeholder="0"
                        class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                      />
                    </div>
                  </div>

                  <div class="rounded-[24px] bg-neutral-950 p-5 text-white">
                    <p class="text-[11px] uppercase tracking-[0.18em] text-white/50">Цена товара</p>
                    <p class="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                      {{ formatPrice(form.price) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
            <p class="text-sm font-medium text-neutral-500">Совместимость и описание</p>
            <h2 class="mt-1 text-2xl font-semibold tracking-tight">Основные данные</h2>

            <div class="mt-5 grid gap-4">
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-medium text-neutral-700">Бренд авто</label>
                  <input
                    v-model="form.brand"
                    type="text"
                    placeholder="Например: Toyota"
                    class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  />
                </div>

                <div>
                  <label class="mb-2 block text-sm font-medium text-neutral-700">Модель</label>
                  <input
                    v-model="form.model"
                    type="text"
                    placeholder="Например: Camry 55"
                    class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  />
                </div>
              </div>

              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-medium text-neutral-700">Поколение</label>
                  <input
                    v-model="form.generation"
                    type="text"
                    placeholder="Например: 2014–2017"
                    class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  />
                </div>

                <div>
                  <label class="mb-2 block text-sm font-medium text-neutral-700">Двигатель</label>
                  <input
                    v-model="form.engine"
                    type="text"
                    placeholder="Например: 2.5"
                    class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  />
                </div>
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-neutral-700">Описание</label>
                <textarea
                  v-model="form.description"
                  rows="5"
                  placeholder="Опиши товар, совместимость, преимущества и полезную информацию для покупателя"
                  class="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-950"
                />
              </div>
            </div>
          </section>

          <section class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-sm font-medium text-neutral-500">Характеристики</p>
                <h2 class="mt-1 text-2xl font-semibold tracking-tight">Дополнительные параметры</h2>
              </div>

              <button
                type="button"
                class="rounded-2xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
                @click="addSpec"
              >
                Добавить поле
              </button>
            </div>

            <div class="mt-5 grid gap-3">
              <div v-for="spec in form.specs" :key="spec.id" class="rounded-2xl bg-neutral-50 p-4">
                <div class="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                  <input
                    v-model="spec.label"
                    type="text"
                    placeholder="Название поля"
                    class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  />
                  <input
                    v-model="spec.value"
                    type="text"
                    placeholder="Значение"
                    class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  />
                  <button
                    type="button"
                    class="flex h-12 items-center justify-center rounded-2xl border border-neutral-200 px-4 text-sm font-medium text-neutral-700 transition hover:bg-white"
                    @click="removeSpec(spec.id)"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside class="relative space-y-4" :class="showMobileSidebar ? 'block' : 'hidden lg:block'">
          <div
            class="sticky top-20 rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm"
          >
            <p class="text-sm font-medium text-neutral-500">Сводка</p>

            <div class="mt-4 space-y-3">
              <div class="rounded-2xl bg-neutral-50 px-4 py-4">
                <p class="text-xs uppercase tracking-[0.18em] text-neutral-400">Статус</p>
                <p class="mt-2">
                  <span
                    class="rounded-full px-3 py-1 text-xs font-semibold"
                    :class="statusClassMap[form.status]"
                  >
                    {{ statusMap[form.status] }}
                  </span>
                </p>
              </div>

              <div class="rounded-2xl bg-neutral-50 px-4 py-4">
                <p class="text-xs uppercase tracking-[0.18em] text-neutral-400">Остаток</p>
                <p class="mt-2 text-lg font-semibold text-neutral-950">{{ form.stock ?? 0 }} шт.</p>
              </div>

              <div class="rounded-2xl bg-neutral-50 px-4 py-4">
                <p class="text-xs uppercase tracking-[0.18em] text-neutral-400">Город</p>
                <input
                  v-model="form.city"
                  type="text"
                  class="mt-2 h-11 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                />
              </div>

              <div class="rounded-2xl bg-neutral-50 px-4 py-4">
                <p class="text-xs uppercase tracking-[0.18em] text-neutral-400">Изображений</p>
                <p class="mt-2 text-lg font-semibold text-neutral-950">
                  {{ form.images.length }}
                </p>
              </div>
            </div>

            <div class="mt-5 grid gap-3">
              <button
                type="button"
                class="flex h-12 items-center justify-center rounded-2xl bg-neutral-950 text-sm font-medium text-white transition hover:opacity-90"
                :disabled="isSaving"
                @click="saveProduct"
              >
                {{ isSaving ? 'Сохранение...' : 'Создать товар' }}
              </button>

              <button
                type="button"
                class="flex h-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
                @click="resetForm"
              >
                Очистить форму
              </button>
            </div>

            <p v-if="saveMessage" class="mt-4 text-sm font-medium text-emerald-600">
              {{ saveMessage }}
            </p>
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
