import {AUTH_URL} from '../config';


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}


export default function authRequest(url, options) {
  return fetch(AUTH_URL+url, { ...options })
    .then(checkStatus)
    .then(response => response.json());
}
