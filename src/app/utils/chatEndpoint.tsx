import { apiPost, apiGet } from './axiosClient';
import { chatEndpoint } from './apiConstants';

export const getToken = async (data: any): Promise<any> => {
  return await apiPost(tokenEndpoint, data, {}).then((response: { status: any; data: any; }) => {
      return {
          status: response.status,
          data: response.data
      }
  }).catch((error: { status: any; response: any; }) => {
      console.log(error)
      return {
          status: error.status,
          data: error.response
      }
  })
}
