import { apiPost, apiGet } from './axiosClient';
import { configEndpoint, tokenEndpoint } from './apiConstants';
import { ApiResponse } from "./types.tsx"

export const getToken = async (data): Promise<ApiResponse> => {
  return await apiPost(tokenEndpoint, data, {}).then((response: ApiResponse) => {
      return {
          status: response.status,
          data: response.data
      }
  }).catch((error: ApiResponse) => {
      console.log(error)
      return {
          status: error.status,
          data: error.response
      }
  })
}

export const getConfig = async (data, headers): Promise<ApiResponse> =>{
    return await apiGet(configEndpoint, data, headers).then((response) => {
        return {
            status: response.status,
            data: response.data
        }
    }).catch((error) =>{
        console.log(error)
        return {
            status: error.status,
            data: error.response
        }
    })
}


export default getToken;
