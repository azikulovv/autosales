export default defineNuxtPlugin(async () => {
  const { fetchMe, refresh, accessToken } = useAuth()

  if (!accessToken.value) return

  const me = await fetchMe()

  if (!me) {
    await refresh()
    await fetchMe()
  }
})
