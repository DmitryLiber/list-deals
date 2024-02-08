import type { TAuth } from '@/assets/types/TAuth'
import { useEntitiesStore } from '@/stores/entities'

const SERVER = 'http://localhost:4000'

class fetchAPI {
  async auth() {
    const entities = useEntitiesStore()
    const ID = 31550986

    try {
      const response = await fetch(`${SERVER}/auth?id=${ID}`)

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const json = await response.json()

      if (json) {
        entities.setServerInfo({
          access_token: json.access_token,
          base_domain: json.base_domain
        } as TAuth)
      }
    } catch (err) {
      return err
    }
  }

  async post(data = {} as { type: string }) {
    const url = `${SERVER}/create`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      } as Object)
      return await response.json()
    } catch (err) {
      return err
    }
  }
}
const API = new fetchAPI()

export { API }
