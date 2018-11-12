import request from '../utils/request';

export function queryAll() {
  return request('user')
}

export function put(id, values) {
  return request(`user/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return request('user', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function login(values){
  return request('login',{
    method: 'POST',
    body: values
  });
}
