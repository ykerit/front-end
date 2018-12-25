import request from '../utils/request';

export function queryUser() {
  return request('user')
}

export function putUser(id, values) {
  return request(`user/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function createUser(values) {
  return request('user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
}

export function delUser(id) {
  return request(`user/${id}`, {
    method: 'DELETE',
  })
}

export function queryRole() {
  return request('role')
}

export function createRole(values) {
  return request('role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values)
  })
}

export function delRole(id) {
  return request(`role/${id}`, {
    method: 'DELETE',
  })
}

export function queryAdmin() {
  return request('admin')
}

export function createAdmin(values) {
  return request('admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values)
  })
}

export function delAdmin(id) {
  return request(`admin/${id}`, {
    method: 'DELETE',
  })
}

export function login(values){
  let formData = new FormData();
  formData.append('name', values.userName);
  formData.append('password', values.password);
  return request('login',{
    method: 'POST',
    body: formData
  });
}
