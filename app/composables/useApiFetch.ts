export const useApiFetch = async <T>(url: string, options: any = {}): Promise<T> => {
  const config = useRuntimeConfig()
  const { accessToken, refresh, clearSession } = useAuth()

  try {
    return await $fetch<T>(`${config.public.apiBase}${url}`, {
      ...options,
      credentials: 'include',
      headers: {
        ...(options.headers || {}),
        ...(accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : {}),
      },
    })
  } catch (error: any) {
    if (error?.response?.status === 401) {
      const refreshed = await refresh()

      if (!refreshed) {
        clearSession()
        throw error
      }

      return await $fetch<T>(`${config.public.apiBase}${url}`, {
        ...options,
        credentials: 'include',
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${refreshed.accessToken}`,
        },
      })
    }

    throw error
  }
}
