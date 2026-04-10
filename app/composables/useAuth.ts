import type { User } from '~/types/auth'

type AuthResponse = {
  success: boolean
  message?: string
  data: {
    user: User
    accessToken: string
  }
}

export const useAuth = () => {
  const accessToken = useCookie<string | null>('access_token', {
    default: () => null,
    sameSite: 'lax',
  })

  const user = useState<User | null>('auth_user', () => null)
  const isAuthenticated = computed(() => Boolean(accessToken.value && user.value))

  const config = useRuntimeConfig()

  const setSession = (payload: { user: User; accessToken: string }) => {
    accessToken.value = payload.accessToken
    user.value = payload.user
  }

  const clearSession = () => {
    accessToken.value = null
    user.value = null
  }

  const register = async (body: {
    name: string
    email: string
    phone?: string
    password: string
    role?: 'BUYER' | 'SELLER'
  }) => {
    const response = await $fetch<AuthResponse>(`${config.public.apiBase}/auth/register`, {
      method: 'POST',
      body,
      credentials: 'include',
    })

    setSession(response.data)
    return response
  }

  const login = async (body: { email: string; password: string }) => {
    const response = await $fetch<AuthResponse>(`${config.public.apiBase}/auth/login`, {
      method: 'POST',
      body,
      credentials: 'include',
    })

    setSession(response.data)
    return response
  }

  const fetchMe = async () => {
    if (!accessToken.value) return null

    try {
      const response = await $fetch<{ success: boolean; data: User }>(
        `${config.public.apiBase}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
          credentials: 'include',
        },
      )

      user.value = response.data
      return response.data
    } catch {
      return null
    }
  }

  const refresh = async () => {
    try {
      const response = await $fetch<AuthResponse>(`${config.public.apiBase}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      })

      setSession(response.data)
      return response.data
    } catch {
      clearSession()
      return null
    }
  }

  const logout = async () => {
    try {
      await $fetch(`${config.public.apiBase}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } finally {
      clearSession()
      await navigateTo('/auth/login')
    }
  }

  return {
    accessToken,
    user,
    isAuthenticated,
    register,
    login,
    fetchMe,
    refresh,
    logout,
    setSession,
    clearSession,
  }
}
