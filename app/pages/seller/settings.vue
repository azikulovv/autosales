<script setup lang="ts">
useSeoMeta({
  title: 'Настройки продавца',
  description: 'Настройки аккаунта продавца, уведомлений, безопасности и интеграций.',
})

type SettingsSection = 'account' | 'notifications' | 'security' | 'integration'

type NotificationSettings = {
  newOrders: boolean
  lowStock: boolean
  payments: boolean
  promotions: boolean
  email: boolean
  telegram: boolean
}

type SecuritySettings = {
  twoFactor: boolean
  loginAlerts: boolean
  sessionTimeout: string
}

type IntegrationSettings = {
  kaspiSync: boolean
  excelImport: boolean
  apiAccess: boolean
}

type SellerSettings = {
  fullName: string
  email: string
  phone: string
  telegram: string
  language: string
  timezone: string
  notifications: NotificationSettings
  security: SecuritySettings
  integrations: IntegrationSettings
}

const sections: Array<{ label: string; value: SettingsSection }> = [
  { label: 'Аккаунт', value: 'account' },
  { label: 'Уведомления', value: 'notifications' },
  { label: 'Безопасность', value: 'security' },
  { label: 'Интеграции', value: 'integration' },
]

const activeSection = ref<SettingsSection>('account')
const showMobileSidebar = ref(false)
const isSaving = ref(false)
const saveMessage = ref('')

const form = ref<SellerSettings>({
  fullName: 'Маулен Азикулов',
  email: 'seller@autoprice.kz',
  phone: '+7 (777) 123-45-67',
  telegram: '@autoparts_krg',
  language: 'Русский',
  timezone: 'Asia/Almaty',
  notifications: {
    newOrders: true,
    lowStock: true,
    payments: true,
    promotions: false,
    email: true,
    telegram: true,
  },
  security: {
    twoFactor: false,
    loginAlerts: true,
    sessionTimeout: '30 минут',
  },
  integrations: {
    kaspiSync: false,
    excelImport: true,
    apiAccess: false,
  },
})

const saveSettings = async () => {
  isSaving.value = true
  saveMessage.value = ''

  try {
    await new Promise((resolve) => setTimeout(resolve, 700))
    saveMessage.value = 'Настройки сохранены'
  } catch {
    saveMessage.value = 'Ошибка при сохранении'
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-950">
    <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <!-- <section
        class="rounded-[28px] bg-neutral-950 p-5 text-white shadow-xl sm:rounded-[32px] sm:p-7 lg:p-8"
      >
        <div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p
              class="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/70 sm:text-xs"
            >
              Настройки продавца
            </p>
            <h1
              class="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            >
              Управляй аккаунтом, уведомлениями и безопасностью
            </h1>
            <p class="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
              Здесь можно изменить контактные данные, каналы уведомлений, параметры безопасности и
              включить нужные интеграции.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              class="flex h-12 items-center justify-center rounded-2xl bg-white text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
              :disabled="isSaving"
              @click="saveSettings"
            >
              {{ isSaving ? 'Сохранение...' : 'Сохранить' }}
            </button>

            <button
              type="button"
              class="flex h-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-sm font-medium text-white transition hover:bg-white/15"
            >
              Выйти из аккаунта
            </button>
          </div>
        </div>
      </section> -->

      <!-- <section class="mt-4 lg:hidden"> -->
      <section class="mt-4 lg:hidden">
        <button
          type="button"
          class="flex h-12 w-full items-center justify-center rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-100"
          @click="showMobileSidebar = !showMobileSidebar"
        >
          {{ showMobileSidebar ? 'Скрыть разделы' : 'Показать разделы' }}
        </button>
      </section>

      <section class="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6">
        <!-- <section class="mt-4 grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6"> -->
        <aside class="space-y-4" :class="showMobileSidebar ? 'block' : 'hidden lg:block'">
          <div class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
            <p class="text-sm font-medium text-neutral-500">Разделы</p>

            <div class="mt-4 grid gap-2">
              <button
                v-for="section in sections"
                :key="section.value"
                type="button"
                class="flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition"
                :class="
                  activeSection === section.value
                    ? 'bg-neutral-950 text-white'
                    : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                "
                @click="activeSection = section.value"
              >
                <span>{{ section.label }}</span>
              </button>
            </div>
          </div>

          <div class="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
            <p class="text-sm font-medium text-neutral-500">Статус</p>

            <div class="mt-4 space-y-3">
              <div class="rounded-2xl bg-neutral-50 px-4 py-4">
                <p class="text-xs uppercase tracking-[0.18em] text-neutral-400">Email</p>
                <p class="mt-2 text-sm font-semibold text-neutral-950">
                  {{ form.email }}
                </p>
              </div>

              <div class="rounded-2xl bg-neutral-50 px-4 py-4">
                <p class="text-xs uppercase tracking-[0.18em] text-neutral-400">Telegram</p>
                <p class="mt-2 text-sm font-semibold text-neutral-950">
                  {{ form.telegram }}
                </p>
              </div>
            </div>

            <p v-if="saveMessage" class="mt-4 text-sm font-medium text-emerald-600">
              {{ saveMessage }}
            </p>
          </div>
        </aside>

        <div class="min-w-0 space-y-4">
          <section
            v-if="activeSection === 'account'"
            class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-6"
          >
            <p class="text-sm font-medium text-neutral-500">Аккаунт</p>
            <h2 class="mt-1 text-2xl font-semibold tracking-tight">Основные данные продавца</h2>

            <div class="mt-5 grid gap-4">
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-medium text-neutral-700"
                    >Имя и фамилия</label
                  >
                  <input
                    v-model="form.fullName"
                    type="text"
                    class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  />
                </div>

                <div>
                  <label class="mb-2 block text-sm font-medium text-neutral-700">Email</label>
                  <input
                    v-model="form.email"
                    type="email"
                    class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  />
                </div>
              </div>

              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-medium text-neutral-700">Телефон</label>
                  <input
                    v-model="form.phone"
                    type="text"
                    class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  />
                </div>

                <div>
                  <label class="mb-2 block text-sm font-medium text-neutral-700">Telegram</label>
                  <input
                    v-model="form.telegram"
                    type="text"
                    class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  />
                </div>
              </div>

              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-medium text-neutral-700"
                    >Язык интерфейса</label
                  >
                  <select
                    v-model="form.language"
                    class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  >
                    <option>Русский</option>
                    <option>Қазақша</option>
                    <option>English</option>
                  </select>
                </div>

                <div>
                  <label class="mb-2 block text-sm font-medium text-neutral-700"
                    >Часовой пояс</label
                  >
                  <select
                    v-model="form.timezone"
                    class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                  >
                    <option>Asia/Almaty</option>
                    <option>Asia/Qyzylorda</option>
                    <option>Asia/Aqtobe</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          <section
            v-if="activeSection === 'notifications'"
            class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-6"
          >
            <p class="text-sm font-medium text-neutral-500">Уведомления</p>
            <h2 class="mt-1 text-2xl font-semibold tracking-tight">Что и куда отправлять</h2>

            <div class="mt-5 space-y-3">
              <label
                class="flex items-center justify-between gap-4 rounded-2xl bg-neutral-50 px-4 py-4"
              >
                <span class="text-sm font-medium text-neutral-700">Новые заказы</span>
                <input
                  v-model="form.notifications.newOrders"
                  type="checkbox"
                  class="h-4 w-4 rounded border-neutral-300"
                />
              </label>

              <label
                class="flex items-center justify-between gap-4 rounded-2xl bg-neutral-50 px-4 py-4"
              >
                <span class="text-sm font-medium text-neutral-700">Заканчивается остаток</span>
                <input
                  v-model="form.notifications.lowStock"
                  type="checkbox"
                  class="h-4 w-4 rounded border-neutral-300"
                />
              </label>

              <label
                class="flex items-center justify-between gap-4 rounded-2xl bg-neutral-50 px-4 py-4"
              >
                <span class="text-sm font-medium text-neutral-700">Платежи и списания</span>
                <input
                  v-model="form.notifications.payments"
                  type="checkbox"
                  class="h-4 w-4 rounded border-neutral-300"
                />
              </label>

              <label
                class="flex items-center justify-between gap-4 rounded-2xl bg-neutral-50 px-4 py-4"
              >
                <span class="text-sm font-medium text-neutral-700">Акции и продвижение</span>
                <input
                  v-model="form.notifications.promotions"
                  type="checkbox"
                  class="h-4 w-4 rounded border-neutral-300"
                />
              </label>
            </div>

            <div class="mt-6 grid gap-4 sm:grid-cols-2">
              <label
                class="flex items-center justify-between gap-4 rounded-2xl bg-neutral-50 px-4 py-4"
              >
                <span class="text-sm font-medium text-neutral-700">Email-уведомления</span>
                <input
                  v-model="form.notifications.email"
                  type="checkbox"
                  class="h-4 w-4 rounded border-neutral-300"
                />
              </label>

              <label
                class="flex items-center justify-between gap-4 rounded-2xl bg-neutral-50 px-4 py-4"
              >
                <span class="text-sm font-medium text-neutral-700">Telegram-уведомления</span>
                <input
                  v-model="form.notifications.telegram"
                  type="checkbox"
                  class="h-4 w-4 rounded border-neutral-300"
                />
              </label>
            </div>
          </section>

          <section
            v-if="activeSection === 'security'"
            class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-6"
          >
            <p class="text-sm font-medium text-neutral-500">Безопасность</p>
            <h2 class="mt-1 text-2xl font-semibold tracking-tight">Защита аккаунта</h2>

            <div class="mt-5 space-y-3">
              <label
                class="flex items-center justify-between gap-4 rounded-2xl bg-neutral-50 px-4 py-4"
              >
                <span class="text-sm font-medium text-neutral-700"
                  >Двухфакторная аутентификация</span
                >
                <input
                  v-model="form.security.twoFactor"
                  type="checkbox"
                  class="h-4 w-4 rounded border-neutral-300"
                />
              </label>

              <label
                class="flex items-center justify-between gap-4 rounded-2xl bg-neutral-50 px-4 py-4"
              >
                <span class="text-sm font-medium text-neutral-700">Уведомления о входе</span>
                <input
                  v-model="form.security.loginAlerts"
                  type="checkbox"
                  class="h-4 w-4 rounded border-neutral-300"
                />
              </label>

              <div class="rounded-2xl bg-neutral-50 px-4 py-4">
                <label class="mb-2 block text-sm font-medium text-neutral-700"
                  >Таймаут сессии</label
                >
                <select
                  v-model="form.security.sessionTimeout"
                  class="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-neutral-950"
                >
                  <option>15 минут</option>
                  <option>30 минут</option>
                  <option>1 час</option>
                  <option>4 часа</option>
                </select>
              </div>
            </div>

            <div class="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                class="flex h-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
              >
                Сменить пароль
              </button>

              <button
                type="button"
                class="flex h-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
              >
                Завершить все сессии
              </button>
            </div>
          </section>

          <section
            v-if="activeSection === 'integration'"
            class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-6"
          >
            <p class="text-sm font-medium text-neutral-500">Интеграции</p>
            <h2 class="mt-1 text-2xl font-semibold tracking-tight">Подключения и импорт</h2>

            <div class="mt-5 space-y-3">
              <label
                class="flex items-center justify-between gap-4 rounded-2xl bg-neutral-50 px-4 py-4"
              >
                <span class="text-sm font-medium text-neutral-700">Синхронизация с Kaspi</span>
                <input
                  v-model="form.integrations.kaspiSync"
                  type="checkbox"
                  class="h-4 w-4 rounded border-neutral-300"
                />
              </label>

              <label
                class="flex items-center justify-between gap-4 rounded-2xl bg-neutral-50 px-4 py-4"
              >
                <span class="text-sm font-medium text-neutral-700">Импорт из Excel</span>
                <input
                  v-model="form.integrations.excelImport"
                  type="checkbox"
                  class="h-4 w-4 rounded border-neutral-300"
                />
              </label>

              <label
                class="flex items-center justify-between gap-4 rounded-2xl bg-neutral-50 px-4 py-4"
              >
                <span class="text-sm font-medium text-neutral-700">API-доступ</span>
                <input
                  v-model="form.integrations.apiAccess"
                  type="checkbox"
                  class="h-4 w-4 rounded border-neutral-300"
                />
              </label>
            </div>

            <div class="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                class="flex h-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
              >
                Подключить сервис
              </button>

              <button
                type="button"
                class="flex h-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
              >
                Сгенерировать API ключ
              </button>
            </div>
          </section>

          <div class="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p class="text-sm font-medium text-neutral-500">Сохранение</p>
                <h2 class="mt-1 text-2xl font-semibold tracking-tight">Применить изменения</h2>
              </div>

              <button
                type="button"
                class="flex h-12 items-center justify-center rounded-2xl bg-neutral-950 px-5 text-sm font-medium text-white transition hover:opacity-90"
                :disabled="isSaving"
                @click="saveSettings"
              >
                {{ isSaving ? 'Сохранение...' : 'Сохранить настройки' }}
              </button>
            </div>

            <p v-if="saveMessage" class="mt-4 text-sm font-medium text-emerald-600">
              {{ saveMessage }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
