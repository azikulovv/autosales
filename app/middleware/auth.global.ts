export default defineNuxtRouteMiddleware(async (to) => {
  const isPublicPage = Boolean(to.meta.public)
  const isAuthPage = Boolean(to.meta.authPage)

  const { user, accessToken, fetchMe, refresh, clearSession } = useAuth()

  // 1. Если токена нет
  if (!accessToken.value) {
    // гость может быть на public и auth страницах
    if (isPublicPage || isAuthPage) {
      return
    }

    // на закрытые страницы нельзя
    return navigateTo('/auth/login')
  }

  // 2. Если пользователь уже есть в памяти
  if (user.value) {
    // авторизованному нельзя на login/register
    if (isAuthPage) {
      return navigateTo('/')
    }

    return
  }

  // 3. Есть token, но нет user — пробуем восстановить сессию ОДИН раз
  try {
    const me = await fetchMe()

    if (me) {
      if (isAuthPage) {
        return navigateTo('/')
      }

      return
    }
  } catch {
    // ничего
  }

  try {
    const refreshed = await refresh()

    if (refreshed) {
      const me = await fetchMe()

      if (me) {
        if (isAuthPage) {
          return navigateTo('/')
        }

        return
      }
    }
  } catch {
    // ничего
  }

  // 4. Если не удалось восстановить сессию — чистим состояние
  clearSession()

  // 5. Не редиректим повторно auth/public страницы
  if (isPublicPage || isAuthPage) {
    return
  }

  return navigateTo('/auth/login')
})
