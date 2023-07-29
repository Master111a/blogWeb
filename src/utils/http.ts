import axios, { AxiosInstance } from 'axios'
class HTTP {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:4000',
      timeout: 3000
    })
  }
}
const http = new HTTP().instance
export default http
