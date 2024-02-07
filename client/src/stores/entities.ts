import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TAuth } from '@/assets/types/TAuth'
export const useEntitiesStore = defineStore('entities', () => {
  const list = ref([])
  const selectedEntity = ref('')
  const loading = false
  const serverInfo = ref({} as TAuth)

  function createEntity() {
    this.loading = true
    // this.list.push('123')
  }

  function setServerInfo({}) {
    this.serverInfo = serverInfo
  }

  function setSelectedEntity(entity: { value: string }) {
    this.selectedEntity = entity.value
  }

  return {
    list,
    selectedEntity,
    loading,
    serverInfo,
    setServerInfo,
    setSelectedEntity,
    createEntity
  }
})
