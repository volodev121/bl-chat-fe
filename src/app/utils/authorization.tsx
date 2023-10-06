import React, { useState, useEffect } from 'react';
import { apiPost, apiGet } from './axiosClient';
import { configEndpoint, tokenEndpoint } from './apiConstants';

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

export const getConfig = async (data: any, headers: any): Promise<any> =>{
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
