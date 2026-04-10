<template>
  <div :class="class">
    <label v-if="label" class="mb-2 block text-sm font-medium text-neutral-700">
      {{ label }}
      <span v-if="required" class="text-rose-600">*</span>
    </label>

    <PhoneInput
      v-if="type === 'phone'"
      v-model="modelValue"
      :placeholder="placeholder"
      :error="!!error"
      :required="required"
    />

    <BaseTextarea
      v-else-if="type === 'textarea'"
      :type="type"
      v-model="modelValue"
      :input-mode="inputMode"
      :placeholder="placeholder"
      :error="!!error"
      :required="required"
    />

    <BaseInput
      v-else
      v-model="modelValue"
      :type="type"
      :input-mode="inputMode"
      :placeholder="placeholder"
      :error="!!error"
      :required="required"
    />

    <p v-if="error" class="text-sm text-rose-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '~/components/ui/BaseInput.vue'
import BaseTextarea from '~/components/ui/BaseTextarea.vue'
import PhoneInput from '~/components/ui/PhoneInput.vue'

const modelValue = defineModel<string>()

defineProps<{
  label?: string
  error?: string
  type?: 'text' | 'password' | 'email' | 'phone' | 'textarea'
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'
  autocomplete?: boolean
  required?: boolean
  class?: string
  placeholder?: string
}>()
</script>
