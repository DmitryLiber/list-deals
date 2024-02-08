<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useEntitiesStore } from '@/stores/entities'
import Button from '@/components/ui/ButtonDefault.vue'
import Select from '@/components/ui/SelectDefault.vue'
import Table from '@/components/module/TableDefault.vue'
import TableControls from '@/components/TableControls.vue'
import Auth from '@/components/Auth.vue'
import { API } from '@/api/amoCRM/fetch'

const entities = useEntitiesStore()
const isAuth = computed(() => entities.serverInfo.access_token === undefined)

onMounted(() => {
  API.auth()
})

</script>

<template>
  <main class="container container--gap-top">
    <Auth v-if="isAuth" />
    <section class="section">
      <h1 class="block-title block-title--centered">Существующие сущности</h1>
    </section>
    <section class="section">
      <TableControls>
        <Select
          :options="[
            { value: '', name: 'Не выбрано' },
            { value: 'leads', name: 'Сделка' },
            { value: 'contact', name: 'Контакт' },
            { value: 'company', name: 'Компания' }
          ]"
          name="nameEntity"
          class="select"
          :cb="entities.setSelectedEntity"
        />
        <Button
          type="submit"
          :loading="entities.loading"
          @click="entities.createEntity()"
          :disabled="entities.selectedEntity === '' ? '' : undefined"
          >Создать</Button
        >
      </TableControls>
      <Table v-if="entities.list.length > 0" />
      <h2 v-else>Нет существующих сущностей</h2>
    </section>
  </main>
</template>