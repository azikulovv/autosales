type ToastType = 'success' | 'error' | 'info' | 'loading'

type ToastAction = {
  label: string
  onClick?: () => void | Promise<void>
}

type ToastOptions = {
  id?: number
  type?: ToastType
  title?: string
  message: string
  duration?: number
  closable?: boolean
  action?: ToastAction
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

let toastId = 0

export const useToastify = () => {
  const toasts = useState<ToastItem[]>('super-toasts', () => [])

  const remove = (id: number) => {
    const target = toasts.value.find((toast) => toast.id === id)
    if (!target || target.isLeaving) return

    target.isLeaving = true

    setTimeout(() => {
      toasts.value = toasts.value.filter((toast) => toast.id !== id)
    }, 220)
  }

  const add = (options: ToastOptions | string) => {
    const normalized =
      typeof options === 'string'
        ? ({
            message: options,
          } satisfies ToastOptions)
        : options

    const toast: ToastItem = {
      id: normalized.id ?? ++toastId,
      type: normalized.type ?? 'info',
      title: normalized.title,
      message: normalized.message,
      duration: normalized.duration ?? 3500,
      createdAt: Date.now(),
      closable: normalized.closable ?? true,
      action: normalized.action,
      progress: 100,
    }

    toasts.value = [...toasts.value, toast]

    return toast.id
  }

  const update = (id: number, patch: Partial<Omit<ToastItem, 'id'>>) => {
    const target = toasts.value.find((toast) => toast.id === id)
    if (!target) return null

    Object.assign(target, patch)

    if (patch.createdAt === undefined) {
      target.createdAt = Date.now()
    }

    if (patch.progress === undefined) {
      target.progress = 100
    }

    return target
  }

  const success = (message: string, title?: string) =>
    add({
      type: 'success',
      title,
      message,
    })

  const error = (message: string, title?: string, duration = 4500) =>
    add({
      type: 'error',
      title,
      message,
      duration,
    })

  const info = (message: string, title?: string) =>
    add({
      type: 'info',
      title,
      message,
    })

  const loading = (message: string, title?: string) =>
    add({
      type: 'loading',
      title,
      message,
      duration: 0,
      closable: false,
    })

  const promise = async <T>(
    promiseOrFactory: Promise<T> | (() => Promise<T>),
    messages: {
      loading: string
      success: string | ((result: T) => string)
      error: string | ((error: unknown) => string)
      title?: string
    },
  ) => {
    const id = loading(messages.loading, messages.title)

    try {
      const result =
        typeof promiseOrFactory === 'function' ? await promiseOrFactory() : await promiseOrFactory

      update(id, {
        type: 'success',
        message:
          typeof messages.success === 'function' ? messages.success(result) : messages.success,
        closable: true,
        duration: 3000,
      })

      return result
    } catch (err) {
      update(id, {
        type: 'error',
        message: typeof messages.error === 'function' ? messages.error(err) : messages.error,
        closable: true,
        duration: 4500,
      })

      throw err
    }
  }

  return {
    toasts,
    add,
    update,
    remove,
    success,
    error,
    info,
    loading,
    promise,
  }
}
