<template>
  <div
    class="pointer-events-none fixed inset-x-0 bottom-4 z-9999 flex justify-center px-4 sm:justify-end"
  >
    <div class="flex w-full max-w-sm flex-col gap-2">
      <TransitionGroup name="toast-list">
        <div v-for="toast in toasts" :key="toast.id" class="pointer-events-auto">
          <AppToastCard :toast="toast" @remove="remove(toast.id)" @action="handleAction(toast)" />
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
type ToastType = 'success' | 'error' | 'info' | 'loading'

type ToastAction = {
  label: string
  onClick?: () => void | Promise<void>
}

type ToastItem = {
  id: number
  type: ToastType
  title?: string
  message: string
  duration: number
  createdAt: number
  closable: boolean
  action?: ToastAction
  isLeaving?: boolean
  progress?: number
}

const { toasts, remove } = useToastify()

const handleAction = async (toast: ToastItem) => {
  try {
    await toast.action?.onClick?.()
  } finally {
    remove(toast.id)
  }
}
</script>

<script lang="ts">
export default {
  components: {
    AppToastCard: defineComponent({
      props: {
        toast: {
          type: Object as PropType<{
            id: number
            type: 'success' | 'error' | 'info' | 'loading'
            title?: string
            message: string
            duration: number
            createdAt: number
            closable: boolean
            action?: {
              label: string
              onClick?: () => void | Promise<void>
            }
            isLeaving?: boolean
            progress?: number
          }>,
          required: true,
        },
      },
      emits: ['remove', 'action'],
      setup(props, { emit }) {
        const progress = ref(100)
        const isPaused = ref(false)
        const startAt = ref(Date.now())
        const elapsedBeforePause = ref(0)
        const timer = ref<number | null>(null)
        const raf = ref<number | null>(null)

        const dragX = ref(0)
        const isDragging = ref(false)
        const startX = ref(0)

        const typeStyles = computed(() => {
          switch (props.toast.type) {
            case 'success':
              return {
                icon: '✓',
                tone: 'border-emerald-200/80 bg-white/95 text-neutral-900',
                bar: 'bg-emerald-500',
                iconWrap: 'bg-emerald-50 text-emerald-700',
              }
            case 'error':
              return {
                icon: '!',
                tone: 'border-rose-200/80 bg-white/95 text-neutral-900',
                bar: 'bg-rose-500',
                iconWrap: 'bg-rose-50 text-rose-700',
              }
            case 'loading':
              return {
                icon: '',
                tone: 'border-neutral-200 bg-white/95 text-neutral-900',
                bar: 'bg-neutral-900',
                iconWrap: 'bg-neutral-100 text-neutral-700',
              }
            default:
              return {
                icon: 'i',
                tone: 'border-neutral-200 bg-white/95 text-neutral-900',
                bar: 'bg-neutral-900',
                iconWrap: 'bg-neutral-100 text-neutral-700',
              }
          }
        })

        const clearAll = () => {
          if (timer.value) {
            window.clearTimeout(timer.value)
            timer.value = null
          }

          if (raf.value) {
            window.cancelAnimationFrame(raf.value)
            raf.value = null
          }
        }

        const tick = () => {
          if (props.toast.duration <= 0 || isPaused.value) return

          const elapsed = Date.now() - startAt.value + elapsedBeforePause.value
          const nextProgress = Math.max(0, 100 - (elapsed / props.toast.duration) * 100)

          progress.value = nextProgress

          if (nextProgress <= 0) {
            emit('remove')
            return
          }

          raf.value = window.requestAnimationFrame(tick)
        }

        const startTimer = () => {
          clearAll()

          if (props.toast.duration <= 0) {
            progress.value = 100
            return
          }

          startAt.value = Date.now()

          timer.value = window.setTimeout(() => {
            emit('remove')
          }, props.toast.duration - elapsedBeforePause.value)

          raf.value = window.requestAnimationFrame(tick)
        }

        const pauseTimer = () => {
          if (props.toast.duration <= 0 || isPaused.value) return

          isPaused.value = true
          elapsedBeforePause.value += Date.now() - startAt.value
          clearAll()
        }

        const resumeTimer = () => {
          if (props.toast.duration <= 0 || !isPaused.value) return

          isPaused.value = false
          startTimer()
        }

        const resetTimer = () => {
          progress.value = 100
          isPaused.value = false
          elapsedBeforePause.value = 0
          startTimer()
        }

        const onPointerDown = (event: PointerEvent) => {
          isDragging.value = true
          startX.value = event.clientX
          pauseTimer()
        }

        const onPointerMove = (event: PointerEvent) => {
          if (!isDragging.value) return
          dragX.value = event.clientX - startX.value
        }

        const onPointerUp = () => {
          if (!isDragging.value) return

          isDragging.value = false

          if (Math.abs(dragX.value) > 90) {
            emit('remove')
            dragX.value = 0
            return
          }

          dragX.value = 0
          resumeTimer()
        }

        watch(
          () => props.toast.createdAt,
          () => {
            resetTimer()
          },
          { immediate: true },
        )

        onBeforeUnmount(() => {
          clearAll()
        })

        return () =>
          h(
            'div',
            {
              class: [
                'relative overflow-hidden rounded-2xl border shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-200',
                typeStyles.value.tone,
                props.toast.isLeaving ? 'scale-[0.98] opacity-0' : 'opacity-100',
              ],
              style: {
                transform: `translateX(${dragX.value}px) scale(${isDragging.value ? 0.99 : 1})`,
              },
              onMouseenter: pauseTimer,
              onMouseleave: resumeTimer,
              onPointerdown: onPointerDown,
              onPointermove: onPointerMove,
              onPointerup: onPointerUp,
              onPointercancel: onPointerUp,
            },
            [
              h('div', {
                class: 'absolute inset-x-0 top-0 h-[3px] bg-neutral-100',
              }),
              props.toast.duration > 0
                ? h('div', {
                    class: [
                      'absolute inset-x-0 top-0 h-[3px] origin-left transition-[width]',
                      typeStyles.value.bar,
                    ],
                    style: {
                      width: `${progress.value}%`,
                    },
                  })
                : null,

              h('div', { class: 'flex items-start gap-3 p-4' }, [
                h(
                  'div',
                  {
                    class: [
                      'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm font-semibold',
                      typeStyles.value.iconWrap,
                    ],
                  },
                  props.toast.type === 'loading'
                    ? h('div', {
                        class:
                          'h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900',
                      })
                    : typeStyles.value.icon,
                ),

                h('div', { class: 'min-w-0 flex-1' }, [
                  props.toast.title
                    ? h(
                        'div',
                        { class: 'mb-1 text-sm font-semibold text-neutral-950' },
                        props.toast.title,
                      )
                    : null,
                  h('div', { class: 'text-sm leading-5 text-neutral-600' }, props.toast.message),

                  props.toast.action
                    ? h(
                        'button',
                        {
                          class:
                            'mt-3 inline-flex h-8 items-center rounded-lg border border-neutral-200 px-3 text-xs font-medium text-neutral-700 transition hover:bg-neutral-50',
                          onClick: () => emit('action'),
                        },
                        props.toast.action.label,
                      )
                    : null,
                ]),

                props.toast.closable
                  ? h(
                      'button',
                      {
                        class:
                          'mt-0.5 shrink-0 rounded-lg p-1 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700',
                        onClick: () => emit('remove'),
                      },
                      '✕',
                    )
                  : null,
              ]),
            ],
          )
      },
    }),
  },
}
</script>

<style scoped>
.toast-list-enter-active,
.toast-list-leave-active,
.toast-list-move {
  transition: all 0.22s ease;
}

.toast-list-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

.toast-list-leave-to {
  opacity: 0;
  transform: translateX(40px) scale(0.98);
}
</style>
