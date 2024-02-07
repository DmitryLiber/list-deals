<script setup lang="ts">
import Button from '../components/ui/Button.vue'

defineProps<{
  href: string
}>()

</script>

<template>
  <main>
    <Button>Кнопка</Button>
  </main>
</template>
