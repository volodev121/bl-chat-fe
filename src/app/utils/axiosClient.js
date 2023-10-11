import axios from 'axios';

const DEFAULT_ERROR_MESSAGE = 'Something went wrong';

axios.interceptors.response.use(null, error => {
  if (error && error.response) {
    if (error.response.status === 401) {
      // initial call to whoami will get intercepted here and redirect, need to throw log event
     console.log(error.response)
    }
    const { data } = error.response;
    if (typeof data === 'object') {
      const errorPayload =
        data.error ||
        data.errors ||
        data.error_message ||
        data.error_type ||
        data.message ||
        DEFAULT_ERROR_MESSAGE;
      return Promise.reject(errorPayload);
    }
    return Promise.reject(DEFAULT_ERROR_MESSAGE);
  }
  return Promise.reject(error);
});

const config = {
  withCredentials: false,
};

export function apiGet(path, params, headers) {
  return axios.get(path, { ...config, ...headers }, {...headers});
}

export function apiPost(path, data, headers) {
  return axios.post(path, data, {...config, ...headers});
}

export function apiPatch(path, data) {
  return axios.patch(path, data, config);
}

export function apiPut(path, data, headers) {
  return axios.put(path, data, {...config, ...headers});
}

export function apiDelete(path, data) {
  return axios.delete(path, { ...config, ...data });
}
