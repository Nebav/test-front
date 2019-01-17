import localForage from 'localforage'

class CookieHandler {
  static async saveKey (key, value) {
    await localForage.setItem(key, value)
  }

  static async getCookie (key) {
    let cookie = await localForage.getItem(key)
    return cookie
  }

  static async deleteCookie (key) {
    await localForage.removeItem(key)
  }
}

export default CookieHandler
