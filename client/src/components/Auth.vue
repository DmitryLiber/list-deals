<script lang="ts" setup>
import LoaderCircle from '@/components/ui/LoaderCircle.vue'
</script>

<template>
  <div class="awaitAuth">
    <h2 class="awaitAuth__title">Получаем доступ...</h2>
    <LoaderCircle />
  </div>
</template>

<style lang="scss">
.awaitAuth {
  @include center();

  width: 100%;
  height: 100%;
  position: fixed;
  flex-direction: column;
  top: 0;
  left: 0;
  background-color: rgba(#{cl(primary--rgb)}, 0.8);
  z-index: var(--index-4);

  &__title {
    @include font(25px, 1, 500);
    color: cl(whte);
  }
}
</style>
