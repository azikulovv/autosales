<template>
  <div ref="rootRef" class="relative w-full">
    <div
      :class="[
        'min-h-12 w-full rounded-2xl border bg-white px-3 py-2 transition',
        isOpen ? 'border-neutral-950' : 'border-neutral-200',
        error ? 'border-rose-500' : '',
      ]"
      @click="focusInput"
    >
      <div class="flex flex-wrap items-center gap-2">
        <template v-if="multiple">
          <span
            v-for="(item, index) in selectedItems"
            :key="getItemKey(item, index)"
            class="inline-flex h-8 items-center gap-2 rounded-xl bg-neutral-100 px-3 text-sm text-neutral-700"
          >
            <span class="max-w-40 truncate">
              {{ getItemLabel(item) }}
            </span>

            <button
              type="button"
              class="text-neutral-400 transition hover:text-neutral-700"
              @click.stop="removeSelectedItem(item)"
            >
              ✕
            </button>
          </span>
        </template>

        <input
          ref="inputRef"
          v-model="search"
          type="text"
          :placeholder="inputPlaceholder"
          :disabled="disabled"
          autocomplete="off"
          class="h-8 min-w-24 flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed"
          @focus="openDropdown"
          @input="handleInput"
          @keydown.down.prevent="highlightNext"
          @keydown.up.prevent="highlightPrev"
          @keydown.enter.prevent="selectHighlighted"
          @keydown.esc="closeDropdown"
          @keydown.backspace="handleBackspace"
        />
      </div>
    </div>

    <div
      v-if="isOpen"
      ref="dropdownRef"
      :class="[
        'absolute left-0 z-50 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.08)]',
        dropdownDirection === 'top' ? 'bottom-[calc(100%+8px)]' : 'top-[calc(100%+8px)]',
      ]"
      :style="dropdownStyle"
    >
      <ul v-if="filteredItems.length" class="max-h-72 overflow-y-auto py-2">
        <li v-for="(item, index) in filteredItems" :key="getItemKey(item, index)">
          <button
            type="button"
            :class="[
              'flex w-full items-center justify-between px-4 py-3 text-left text-sm transition',
              highlightedIndex === index
                ? 'bg-black/60 text-white'
                : 'text-neutral-700 hover:bg-neutral-50',
            ]"
            @mouseenter="highlightedIndex = index"
            @click="selectItem(item)"
          >
            <div class="flex min-w-0 items-center gap-3">
              <span
                v-if="multiple"
                :class="[
                  'flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px]',
                  isSelected(item)
                    ? highlightedIndex === index
                      ? 'border-white bg-white text-neutral-950'
                      : 'border-neutral-950 bg-neutral-950 text-white'
                    : highlightedIndex === index
                      ? 'border-white/60'
                      : 'border-neutral-300',
                ]"
              >
                <span v-if="isSelected(item)">✓</span>
              </span>

              <span class="truncate">
                {{ getItemLabel(item) }}
              </span>
            </div>

            <span
              v-if="showSearchValue && normalizedQuery"
              :class="[
                'ml-3 shrink-0 text-xs',
                highlightedIndex === index ? 'text-white/70' : 'text-neutral-400',
              ]"
            >
              {{ normalizedQuery }}
            </span>
          </button>
        </li>
      </ul>

      <div v-else class="px-4 py-4 text-sm text-neutral-500">Ничего не найдено</div>
    </div>

    <p v-if="hint && !errorMessage" class="mt-2 text-xs text-neutral-400">
      {{ hint }}
    </p>

    <p v-if="errorMessage" class="mt-2 text-xs text-rose-500">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts" generic="T extends string | Record<string, any>">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

type PrimitiveItem = string
type ObjectItem = Record<string, any>
type Item = PrimitiveItem | ObjectItem
type DropdownDirection = 'top' | 'bottom'

const props = withDefaults(
  defineProps<{
    items: T[]
    multiple?: boolean
    placeholder?: string
    displayKey?: string
    valueKey?: string
    searchKeys?: string[]
    hint?: string
    error?: boolean
    errorMessage?: string
    disabled?: boolean
    clearable?: boolean
    minQueryLength?: number
    showSearchValue?: boolean
    closeOnSelect?: boolean
  }>(),
  {
    multiple: false,
    placeholder: 'Начните вводить...',
    displayKey: 'label',
    valueKey: 'value',
    searchKeys: () => [],
    hint: '',
    error: false,
    errorMessage: '',
    disabled: false,
    clearable: true,
    minQueryLength: 0,
    showSearchValue: false,
    closeOnSelect: false,
  },
)

const modelValue = defineModel<T | T[] | null>({
  default: null,
})

const rootRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)

const isOpen = ref(false)
const highlightedIndex = ref(-1)
const search = ref('')

const dropdownDirection = ref<DropdownDirection>('bottom')
const dropdownMaxHeight = ref(288)

const normalizedQuery = computed(() => search.value.trim().toLowerCase())

const dropdownStyle = computed(() => ({
  maxHeight: `${dropdownMaxHeight.value}px`,
}))

const getDropdownPosition = async () => {
  await nextTick()

  if (!rootRef.value) return

  const rootRect = rootRef.value.getBoundingClientRect()
  const viewportHeight = window.innerHeight
  const offset = 8
  const minHeight = 160
  const preferredHeight = 288

  const spaceBelow = viewportHeight - rootRect.bottom - offset
  const spaceAbove = rootRect.top - offset

  const shouldOpenTop = spaceBelow < minHeight && spaceAbove > spaceBelow

  dropdownDirection.value = shouldOpenTop ? 'top' : 'bottom'

  const availableHeight = shouldOpenTop ? spaceAbove : spaceBelow
  dropdownMaxHeight.value = Math.max(Math.min(availableHeight, preferredHeight), 120)
}

const getItemLabel = (item: Item) => {
  if (typeof item === 'string') return item

  const value = item[props.displayKey]
  return typeof value === 'string' || typeof value === 'number' ? String(value) : ''
}

const getItemValue = (item: Item | null | undefined) => {
  if (!item) return null
  if (typeof item === 'string') return item

  if (props.valueKey in item) return item[props.valueKey]
  return getItemLabel(item)
}

const getSearchText = (item: Item) => {
  if (typeof item === 'string') return item.toLowerCase()

  const parts = [getItemLabel(item)]

  for (const key of props.searchKeys) {
    const value = item[key]
    if (value !== undefined && value !== null) {
      parts.push(String(value))
    }
  }

  return parts.join(' ').toLowerCase()
}

const getItemKey = (item: Item, index: number) => {
  const value = getItemValue(item)
  return `${String(value)}-${index}`
}

const selectedItems = computed<T[]>(() => {
  if (!props.multiple) return []
  return Array.isArray(modelValue.value) ? modelValue.value : []
})

const inputPlaceholder = computed(() => {
  if (props.multiple && selectedItems.value.length > 0) {
    return ''
  }

  if (!props.multiple && modelValue.value && !search.value) {
    return ''
  }

  return props.placeholder
})

const filteredItems = computed(() => {
  let result = props.items

  if (normalizedQuery.value.length >= props.minQueryLength) {
    result = result.filter((item) => getSearchText(item).includes(normalizedQuery.value))
  }

  return result
})

const syncInputFromModel = () => {
  if (props.multiple) {
    search.value = ''
    return
  }

  if (!modelValue.value || Array.isArray(modelValue.value)) {
    search.value = ''
    return
  }

  search.value = getItemLabel(modelValue.value as Item)
}

const isSelected = (item: T) => {
  if (props.multiple) {
    return selectedItems.value.some(
      (selected) => getItemValue(selected as Item) === getItemValue(item as Item),
    )
  }

  if (!modelValue.value || Array.isArray(modelValue.value)) return false

  return getItemValue(modelValue.value as Item) === getItemValue(item as Item)
}

const focusInput = async () => {
  if (props.disabled) return
  await nextTick()
  inputRef.value?.focus()
}

const openDropdown = async () => {
  if (props.disabled) return

  isOpen.value = true
  await nextTick()
  highlightedIndex.value = filteredItems.value.length ? 0 : -1
  await getDropdownPosition()
}

const closeDropdown = () => {
  isOpen.value = false
  highlightedIndex.value = -1

  if (!props.multiple) {
    syncInputFromModel()
  }
}

const handleInput = async () => {
  isOpen.value = true
  highlightedIndex.value = filteredItems.value.length ? 0 : -1

  if (!props.multiple && !search.value) {
    modelValue.value = null
  }

  await getDropdownPosition()
}

const selectItem = async (item: T) => {
  if (props.multiple) {
    const exists = isSelected(item)

    if (exists) {
      modelValue.value = selectedItems.value.filter(
        (selected) => getItemValue(selected as Item) !== getItemValue(item as Item),
      ) as T[]
    } else {
      modelValue.value = [...selectedItems.value, item] as T[]
    }

    search.value = ''

    if (props.closeOnSelect) {
      closeDropdown()
    } else {
      await nextTick()
      await getDropdownPosition()
      inputRef.value?.focus()
    }

    return
  }

  modelValue.value = item
  search.value = getItemLabel(item as Item)
  closeDropdown()
}

const removeSelectedItem = (item: T) => {
  if (!props.multiple) return

  modelValue.value = selectedItems.value.filter(
    (selected) => getItemValue(selected as Item) !== getItemValue(item as Item),
  ) as T[]
}

const selectHighlighted = () => {
  if (!isOpen.value) {
    openDropdown()
    return
  }

  const item = filteredItems.value[highlightedIndex.value]
  if (!item) return

  selectItem(item)
}

const highlightNext = () => {
  if (!isOpen.value) {
    openDropdown()
    return
  }

  if (!filteredItems.value.length) return

  highlightedIndex.value =
    highlightedIndex.value >= filteredItems.value.length - 1 ? 0 : highlightedIndex.value + 1
}

const highlightPrev = () => {
  if (!isOpen.value) {
    openDropdown()
    return
  }

  if (!filteredItems.value.length) return

  highlightedIndex.value =
    highlightedIndex.value <= 0 ? filteredItems.value.length - 1 : highlightedIndex.value - 1
}

const handleBackspace = () => {
  if (!props.multiple) return
  if (search.value) return
  if (!selectedItems.value.length) return

  modelValue.value = selectedItems.value.slice(0, -1) as T[]
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node | null
  if (!rootRef.value || !target) return

  if (!rootRef.value.contains(target)) {
    closeDropdown()
  }
}

const handleViewportChange = async () => {
  if (!isOpen.value) return
  await getDropdownPosition()
}

watch(
  () => modelValue.value,
  () => {
    syncInputFromModel()
  },
  { immediate: true },
)

watch(
  () => props.items,
  async () => {
    if (highlightedIndex.value >= filteredItems.value.length) {
      highlightedIndex.value = filteredItems.value.length ? 0 : -1
    }

    await getDropdownPosition()
  },
)

watch(
  () => filteredItems.value.length,
  async () => {
    await getDropdownPosition()
  },
)

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', handleViewportChange)
  window.addEventListener('scroll', handleViewportChange, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleViewportChange)
  window.removeEventListener('scroll', handleViewportChange, true)
})
</script>
