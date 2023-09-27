import React, { useState, useEffect } from 'react';
import { apiPost, apiGet } from './axiosClient';

export const getToken = async (url: string, data: any): Promise<any> => {
  return await apiPost(url, {}, {}).then((response: { status: any; data: any; }) => {
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

export const getConfig = async (url: string, data: any, headers: any): Promise<any> =>{
    return await apiGet(url, data, headers).then((response) => {
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
