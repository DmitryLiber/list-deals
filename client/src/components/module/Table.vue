<script setup>
import { useEntitiesStore } from '@/stores/entities'
const entities = useEntitiesStore()
</script>

<template>
  <table class="table">
    <tr class="table__row">
      <th class="table__cell table__title">ID</th>
      <th class="table__cell table__title">Название</th>
    </tr>
    <tr v-for="(row, rowIndex) in entities.list" :key="rowIndex" class="table__row">
      <td class="table__cell">{{ row }}</td>
      <td class="table__cell"></td>
    </tr>
  </table>
</template>

<style lang="scss">
.table {
  width: 100%;
  &__row {
    border-radius: var(--radius-xs);
    &:nth-child(odd) {
      background-color: cl(bg);
    }
  }
  &__cell {
    padding: 5px;
  }
}
</style>
