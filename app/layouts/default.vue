<script setup lang="ts">
import PublicLayout from '~/components/layouts/PublicLayout.vue'
import SellerLayout from '~/components/layouts/SellerLayout.vue'

const route = useRoute()
</script>

<template>
  <PublicLayout v-if="!route.path.startsWith('/seller/')">
    <slot />
  </PublicLayout>

  <SellerLayout v-else>
    <slot />
  </SellerLayout>
</template>
