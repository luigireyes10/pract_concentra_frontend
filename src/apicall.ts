
import axios, { AxiosResponse } from 'axios'
type RequestHeaders = {
    headers: {
      'Content-Type': string
      Authorization?: string
    }
  }

const getResponseParams = (): RequestHeaders => {
    return {
      headers: {
        'Content-Type': 'application/json',
        //Authorization: getSessionToken(),
      },
    }
  }
  
 export function postRequest<T>(url: string, data: object): Promise<AxiosResponse<T>> {
    const config = getResponseParams()
    const result = axios.post(url, data, config)
    return result
  }