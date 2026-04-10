<template>
  <section
    class="rounded-[28px] border border-dashed border-neutral-300 bg-white p-8 text-center shadow-sm"
  >
    <h1 class="text-2xl font-semibold tracking-tight text-neutral-950">Товар не найден</h1>
    <p class="mt-2 text-sm leading-6 text-neutral-500">
      Возможно, товар был удален или ссылка указана неверно.
    </p>
    <NuxtLink
      to="/catalog"
      class="mt-4 inline-flex rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
    >
      Вернуться в каталог
    </NuxtLink>
  </section>
</template>
