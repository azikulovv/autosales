<template>
  <textarea
    v-model="modelValue"
    :rows="rows"
    :required="required"
    :class="[
      props.class,
      'w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-950',
      error ? 'border-rose-500' : '',
    ]"
  />
</template>

<script lang="ts" setup>
const modelValue = defineModel<string>()

const props = withDefaults(
  defineProps<{
    rows?: number | string
    class?: string
    error?: boolean
    placeholder?: string
    required?: boolean
  }>(),
  {
    rows: 5,
  },
)
</script>
