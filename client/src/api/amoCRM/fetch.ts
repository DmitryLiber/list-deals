import type { TAuth } from '@/assets/types/TAuth'
import { useEntitiesStore } from '@/stores/entities'
class fetchAPI {
  // async get(params: string | number) {
  //   try {
  //     const response = await fetch(`${this.#server}api/?access_token=${this.#token + params}`)
  //     const json = await response.json()

  //     return json
  //   } catch (err) {
  //     return err
  //   }
  // }

  async auth() {
    const entities = useEntitiesStore()
    const ID = 31550986

    try {
      const response = await fetch(`http://localhost:4000/auth?id=${ID}`)

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json()

      if(json){
        entities.setServerInfo({
          access_token: json.access_token,
          base_domain: json.base_domain
        } as TAuth)
      }

    } catch (err) {
      return err
    }
  }

  async post(type: string, body: Object = {}) {
    const entities = useEntitiesStore()

    try {
      const cfg = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Client-Id': entities.serverInfo.access_token
        },
        body: JSON.stringify(body)
      } as Object

      const response = await fetch(`${entities.serverInfo.base_domain}/api/v4/${type}`, cfg)
      const json = await response.json()

      return json
    } catch (err) {
      return err
    }
  }
}
const API = new fetchAPI()

export { API }
