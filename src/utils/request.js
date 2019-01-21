import fetch from 'dva/fetch';
import { ROOT_URL } from '../config';
import { getlocalStorage } from './helper'

// Auth
export function setAuthHeader(token) {
  return ({
    headers: {
      'Authorization': token,
    },
  });
}

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default async function request(url, options) {
  console.log(ROOT_URL+url);
  if (typeof (options) === 'undefined') {
    options = setAuthHeader(getlocalStorage('token'))
  } else {
    if (typeof (options.headers) === 'undefined') {
      options.headers = {'Authorization': getlocalStorage('token')}
    }else {
      options.headers.Authorization = `${getlocalStorage('token')}`
    }
  }
  return fetch(ROOT_URL+url, { ...options })
  .then(checkStatus)
  .then(parseJSON);
}
