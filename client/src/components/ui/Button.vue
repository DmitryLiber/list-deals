<script lang="ts">
type TButton = {
  loading: boolean,
  type?: string
  href?: string
}

export default {
  props: {
    href: '',
    type: '',
    loading: false
  } as TButton
}
</script>

<template>
  <button v-if='!href' class="btn" v-bind="$attrs" >
    <div v-if="loading" class="loader"></div>
    <template v-else>
      <slot />
    </template>
  </button>
  <a v-else :href='href' class="btn" v-bind="$attrs" >
    <div v-if="loading" class="loader"></div>
    <template v-else>
      <slot />
    </template>
  </a>
</template>

<style lang="scss">
.btn {
  background-color: cl(primary);
}
</style>