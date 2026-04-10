<template>
  <div class="w-full">
    <div
      class="group relative flex h-40 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 transition hover:border-neutral-400"
      @click="openFile"
      @dragover.prevent
      @drop.prevent="handleDrop"
    >
      <img v-if="preview" :src="preview" class="absolute inset-0 h-full w-full object-cover" />

      <div
        v-if="preview"
        class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100"
      >
        <span class="text-sm text-white">Изменить</span>
      </div>

      <div v-if="!preview" class="flex flex-col items-center justify-center text-neutral-400">
        <span class="text-sm">Загрузить фото</span>
        <span class="mt-1 text-xs">PNG, JPG, WEBP до 5MB</span>
      </div>

      <input ref="inputRef" type="file" accept="image/*" class="hidden" @change="handleFile" />
    </div>

    <div v-if="preview" class="mt-2 flex justify-between">
      <button
        type="button"
        class="text-xs text-neutral-500 transition hover:text-neutral-900"
        @click="removeImage"
      >
        Удалить
      </button>

      <span v-if="isLocalFile" class="text-xs text-neutral-400"> Файл выбран </span>
    </div>

    <p v-if="error" class="mt-2 text-xs text-rose-500">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
type ImageValue = File | string | null

const modelValue = defineModel<ImageValue>({
  default: null,
})

const inputRef = ref<HTMLInputElement | null>(null)
const preview = ref<string | null>(null)
const error = ref<string | null>(null)
const objectUrl = ref<string | null>(null)

const isLocalFile = computed(() => modelValue.value instanceof File)

const revokeObjectUrl = () => {
  if (objectUrl.value) {
    URL.revokeObjectURL(objectUrl.value)
    objectUrl.value = null
  }
}

const syncPreview = (value: ImageValue) => {
  revokeObjectUrl()

  if (!value) {
    preview.value = null
    return
  }

  if (typeof value === 'string') {
    preview.value = value
    return
  }

  if (value instanceof File) {
    const localUrl = URL.createObjectURL(value)
    objectUrl.value = localUrl
    preview.value = localUrl
  }
}

watch(
  () => modelValue.value,
  (value) => {
    syncPreview(value)
  },
  { immediate: true },
)

const openFile = () => {
  inputRef.value?.click()
}

const validateFile = (file: File) => {
  if (!file.type.startsWith('image/')) {
    return 'Только изображения'
  }

  if (file.size > 5 * 1024 * 1024) {
    return 'Максимум 5MB'
  }

  return null
}

const setFile = (file: File) => {
  error.value = null

  const validationError = validateFile(file)
  if (validationError) {
    error.value = validationError
    return
  }

  modelValue.value = file
}

const handleFile = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  setFile(file)

  if (inputRef.value) {
    inputRef.value.value = ''
  }
}

const handleDrop = (event: DragEvent) => {
  const file = event.dataTransfer?.files?.[0]
  if (!file) return

  setFile(file)
}

const removeImage = () => {
  error.value = null
  revokeObjectUrl()
  preview.value = null
  modelValue.value = null

  if (inputRef.value) {
    inputRef.value.value = ''
  }
}

onBeforeUnmount(() => {
  revokeObjectUrl()
})
</script>
