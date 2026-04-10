<template>
  <input
    v-model="modelValue"
    :type="type"
    :class="[
      props.class,
      'h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950',
      error ? 'border-rose-500' : '',
    ]"
    :inputmode="inputMode"
    :placeholder="placeholder"
    :required="required"
  />
</template>

<script lang="ts" setup>
const modelValue = defineModel()

const props = withDefaults(
  defineProps<{
    type?: 'text' | 'password' | 'email'
    inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'
    class?: string
    error?: boolean
    placeholder?: string
    required?: boolean
  }>(),
  {
    type: 'text',
    inputMode: 'text',
  },
)
</script>
