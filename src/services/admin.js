import request from "../utils/request";

export function queryKind(page_size) {
  return request(`kind?page_size=${page_size}`)
}

export function queryTag(page_size) {
  return request(`tag?page_size=${page_size}`)
}

export function createKind(values) {
  return request('kind', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values)
  })
}
export function createTag(values) {
  return request('tag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values)
  })
}

export function delKind(id) {
  return request(`kind/${id}`, {
    method: 'DELETE',
  })
}
export function delTag(id) {
  return request(`tag/${id}`, {
    method: 'DELETE',
  })
}
export function queryPermission(page_size) {
  return request(`permission?page_size=${page_size}`)
}
export function createPermission(values) {
  return request('permission', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values)
  })
}
export function delPermission(id) {
  return request(`permission/${id}`, {
    method: 'DELETE',
  })
}
