import type { TAuth } from '@/assets/types/TAuth'
import { useEntitiesStore } from '@/stores/entities'
const entities = useEntitiesStore()

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
    try {
      const response = await fetch(`https://test.gnzs.ru/oauth/get-token.php`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Client-Id': ''
        }
      })

      const json = await response.json()

      if (json.status === 200) {
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
