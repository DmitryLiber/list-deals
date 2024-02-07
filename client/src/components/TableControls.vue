<template>
  <form class="table-controls" method="POST" @submit.prevent>
    <slot />
  </form>
</template>

<style lang="scss">
.table-controls {
  display: flex;
  margin-bottom: var(--gap-s);
  gap: var(--gap-m-static);
}
</style>
