import fetch from 'dva/fetch';
import { ROOT_URL } from '../config';
// import { getCookie,getAuthHeader } from './helper';

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
  return fetch(ROOT_URL+url, { ...options })
  .then(checkStatus)
  .then(parseJSON);
}
