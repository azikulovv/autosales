<script setup lang="ts">
const props = defineProps<{
  images: string[]
  productName: string
}>()

const activeImageIndex = ref(0)

const activeImage = computed(() => props.images[activeImageIndex.value] ?? '')

watch(
  () => props.images,
  () => {
    activeImageIndex.value = 0
  },
)

const showPrevImage = () => {
  if (!props.images.length) {
    return
  }

  activeImageIndex.value =
    activeImageIndex.value === 0 ? props.images.length - 1 : activeImageIndex.value - 1
}

const showNextImage = () => {
  if (!props.images.length) {
    return
  }

  activeImageIndex.value =
    activeImageIndex.value === props.images.length - 1 ? 0 : activeImageIndex.value + 1
}
</script>

<template>
  <div>
    <div class="overflow-hidden rounded-3xl border border-neutral-200 bg-white">
      <div class="relative aspect-4/3 bg-neutral-100">
        <img :src="activeImage" :alt="productName" class="h-full w-full object-cover" />

        <div
          v-if="images.length > 1"
          class="pointer-events-none absolute inset-x-0 top-3 flex justify-center"
        >
          <div
            class="rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
          >
            {{ activeImageIndex + 1 }} / {{ images.length }}
          </div>
        </div>

        <template v-if="images.length > 1">
          <button
            type="button"
            class="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-sm backdrop-blur transition hover:bg-white"
            aria-label="Предыдущее фото"
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
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            class="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-sm backdrop-blur transition hover:bg-white"
            aria-label="Следующее фото"
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

    <div v-if="images.length > 1" class="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
      <button
        v-for="(image, index) in images"
        :key="`${image}-${index}`"
        type="button"
        class="overflow-hidden rounded-[18px] border bg-neutral-100 transition"
        :class="
          activeImageIndex === index
            ? 'border-neutral-950 ring-2 ring-neutral-950/10'
            : 'border-neutral-200 hover:border-neutral-300'
        "
        @click="activeImageIndex = index"
      >
        <img
          :src="image"
          :alt="`${productName} ${index + 1}`"
          class="aspect-4/3 h-full w-full object-cover"
        />
      </button>
    </div>
  </div>
</template>
