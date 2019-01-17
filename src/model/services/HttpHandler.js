import axios from 'axios'

class HttpHandler {
  /**
   * Request to API
   * @param {string} path to request
   * @param {string} method http method
   * @param {Object} data request body
   */
  static async request (path, method, data) {
    let parameters = {
      method: method,
      data: data || undefined,
      headers: {
        'Content-Type': 'application/json'
      },
      url: path
    }
    let result = {}
    try {
      result = await axios.request(parameters)
    } catch (err) {
      result.code = 500
      result.message = 'An error occured'
    }

    return result
  }
}

export default HttpHandler
