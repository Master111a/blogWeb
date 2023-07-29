import axios, { AxiosInstance } from 'axios'
class API {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://fakestoreapi.com/',
      timeout: 3000
    })
  }
}
const req = new API().instance
export default req
