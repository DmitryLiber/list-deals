import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TAuth } from '@/assets/types/TAuth'
import { API } from '@/api/amoCRM/fetch'
type TEntities = {
  list: any[]
  selectedEntity: any
  loading: boolean
  serverInfo: TAuth
  setServerInfo: (serverInfo: TAuth) => void
  setSelectedEntity: (entity: { value: string }) => void
}

export const useEntitiesStore = defineStore('entities', () => {
  const list = ref([])
  const selectedEntity = ref('')
  const loading = false
  const serverInfo = ref({} as TAuth)

  async function createEntity(this: TEntities) {
    const amoUrl = `https://${this.serverInfo.base_domain}/api/v4/${selectedEntity.value}`
    this.loading = true

    const data = {
      url: amoUrl,
      type: selectedEntity.value,
      accessToken: this.serverInfo.access_token
    } as {
      url: string
      type: string
      accessToken: string
    }

    const response = await API.post(data).finally(() => {
      this.loading = false
    })

    if (response) {
      const data = await response
      this.list.push(data)
    } else {
      console.error('Failed create:', response.status, response.statusText)
    }
  }

  function setServerInfo(this: TEntities, serverInfo: TAuth) {
    this.serverInfo = serverInfo
  }

  function setSelectedEntity(this: TEntities, entity: { value: string }) {
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
