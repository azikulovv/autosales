<template>
  <InputMask
    :unstyled="true"
    v-model="modelValue"
    mask="+7 (999) 999-99-99"
    :placeholder="placeholder"
    :class="[
      'h-12 w-full rounded-2xl border px-4 outline-none transition text-sm',
      error
        ? 'border-rose-500 focus:border-rose-500'
        : 'border-neutral-200 focus:border-neutral-950',
      props.class,
    ]"
  />
</template>

<script setup lang="ts">
const modelValue = defineModel<string>({
  default: '',
})

const props = withDefaults(
  defineProps<{
    error?: boolean
    class?: string
    placeholder?: string
  }>(),
  {
    placeholder: '+7 (___) ___-__-__',
  },
)
</script>
